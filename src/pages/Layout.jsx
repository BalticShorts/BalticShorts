import { Outlet } from "react-router-dom";
import { Navbar } from '../modified-ui-components/Header';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from '../aws-exports';
import { Amplify } from 'aws-amplify';
import { Footer } from '../modified-ui-components/Footer';
import './style.css'

const Layout = () => {
  Amplify.configure(awsExports);

  return (
    <>
      <div><Authenticator>
        {({ signOut, user }) => (
          <div className="min-h-[200vh]">
            <div className=" bg-amber-50"  >
              <Navbar signOut={signOut}/>;
              {/* <Navbar meklTGroup="group-16-2.png" property1="variant-4" />; */}
            </div>
            
            <div className="MainContainer mb-auto h-10 flex-grow">
              <Outlet />

            </div>
            <div >
                <Footer />
            </div>

            
        </div>
      )}
    </Authenticator></div>
    </>
  )
};

export default Layout;