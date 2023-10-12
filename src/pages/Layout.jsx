import { Outlet } from "react-router-dom";
import { FOOTER } from '../modified-ui-components';
import { Navbar } from '../modified-ui-components/Header';
const Layout = () => {
  return (
    <>
    {/* <Navbar meklTGroup="group-16-2.png" property1="variant-4" />; */}
    <Navbar property1="variant-2" />;
        <Outlet />
    <FOOTER />
    </>
  )
};

export default Layout;