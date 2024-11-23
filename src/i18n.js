import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// Импорт локальных файлов переводов
import en from './locales/en/translation.json';
import uk from './locales/uk/translation.json';// Импорт локальных переводов

i18n
  .use(HttpApi)  // или HttpApi, если используешь бекенд для хранения переводов
  .use(LanguageDetector)  // Автоопределение языка
  .use(initReactI18next)  // Подключение к React
  .init({
    resources: {
      en: { translation: en },
      uk: { translation: uk }
    },
    fallbackLng: 'uk',  // Язык по умолчанию
    debug: true,
    interpolation: {
      escapeValue: false  // React сам защищает от XSS
    }
  });

export default i18n;
