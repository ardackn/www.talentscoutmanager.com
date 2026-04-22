// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get explore => 'Explore';

  @override
  String get messages => 'Messages';

  @override
  String get editProfile => 'Edit Profile';

  @override
  String get settings => 'Settings';

  @override
  String get logout => 'Logout';

  @override
  String get anErrorOccurred => 'Something went wrong.';

  @override
  String get noTalentFound => 'No talent found to display.';

  @override
  String helloUser(Object userName) {
    return 'Hello, $userName!';
  }
}
