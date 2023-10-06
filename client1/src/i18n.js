import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./local/en.json";
import fr from "./local/fr.json";
import LanguageDetector from 'i18next-browser-languagedetector';
const resources = {
  en: {
    translation: en
  },
  fr: fr
};
i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "fr", 

    interpolation: {
      escapeValue: false 
    },
    react : {
        useSuspense: false,
    }
  });

  export default i18n;