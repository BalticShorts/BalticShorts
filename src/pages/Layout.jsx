import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../modified-ui-components/Header';
import './style.css';
import Footer from "../modified-ui-components/Footer/Footer";

const Layout = () => {
  
  return (
    <>
      <div className="min-h-[100vh] flex flex-col justify-start bg-beige">
        <div className="h-12 mb-0 max-h-12"  >
          <Navbar className="z-10"/>;
        </div>
        <div className="MainContainer mb-auto flex-grow grow-1 bg-inherit">
          <Outlet/>
        </div>
        <div className="footer mt-auto bg-inherit">
            <Footer />
        </div>
    </div>
    </>
  )
};

export default Layout;