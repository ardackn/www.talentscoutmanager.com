import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:async';
import 'dart:io';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:intl/intl.dart';
import 'package:talescout_virsual_code/pages/full_screen_image_page.dart';

class ChatPage extends StatefulWidget {
  final String receiverId;
  final String receiverName;

  const ChatPage({
    super.key,
    required this.receiverId,
    required this.receiverName,
  });

  @override
  _ChatPageState createState() => _ChatPageState();
}

// ignore: library_private_types_in_public_api
class _ChatPageState extends State<ChatPage> {
  final _auth = FirebaseAuth.instance;
  final _firestore = FirebaseFirestore.instance;
  final _storage = FirebaseStorage.instance;
  final _messageController = TextEditingController();
  Timer? _typingTimer;

  late String _chatRoomId;

  @override
  void initState() {
    super.initState();
    final currentUser = _auth.currentUser!;
    List<String> ids = [currentUser.uid, widget.receiverId];
    ids.sort(); // Sohbet odası ID'sinin her zaman aynı olmasını sağlar
    _chatRoomId = ids.join('_');

    _messageController.addListener(_onTyping);

    _markMessagesAsRead();
  }

  @override
  void dispose() {
    _messageController.removeListener(_onTyping);
    _messageController.dispose();
    _typingTimer?.cancel();
    _updateTypingStatus(false); // Sayfadan çıkarken yazmıyor olarak ayarla
    super.dispose();
  }

  void _onTyping() {
    if (_typingTimer?.isActive ?? false) _typingTimer!.cancel();
    _updateTypingStatus(true);
    _typingTimer = Timer(const Duration(seconds: 2), () {
      _updateTypingStatus(false);
    });
  }

  Future<void> _updateTypingStatus(bool isTyping) async {
    final currentUser = _auth.currentUser;
    if (currentUser == null) return;
    await _firestore.collection('chats').doc(_chatRoomId).set({
      'typingStatus': {currentUser.uid: isTyping},
    }, SetOptions(merge: true));
  }

  Future<void> _sendMessage() async {
    if (_messageController.text.trim().isEmpty) return;

    final currentUser = _auth.currentUser!;
    final messageText = _messageController.text.trim();
    _messageController.clear();

    // Mesaj gönderildiğinde yazma durumunu hemen false yap
    _typingTimer?.cancel();
    _updateTypingStatus(false);

    final messageData = {
      'senderId': currentUser.uid,
      'receiverId': widget.receiverId,
      'text': messageText, // Metin mesajları için
      'type': 'text', // Mesaj türü
      'timestamp': Timestamp.now(),
      'isRead': false, // Yeni mesaj başlangıçta okunmadı olarak ayarlanır
    };

    // Mesajı sohbet odasının 'messages' alt koleksiyonuna ekle
    await _firestore
        .collection('chats')
        .doc(_chatRoomId)
        .collection('messages')
        .add(messageData);

    // Ana sohbet dokümanını güncelle (son mesaj, tarih ve kullanıcılar)
    await _firestore.collection('chats').doc(_chatRoomId).set({
      'users': [currentUser.uid, widget.receiverId],
      'lastMessage': messageText,
      'lastMessageTimestamp': Timestamp.now(),
    }, SetOptions(merge: true));
  }

  Future<void> _sendImage() async {
    final pickedFile = await ImagePicker.platform.pickImage(
      source: ImageSource.gallery,
      imageQuality: 70,
    );

    if (pickedFile == null) return;

    final currentUser = _auth.currentUser!;
    File imageFile = File(pickedFile.path);

    // 1. Resmi Storage'a yükle
    final ref = _storage
        .ref()
        .child('chat_images')
        .child(_chatRoomId)
        .child('${DateTime.now().millisecondsSinceEpoch}.jpg');

    await ref.putFile(imageFile);
    final imageUrl = await ref.getDownloadURL();

    // 2. Firestore'a resim mesajı olarak kaydet
    final messageData = {
      'senderId': currentUser.uid,
      'receiverId': widget.receiverId,
      'imageUrl': imageUrl,
      'type': 'image', // Mesaj türü
      'timestamp': Timestamp.now(),
      'isRead': false,
    };

    await _firestore
        .collection('chats')
        .doc(_chatRoomId)
        .collection('messages')
        .add(messageData);

    // 3. Ana sohbet dokümanını güncelle
    await _firestore.collection('chats').doc(_chatRoomId).set({
      'lastMessage': '📷 Resim',
      'lastMessageTimestamp': Timestamp.now(),
    }, SetOptions(merge: true));
  }

  void _markMessagesAsRead() {
    final currentUserId = _auth.currentUser!.uid;
    _firestore
        .collection('chats')
        .doc(_chatRoomId)
        .collection('messages')
        .where('receiverId', isEqualTo: currentUserId)
        .where('isRead', isEqualTo: false)
        .get()
        .then((snapshot) {
          for (var doc in snapshot.docs) {
            doc.reference.update({'isRead': true});
          }
        })
        .catchError(
          (error) => debugPrint(
            "Mesajlar okunurken hata oluştu: $error",
          ), // ignore: invalid_return_type_for_catch_error
        );
  }

