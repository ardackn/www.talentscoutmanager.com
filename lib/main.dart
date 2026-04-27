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
import 'package:talescout_virsual_code/pages/talent_registration_page.dart' as talent_reg_page;
import 'package:talescout_virsual_code/pages/scout_registration_page.dart' as scout_reg_page;
import 'package:talescout_virsual_code/pages/explore_page.dart' as explore_page;
import 'package:talescout_virsual_code/pages/edit_profile_page.dart' as edit_profile_page;
import 'package:talescout_virsual_code/pages/chat_list_page.dart' as chat_list_page;
import 'package:talescout_virsual_code/pages/settings_page.dart' as settings_page;
import 'package:talescout_virsual_code/pages/friend_requests_page.dart' as friend_requests_page;
import 'package:talescout_virsual_code/pages/friends_list_page.dart' as friends_list_page;
import 'package:talescout_virsual_code/pages/upload_video_page.dart' as upload_video_page;
import 'package:talescout_virsual_code/pages/dynamic_link_service.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';

final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  try {
    await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
    FirebaseFirestore.instance.settings = const Settings(persistenceEnabled: true);
    FlutterError.onError = (details) => FirebaseCrashlytics.instance.recordFlutterFatalError(details);
    PlatformDispatcher.instance.onError = (error, stack) {
      FirebaseCrashlytics.instance.recordError(error, stack, fatal: true);
      return true;
    };
  } catch (e) {
    print("Firebase Error: $e");
  }
  runApp(ChangeNotifierProvider(create: (_) => ThemeProvider(), child: const MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return Consumer<ThemeProvider>(builder: (context, tp, _) {
      return MaterialApp(
        navigatorKey: navigatorKey,
        localizationsDelegates: AppLocalizations.localizationsDelegates,
        supportedLocales: AppLocalizations.supportedLocales,
        locale: tp.locale,
        themeMode: tp.themeMode,
        theme: ThemeData(brightness: Brightness.light, primarySwatch: Colors.blue),
        darkTheme: ThemeData(brightness: Brightness.dark, primarySwatch: Colors.blue),
        home: const AuthWrapper(),
        routes: {
          '/login': (_) => const login_page.LoginPage(),
          '/home': (_) => const HomePage(),
          '/talent-registration': (_) => const talent_reg_page.TalentRegistrationPage(),
          '/scout-registration': (_) => const scout_reg_page.ScoutRegistrationPage(),
          '/explore': (_) => const explore_page.ExplorePage(),
          '/edit-profile': (_) => const edit_profile_page.EditProfilePage(),
          '/chat-list': (_) => const chat_list_page.ChatListPage(),
          '/settings': (_) => const settings_page.SettingsPage(),
          '/friend-requests': (_) => const friend_requests_page.FriendRequestsPage(),
          '/friends-list': (_) => const friends_list_page.FriendsListPage(),
          '/upload-video': (_) => const upload_video_page.UploadVideoPage(),
        },
      );
    });
  }
}

class AuthWrapper extends StatelessWidget {
  const AuthWrapper({super.key});
  @override
  Widget build(BuildContext context) {
    return StreamBuilder<User?>(
      stream: FirebaseAuth.instance.authStateChanges(),
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) return const Scaffold(body: Center(child: CircularProgressIndicator()));
        return snapshot.hasData ? const explore_page.ExplorePage() : const HomePage();
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
  bool _initialized = false;

  @override
  void initState() {
    super.initState();
    _controller = VideoPlayerController.asset('assets/videos/background.mp4')
      ..initialize().then((_) {
        setState(() => _initialized = true);
        _controller.setLooping(true);
        _controller.setVolume(0);
        _controller.play();
      }).catchError((e) {
        _controller = VideoPlayerController.networkUrl(Uri.parse('https://videos.pexels.com/video-files/3958742/3958742-hd_1920_1080_24fps.mp4'))
          ..initialize().then((_) {
            setState(() => _initialized = true);
            _controller.setLooping(true);
            _controller.play();
          });
      });
  }

  @override
  void dispose() { _controller.dispose(); super.dispose(); }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      body: Stack(
        children: [
          if (_initialized) SizedBox.expand(child: FittedBox(fit: BoxFit.cover, child: SizedBox(width: _controller.value.size.width, height: _controller.value.size.height, child: VideoPlayer(_controller)))),
          Container(decoration: BoxDecoration(gradient: LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Colors.black.withOpacity(0.7), Colors.black.withOpacity(0.5), Colors.black.withOpacity(0.8)]))),
          SingleChildScrollView(
            child: Column(
              children: [
                _navbar(context),
                _hero(context),
                _visionMission(context),
                _packages(context),
                _talents(context),
                _footer(),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _navbar(BuildContext context) {
    return Container(
      height: 70,
      padding: const EdgeInsets.symmetric(horizontal: 30),
      color: Colors.black.withOpacity(0.5),
      child: Row(
        children: [
          Image.asset('assets/images/logo.png', height: 40),
          const Spacer(),
          _langDropdown(context),
          const SizedBox(width: 20),
          ElevatedButton(onPressed: () => Navigator.pushNamed(context, '/login'), style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF2563EB)), child: const Text('GİRİŞ YAP', style: TextStyle(color: Colors.white))),
        ],
      ),
    );
  }

  Widget _langDropdown(BuildContext context) {
    final tp = Provider.of<ThemeProvider>(context);
    return DropdownButton<String>(
      value: tp.locale?.languageCode ?? 'en',
      dropdownColor: Colors.black,
      style: const TextStyle(color: Colors.white),
      items: ['en', 'tr', 'es', 'fr', 'it'].map((l) => DropdownMenuItem(value: l, child: Text(l.toUpperCase()))).toList(),
      onChanged: (l) => l != null ? tp.setLocale(Locale(l)) : null,
    );
  }

  Widget _hero(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height - 70,
      padding: const EdgeInsets.all(30),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text('TSM — TALENT SCOUT MANAGER', style: TextStyle(color: Colors.white, fontSize: 48, fontWeight: FontWeight.bold), textAlign: TextAlign.center),
          const SizedBox(height: 20),
          const Text('Yapay Zeka Destekli Küresel Yetenek Platformu', style: TextStyle(color: Colors.white70, fontSize: 20), textAlign: TextAlign.center),
          const SizedBox(height: 50),
          Wrap(
            spacing: 20, runSpacing: 20,
            children: [
              _btn(context, 'YETENEK KAYDI', const Color(0xFF10B981), '/talent-registration'),
              _btn(context, 'İZCİ KAYDI', const Color(0xFF3B82F6), '/scout-registration'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _btn(BuildContext context, String t, Color c, String r) {
    return ElevatedButton(onPressed: () => Navigator.pushNamed(context, r), style: ElevatedButton.styleFrom(backgroundColor: c, padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 20), shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15))), child: Text(t, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)));
  }

  Widget _visionMission(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(vertical: 100, horizontal: 30),
      decoration: BoxDecoration(image: DecorationImage(image: const AssetImage('assets/images/vision_mission_bg.png'), fit: BoxFit.cover, colorFilter: ColorFilter.mode(Colors.black.withOpacity(0.8), BlendMode.darken))),
      child: Column(
        children: [
          _infoCard('VİZYONUMUZ', 'Dünyanın her köşesindeki yetenekleri yapay zeka ile gün yüzüne çıkarmak.', Icons.auto_graph),
          const SizedBox(height: 60),
          _infoCard('MİSYONUMUZ', 'Sporcu ve kulüp arasındaki köprüyü veri odaklı analizlerle sağlamlaştırmak.', Icons.rocket_launch),
        ],
      ),
    );
  }

  Widget _infoCard(String title, String text, IconData icon) {
    return Column(children: [Icon(icon, color: const Color(0xFF10B981), size: 50), const SizedBox(height: 20), Text(title, style: const TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold)), const SizedBox(height: 15), Container(constraints: const BoxConstraints(maxWidth: 600), child: Text(text, style: const TextStyle(color: Colors.white70, fontSize: 18), textAlign: TextAlign.center))]);
  }

