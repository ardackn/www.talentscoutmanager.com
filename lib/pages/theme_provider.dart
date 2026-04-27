import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ThemeProvider with ChangeNotifier {
  ThemeMode _themeMode = ThemeMode.system;
  Locale? _locale;

  ThemeMode get themeMode => _themeMode;
  Locale? get locale => _locale;

  ThemeProvider() {
    _loadPreferences();
  }

  void _loadPreferences() async {
    final prefs = await SharedPreferences.getInstance();
    
    // Load Theme
    final theme = prefs.getString('themeMode') ?? 'system';
    switch (theme) {
      case 'light':
        _themeMode = ThemeMode.light;
        break;
      case 'dark':
        _themeMode = ThemeMode.dark;
        break;
      default:
        _themeMode = ThemeMode.system;
        break;
    }

    // Load Locale
    final langCode = prefs.getString('languageCode');
    if (langCode != null && langCode.isNotEmpty) {
      _locale = Locale(langCode);
    } else {
      _locale = const Locale('en'); // Default to English
    }

    notifyListeners();
  }

  void setThemeMode(ThemeMode mode) async {
    if (mode == _themeMode) return;
    _themeMode = mode;
    notifyListeners();

    final prefs = await SharedPreferences.getInstance();
    String theme = 'system';
    if (mode == ThemeMode.light) theme = 'light';
    if (mode == ThemeMode.dark) theme = 'dark';
    await prefs.setString('themeMode', theme);
  }

  void setLocale(Locale locale) async {
    if (locale == _locale) return;
    _locale = locale;
    notifyListeners();

    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('languageCode', locale.languageCode);
  }
}
