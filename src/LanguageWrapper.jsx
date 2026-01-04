import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import i18n from "./i18n";

const supportedLanguages = ["lv", "en", "lt", "ee"];

export default function LanguageWrapper({ children }) {
  const { lang } = useParams();

  useEffect(() => {
    if (supportedLanguages.includes(lang) && i18n.language !== lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
    }
  }, [lang]);

  if (!supportedLanguages.includes(lang)) {
    return <Navigate to="/en" replace />;
  }

  return children;
}
