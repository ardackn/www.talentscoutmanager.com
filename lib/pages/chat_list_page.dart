import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:talescout_virsual_code/pages/chat_page.dart';

class ChatListPage extends StatefulWidget {
  const ChatListPage({super.key});

  @override
  _ChatListPageState createState() => _ChatListPageState();
}

class _ChatListPageState extends State<ChatListPage> {
  final _auth = FirebaseAuth.instance;
  final _firestore = FirebaseFirestore.instance;

  @override
  Widget build(BuildContext context) {
    final currentUser = _auth.currentUser;
    if (currentUser == null) {
      return const Scaffold(body: Center(child: Text('Lütfen giriş yapın.')));
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Mesajlar')),
      body: StreamBuilder<QuerySnapshot>(
        stream: _firestore
            .collection('chats')
            .where('users', arrayContains: currentUser.uid)
            .orderBy('lastMessageTimestamp', descending: true)
            .snapshots(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
            return const Center(child: Text('Henüz bir sohbetiniz yok.'));
          }

          // Engellenen kullanıcıları filtrelemek için ek bir StreamBuilder
          return StreamBuilder<DocumentSnapshot>(
            stream: _firestore
                .collection('users')
                .doc(currentUser.uid)
                .snapshots(),
            builder: (context, currentUserSnapshot) {
              if (!currentUserSnapshot.hasData) {
                return const Center(child: CircularProgressIndicator());
              }
              final currentUserData =
                  currentUserSnapshot.data!.data() as Map<String, dynamic>?;
              final List<dynamic> blockedByMe =
                  currentUserData?['blockedUsers'] ?? [];

              final filteredDocs = snapshot.data!.docs.where((doc) {
                final data = doc.data() as Map<String, dynamic>;
                final List<dynamic> users = data['users'];
                final otherUserId = users.firstWhere(
                  (id) => id != currentUser.uid,
                  orElse: () => '',
                );
                return !blockedByMe.contains(otherUserId);
              }).toList();

              if (filteredDocs.isEmpty) {
                return const Center(child: Text('Henüz bir sohbetiniz yok.'));
              }

              return ListView.builder(
                itemCount: filteredDocs.length,
                itemBuilder: (context, index) {
                  final chatDoc = filteredDocs[index];
                  final chatData = chatDoc.data() as Map<String, dynamic>;
                  final List<dynamic> users = chatData['users'];
                  final otherUserId = users.firstWhere(
                    (id) => id != currentUser.uid,
                  );

                  return FutureBuilder<DocumentSnapshot>(
                    future: _firestore
                        .collection('users')
                        .doc(otherUserId)
                        .get(),
                    builder: (context, userSnapshot) {
                      if (!userSnapshot.hasData) {
                        return const ListTile(title: Text('Yükleniyor...'));
                      }
                      final otherUserData =
                          userSnapshot.data!.data() as Map<String, dynamic>;
                      final displayName =
                          otherUserData['displayName'] ??
                          'Bilinmeyen Kullanıcı';
                      final profileImageUrl = otherUserData['profileImageUrl'];

                      return ListTile(
                        leading: CircleAvatar(
                          backgroundImage: profileImageUrl != null
                              ? NetworkImage(profileImageUrl)
                              : null,
                          child: profileImageUrl == null
                              ? const Icon(Icons.person)
                              : null,
                        ),
                        title: Text(displayName),
                        subtitle: Text(
                          chatData['lastMessage'] ?? '',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        trailing: StreamBuilder<QuerySnapshot>(
                          stream: _firestore
                              .collection('chats')
                              .doc(chatDoc.id)
                              .collection('messages')
                              .where('receiverId', isEqualTo: currentUser.uid)
                              .where('isRead', isEqualTo: false)
                              .snapshots(),
                          builder: (context, unreadSnapshot) {
                            if (!unreadSnapshot.hasData ||
                                unreadSnapshot.data!.docs.isEmpty) {
                              return const SizedBox.shrink(); // Okunmamış mesaj yoksa hiçbir şey gösterme
                            }
                            final unreadCount =
                                unreadSnapshot.data!.docs.length;
                            return CircleAvatar(
                              radius: 12,
                              backgroundColor: Colors.blue,
                              child: Text(
                                unreadCount.toString(),
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 12,
                                ),
                              ),
                            );
                          },
                        ),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => ChatPage(
                                receiverId: otherUserId,
                                receiverName: displayName,
                              ),
                            ),
                          );
                        },
                      );
                    },
                  );
                },
              );
            },
          );
        },
      ),
    );
  }
}

