import React from 'react';
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  return (
    <footer className="border-t border-black py-4 px-4 sm:px-8 text-sm bg-beige mt-auto h-50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start">
        <div className="flex space-x-6 mb-2 sm:mb-0 typography-body-small">
          <span>© {new Date().getFullYear()}</span>
          <a href={`/${i18n.language}/about`} className="link-body-small link-hover">{t("Par Projektu")}</a>
          <a href={`/${i18n.language}/about#contact`} className="link-body-small link-hover">{t("Kontakti")}</a>
          <a href={`/${i18n.language}/faq`} className="link-body-small link-hover">{t("Lietošanas noteikumi")}</a>
        </div>

        <div className="flex space-x-6">
          <a href="https://www.instagram.com" className="link-body-small link-hover">Instagram</a>
          <a href="https://www.facebook.com" className="link-body-small link-hover">Facebook</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