  Widget _packages(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 20),
      color: const Color(0xFF0A0A0A),
      child: Column(
        children: [
          const Text('İZCİ PAKETLERİ', style: TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold)),
          const SizedBox(height: 50),
          Wrap(
            spacing: 30, runSpacing: 30, alignment: WrapAlignment.center,
            children: [
              _pkg('FREE', '0₺', ['Sınırlı Profil', 'Temel Filtre'], Colors.grey),
              _pkg('PREMIUM', '299₺', ['Sınırsız Profil', 'AI Analizi', 'Mesajlaşma'], Colors.blue),
              _pkg('GOLD', '599₺', ['Tüm Özellikler', 'Öncelikli Destek', 'Özel Raporlar'], Colors.amber),
            ],
          ),
        ],
      ),
    );
  }

  Widget _pkg(String t, String p, List<String> f, Color c) {
    return Container(width: 300, padding: const EdgeInsets.all(30), decoration: BoxDecoration(color: const Color(0xFF111111), borderRadius: BorderRadius.circular(20), border: Border.all(color: c.withOpacity(0.3))), child: Column(children: [Text(t, style: TextStyle(color: c, fontSize: 22, fontWeight: FontWeight.bold)), const SizedBox(height: 10), Text(p, style: const TextStyle(color: Colors.white, fontSize: 32, fontWeight: FontWeight.bold)), const SizedBox(height: 20), ...f.map((item) => Padding(padding: const EdgeInsets.only(bottom: 10), child: Text(item, style: const TextStyle(color: Colors.white60)))).toList(), const SizedBox(height: 20), ElevatedButton(onPressed: () {}, style: ElevatedButton.styleFrom(backgroundColor: c), child: const Text('SEÇ', style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold)))]));
  }

  Widget _talents(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 20),
      color: Colors.black,
      child: Column(
        children: [
          const Text('ÖNE ÇIKAN YETENEKLER', style: TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.bold)),
          const SizedBox(height: 40),
          SizedBox(height: 250, child: ListView(scrollDirection: Axis.horizontal, children: [
            _talent('Kaan Çetin', '17', '85', 'assets/images/logo.png'),
            _talent('Mehmet Bulut', '19', '92', 'assets/images/logo.png'),
            _talent('Çağan Karakaya', '16', '88', 'assets/images/logo.png'),
            _talent('İbrahim Çetin', '19', '90', 'assets/images/logo.png'),
            _talent('Kutay Genç', '25', '82', 'assets/images/logo.png'),
          ])),
        ],
      ),
    );
  }

  Widget _talent(String n, String a, String s, String i) {
    return Container(width: 180, margin: const EdgeInsets.only(right: 20), decoration: BoxDecoration(color: const Color(0xFF111111), borderRadius: BorderRadius.circular(15)), child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [CircleAvatar(radius: 40, backgroundImage: AssetImage(i)), const SizedBox(height: 15), Text(n, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)), Text('Yaş: $a', style: const TextStyle(color: Colors.white54)), Text('Skor: %$s', style: const TextStyle(color: Color(0xFF10B981)))]));
  }

  Widget _footer() {
    return Container(padding: const EdgeInsets.all(50), color: const Color(0xFF050505), child: const Center(child: Text('© 2026 TSM Manager. Tüm Hakları Saklıdır.', style: TextStyle(color: Colors.white24))));
  }
}
