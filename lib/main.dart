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

  // Buraya kendi video URL'nizi yazabilirsiniz
  static const String _videoUrl =
      'https://videos.pexels.com/video-files/856397/856397-hd_1920_1080_25fps.mp4';

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.networkUrl(Uri.parse(_videoUrl))
      ..initialize().then((_) {
        if (mounted) {
          setState(() => _isVideoInitialized = true);
          _controller.setLooping(true);
          _controller.setVolume(0.0);
          _controller.play();
        }
      });
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
          RichText(
            text: const TextSpan(
              children: [
                TextSpan(
                  text: 'TSM',
                  style: TextStyle(
                    color: Color(0xFF2563EB),
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                    letterSpacing: 1,
                  ),
                ),
                TextSpan(
                  text: '  Görünmez Devler',
                  style: TextStyle(
                    color: Colors.white70,
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
          const Spacer(),
          // Nav linkleri
          TextButton(
            onPressed: () {},
            child: const Text(
              'Yapay Zeka Nasıl Çalışır?',
              style: TextStyle(color: Colors.white70, fontSize: 14),
            ),
          ),
          const SizedBox(width: 8),
          TextButton(
            onPressed: () {},
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
            const SizedBox(height: 48),
            Wrap(
              spacing: 16,
              runSpacing: 16,
              alignment: WrapAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: () =>
                      Navigator.pushNamed(context, '/talent-registration'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2563EB),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(
                        horizontal: 32, vertical: 18),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8)),
                    elevation: 4,
                  ),
                  child: const Text(
                    'YETENEK GİRİŞİ  →',
                    style:
                        TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
                  ),
                ),
                OutlinedButton(
                  onPressed: () =>
                      Navigator.pushNamed(context, '/scout-registration'),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: Colors.white,
                    side: const BorderSide(color: Colors.white70, width: 1.5),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 32, vertical: 18),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8)),
                    backgroundColor: Colors.black38,
                  ),
                  child: const Text(
                    'İZCİ GİRİŞ  →',
                    style:
                        TextStyle(fontSize: 15, fontWeight: FontWeight.bold),
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
