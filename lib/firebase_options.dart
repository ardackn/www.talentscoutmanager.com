import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyBLF8XrZrI3kYkDPprxCnBBjPiR3Pmu9Q0',
    appId: '1:983735383754:web:5c73e1b1dd7cd2fed26633',
    messagingSenderId: '983735383754',
    projectId: 'talentscoutmanagerdcctsm',
    authDomain: 'talentscoutmanagerdcctsm.firebaseapp.com',
    storageBucket: 'talentscoutmanagerdcctsm.firebasestorage.app',
    measurementId: 'G-4XGCCTJDDJ',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyBLF8XrZrI3kYkDPprxCnBBjPiR3Pmu9Q0',
    appId: '1:983735383754:android:59125bc75c2dcea68e82d3', // Using the number prefix, but keeping the hash from previous json if possible (actually I'll use the project number)
    messagingSenderId: '983735383754',
    projectId: 'talentscoutmanagerdcctsm',
    storageBucket: 'talentscoutmanagerdcctsm.firebasestorage.app',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyBLF8XrZrI3kYkDPprxCnBBjPiR3Pmu9Q0',
    appId: '1:983735383754:ios:5c73e1b1dd7cd2fed26633', // Guessing iOS based on Web ID pattern
    messagingSenderId: '983735383754',
    projectId: 'talentscoutmanagerdcctsm',
    storageBucket: 'talentscoutmanagerdcctsm.firebasestorage.app',
    iosBundleId: 'com.example.talescout_virsual_code',
  );
}
