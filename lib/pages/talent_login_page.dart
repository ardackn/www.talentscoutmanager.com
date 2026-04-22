import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class TalentLoginPage extends StatefulWidget {
  const TalentLoginPage({super.key});

  @override
  State<TalentLoginPage> createState() => _TalentLoginPageState();
}

class _TalentLoginPageState extends State<TalentLoginPage> {
  final _auth = FirebaseAuth.instance;
  final _firestore = FirebaseFirestore.instance;
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;
  String _errorMessage = '';

  final _resetEmailController =
      TextEditingController(); // Controller for password reset dialog

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _resetEmailController.dispose();
    super.dispose();
  }

  Future<void> _signIn() async {
    setState(() {
      _isLoading = true;
      _errorMessage = '';
    });
    try {
      // 1. Firebase Auth ile giriş yap
      final userCredential = await _auth.signInWithEmailAndPassword(
        email: _emailController.text.trim(),
        password: _passwordController.text.trim(),
      );

      if (userCredential.user != null && mounted) {
        // 2. Firestore'dan kullanıcı dokümanını al
        final userDoc = await _firestore
            .collection('users')
            .doc(userCredential.user!.uid)
            .get();

        if (userDoc.exists) {
          // 3. Role göre yönlendirme yap
          // Şimdilik her iki rol de /explore sayfasına gidiyor.
          // Gelecekte farklı sayfalara yönlendirebilirsiniz.
          // final role = userDoc.data()?['role'];
          Navigator.pushNamedAndRemoveUntil(
            context,
            '/explore',
            (route) => false,
          );
        }
      }
    } on FirebaseAuthException catch (e) {
      String message;
      if (e.code == 'user-not-found') {
        message =
            'Kullanıcı bulunamadı. Lütfen e-posta adresinizi kontrol edin.';
      } else if (e.code == 'wrong-password') {
        message = 'Yanlış şifre. Lütfen şifrenizi kontrol edin.';
      } else {
        message = 'Giriş başarısız oldu. Lütfen tekrar deneyin.';
      }
      setState(() {
        _errorMessage = message;
      });
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  void _showPasswordResetDialog() {
    // Optionally pre-fill with current email controller's text
    _resetEmailController.text = _emailController.text.trim();

    showDialog(
      context: context,
      builder: (BuildContext dialogContext) {
        bool dialogIsLoading = false; // Local loading state for the dialog
        String dialogErrorMessage = ''; // Local error message for the dialog

        return StatefulBuilder(
          builder: (BuildContext context, StateSetter setDialogState) {
            return AlertDialog(
              title: const Text('Şifremi Sıfırla'),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text(
                    'Şifrenizi sıfırlamak için kayıtlı e-posta adresinizi girin.',
                  ),
                  const SizedBox(height: 16),
                  TextField(
                    controller: _resetEmailController,
                    decoration: const InputDecoration(
                      labelText: 'E-posta',
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.email),
                    ),
                    keyboardType: TextInputType.emailAddress,
                  ),
                  if (dialogErrorMessage.isNotEmpty)
                    Padding(
                      padding: const EdgeInsets.only(top: 8.0),
                      child: Text(
                        dialogErrorMessage,
                        style: const TextStyle(color: Colors.red, fontSize: 12),
                      ),
                    ),
                ],
              ),
              actions: <Widget>[
                TextButton(
                  child: const Text('İptal'),
                  onPressed: () {
                    Navigator.of(dialogContext).pop();
                  },
                ),
                ElevatedButton(
                  onPressed: dialogIsLoading
                      ? null
                      : () async {
                          setDialogState(() {
                            dialogIsLoading = true;
                            dialogErrorMessage = '';
                          });
                          final email = _resetEmailController.text.trim();
                          if (email.isEmpty) {
                            setDialogState(() {
                              dialogErrorMessage =
                                  'Lütfen e-posta adresinizi girin.';
                              dialogIsLoading = false;
                            });
                            return;
                          }

                          try {
                            await _auth.sendPasswordResetEmail(email: email);
                            if (mounted) {
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    'Şifre sıfırlama bağlantısı "$email" adresine gönderildi.',
                                  ),
                                  backgroundColor: Colors.green,
                                ),
                              );
                              Navigator.of(
                                dialogContext,
                              ).pop(); // Close the dialog
                            }
                          } on FirebaseAuthException catch (e) {
                            String message;
                            if (e.code == 'user-not-found') {
                              message =
                                  'Bu e-posta adresine kayıtlı bir kullanıcı bulunamadı.';
                            } else if (e.code == 'invalid-email') {
                              message = 'Geçersiz e-posta adresi.';
                            } else {
                              message =
                                  'Şifre sıfırlama e-postası gönderilirken bir hata oluştu: ${e.message}';
                            }
                            if (mounted) {
                              setDialogState(() {
                                dialogErrorMessage = message;
                              });
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(message),
                                  backgroundColor: Colors.red,
                                ),
                              );
                            }
                          } finally {
                            if (mounted) {
                              setDialogState(() {
                                dialogIsLoading = false;
                              });
                            }
                          }
                        },
                  child: dialogIsLoading
                      ? const SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(strokeWidth: 2),
                        )
                      : const Text('Sıfırlama Bağlantısı Gönder'),
                ),
              ],
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Yetenek Girişi')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            // E-posta adresi alanı
            TextFormField(
              controller: _emailController,
              decoration: const InputDecoration(
                labelText: 'E-Posta Adresi',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.email),
              ),
              keyboardType: TextInputType.emailAddress,
            ),
            const SizedBox(height: 16),

            // Şifre alanı
            TextFormField(
              controller: _passwordController,
              obscureText: true,
              decoration: const InputDecoration(
                labelText: 'Şifre',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.lock),
              ),
            ),
            const SizedBox(height: 20),

            if (_errorMessage.isNotEmpty)
              Padding(
                padding: const EdgeInsets.only(bottom: 10.0),
                child: Text(
                  _errorMessage,
                  style: const TextStyle(color: Colors.red, fontSize: 14),
                  textAlign: TextAlign.center,
                ),
              ),

            // Giriş Yap butonu
            _isLoading
                ? const Center(child: CircularProgressIndicator())
                : ElevatedButton(
                    onPressed: _signIn,
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size.fromHeight(50),
                    ),
                    child: const Text('Giriş Yap'),
                  ),
            const SizedBox(height: 12),

            // Şifremi unuttum butonu
            TextButton(
              onPressed: _showPasswordResetDialog,
              child: const Text('Şifremi Unuttum'),
            ),
          ],
        ),
      ),
    );
  }
}
