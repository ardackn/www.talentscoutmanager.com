import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:video_player/video_player.dart';
import 'package:talescout_virsual_code/pages/comments_page.dart';
import 'package:talescout_virsual_code/pages/profile_detail_page.dart';

class VideoCard extends StatefulWidget {
  final DocumentSnapshot video;

  const VideoCard({super.key, required this.video});

  @override
  _VideoCardState createState() => _VideoCardState();
}

class _VideoCardState extends State<VideoCard> {
  late VideoPlayerController _controller;
  final _auth = FirebaseAuth.instance;
  bool _isLiked = false;
  int _likeCount = 0;

  @override
  void initState() {
    super.initState();
    final videoData = widget.video.data() as Map<String, dynamic>;
    final currentUser = _auth.currentUser;

    _controller =
        VideoPlayerController.networkUrl(Uri.parse(videoData['videoUrl']))
          ..initialize().then((_) {
            // İlk kareyi göstermek için setState'i çağırın.
            setState(() {});
          });
    // .setLooping(true); // Videonun döngüde çalmasını sağlar

    final List<dynamic> likes = videoData['likes'] ?? [];
    _likeCount = likes.length;
    if (currentUser != null) {
      _isLiked = likes.contains(currentUser.uid);
    }
  }

  Future<void> _toggleLike() async {
    final currentUser = _auth.currentUser;
    if (currentUser == null) return;

    final videoRef = FirebaseFirestore.instance
        .collection('videos')
        .doc(widget.video.id);

    setState(() {
      _isLiked = !_isLiked;
      _likeCount += _isLiked ? 1 : -1;
    });

    if (_isLiked) {
      await videoRef.update({
        'likes': FieldValue.arrayUnion([currentUser.uid]),
      });
    } else {
      await videoRef.update({
        'likes': FieldValue.arrayRemove([currentUser.uid]),
      });
    }
  }

  @override
  void dispose() {
    super.dispose();
    _controller.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final videoData = widget.video.data() as Map<String, dynamic>;

    return Card(
      margin: const EdgeInsets.all(10),
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          ListTile(
            leading: CircleAvatar(
              backgroundImage: videoData['uploaderImageUrl'] != null
                  ? NetworkImage(videoData['uploaderImageUrl'])
                  : null,
            ),
            title: Text(videoData['uploaderName'] ?? 'Kullanıcı'),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) =>
                      ProfileDetailPage(userId: videoData['uploaderId']),
                ),
              );
            },
          ),
          GestureDetector(
            onTap: () {
              setState(() {
                _controller.value.isPlaying
                    ? _controller.pause()
                    : _controller.play();
              });
            },
            child: AspectRatio(
              aspectRatio: _controller.value.isInitialized
                  ? _controller.value.aspectRatio
                  : 16 / 9,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  _controller.value.isInitialized
                      ? VideoPlayer(_controller)
                      : const Center(child: CircularProgressIndicator()),
                  if (!_controller.value.isPlaying)
                    Icon(
                      Icons.play_arrow,
                      size: 60,
                      color: Colors.white.withOpacity(0.7),
                    ),
                ],
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(videoData['caption'] ?? ''),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    IconButton(
                      icon: Icon(
                        _isLiked ? Icons.favorite : Icons.favorite_border,
                        color: _isLiked ? Colors.red : null,
                      ),
                      onPressed: _toggleLike,
                    ),
                    Text('$_likeCount'),
                    const SizedBox(width: 16),
                    IconButton(
                      icon: const Icon(Icons.comment_outlined),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) =>
                                CommentsPage(videoId: widget.video.id),
                          ),
                        );
                      },
                    ),
                    Text('${videoData['commentCount'] ?? 0}'),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

