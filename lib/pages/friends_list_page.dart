import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:talescout_virsual_code/pages/profile_detail_page.dart';

class FriendsListPage extends StatefulWidget {
  const FriendsListPage({super.key});

  @override
  _FriendsListPageState createState() => _FriendsListPageState();
}

class _FriendsListPageState extends State<FriendsListPage> {
  final _auth = FirebaseAuth.instance;
  final _firestore = FirebaseFirestore.instance;

  Future<void> _removeFriend(String friendId) async {
    final currentUserId = _auth.currentUser!.uid;
    final batch = _firestore.batch();

    final currentUserRef = _firestore.collection('users').doc(currentUserId);
    batch.update(currentUserRef, {
      'friends': FieldValue.arrayRemove([friendId]),
    });

    final friendUserRef = _firestore.collection('users').doc(friendId);
    batch.update(friendUserRef, {
      'friends': FieldValue.arrayRemove([currentUserId]),
    });

    await batch.commit();
  }

  void _showRemoveFriendConfirmationDialog(String friendId, String friendName) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Arkadaşlıktan Çıkar'),
          content: Text(
            '$friendName kişisini arkadaş listenizden çıkarmak istediğinizden emin misiniz?',
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('İptal'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: const Text('Çıkar', style: TextStyle(color: Colors.red)),
              onPressed: () {
                _removeFriend(friendId);
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final currentUser = _auth.currentUser;
    if (currentUser == null) {
      return const Scaffold(body: Center(child: Text('Lütfen giriş yapın.')));
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Arkadaşlarım')),
      body: StreamBuilder<DocumentSnapshot>(
        stream: _firestore.collection('users').doc(currentUser.uid).snapshots(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (!snapshot.hasData || !snapshot.data!.exists) {
            return const Center(child: Text('Kullanıcı verisi bulunamadı.'));
          }

          final userData = snapshot.data!.data() as Map<String, dynamic>?;
          final List<dynamic> friendIds = userData?['friends'] ?? [];

          if (friendIds.isEmpty) {
            return const Center(child: Text('Henüz hiç arkadaşınız yok.'));
          }

          return ListView.builder(
            itemCount: friendIds.length,
            itemBuilder: (context, index) {
              final friendId = friendIds[index];
              return FutureBuilder<DocumentSnapshot>(
                future: _firestore.collection('users').doc(friendId).get(),
                builder: (context, friendSnapshot) {
                  if (!friendSnapshot.hasData) {
                    // Yüklenirken boş bir ListTile gösterilebilir
                    return const ListTile();
                  }
                  final friendData =
                      friendSnapshot.data!.data() as Map<String, dynamic>;
                  final displayName =
                      friendData['displayName'] ?? 'Bilinmeyen Kullanıcı';
                  final profileImageUrl = friendData['profileImageUrl'];

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
                      friendData['branch'] ?? 'Branş belirtilmemiş',
                    ),
                    trailing: IconButton(
                      icon: const Icon(Icons.person_remove, color: Colors.red),
                      onPressed: () => _showRemoveFriendConfirmationDialog(
                        friendId,
                        displayName,
                      ),
                      tooltip: 'Arkadaşlıktan Çıkar',
                    ),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) =>
                              ProfileDetailPage(userId: friendId),
                        ),
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

