import 'package:firebase_dynamic_links/firebase_dynamic_links.dart';
import 'package:flutter/material.dart';
import 'package:talescout_virsual_code/pages/profile_detail_page.dart';

class DynamicLinkService {
  // Gelen dinamik linkleri dinle ve yönlendir
  Future<void> handleDynamicLinks(
    GlobalKey<NavigatorState> navigatorKey,
  ) async {
    // 1. Uygulama kapalıyken açılan linki al
    final PendingDynamicLinkData? initialLink = await FirebaseDynamicLinks
        .instance
        .getInitialLink();

    if (initialLink != null) {
      _navigateToLink(initialLink.link, navigatorKey);
    }

    // 2. Uygulama açıkken veya arka plandayken gelen linkleri dinle
    FirebaseDynamicLinks.instance.onLink.listen(
      (PendingDynamicLinkData dynamicLinkData) {
        _navigateToLink(dynamicLinkData.link, navigatorKey);
      },
      onError: (error) {
        print('Dinamik link hatası: $error');
      },
    );
  }

  void _navigateToLink(Uri deepLink, GlobalKey<NavigatorState> navigatorKey) {
    // Linkin yolunu kontrol et (örn: /profile)
    if (deepLink.pathSegments.contains('profile')) {
      // Linkten kullanıcı ID'sini al (örn: /profile?userId=ABCDEFG)
      String? userId = deepLink.queryParameters['userId'];
      if (userId != null) {
        navigatorKey.currentState?.push(
          MaterialPageRoute(
            builder: (context) => ProfileDetailPage(userId: userId),
          ),
        );
      }
    }
  }

  // Belirli bir kullanıcı profili için dinamik link oluştur
  Future<Uri> createProfileLink(String userId) async {
    final DynamicLinkParameters parameters = DynamicLinkParameters(
      uriPrefix: 'https://taledis.page.link', // KENDİ DOMAIN'İNİZİ YAZIN
      link: Uri.parse('https://taledis.com/profile?userId=$userId'),
      androidParameters: const AndroidParameters(
        packageName: 'com.example.talescout_virsual_code',
      ),
      // iosParameters: IosParameters(bundleId: 'com.example.talescoutVirsualCode'),
    );

    final shortLink = await FirebaseDynamicLinks.instance.buildShortLink(
      parameters,
    );
    return shortLink.shortUrl;
  }
}

