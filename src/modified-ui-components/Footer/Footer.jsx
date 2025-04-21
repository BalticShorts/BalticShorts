import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-black py-4 px-4 sm:px-8 text-sm bg-beige mt-auto h-50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start">
        <div className="flex space-x-6 mb-2 sm:mb-0 typography-body">
          <span>© {new Date().getFullYear()}</span>
          <a href="/about" className="link-normal link-hover">Par projektu</a>
          <a href="/about#contact" className="link-normal link-hover">Kontakti</a>
          <a href="/faq" className="link-normal link-hover">Lietošanas noteikumi</a>
        </div>

        <div className="flex space-x-6">
          <a href="https://www.instagram.com" className="link-normal link-hover">Instagram</a>
          <a href="https://www.facebook.com" className="link-normal link-hover">Facebook</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
