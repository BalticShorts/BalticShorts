import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../modified-ui-components/Header";
import "./style.css";
import Footer from "../modified-ui-components/Footer/Footer";

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldHideNavbarInitially = path.startsWith("/playlist/") || path.startsWith("/movie/") || path === "/";

  return (
    <div className="min-h-[100vh] flex flex-col justify-start bg-beige">
      {(showNavbar || !shouldHideNavbarInitially) && (
        <div className="h-fit !sticky top-0 left-0 z-50 bg-beige transition-all duration-300 border border-b-2 border-black">
          <Navbar />
        </div>
      )}
      <div className="MainContainer mb-auto flex-grow grow-1 bg-inherit">
        <Outlet />
      </div>
      <div className="footer mt-auto bg-inherit">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
