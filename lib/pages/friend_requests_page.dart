import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:cloud_functions/cloud_functions.dart';
import 'package:firebase_auth/firebase_auth.dart';

class FriendRequestsPage extends StatefulWidget {
  const FriendRequestsPage({super.key});

  @override
  _FriendRequestsPageState createState() => _FriendRequestsPageState();
}

class _FriendRequestsPageState extends State<FriendRequestsPage> {
  final _auth = FirebaseAuth.instance;
  final _firestore = FirebaseFirestore.instance;
  final _functions = FirebaseFunctions.instanceFor(
    region: 'us-central1',
  ); // Bölgenizi doğru girin

  Future<void> _acceptRequest(String requestId, String senderId) async {
    try {
      final callable = _functions.httpsCallable('acceptFriendRequest');
      final result = await callable.call<Map<String, dynamic>>({
        'requestId': requestId,
        'senderId': senderId,
      });
      print(result.data['message']);
    } on FirebaseFunctionsException catch (e) {
      print('Cloud Function hatası: ${e.code} - ${e.message}');
      // Kullanıcıya bir hata mesajı gösterebilirsiniz.
    }
  }

  Future<void> _declineRequest(String requestId) async {
    // İsteğin durumunu 'declined' olarak güncelle (veya isteği sil)
    await _firestore.collection('friend_requests').doc(requestId).update({
      'status': 'declined',
    });
  }

  @override
  Widget build(BuildContext context) {
    final currentUser = _auth.currentUser;
    if (currentUser == null) {
      return const Scaffold(body: Center(child: Text('Lütfen giriş yapın.')));
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Arkadaşlık İstekleri')),
      body: StreamBuilder<QuerySnapshot>(
        stream: _firestore
            .collection('friend_requests')
            .where('receiverId', isEqualTo: currentUser.uid)
            .where('status', isEqualTo: 'pending')
            .snapshots(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (!snapshot.hasData || snapshot.data!.docs.isEmpty) {
            return const Center(child: Text('Yeni arkadaşlık isteğiniz yok.'));
          }

          return ListView.builder(
            itemCount: snapshot.data!.docs.length,
            itemBuilder: (context, index) {
              final requestDoc = snapshot.data!.docs[index];
              final requestData = requestDoc.data() as Map<String, dynamic>;
              final senderId = requestData['senderId'];

              return FutureBuilder<DocumentSnapshot>(
                future: _firestore.collection('users').doc(senderId).get(),
                builder: (context, userSnapshot) {
                  if (!userSnapshot.hasData) {
                    return const ListTile(title: Text('Yükleniyor...'));
                  }
                  final senderData =
                      userSnapshot.data!.data() as Map<String, dynamic>;
                  final displayName =
                      senderData['displayName'] ?? 'Bilinmeyen Kullanıcı';
                  final profileImageUrl = senderData['profileImageUrl'];

                  return ListTile(
                    leading: CircleAvatar(
                      backgroundImage: profileImageUrl != null
                          ? NetworkImage(profileImageUrl)
                          : null,
                      child: profileImageUrl == null
                          ? const Icon(Icons.person)
                          : null,
                    ),
                    title: Text(
                      '$displayName size arkadaşlık isteği gönderdi.',
                    ),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.check, color: Colors.green),
                          onPressed: () =>
                              _acceptRequest(requestDoc.id, senderId),
                          tooltip: 'Kabul Et',
                        ),
                        IconButton(
                          icon: const Icon(Icons.close, color: Colors.red),
                          onPressed: () => _declineRequest(requestDoc.id),
                          tooltip: 'Reddet',
                        ),
                      ],
                    ),
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
