// i18n.ts
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import en from './locales/en/translation.json';
import ru from './locales/ru/translation.json';
export const resources = { 
  en: {translation: en},
  ru: {translation: ru},

}
const i18n = new I18n();
i18n.translations = {
  en,
  ru
};

// Устанавливаем язык по умолчанию, если текущий язык не поддерживается
i18n.enableFallback = true;

// Устанавливаем язык приложения на основе языка устройства
i18n.locale = 'en';

export default i18n;
