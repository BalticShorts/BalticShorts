import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-black py-4 px-4 sm:px-8 text-sm bg-beige mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start">
        <div className="flex space-x-6 mb-2 sm:mb-0">
          <span>© {new Date().getFullYear()}</span>
          <a href="/about" className="hover:underline">Par projektu</a>
          <a href="/about#contact" className="hover:underline">Kontakti</a>
          <a href="/faq" className="hover:underline">Lietošanas noteikumi</a>
        </div>

        <div className="flex space-x-6">
          <a href="https://www.instagram.com" className="hover:underline">Instagram</a>
          <a href="https://www.facebook.com" className="hover:underline">Facebook</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
