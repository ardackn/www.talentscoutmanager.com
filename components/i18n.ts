import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    common: require('../public/locales/en/common.json'),
    legal: require('../public/locales/en/legal.json')
  },
  tr: {
    common: require('../public/locales/tr/common.json'),
    legal: require('../public/locales/tr/legal.json')
  }
};

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'tr',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    resources,
    ns: ['common', 'legal'],
    defaultNS: 'common'
  });

export default i18n;
