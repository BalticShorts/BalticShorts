import PropTypes from "prop-types";
import React from "react";
// import { LogoLongWaveAnim } from "./LogoLongWaveAnim";
// import { MeklT } from "./MeklT";

export const Navbar = ({signOut }) => {
  return (
    <div className="w-full h-[4vh] relative bg-amber-50 flex flex-row justify-center items-center">
      <div className="w-full h-[60px] left-0 top-0 absolute bg-stone-50 border-b border-black bg-inherit" />
      <div className="w-full flex flex-row">
        <div className="h-[19px] m-auto pt-1 relative text-black text-lg font-normal font-['SchoolBook'] tracking-tight"><a href="/">Sākums</a></div>
        <div className="h-[19px] m-auto pt-1 relative text-black text-lg font-normal font-['SchoolBook'] tracking-tight"><a href="/search">Meklēt</a></div>
        <div className="m-auto pt-3 relative text-black text-2xl font-bold font-['SchoolBook'] uppercase tracking-[9px]">Baltic Shorts</div>
        {/* <div className="w-[12%] h-[19px] right-[30%] top-[40%] text-lg absolute text-right text-black font-normal font-['SchoolBook'] tracking-tight">EN | LV | LT | EE</div> */}
        <div className="h-[19px] m-auto pt-1 text-lg relative text-right text-black font-normal font-['SchoolBook'] tracking-tight"><a href="/profile">Mans profils</a></div>
        <div className="h-[30px] relative m-auto pt-1">
          <div className="w-20 h-[30px] right-0 top-0 absolute bg-stone-50 rounded-[20px] border border-black" />
          <div className="right-[8px] top-[6px] absolute text-center text-black text-base font-normal font-['SchoolBook']" onClick={() => signOut()}>SignOut</div>
        </div>
      </div>
    </div>
  );
} 

Navbar.propTypes = {
  property1: PropTypes.oneOf(["variant-4", "variant-2", "variant-3", "default"]),
};
