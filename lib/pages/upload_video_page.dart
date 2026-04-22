import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class UploadVideoPage extends StatefulWidget {
  const UploadVideoPage({super.key});

  @override
  _UploadVideoPageState createState() => _UploadVideoPageState();
}

class _UploadVideoPageState extends State<UploadVideoPage> {
  File? _videoFile;
  final _captionController = TextEditingController();
  bool _isLoading = false;

  Future<void> _pickVideo() async {
    final pickedFile = await ImagePicker().pickVideo(
      source: ImageSource.gallery,
    );
    if (pickedFile != null) {
      setState(() {
        _videoFile = File(pickedFile.path);
      });
    }
  }

  Future<void> _uploadVideo() async {
    if (_videoFile == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Lütfen önce bir video seçin.')),
      );
      return;
    }

    setState(() => _isLoading = true);

    try {
      final user = FirebaseAuth.instance.currentUser;
      if (user == null) return;

      final videoId = FirebaseFirestore.instance.collection('videos').doc().id;
      final storageRef = FirebaseStorage.instance
          .ref()
          .child('videos')
          .child('$videoId.mp4');

      // Videoyu Storage'a yükle
      await storageRef.putFile(_videoFile!);
      final videoUrl = await storageRef.getDownloadURL();

      // Video bilgilerini Firestore'a kaydet
      await FirebaseFirestore.instance.collection('videos').doc(videoId).set({
        'videoId': videoId,
        'uploaderId': user.uid,
        'uploaderName': user.displayName,
        'uploaderImageUrl': user.photoURL,
        'videoUrl': videoUrl,
        'caption': _captionController.text.trim(),
        'timestamp': FieldValue.serverTimestamp(),
        'likes': [],
        'commentCount': 0,
      });

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Video başarıyla yüklendi!')),
        );
        Navigator.pop(context);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Video yüklenirken bir hata oluştu: $e')),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Video Yükle'),
        actions: [
          if (!_isLoading)
            TextButton(
              onPressed: _uploadVideo,
              child: const Text(
                'Paylaş',
                style: TextStyle(color: Colors.white),
              ),
            ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  GestureDetector(
                    onTap: _pickVideo,
                    child: Container(
                      width: double.infinity,
                      height: 200,
                      decoration: BoxDecoration(
                        border: Border.all(color: Colors.grey),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: _videoFile == null
                          ? const Center(
                              child: Icon(Icons.video_call, size: 50),
                            )
                          : const Center(
                              child: Text(
                                'Video Seçildi',
                                style: TextStyle(fontSize: 18),
                              ),
                            ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: _captionController,
                    decoration: const InputDecoration(
                      labelText: 'Açıklama',
                      border: OutlineInputBorder(),
                    ),
                    maxLines: 3,
                  ),
                ],
              ),
            ),
    );
  }
}
