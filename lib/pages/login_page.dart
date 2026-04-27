import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:google_sign_in/google_sign_in.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
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

  Future<void> _signInWithGoogle() async {
    setState(() {
      _isLoading = true;
      _errorMessage = '';
    });

    try {
      // 1. Google Sign-In akışını başlat
      final GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
      if (googleUser == null) {
        // Kullanıcı akışı iptal etti
        setState(() => _isLoading = false);
        return;
      }

      // 2. Google kullanıcısından kimlik doğrulama bilgilerini al
      final GoogleSignInAuthentication googleAuth =
          await googleUser.authentication;

      // 3. Firebase için bir kimlik bilgisi (credential) oluştur
      final AuthCredential credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      // 4. Firebase'e bu kimlik bilgisi ile giriş yap
      final UserCredential userCredential = await _auth.signInWithCredential(
        credential,
      );
      final User? user = userCredential.user;

      if (user != null && mounted) {
        // 5. Kullanıcı Firestore'da var mı kontrol et, yoksa oluştur
        final userDocRef = _firestore.collection('users').doc(user.uid);
        final userDoc = await userDocRef.get();

        if (!userDoc.exists) {
          // Yeni kullanıcı, bilgilerini Firestore'a kaydet
          await userDocRef.set({
            'uid': user.uid,
            'email': user.email,
            'displayName': user.displayName,
            'profileImageUrl': user.photoURL,
            'role': 'talent', // Varsayılan rol, kullanıcıya seçtirebilirsiniz
            'createdAt': Timestamp.now(),
          });
        }

        Navigator.pushNamedAndRemoveUntil(
          context,
          '/explore',
          (route) => false,
        );
      }
    } catch (e) {
      setState(
        () =>
            _errorMessage = 'Google ile giriş başarısız oldu: ${e.toString()}',
      );
    } finally {
      if (mounted) setState(() => _isLoading = false);
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
      appBar: AppBar(
        title: const Text('Üye Girişi'),
        backgroundColor: Colors.blue.shade800,
      ),
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
          child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'Giriş Yap',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.blue,
              ),
            ),
            const SizedBox(height: 20),
            TextField(
              controller: _emailController,
              decoration: const InputDecoration(
                labelText: 'E-posta',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.email),
              ),
              keyboardType: TextInputType.emailAddress,
            ),
            const SizedBox(height: 20),
            TextField(
              controller: _passwordController,
              decoration: const InputDecoration(
                labelText: 'Şifre',
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.lock),
              ),
              obscureText: true,
            ),
            const SizedBox(height: 20),
            if (_errorMessage.isNotEmpty)
              Text(
                _errorMessage,
                style: const TextStyle(color: Colors.red, fontSize: 14),
              ),
            const SizedBox(height: 20),
            _isLoading
                ? const CircularProgressIndicator()
                : ElevatedButton(
                    onPressed: _signIn,
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size.fromHeight(50),
                    ),
                    child: const Text('Giriş Yap'),
                  ),
            const SizedBox(height: 20),
            const Text('veya'),
            const SizedBox(height: 20),
            ElevatedButton.icon(
              icon: Image.asset(
                'assets/google_logo.png',
                height: 24.0,
              ), // Projenize bir Google logosu ekleyin
              label: const Text('Google ile Giriş Yap'),
              onPressed: _isLoading ? null : _signInWithGoogle,
              style: ElevatedButton.styleFrom(
                foregroundColor: Colors.black,
                backgroundColor: Colors.white,
                minimumSize: const Size.fromHeight(50),
              ),
            ),
          ],
        ),
      ),
      ),
    );
  }
}