  @override
  Widget build(BuildContext context) {
    final currentUserId = _auth.currentUser!.uid;

    return StreamBuilder<DocumentSnapshot>(
      stream: _firestore.collection('chats').doc(_chatRoomId).snapshots(),
      builder: (context, chatSnapshot) {
        bool isReceiverTyping = false;
        if (chatSnapshot.hasData && chatSnapshot.data!.exists) {
          final data = chatSnapshot.data!.data() as Map<String, dynamic>?;
          if (data != null && data.containsKey('typingStatus')) {
            final typingStatus = data['typingStatus'] as Map<String, dynamic>;
            isReceiverTyping = typingStatus[widget.receiverId] ?? false;
          }
        }

        // Engelleme kontrolü
        final chatData = chatSnapshot.data?.data() as Map<String, dynamic>?;
        final List<dynamic> users =
            chatData?['users'] ?? [currentUserId, widget.receiverId];
        final otherUserId = users.firstWhere(
          (id) => id != currentUserId,
          orElse: () => '',
        );

        if (chatData != null &&
            chatData.containsKey('blockedBy') &&
            chatData['blockedBy'] == otherUserId) {
          return Scaffold(
            appBar: AppBar(title: Text(widget.receiverName)),
            body: const Center(
              child: Text('Bu kullanıcıya mesaj gönderemezsiniz.'),
            ),
          );
        }

        return Scaffold(
          appBar: AppBar(
            title: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(widget.receiverName),
                if (isReceiverTyping)
                  const Text(
                    'yazıyor...',
                    style: TextStyle(fontSize: 12, fontStyle: FontStyle.italic),
                  ),
              ],
            ),
          ),
          body: Column(
            children: [
              Expanded(
                child: StreamBuilder<QuerySnapshot>(
                  stream: _firestore
                      .collection('chats')
                      .doc(_chatRoomId)
                      .collection('messages')
                      .orderBy('timestamp', descending: true)
                      .snapshots(),
                  // Stream'i dinleyerek yeni mesaj geldiğinde okundu olarak işaretle
                  initialData: null,
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return const Center(child: CircularProgressIndicator());
                    }
                    if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
                      return const Center(
                        child: Text('Mesajlaşmaya başlayın!'),
                      );
                    }

                    // Yeni mesajlar geldiğinde okundu olarak işaretle
                    WidgetsBinding.instance.addPostFrameCallback(
                      (_) => _markMessagesAsRead(),
                    );

                    return ListView.builder(
                      reverse: true,
                      itemCount: snapshot.data!.docs.length,
                      itemBuilder: (context, index) {
                        final message = snapshot.data!.docs[index];
                        final isMe = message['senderId'] == currentUserId;
                        return _buildMessageBubble(message, isMe);
                      },
                    );
                  },
                ),
              ),
              _buildMessageInput(chatSnapshot),
            ],
          ),
        );
      },
    );
  }

  Widget _buildMessageBubble(DocumentSnapshot message, bool isMe) {
    final data = message.data() as Map<String, dynamic>;
    final timestamp = (data['timestamp'] as Timestamp?)?.toDate();
    final String type = data['type'] ?? 'text';
    final bool isRead = data['isRead'] ?? false;

    return Align(
      alignment: isMe ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 4, horizontal: 8),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isMe ? Colors.blue : Colors.grey.shade300,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Column(
          crossAxisAlignment: isMe
              ? CrossAxisAlignment.end
              : CrossAxisAlignment.start,
          children: [
            if (type == 'text')
              Text(
                data['text'],
                style: TextStyle(color: isMe ? Colors.white : Colors.black),
              )
            else if (type == 'image')
              GestureDetector(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>
                          FullScreenImagePage(imageUrl: data['imageUrl']),
                    ),
                  );
                },
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.network(
                    data['imageUrl'],
                    // Yüklenirken bir gösterge ekleyebilirsiniz
                    loadingBuilder: (context, child, loadingProgress) {
                      if (loadingProgress == null) return child;
                      return const Padding(
                        padding: EdgeInsets.all(32.0),
                        child: CircularProgressIndicator(color: Colors.white),
                      );
                    },
                    width: 200, // Resim boyutunu sınırlayabilirsiniz
                  ),
                ),
              ),
            if (timestamp != null) ...[
              const SizedBox(height: 4),
              Text(
                // Cihazın yerel ayarlarına göre saat ve dakikayı formatla
                // Örn: ABD için "5:30 PM", Türkiye için "17:30"
                DateFormat.jm(
                  Localizations.localeOf(context).toString(),
                ).format(timestamp),
                style: TextStyle(
                  color: isMe ? Colors.white70 : Colors.black54,
                  fontSize: 10,
                ),
              ),
              if (isMe) ...[
                const SizedBox(height: 2),
                Icon(
                  isRead ? Icons.done_all : Icons.done,
                  size: 14,
                  color: Colors.white70,
                ),
              ],
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildMessageInput(
    AsyncSnapshot<DocumentSnapshot<Object?>> chatSnapshot,
  ) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        children: [
          IconButton(
            icon: const Icon(Icons.photo_camera),
            onPressed: _sendImage, // Bu fonksiyonun adı _sendImage olmalı
          ),
          Expanded(
            child: TextField(
              controller: _messageController,
              // Engellenmişse TextField'ı devre dışı bırak
              enabled:
                  !((chatSnapshot.data?.data() as Map<String, dynamic>?)
                          ?.containsKey('blockedBy') ??
                      false),
              decoration: const InputDecoration(
                hintText: 'Mesajınızı yazın...',
              ),
            ),
          ),
          IconButton(
            icon: const Icon(Icons.send),
            onPressed: _messageController.text.trim().isEmpty
                ? null
                : _sendMessage,
          ),
        ],
      ),
    );
  }
}

