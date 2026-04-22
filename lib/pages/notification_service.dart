import 'package:flutter/material.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:talescout_virsual_code/pages/chat_page.dart';

class NotificationService {
  final FirebaseMessaging _fcm = FirebaseMessaging.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Yönlendirme için GlobalKey<NavigatorState> ekliyoruz
  Future<void> initialize(GlobalKey<NavigatorState> navigatorKey) async {
    // 1. Bildirim izni iste
    NotificationSettings settings = await _fcm.requestPermission(
      alert: true,
      announcement: false,
      badge: true,
      carPlay: false,
      criticalAlert: false,
      provisional: false,
      sound: true,
    );

    if (settings.authorizationStatus == AuthorizationStatus.authorized) {
      print('Kullanıcı bildirim izni verdi.');
      // 2. FCM Token'ını al
      String? token = await _fcm.getToken();
      if (token != null) {
        print('FCM Token: $token');
        await _saveTokenToDatabase(token);
      }

      // Token yenilendiğinde veritabanını güncelle
      _fcm.onTokenRefresh.listen(_saveTokenToDatabase);

      // 3. Uygulama kapalıyken gelen bildirime tıklanma durumunu ele al
      RemoteMessage? initialMessage = await _fcm.getInitialMessage();
      if (initialMessage != null) {
        _handleMessage(initialMessage, navigatorKey);
      }

      // 4. Uygulama arka plandayken gelen bildirime tıklanma durumunu ele al
      FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
        _handleMessage(message, navigatorKey);
      });
    } else {
      print('Kullanıcı bildirim izni vermedi.');
    }
  }

  void _handleMessage(
    RemoteMessage message,
    GlobalKey<NavigatorState> navigatorKey,
  ) {
    // Bildirimden gelen veriyi kullanarak yönlendirme yap
    if (message.data['type'] == 'chat') {
      final senderId = message.data['senderId'];
      final senderName = message.data['senderName'];
      if (senderId != null && senderName != null) {
        navigatorKey.currentState?.push(
          MaterialPageRoute(
            builder: (context) =>
                ChatPage(receiverId: senderId, receiverName: senderName),
          ),
        );
      }
    }
  }

  Future<void> _saveTokenToDatabase(String token) async {
    User? user = _auth.currentUser;
    if (user == null) return;

    await _firestore.collection('users').doc(user.uid).update({
      'fcmToken': token,
    });
  }
}

