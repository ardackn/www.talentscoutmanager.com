import 'dart:io';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:image_picker/image_picker.dart';
import 'package:firebase_storage/firebase_storage.dart';

class ScoutRegistrationPage extends StatefulWidget {
  const ScoutRegistrationPage({super.key});

  @override
  _ScoutRegistrationPageState createState() => _ScoutRegistrationPageState();
}

class _ScoutRegistrationPageState extends State<ScoutRegistrationPage> {
  final _auth = FirebaseAuth.instance;
  final _storage = FirebaseStorage.instance;
  final _firestore = FirebaseFirestore.instance;

  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();
  final _surnameController = TextEditingController();
  final _phoneController = TextEditingController();
  
  String _selectedMembership = 'Free'; // Free veya Premium
  final _formKey = GlobalKey<FormState>();
  File? _imageFile;
  bool _isLoading = false;

  Future<void> _pickImage() async {
    final pickedFile = await ImagePicker().pickImage(source: ImageSource.gallery);
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

  Future<void> _registerUser() async {
    if (_formKey.currentState!.validate()) {
      setState(() => _isLoading = true);
      try {
        UserCredential userCredential = await _auth.createUserWithEmailAndPassword(
          email: _emailController.text.trim(),
          password: _passwordController.text.trim(),
        );

        final user = userCredential.user;
        if (user == null) return;

        String? imageUrl;
        try {
          imageUrl = await _uploadImage(user.uid);
        } catch (uploadError) {
          print("Image upload error: $uploadError");
        }

        await _firestore.collection('users').doc(user.uid).set({
          'uid': user.uid,
          'email': _emailController.text.trim(),
          'name': _nameController.text.trim(),
          'surname': _surnameController.text.trim(),
          'displayName': '${_nameController.text.trim()} ${_surnameController.text.trim()}',
          'phone': _phoneController.text.trim(),
          'membershipType': _selectedMembership,
          'profileImageUrl': imageUrl ?? '',
          'role': 'scout',
          'isPublic': false, // İzciler gizli kalır
          'createdAt': Timestamp.now(),
        });

        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Yetenek avcısı olarak başarıyla kaydedildi!')),
          );
          Navigator.pushNamedAndRemoveUntil(context, '/explore', (route) => false);
        }
      } on FirebaseAuthException catch (e) {
        String message;
        if (e.code == 'weak-password') {
          message = 'Şifre çok zayıf.';
        } else if (e.code == 'email-already-in-use') {
          message = 'Bu e-posta adresi zaten kullanılıyor.';
        } else {
          message = 'Kayıt sırasında bir hata oluştu: ${e.message}';
        }
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text(message)));
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Bir hata oluştu: ${e.toString()}')));
      } finally {
        if (mounted) setState(() => _isLoading = false);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('İzci Kayıt Ekranı')),
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage("assets/images/login_bg.png"),
            fit: BoxFit.cover,
            colorFilter: ColorFilter.mode(Colors.black54, BlendMode.darken),
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16.0),
          child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                const SizedBox(height: 20),
                GestureDetector(
                  onTap: _pickImage,
                  child: CircleAvatar(
                    radius: 50,
                    backgroundColor: Colors.grey.shade300,
                    backgroundImage: _imageFile != null ? FileImage(_imageFile!) : null,
                    child: _imageFile == null
                        ? const Icon(Icons.camera_alt, color: Colors.white, size: 40)
                        : null,
                  ),
                ),
                const SizedBox(height: 20),
                const Icon(Icons.search, color: Color(0xFF3B82F6), size: 64),
                const SizedBox(height: 16),
                const Text(
                  'YARININ YILDIZLARINI KEŞFET',
                  style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Colors.white, letterSpacing: 1.5),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 8),
                const Text(
                  'En yetenekli gençleri yapay zeka ile anında filtrele.',
                  style: TextStyle(fontSize: 16, color: Colors.white70),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 20),
                TextFormField(
                  controller: _nameController,
                  decoration: const InputDecoration(labelText: 'Ad', border: OutlineInputBorder()),
                  validator: (value) => value!.isEmpty ? 'Lütfen adınızı girin.' : null,
                ),
                const SizedBox(height: 20),
                TextFormField(
                  controller: _surnameController,
                  decoration: const InputDecoration(labelText: 'Soyad', border: OutlineInputBorder()),
                  validator: (value) => value!.isEmpty ? 'Lütfen soyadınızı girin.' : null,
                ),
                const SizedBox(height: 20),
                TextFormField(
                  controller: _phoneController,
                  decoration: const InputDecoration(labelText: 'İletişim Numarası', border: OutlineInputBorder()),
                  keyboardType: TextInputType.phone,
                  validator: (value) => value!.isEmpty ? 'Lütfen iletişim numaranızı girin.' : null,
                ),
                const SizedBox(height: 20),
                DropdownButtonFormField<String>(
                  value: _selectedMembership,
                  decoration: const InputDecoration(labelText: 'Üyelik Paketi', border: OutlineInputBorder()),
                  items: const [
                    DropdownMenuItem(value: 'Free', child: Text('Free (Ücretsiz)')),
                    DropdownMenuItem(value: 'Premium', child: Text('Premium (299₺/ay)')),
                    DropdownMenuItem(value: 'Gold', child: Text('Gold (599₺/ay)')),
                  ],
                  onChanged: (value) => setState(() => _selectedMembership = value!),
                ),
                const SizedBox(height: 20),
                TextFormField(
                  controller: _emailController,
                  decoration: const InputDecoration(labelText: 'E-posta', border: OutlineInputBorder()),
                  validator: (value) => value!.isEmpty ? 'Lütfen e-posta girin.' : null,
                ),
                const SizedBox(height: 20),
                TextFormField(
                  controller: _passwordController,
                  decoration: const InputDecoration(labelText: 'Şifre', border: OutlineInputBorder()),
                  obscureText: true,
                  validator: (value) => value!.length < 6 ? 'Şifre en az 6 karakter olmalıdır.' : null,
                ),
                const SizedBox(height: 20),
                const Text(
                  'Not: İzci profilleri herkese açık olarak yayınlanmaz, gizli tutulur.',
                  style: TextStyle(color: Colors.grey, fontSize: 12),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 20),
                _isLoading
                    ? const CircularProgressIndicator()
                    : ElevatedButton(
                        onPressed: _registerUser,
                        style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15)),
                        child: const Text('İzci Kaydını Tamamla', style: TextStyle(fontSize: 16)),
                      ),
                const SizedBox(height: 30),
              ],
            ),
          ),
        ),
      ),
      ),
    );
  }
}
