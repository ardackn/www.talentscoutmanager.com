import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'tr', // Varsayılan dil
    lng: 'tr', // Başlangıç dili
    debug: false, // Geliştirme ortamında true yapılabilir
    interpolation: {
      escapeValue: false, // React, XSS saldırılarına karşı otomatik koruma sağladığı için gerekli değil
    },
    resources: {
      en: {
        common: require('./common.json'), // components/common.json (EN)
        legal: require('./legal.json'),   // components/legal.json (EN)
      },
      tr: {
        common: require('../public/locales/tr/common.json'), // public/locales/tr/common.json (TR)
        legal: require('../public/locales/tr/legal.json'),   // public/locales/tr/legal.json (TR)
      },
    },
    ns: ['common', 'legal'], // Kullanılacak namespace'ler
    defaultNS: 'common', // Varsayılan namespace
  });

export default i18n;