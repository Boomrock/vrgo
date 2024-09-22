// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: "en", // язык по умолчанию
    fallbackLng: "en", // язык по умолчанию, если перевод не найден
    backend: {
      loadPath: '/locales/{{lng}}/translation.json' // путь к файлам с переводами
    },
    interpolation: {
      escapeValue: false // React уже экранирует значения
    }
  });

export default i18n;
