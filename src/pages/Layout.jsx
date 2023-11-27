import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../modified-ui-components/Header';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from '../aws-exports';
import { Amplify } from 'aws-amplify';
import { Footer } from '../modified-ui-components/Footer';
import './style.css';

const Layout = () => {
  Amplify.configure(awsExports);

  return (
    <>
      <div className='bg-beige'>
        <Authenticator>
          {({ signOut, user }) => ( 
            <div className="min-h-[96vh]">
              <div className="h-12 mb-0 max-h-12"  >
                <Navbar signOut={signOut}/>;
              </div>
              <div className="MainContainer mb-auto flex-grow bg-inherit">
                <Outlet/>
              </div>
              {/* Footer needs fixing - disabled for now */}
              {/* <div >
                  <Footer />
              </div> */}
          </div>
        )}
      </Authenticator>
    </div>
    </>
  )
};

export default Layout;