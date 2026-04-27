import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter/foundation.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:provider/provider.dart';
import 'package:talescout_virsual_code/pages/theme_provider.dart';
import 'package:talescout_virsual_code/firebase_options.dart';
import 'package:talescout_virsual_code/pages/login_page.dart' as login_page;
import 'package:talescout_virsual_code/pages/talent_registration_page.dart'
    as talent_reg_page;
import 'package:talescout_virsual_code/pages/scout_registration_page.dart'
    as scout_reg_page;
import 'package:talescout_virsual_code/pages/explore_page.dart'
    as explore_page;
import 'package:talescout_virsual_code/pages/edit_profile_page.dart'
    as edit_profile_page;
import 'package:talescout_virsual_code/pages/chat_list_page.dart'
    as chat_list_page;
import 'package:talescout_virsual_code/pages/settings_page.dart'
    as settings_page;
import 'package:talescout_virsual_code/pages/friend_requests_page.dart'
    as friend_requests_page;
import 'package:talescout_virsual_code/pages/friends_list_page.dart'
    as friends_list_page;
import 'package:talescout_virsual_code/pages/upload_video_page.dart'
    as upload_video_page;
import 'package:talescout_virsual_code/pages/dynamic_link_service.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';

// Yönlendirme için global bir anahtar oluşturuyoruz.
final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
    // Firestore için çevrimdışı desteği yapılandır
    FirebaseFirestore.instance.settings = const Settings(
      persistenceEnabled: true,
      // Varsayılan önbellek boyutu 100MB'dir. Gerekirse artırabilirsiniz.
      // cacheSizeBytes: Settings.CACHE_SIZE_UNLIMITED,
    );

    // Crashlytics için hata yakalayıcıları ayarla
    FlutterError.onError = (errorDetails) {
      FirebaseCrashlytics.instance.recordFlutterFatalError(errorDetails);
    };
    // Asenkron hataları yakala
    PlatformDispatcher.instance.onError = (error, stack) {
      FirebaseCrashlytics.instance.recordError(error, stack, fatal: true);
      return true;
    };

    // Sadece debug modunda olmayan (release) hataları gönder
    // FirebaseCrashlytics.instance.setCrashlyticsCollectionEnabled(!kDebugMode);
  } catch (e) {
    // Firebase bağlantısı henüz yapılmadığı için bu hata geçici olarak göz ardı ediliyor.
    // Uygulama yine de çalışmaya devam edecektir.
    print("Firebase başlatilamadi: $e");
  }
  runApp(
    ChangeNotifierProvider(
      create: (context) => ThemeProvider(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<ThemeProvider>(
      builder: (context, themeProvider, child) {
        return MaterialApp(
          onGenerateTitle: (context) =>
              AppLocalizations.of(context)!.explore, // Uygulama başlığı
          localizationsDelegates: AppLocalizations.localizationsDelegates,
          supportedLocales: AppLocalizations.supportedLocales,
          locale: themeProvider.locale,
          title: 'Taledis',
          navigatorKey: navigatorKey, // NavigatorKey'i MaterialApp'e atıyoruz.
          theme: ThemeData(
            brightness: Brightness.light,
            primarySwatch: Colors.blue,
          ),
          darkTheme: ThemeData(
            brightness: Brightness.dark,
            primarySwatch: Colors.blue,
          ),
          themeMode: themeProvider.themeMode,
          // initialRoute yerine home kullanarak başlangıç kontrolünü yapıyoruz.
          home: const AuthWrapper(),
          routes: {
            '/login': (context) => const login_page.LoginPage(),
            '/home': (context) =>
                const HomePage(), // HomePage için yeni bir rota
            '/talent-registration': (context) =>
                const talent_reg_page.TalentRegistrationPage(),
            '/scout-registration': (context) =>
                const scout_reg_page.ScoutRegistrationPage(),
            '/explore': (context) => const explore_page.ExplorePage(),
            '/edit-profile': (context) =>
                const edit_profile_page.EditProfilePage(),
            '/chat-list': (context) => const chat_list_page.ChatListPage(),
            '/settings': (context) => const settings_page.SettingsPage(),
            '/friend-requests': (context) =>
                const friend_requests_page.FriendRequestsPage(),
            '/friends-list': (context) =>
                const friends_list_page.FriendsListPage(),
            '/upload-video': (context) =>
                const upload_video_page.UploadVideoPage(),
          },
        );
      },
    );
  }
}

class AuthWrapper extends StatefulWidget {
  const AuthWrapper({super.key});

  @override
  State<AuthWrapper> createState() => _AuthWrapperState();
}

class _AuthWrapperState extends State<AuthWrapper> {
  @override
  void initState() {
    super.initState();
    DynamicLinkService().handleDynamicLinks(navigatorKey);
  }

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        // Bağlantı bekleniyor...
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Scaffold(
            body: Center(child: CircularProgressIndicator()),
          );
        }
        // Kullanıcı giriş yapmış mı?
        if (snapshot.hasData) {
          return const explore_page.ExplorePage(); // Giriş yapmışsa Keşfet sayfasına git
        }
        // Kullanıcı giriş yapmamış
        return const HomePage(); // Giriş yapmamışsa ana sayfaya git
      },
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late VideoPlayerController _controller;
  bool _isVideoInitialized = false;

  // Arka plan videosu için yerel asset yolu. 
  // Videoyu 'assets/videos/background.mp4' olarak kaydedin.
  static const String _assetVideoPath = 'assets/videos/background.mp4';
  
  // Yedek video URL'si (Futbol temalı)
  static const String _fallbackVideoUrl =
      'https://videos.pexels.com/video-files/3958742/3958742-hd_1920_1080_24fps.mp4';

  @override
  void initState() {
    super.initState();
    _initializeVideo();
  }

  Future<void> _initializeVideo() async {
    // Önce yerel videoyu dene, yoksa yedek URL'yi kullan
    _controller = VideoPlayerController.asset(_assetVideoPath);
    
    try {
      await _controller.initialize();
    } catch (e) {
      print("Yerel video bulunamadı, ağ videosu kullanılıyor: $e");
      _controller = VideoPlayerController.networkUrl(Uri.parse(_fallbackVideoUrl));
      await _controller.initialize();
    }

    if (mounted) {
      setState(() => _isVideoInitialized = true);
      _controller.setLooping(true);
      _controller.setVolume(0.0);
      _controller.play();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          // Arka plan video
          if (_isVideoInitialized)
            SizedBox.expand(
              child: FittedBox(
                fit: BoxFit.cover,
                child: SizedBox(
                  width: _controller.value.size.width,
                  height: _controller.value.size.height,
                  child: VideoPlayer(_controller),
                ),
              ),
            )
          else
            Container(color: const Color(0xFF0A0A1A)),

          // Karanlık overlay
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Color(0xAA000000),
                  Color(0x88000000),
                  Color(0xBB000000),
                ],
              ),
            ),
          ),

          // İçerik
          Column(
            children: [
              _buildNavbar(context),
              Expanded(child: _buildHero(context)),
            ],
          ),
        ],
      ),
    );
  }

  void _showInfoDialog(BuildContext context, String title, String content) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        content: Text(content),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Kapat'),
          ),
        ],
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      ),
    );
  }

  Widget _buildNavbar(BuildContext context) {
    return Container(
      height: 64,
      padding: const EdgeInsets.symmetric(horizontal: 32),
      decoration: const BoxDecoration(
        color: Color(0xCC0D0D0D),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Logo
          Image.asset(
            'assets/images/logo.png',
            height: 40,
            fit: BoxFit.contain,
          ),
          const Spacer(),
          // Dil Seçici
          Consumer<ThemeProvider>(
            builder: (context, themeProvider, child) {
              return DropdownButton<String>(
                value: themeProvider.locale?.languageCode ?? 'en',
                dropdownColor: Colors.black87,
                style: const TextStyle(color: Colors.white70),
                underline: const SizedBox(),
                icon: const Icon(Icons.language, color: Colors.white70, size: 20),
                items: const [
                  DropdownMenuItem(value: 'en', child: Text('EN')),
                  DropdownMenuItem(value: 'es', child: Text('ES')),
                  DropdownMenuItem(value: 'fr', child: Text('FR')),
                  DropdownMenuItem(value: 'it', child: Text('IT')),
                  DropdownMenuItem(value: 'tr', child: Text('TR')),
                  DropdownMenuItem(value: 'ru', child: Text('RU')),
                  DropdownMenuItem(value: 'de', child: Text('DE')),
                  DropdownMenuItem(value: 'ar', child: Text('AR')),
                  DropdownMenuItem(value: 'zh', child: Text('ZH')),
                  DropdownMenuItem(value: 'ja', child: Text('JA')),
                  DropdownMenuItem(value: 'ko', child: Text('KO')),
                ],
                onChanged: (String? newLang) {
                  if (newLang != null) {
                    themeProvider.setLocale(Locale(newLang));
                  }
                },
              );
            },
          ),
          const SizedBox(width: 8),
          // Nav linkleri
          TextButton(
            onPressed: () => _showInfoDialog(
              context, 
              'Yapay Zeka Nasıl Çalışır?', 
              'Yapay zeka sistemimiz, yüklediğiniz performans videolarını saniyeler içinde analiz eder. Oyuncunun hızı, isabeti, pozisyon alma yeteneği gibi birçok parametreyi değerlendirerek profesyonel bir rapor oluşturur.'
            ),
            child: const Text(
              'Yapay Zeka Nasıl Çalışır?',
              style: TextStyle(color: Colors.white70, fontSize: 14),
            ),
          ),
          const SizedBox(width: 8),
          TextButton(
            onPressed: () => _showInfoDialog(
              context, 
              'Avantajlar', 
              '• Küresel kulüplere doğrudan erişim.\n• Adil ve tarafsız performans analizi.\n• İzciler için hızlı filtreleme ve doğru yeteneği anında bulma imkanı.'
            ),
            child: const Text(
              'Avantajlar',
              style: TextStyle(color: Colors.white70, fontSize: 14),
            ),
          ),
          const SizedBox(width: 16),
          // Giriş Yap butonu
          ElevatedButton(
            onPressed: () => Navigator.pushNamed(context, '/login'),
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF2563EB),
              foregroundColor: Colors.white,
              padding:
                  const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
            child: const Text('Giriş Yap',
                style: TextStyle(fontWeight: FontWeight.bold)),
          ),
        ],
      ),
    );
  }

  Widget _buildHero(BuildContext context) {
    final isWide = MediaQuery.of(context).size.width > 600;
    return Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'TSM — Görünmez Devler',
              style: TextStyle(
                color: Colors.white,
                fontSize: isWide ? 56 : 32,
                fontWeight: FontWeight.bold,
                height: 1.2,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            const Text(
              'Yetenek Keşfi ve Yönetimi',
              style: TextStyle(
                color: Colors.white60,
                fontSize: 18,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 36),
            Text(
              'Küresel Sporun Görünmez Devlerini Ortaya Çıkarmak',
              style: TextStyle(
                color: Colors.white,
                fontSize: isWide ? 28 : 20,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            const Text(
              'Yapay Zeka Odaklı Analitik araçlığıyla ham potansiyeli\nküresel karar vericilere bağlamak',
              style: TextStyle(
                color: Colors.white60,
                fontSize: 16,
                height: 1.5,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 64), // Increased spacing
            Wrap(
              spacing: 24, // More distinct spacing
              runSpacing: 24,
              alignment: WrapAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: () =>
                      Navigator.pushNamed(context, '/talent-registration'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF10B981), // Distinct Green Color for Talent
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(
                        horizontal: 40, vertical: 20),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12)),
                    elevation: 8,
                  ),
                  child: const Text(
                    'YETENEK GİRİŞİ  →',
                    style:
                        TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ),
                ElevatedButton(
                  onPressed: () =>
                      Navigator.pushNamed(context, '/scout-registration'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF3B82F6), // Distinct Blue Color for Scout
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(
                        horizontal: 40, vertical: 20),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12)),
                    elevation: 8,
                  ),
                  child: const Text(
                    'İZCİ GİRİŞİ  →',
                    style:
                        TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
