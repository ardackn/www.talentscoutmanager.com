import 'dart:io';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:image_picker/image_picker.dart';

class EditProfilePage extends StatefulWidget {
  const EditProfilePage({super.key});

  @override
  _EditProfilePageState createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  final _formKey = GlobalKey<FormState>();
  final _auth = FirebaseAuth.instance;
  final _firestore = FirebaseFirestore.instance;
  final _storage = FirebaseStorage.instance;

  final _nameController = TextEditingController();
  final _surnameController = TextEditingController();
  final _aboutController = TextEditingController();
  final _ageController = TextEditingController();
  final _branchController = TextEditingController();

  File? _imageFile;
  String? _currentImageUrl;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadUserData();
  }

  Future<void> _loadUserData() async {
    final user = _auth.currentUser;
    if (user != null) {
      final doc = await _firestore.collection('users').doc(user.uid).get();
      if (doc.exists) {
        final data = doc.data()!;
        _nameController.text = data['name'] ?? '';
        _surnameController.text = data['surname'] ?? '';
        _aboutController.text = data['about'] ?? '';
        _ageController.text = data['age']?.toString() ?? '';
        _branchController.text = data['branch'] ?? '';
        _currentImageUrl = data['profileImageUrl'];
      }
    }
    setState(() => _isLoading = false);
  }

  Future<void> _pickImage() async {
    final pickedFile = await ImagePicker().pickImage(
      source: ImageSource.gallery,
      imageQuality: 50,
    );
    if (pickedFile != null) {
      setState(() {
        _imageFile = File(pickedFile.path);
      });
    }
  }

  Future<String?> _uploadImage(String userId) async {
    if (_imageFile == null) return null;
    final ref = _storage.ref().child('profile_pictures').child('$userId.jpg');
    await ref.putFile(_imageFile!);
    return await ref.getDownloadURL();
  }

  Future<void> _updateProfile() async {
    if (_formKey.currentState!.validate()) {
      setState(() => _isLoading = true);
      try {
        final user = _auth.currentUser;
        if (user == null) return;

        String? newImageUrl;
        if (_imageFile != null) {
          newImageUrl = await _uploadImage(user.uid);
        }

        final Map<String, dynamic> dataToUpdate = {
          'name': _nameController.text.trim(),
          'surname': _surnameController.text.trim(),
          'displayName':
              '${_nameController.text.trim()} ${_surnameController.text.trim()}',
          'about': _aboutController.text.trim(),
          'age': int.tryParse(_ageController.text.trim()),
          'branch': _branchController.text.trim(),
        };

        if (newImageUrl != null) {
          dataToUpdate['profileImageUrl'] = newImageUrl;
        }

        await _firestore.collection('users').doc(user.uid).update(dataToUpdate);

        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Profil başarıyla güncellendi!')),
          );
          Navigator.pop(context);
        }
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Profil güncellenirken bir hata oluştu: $e')),
        );
      } finally {
        if (mounted) {
          setState(() => _isLoading = false);
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Profili Düzenle')),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Form(
                key: _formKey,
                child: Column(
                  children: [
                    GestureDetector(
                      onTap: _pickImage,
                      child: CircleAvatar(
                        radius: 50,
                        backgroundColor: Colors.grey.shade300,
                        backgroundImage: _imageFile != null
                            ? FileImage(_imageFile!)
                            : (_currentImageUrl != null
                                      ? NetworkImage(_currentImageUrl!)
                                      : null)
                                  as ImageProvider?,
                        child: _imageFile == null && _currentImageUrl == null
                            ? const Icon(Icons.camera_alt, size: 40)
                            : null,
                      ),
                    ),
                    const SizedBox(height: 24),
                    TextFormField(
                      controller: _nameController,
                      decoration: const InputDecoration(
                        labelText: 'Ad',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Lütfen adınızı girin.';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),
                    TextFormField(
                      controller: _surnameController,
                      decoration: const InputDecoration(
                        labelText: 'Soyad',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'Lütfen soyadınızı girin.';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),
                    TextFormField(
                      controller: _ageController,
                      decoration: const InputDecoration(
                        labelText: 'Yaş',
                        border: OutlineInputBorder(),
                      ),
                      keyboardType: TextInputType.number,
                      validator: (value) {
                        if (value != null &&
                            value.isNotEmpty &&
                            int.tryParse(value) == null) {
                          return 'Lütfen geçerli bir yaş girin.';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 16),
                    TextFormField(
                      controller: _branchController,
                      decoration: const InputDecoration(
                        labelText: 'Branş',
                        border: OutlineInputBorder(),
                      ),
                      validator: (value) {
                        return null; // Zorunlu değilse null dönebilir
                      },
                    ),
                    const SizedBox(height: 16),
                    TextFormField(
                      controller: _aboutController,
                      decoration: const InputDecoration(
                        labelText: 'Hakkında',
                        hintText:
                            'Kendinizden, yeteneklerinizden veya hedeflerinizden bahsedin...',
                        border: OutlineInputBorder(),
                      ),
                      maxLines: 4, // Çok satırlı metin alanı
                      maxLength: 300, // Karakter limiti
                      keyboardType: TextInputType.multiline,
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: _updateProfile,
                      style: ElevatedButton.styleFrom(
                        minimumSize: const Size.fromHeight(50),
                      ),
                      child: const Text('Değişiklikleri Kaydet'),
                    ),
                  ],
                ),
              ),
            ),
    );
  }
}
