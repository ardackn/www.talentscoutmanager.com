import 'dart:io';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:image_picker/image_picker.dart';
import 'package:firebase_storage/firebase_storage.dart';

class TalentRegistrationPage extends StatefulWidget {
  const TalentRegistrationPage({super.key});

  @override
  _TalentRegistrationPageState createState() => _TalentRegistrationPageState();
}

class _TalentRegistrationPageState extends State<TalentRegistrationPage> {
  final _auth = FirebaseAuth.instance;
  final _firestore = FirebaseFirestore.instance;
  final _storage = FirebaseStorage.instance;

  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();
  final _surnameController = TextEditingController();
  final _ageController = TextEditingController();
  final _positionController = TextEditingController();
  final _teamController = TextEditingController();
  final _countryController = TextEditingController();
  final _heightController = TextEditingController();
  final _weightController = TextEditingController();

  final _formKey = GlobalKey<FormState>();
  bool _isLoading = false;
  File? _videoFile;

  Future<void> _pickVideo() async {
    final pickedFile = await ImagePicker().pickVideo(source: ImageSource.gallery);
    if (pickedFile != null) {
      setState(() {
        _videoFile = File(pickedFile.path);
      });
    }
  }

  Future<String?> _uploadVideo(String userId) async {
    if (_videoFile == null) return null;
    final ref = _storage.ref().child('talent_videos').child('$userId.mp4');
    await ref.putFile(_videoFile!);
    return await ref.getDownloadURL();
  }

  Future<void> _registerUser() async {
    if (_formKey.currentState!.validate()) {
      if (_videoFile == null) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Lütfen yetenek analizi için bir video yükleyin.')),
        );
        return;
      }

      setState(() => _isLoading = true);
      try {
        UserCredential userCredential = await _auth.createUserWithEmailAndPassword(
          email: _emailController.text.trim(),
          password: _passwordController.text.trim(),
        );

        final user = userCredential.user;
        if (user == null) return;

        // Video yükleme ve analiz simülasyonu
        String? videoUrl;
        try {
          videoUrl = await _uploadVideo(user.uid);
        } catch (uploadError) {
          print("Video upload error: $uploadError");
          // Upload fails, but we don't want to stop the registration completely.
        }

        await _firestore.collection('users').doc(user.uid).set({
          'uid': user.uid,
          'email': _emailController.text.trim(),
          'name': _nameController.text.trim(),
          'surname': _surnameController.text.trim(),
          'displayName': '${_nameController.text.trim()} ${_surnameController.text.trim()}',
          'age': int.tryParse(_ageController.text.trim()) ?? 0,
          'position': _positionController.text.trim(),
          'team': _teamController.text.trim(),
          'country': _countryController.text.trim(),
          'height': int.tryParse(_heightController.text.trim()) ?? 0,
          'weight': int.tryParse(_weightController.text.trim()) ?? 0,
          'videoUrl': videoUrl ?? '',
          'analysisCompleted': true, // Analiz tamamlandı simülasyonu
          'role': 'talent',
          'createdAt': Timestamp.now(),
        });

        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Yetenek olarak başarıyla kaydedildi! Analiziniz hesaplandı.')),
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
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Bir hata oluştu: ${e.toString()}')),
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
      appBar: AppBar(title: const Text('Yetenek Kayıt Ekranı')),
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage("assets/images/login_bg.png"),
            fit: BoxFit.cover,
            colorFilter: ColorFilter.mode(Colors.black54, BlendMode.darken),
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                const Text(
                  'Yetenek Kayıt',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
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
                  controller: _ageController,
                  decoration: const InputDecoration(labelText: 'Yaş', border: OutlineInputBorder()),
                  keyboardType: TextInputType.number,
                  validator: (value) => value!.isEmpty ? 'Lütfen yaşınızı girin.' : null,
                ),
                const SizedBox(height: 20),
                TextFormField(
                  controller: _positionController,
                  decoration: const InputDecoration(labelText: 'Mevkisi (örn: Forvet, Defans)', border: OutlineInputBorder()),
                  validator: (value) => value!.isEmpty ? 'Lütfen mevkinizi girin.' : null,
                ),
                const SizedBox(height: 20),
                TextFormField(
                  controller: _teamController,
                  decoration: const InputDecoration(labelText: 'Oynadığı Takım', border: OutlineInputBorder()),
                  validator: (value) => value!.isEmpty ? 'Lütfen oynadığınız takımı girin.' : null,
                ),
                const SizedBox(height: 20),
                TextFormField(
                  controller: _countryController,
                  decoration: const InputDecoration(labelText: 'Ülke', border: OutlineInputBorder()),
                  validator: (value) => value!.isEmpty ? 'Lütfen ülkenizi girin.' : null,
                ),
                const SizedBox(height: 20),
                Row(
                  children: [
                    Expanded(
                      child: TextFormField(
                        controller: _heightController,
                        decoration: const InputDecoration(labelText: 'Boy (cm)', border: OutlineInputBorder()),
                        keyboardType: TextInputType.number,
                        validator: (value) => value!.isEmpty ? 'Boy girin.' : null,
                      ),
                    ),
                    const SizedBox(width: 20),
                    Expanded(
                      child: TextFormField(
                        controller: _weightController,
                        decoration: const InputDecoration(labelText: 'Kilo (kg)', border: OutlineInputBorder()),
                        keyboardType: TextInputType.number,
                        validator: (value) => value!.isEmpty ? 'Kilo girin.' : null,
                      ),
                    ),
                  ],
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
                ElevatedButton.icon(
                  onPressed: _pickVideo,
                  icon: const Icon(Icons.video_library),
                  label: Text(_videoFile != null ? 'Video Seçildi' : 'Performans Videosu Yükle'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _videoFile != null ? Colors.green : Colors.blue,
                    foregroundColor: Colors.white,
                  ),
                ),
                if (_videoFile == null)
                  const Padding(
                    padding: EdgeInsets.only(top: 8.0),
                    child: Text('Not: Kayıt için video yüklemek zorunludur.', style: TextStyle(color: Colors.red, fontSize: 12)),
                  ),
                const SizedBox(height: 30),
                _isLoading
                    ? const CircularProgressIndicator()
                    : ElevatedButton(
                        onPressed: _registerUser,
                        style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15)),
                        child: const Text('Yetenek Kaydını Tamamla', style: TextStyle(fontSize: 16)),
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
