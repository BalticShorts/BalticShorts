import { Outlet } from "react-router-dom";
import { FOOTER } from '../modified-ui-components';
import { Navbar } from '../modified-ui-components/Header';
import { Authenticator } from '@aws-amplify/ui-react';
import awsExports from '../aws-exports';
import { Amplify } from 'aws-amplify';

const Layout = () => {
  Amplify.configure(awsExports);

  return (
    <>
    {/* <Navbar meklTGroup="group-16-2.png" property1="variant-4" />; */}
    <div><Authenticator>
      {({ signOut, user }) => (
        <div>
          <div>
            <Navbar property1="variant-2" />;
          </div>
    <button onClick={signOut}>Sign out</button>
          <div></div>

            <div><Outlet /></div>

          <div><FOOTER /></div>
      </div>
    )}
    </Authenticator></div>
    </>
  )
};

export default Layout;