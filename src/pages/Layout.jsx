import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../modified-ui-components/Header';
import './style.css';

const Layout = () => {
  
  return (
    <>
      <div className='bg-beige'>

            <div className="min-h-[96vh]">
              <div className="h-12 mb-0 max-h-12"  >
                <Navbar className="z-10"/>;
              </div>
              <div className="MainContainer mb-auto flex-grow bg-inherit">
                <Outlet/>
              </div>
              {/* Footer needs fixing - disabled for now */}
              {/* <div >
                  <Footer />
              </div> */}
          </div>
      </div>
    </>
  )
};

export default Layout;