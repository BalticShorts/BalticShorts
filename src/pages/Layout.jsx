import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../modified-ui-components/Header";
import "./style.css";
import Footer from "../modified-ui-components/Footer/Footer";

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;
  const [showNavbar, setShowNavbar] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowNavbar(true);
        setTimeout(() => setFadeIn(true), 5);
      } else {
        setFadeIn(false);
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const shouldHideNavbarInitially =
  path.match(/^\/(lv|en|lt|ee)\/playlist\//) ||
  path.match(/^\/(lv|en|lt|ee)\/movie\//) ||
  path.match(/^\/(lv|en|lt|ee)\/?$/);

  return (
    <div className="min-h-[100vh] flex flex-col justify-start bg-beige">
      {(showNavbar || !shouldHideNavbarInitially) && (
        <div className={`!h-50 !sticky top-0 left-0 z-50 bg-beige transition-all duration-700 ease-in-out border-b border-black ${fadeIn || !shouldHideNavbarInitially  ? 'opacity-100' : 'opacity-0'}`}>
          <Navbar />
        </div>
      )}
      <div className="MainContainer mb-100 flex-grow grow-1 bg-inherit">
        <Outlet />
      </div>
      <div className="footer mt-auto bg-inherit">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
