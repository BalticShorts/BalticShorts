import React from 'react';
import { Outlet } from 'react-router-dom';
import './style.css';

const Layout = () => {
  
  return (
    <>
      <div className='bg-beige'>

            <div className="min-h-[96vh]">
              <div className="MainContainer mb-auto flex-grow bg-inherit">
                <Outlet/>
              </div>
          </div>
      </div>
    </>
  )
};

export default Layout;