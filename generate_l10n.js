const fs = require('fs');
const path = require('path');

const l10nDir = 'c:\\Users\\lenovo\\Desktop\\UYGULAMA\\talescout_virsual_code\\lib\\l10n';

const translations = {
  en: {
    appTitle: "TSM - Talent Scout Manager",
    login: "Login",
    register: "Register",
    talentLogin: "Talent Login",
    scoutLogin: "Scout Login",
    howItWorks: "How AI Works?",
    advantages: "Advantages",
    language: "Language",
    email: "Email",
    password: "Password",
    name: "Name",
    surname: "Surname",
    age: "Age",
    position: "Position",
    team: "Team",
    country: "Country",
    height: "Height",
    weight: "Weight",
    uploadVideo: "Upload Video",
    registerAsTalent: "Register as Talent",
    registerAsScout: "Register as Scout",
    analysisResult: "AI Analysis Result",
    explore: "Explore",
    chat: "Chat",
    settings: "Settings",
    success: "Success",
    error: "Error",
    helloUser: "Hello {name}",
    "@helloUser": {
      "placeholders": {
        "name": { "type": "String" }
      }
    },
    messages: "Messages",
    editProfile: "Edit Profile",
    logout: "Logout",
    noTalentFound: "No talents found."
  },
  tr: {
    appTitle: "TSM - Yetenek Gözlemcisi",
    login: "Giriş Yap",
    register: "Kayıt Ol",
    talentLogin: "Yetenek Girişi",
    scoutLogin: "İzci Girişi",
    howItWorks: "Yapay Zeka Nasıl Çalışır?",
    advantages: "Avantajlar",
    language: "Dil",
    email: "E-posta",
    password: "Şifre",
    name: "Ad",
    surname: "Soyad",
    age: "Yaş",
    position: "Pozisyon",
    team: "Takım",
    country: "Ülke",
    height: "Boy",
    weight: "Kilo",
    uploadVideo: "Video Yükle",
    registerAsTalent: "Yetenek Olarak Kaydol",
    registerAsScout: "İzci Olarak Kaydol",
    analysisResult: "Yapay Zeka Analiz Sonucu",
    explore: "Keşfet",
    chat: "Sohbet",
    settings: "Ayarlar",
    success: "Başarılı",
    error: "Hata",
    helloUser: "Merhaba {name}",
    "@helloUser": {
      "placeholders": {
        "name": { "type": "String" }
      }
    },
    messages: "Mesajlar",
    editProfile: "Profili Düzenle",
    logout: "Çıkış Yap",
    noTalentFound: "Yetenek bulunamadı."
  }
};

const locales = ['en', 'tr', 'es', 'fr', 'it', 'ru', 'de', 'ar', 'zh', 'ja', 'ko'];

locales.forEach(locale => {
  const content = translations[locale] || translations.en;
  fs.writeFileSync(path.join(l10nDir, `app_${locale}.arb`), JSON.stringify(content, null, 2));
});
