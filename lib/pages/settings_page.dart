import 'package:flutter/material.dart';
import 'package:firebase_crashlytics/firebase_crashlytics.dart';
import 'package:provider/provider.dart';
import 'package:talescout_virsual_code/pages/theme_provider.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);

    return Scaffold(
      appBar: AppBar(title: const Text('Ayarlar')),
      body: ListView(
        children: [
          ListTile(
            title: const Text('Tema'),
            trailing: DropdownButton<ThemeMode>(
              value: themeProvider.themeMode,
              items: const [
                DropdownMenuItem(
                  value: ThemeMode.system,
                  child: Text('Sistem Varsayılanı'),
                ),
                DropdownMenuItem(
                  value: ThemeMode.light,
                  child: Text('Açık Mod'),
                ),
                DropdownMenuItem(
                  value: ThemeMode.dark,
                  child: Text('Karanlık Mod'),
                ),
              ],
              onChanged: (ThemeMode? newMode) {
                if (newMode != null) {
                  themeProvider.setThemeMode(newMode);
                }
              },
            ),
          ),
          // Test için çökme butonu
          ListTile(
            title: const Text('Test Crash'),
            onTap: () {
              FirebaseCrashlytics.instance.crash();
            },
          ),
        ],
      ),
    );
  }
}

