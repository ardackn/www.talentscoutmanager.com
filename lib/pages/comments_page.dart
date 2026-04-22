import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:intl/intl.dart';

class CommentsPage extends StatefulWidget {
  final String videoId;

  const CommentsPage({super.key, required this.videoId});

  @override
  _CommentsPageState createState() => _CommentsPageState();
}

class _CommentsPageState extends State<CommentsPage> {
  final _commentController = TextEditingController();
  final _auth = FirebaseAuth.instance;
  final _firestore = FirebaseFirestore.instance;

  Future<void> _postComment() async {
    final user = _auth.currentUser;
    final commentText = _commentController.text.trim();

    if (user == null || commentText.isEmpty) return;

    final videoRef = _firestore.collection('videos').doc(widget.videoId);

    // Yorumu 'comments' alt koleksiyonuna ekle
    await videoRef.collection('comments').add({
      'text': commentText,
      'userId': user.uid,
      'userName': user.displayName,
      'userImageUrl': user.photoURL,
      'timestamp': FieldValue.serverTimestamp(),
    });

    // Ana video dokümanındaki yorum sayısını artır
    await videoRef.update({'commentCount': FieldValue.increment(1)});

    _commentController.clear();
    FocusScope.of(context).unfocus(); // Klavyeyi kapat
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Yorumlar')),
      body: Column(
        children: [
          Expanded(
            child: StreamBuilder<QuerySnapshot>(
              stream: _firestore
                  .collection('videos')
                  .doc(widget.videoId)
                  .collection('comments')
                  .orderBy('timestamp', descending: true)
                  .snapshots(),
              builder: (context, snapshot) {
                if (!snapshot.hasData) {
                  return const Center(child: CircularProgressIndicator());
                }
                final comments = snapshot.data!.docs;
                return ListView.builder(
                  itemCount: comments.length,
                  itemBuilder: (context, index) {
                    final comment = comments[index];
                    final timestamp = (comment['timestamp'] as Timestamp?)
                        ?.toDate();
                    return ListTile(
                      leading: CircleAvatar(
                        backgroundImage: comment['userImageUrl'] != null
                            ? NetworkImage(comment['userImageUrl'])
                            : null,
                      ),
                      title: Text(comment['userName'] ?? 'Kullanıcı'),
                      subtitle: Text(comment['text']),
                      trailing: Text(
                        timestamp != null
                            ? DateFormat.yMd().add_jm().format(timestamp)
                            : '',
                        style: const TextStyle(
                          fontSize: 10,
                          color: Colors.grey,
                        ),
                      ),
                    );
                  },
                );
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _commentController,
                    decoration: const InputDecoration(
                      hintText: 'Yorum ekle...',
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.send),
                  onPressed: _postComment,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
