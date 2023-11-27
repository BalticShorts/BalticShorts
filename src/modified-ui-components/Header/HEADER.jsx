import PropTypes from "prop-types";
import React, { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Dropdown } from "./Dropdown";
// import { LogoLongWaveAnim } from "./LogoLongWaveAnim";
// import { MeklT } from "./MeklT";

export const Navbar = ({signOut}) => {

  const [showDropdown, setShowDropdown] = useState(false);
  function toggleDropdown(){
    setShowDropdown(!showDropdown);
  }


  return (
    <div className="w-full relative bg-beige flex flex-row justify-center items-center">
      <div className="w-full h-full left-0 top-0 absolute bg-beige border-b border-black" />
      <div className="w-full flex flex-row">
      <div className="h-[19px] m-auto pt-1 relative text-black text-lg font-normal font-['SchoolBook'] tracking-tight"><a href="/search">Meklēt</a></div>
      <div className="h-[19px] m-auto pt-1 relative text-black text-lg font-normal font-['SchoolBook'] tracking-tight"><a href="/catalogue">Katalogs</a></div>
        <div className="m-auto pt-3 relative text-black text-2xl font-bold font-['SchoolBook'] uppercase tracking-[9px]"><a href="/">Baltic Shorts</a></div>
        {/* <div className="w-[12%] h-[19px] right-[30%] top-[40%] text-lg absolute text-right text-black font-normal font-['SchoolBook'] tracking-tight">EN | LV | LT | EE</div> */}
        <div className="h-[19px] m-auto pt-1 text-lg relative text-right text-black font-normal font-['SchoolBook'] tracking-tight"><a href="/profile">Mans profils</a></div>
        <div className="h-[19px] relative m-auto pt-1 flex flex-col cursor-pointer" >
          <div className="inline-flex justify-end">
          
          <MenuIcon onClick={() => toggleDropdown()}></MenuIcon></div>
          <div className="inline-flex relative h-fit mt-0 z-10">
          {showDropdown ? <Dropdown></Dropdown> : <></>}</div>
          

          {/* <div className="w-20 h-[30px] right-0 top-0 absolute bg-beige rounded-[20px] border border-black" />
          <div className="right-[8px] top-[6px] absolute text-center text-black text-base font-normal font-['SchoolBook']" onClick={() => signOut()}>SignOut</div> */}
        </div>
      </div>
    </div>
  );
} 

Navbar.propTypes = {
  property1: PropTypes.oneOf(["variant-4", "variant-2", "variant-3", "default"]),
};
