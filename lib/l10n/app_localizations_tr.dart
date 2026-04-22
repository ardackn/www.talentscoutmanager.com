// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Turkish (`tr`).
class AppLocalizationsTr extends AppLocalizations {
  AppLocalizationsTr([String locale = 'tr']) : super(locale);

  @override
  String get explore => 'Keşfet';

  @override
  String get messages => 'Mesajlar';

  @override
  String get editProfile => 'Profili Düzenle';

  @override
  String get settings => 'Ayarlar';

  @override
  String get logout => 'Çıkış Yap';

  @override
  String get anErrorOccurred => 'Bir şeyler ters gitti.';

  @override
  String get noTalentFound => 'Gösterilecek yetenek bulunamadı.';

  @override
  String helloUser(Object userName) {
    return 'Merhaba, $userName!';
  }
}
