import 'package:flutter/material.dart';

class TalentProfilePage extends StatelessWidget {
  const TalentProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profil Detayı'),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            // Profil fotoğrafı
            Container(
              height: 250,
              width: double.infinity,
              decoration: const BoxDecoration(
                image: DecorationImage(
                  image: NetworkImage('https://placehold.co/600x400?text=Yetenek+Fotoğrafı'),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  // İsim ve Unvan
                  const Text(
                    'Emre Yılmaz',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Futbolcu',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey,
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Biyografi
                  const Text(
                    'Biyografi',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Genç ve yetenekli bir futbolcu. Hızlı, teknik ve gol vuruşları isabetli.',
                    style: TextStyle(fontSize: 16),
                  ),
                  const SizedBox(height: 24),

                  // Kişisel Bilgiler
                  const Text(
                    'Kişisel Bilgiler',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text('Doğum Tarihi: 01/01/2007', style: TextStyle(fontSize: 16)),
                  const Text('Boy: 175 cm', style: TextStyle(fontSize: 16)),
                  const Text('Kilo: 70 kg', style: TextStyle(fontSize: 16)),
                  const Text('Pozisyon: Forvet', style: TextStyle(fontSize: 16)),
                  const SizedBox(height: 24),

                  // İletişim butonu
                  Center(
                    child: ElevatedButton.icon(
                      onPressed: () {
                        // TODO: İletişim formu veya direkt mesajlaşma ekranına yönlendirme
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(content: Text('İletişim sayfasına yönlendiriliyorsunuz.')),
                        );
                      },
                      icon: const Icon(Icons.message),
                      label: const Text('İletişim Kur'),
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
