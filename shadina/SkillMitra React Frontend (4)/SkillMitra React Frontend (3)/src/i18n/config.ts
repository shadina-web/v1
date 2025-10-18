import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslations from './locales/en.json';
import hiTranslations from './locales/hi.json';
import mlTranslations from './locales/ml.json';

const resources = {
  en: {
    translation: enTranslations
  },
  hi: {
    translation: hiTranslations
  },
  ml: {
    translation: mlTranslations
  }
};

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    lng: 'en', // Initial language
    debug: false, // Set to true for debugging
    
    interpolation: {
      escapeValue: false // React already safes from xss
    },
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
