import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:intl/intl.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:share_plus/share_plus.dart';
import 'package:talescout_virsual_code/pages/dynamic_link_service.dart';
import 'package:talescout_virsual_code/pages/chat_page.dart';
import 'package:talescout_virsual_code/pages/video_card.dart';

class ProfileDetailPage extends StatefulWidget {
  final String userId;

  const ProfileDetailPage({super.key, required this.userId});

  @override
  _ProfileDetailPageState createState() => _ProfileDetailPageState();
}

class _ProfileDetailPageState extends State<ProfileDetailPage> {
  @override
  Widget build(BuildContext context) {
    final currentUserId = FirebaseAuth.instance.currentUser?.uid;
    if (currentUserId == null) {
      // Kullanıcı giriş yapmamışsa, hata mesajı göster
      return const Scaffold(
        body: Center(
          child: Text("Profili görüntülemek için giriş yapmalısınız."),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(
        title: const Text('Yetenek Profili'),
        actions: [
          // Profili Paylaş butonu
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () async {
              final link = await DynamicLinkService().createProfileLink(
                widget.userId,
              );
              Share.share(
                'Taledis\'teki bu yeteneğe bir göz at: $link',
                subject: 'Yetenek Profili',
              );
            },
          ),
          // Kullanıcı kendi profiline bakmıyorsa engelleme seçeneğini göster
          if (currentUserId != widget.userId)
            StreamBuilder<DocumentSnapshot>(
              stream: FirebaseFirestore.instance
                  .collection('users')
                  .doc(currentUserId)
                  .snapshots(),
              builder: (context, snapshot) {
                if (!snapshot.hasData) {
                  return const SizedBox.shrink();
                }
                final currentUserData =
                    snapshot.data!.data() as Map<String, dynamic>?;
                final List<dynamic> blockedUsers =
                    currentUserData?['blockedUsers'] ?? [];
                final bool isBlocked = blockedUsers.contains(widget.userId);

                return PopupMenuButton<String>(
                  onSelected: (value) {
                    if (value == 'block') {
                      _toggleBlockUser(currentUserId, widget.userId, isBlocked);
                    }
                  },
                  itemBuilder: (BuildContext context) =>
                      <PopupMenuEntry<String>>[
                        PopupMenuItem<String>(
                          value: 'block',
                          child: Text(
                            isBlocked ? 'Engeli Kaldır' : 'Kullanıcıyı Engelle',
                          ),
                        ),
                      ],
                );
              },
            ),
        ],
      ),
      body: StreamBuilder<DocumentSnapshot<Map<String, dynamic>>>(
        stream: FirebaseFirestore.instance
            .collection('users')
            .doc(widget.userId)
            .snapshots(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return const Center(child: Text('Profil yüklenemedi.'));
          }

          if (!snapshot.hasData || !snapshot.data!.exists) {
            return const Center(child: Text('Kullanıcı bulunamadı.'));
          }

          final userData = snapshot.data!.data()!;

          // Sizi engelleyen bir kullanıcının profilini gösterme
          final List<dynamic> theirBlockedUsers =
              userData['blockedUsers'] ?? [];
          if (theirBlockedUsers.contains(currentUserId)) {
            return const Center(
              child: Text(
                'Bu profile erişiminiz kısıtlanmıştır.',
                textAlign: TextAlign.center,
              ),
            );
          }

          final displayName = userData['displayName'] ?? 'İsim Yok';
          final email = userData['email'] ?? 'E-posta Yok';
          final profileImageUrl =
              userData['profileImageUrl'] ??
              'https://placehold.co/400x400?text=Profil';
          final aboutText = userData['about'] as String?;

          final String? branch = userData['branch'];
          final int? age = userData['age'];
          return SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 20),
                CircleAvatar(
                  radius: 80,
                  backgroundImage: CachedNetworkImageProvider(
                    profileImageUrl,
                    errorListener: (e) => print("Resim yüklenemedi: $e"),
                  ),
                  backgroundColor: Colors.grey.shade200,
                ),
                const SizedBox(height: 20),
                Text(
                  displayName,
                  style: const TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  email, // E-posta bilgisi burada kalabilir veya kaldırılabilir.
                  style: TextStyle(fontSize: 16, color: Colors.grey.shade600),
                ),
                const SizedBox(height: 8),
                if (branch != null && age != null)
                  Text(
                    // Yaşı, cihazın yerel ayarlarına göre formatla
                    '$branch, ${NumberFormat.decimalPattern(Localizations.localeOf(context).toString()).format(age)} yaşında',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey.shade800,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                const SizedBox(height: 24),
                _buildFriendshipButton(currentUserId),
                const SizedBox(height: 24),
                if (currentUserId != widget.userId)
                  ElevatedButton.icon(
                    icon: const Icon(Icons.send),
                    label: const Text('Mesaj Gönder'),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ChatPage(
                            receiverId: widget.userId,
                            receiverName: displayName,
                          ),
                        ),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(20),
                      ),
                    ),
                  ),
                const Divider(),
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Hakkında',
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        (aboutText != null && aboutText.isNotEmpty)
                            ? aboutText
                            : 'Kullanıcı henüz hakkında bir bilgi eklememiş.',
                      ),
                    ],
                  ),
                ),
                const Divider(),
                Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16.0,
                    vertical: 8.0,
                  ),
                  child: Text(
                    'Videolar',
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                ),
                StreamBuilder<QuerySnapshot>(
                  stream: FirebaseFirestore.instance
                      .collection('videos')
                      .where('uploaderId', isEqualTo: widget.userId)
                      .orderBy('timestamp', descending: true)
                      .snapshots(),
                  builder: (context, videoSnapshot) {
                    if (!videoSnapshot.hasData) {
                      return const Center(child: CircularProgressIndicator());
                    }
                    if (videoSnapshot.data!.docs.isEmpty) {
                      return const Center(
                        child: Padding(
                          padding: EdgeInsets.all(20.0),
                          child: Text('Henüz hiç video yüklenmemiş.'),
                        ),
                      );
                    }
                    return ListView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      itemCount: videoSnapshot.data!.docs.length,
                      itemBuilder: (context, index) {
                        return VideoCard(
                          video: videoSnapshot.data!.docs[index],
                        );
                      },
                    );
                  },
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildFriendshipButton(String currentUserId) {
    if (currentUserId == widget.userId) {
      return const SizedBox.shrink(); // Kendi profiline buton ekleme
    }

    return StreamBuilder<DocumentSnapshot>(
      stream: FirebaseFirestore.instance
          .collection('users')
          .doc(currentUserId)
          .snapshots(),
      builder: (context, snapshot) {
        if (!snapshot.hasData) return const SizedBox.shrink();

        final currentUserData = snapshot.data!.data() as Map<String, dynamic>?;
        final List<dynamic> friends = currentUserData?['friends'] ?? [];

        if (friends.contains(widget.userId)) {
          return ElevatedButton.icon(
            onPressed: () => _removeFriend(currentUserId, widget.userId),
            icon: const Icon(Icons.check),
            label: const Text('Arkadaşsınız'),
            style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
          );
        }

        return StreamBuilder<QuerySnapshot>(
          stream: FirebaseFirestore.instance
              .collection('friend_requests')
              .where('senderId', whereIn: [currentUserId, widget.userId])
              .where('receiverId', whereIn: [currentUserId, widget.userId])
              .where('status', isEqualTo: 'pending')
              .snapshots(),
          builder: (context, requestSnapshot) {
            if (requestSnapshot.connectionState == ConnectionState.waiting) {
              return const CircularProgressIndicator();
            }

            if (requestSnapshot.hasData &&
                requestSnapshot.data!.docs.isNotEmpty) {
              return ElevatedButton.icon(
                onPressed: null,
                icon: const Icon(Icons.hourglass_top),
                label: const Text('İstek Gönderildi'),
              );
            }

            return ElevatedButton.icon(
              onPressed: () => _sendFriendRequest(currentUserId, widget.userId),
              icon: const Icon(Icons.person_add),
              label: const Text('Arkadaş Ekle'),
            );
          },
        );
      },
    );
  }

  Future<void> _sendFriendRequest(String senderId, String receiverId) async {
    // Zaten bir istek var mı diye son bir kontrol
    final existingRequest = await FirebaseFirestore.instance
        .collection('friend_requests')
        .where('senderId', isEqualTo: senderId)
        .where('receiverId', isEqualTo: receiverId)
        .limit(1)
        .get();

    if (existingRequest.docs.isEmpty) {
      await FirebaseFirestore.instance.collection('friend_requests').add({
        'senderId': senderId,
        'receiverId': receiverId,
        'status': 'pending',
        'timestamp': FieldValue.serverTimestamp(),
      });
    }
  }

  Future<void> _removeFriend(String currentUserId, String targetUserId) async {
    await FirebaseFirestore.instance.collection('users').doc(currentUserId).update({
      'friends': FieldValue.arrayRemove([targetUserId]),
    });
    await FirebaseFirestore.instance.collection('users').doc(targetUserId).update({
      'friends': FieldValue.arrayRemove([currentUserId]),
    });
  }

  Future<void> _toggleBlockUser(
    String currentUserId,
    String targetUserId,
    bool isCurrentlyBlocked,
  ) async {
    final userRef = FirebaseFirestore.instance
        .collection('users')
        .doc(currentUserId);

    if (isCurrentlyBlocked) {
      // Engeli kaldır
      await userRef.update({
        'blockedUsers': FieldValue.arrayRemove([targetUserId]),
      });
    } else {
      // Kullanıcıyı engelle
      await userRef.update({
        'blockedUsers': FieldValue.arrayUnion([targetUserId]),
      });
    }
  }
}

