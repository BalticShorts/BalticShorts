import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import lv from "./locales/lv.json";
import en from "./locales/en.json";
import lt from "./locales/lt.json";
import ee from "./locales/ee.json";
const savedLanguage = localStorage.getItem("language") || "lv";
const browserLanguage = navigator.language.slice(0, 2);

const supportedLanguages = ["lv", "en", "lt", "ee"];

const initialLanguage =
  savedLanguage || (supportedLanguages.includes(browserLanguage) ? browserLanguage : "lv");
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      lv: { translation: lv },
      en: { translation: en },
      lt: { translation: lt },
      ee: { translation: ee },
    },
    lng: savedLanguage,
    fallbackLng: "lv",
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

  if (!savedLanguage) {
  localStorage.setItem("language", initialLanguage);
}
export default i18n;
