import React from "react";
import logo from './static/logo_small.svg';
import video_src from './static/prod_vid.mp4';

const Prod = () => {
  return (
    <>
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-full h-screen overflow-hidden brightness-75">
        <video className='videoTag w-full h-screen overflow-hidden object-cover -z-10' autoPlay loop muted src={video_src} />
      </div>
      <div className="absolute top-4 py-5">
        <div className="flex justify-center items-center">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="absolute justify-center items-center h-screen flex flex-col">
        <div className="py-5 text-center">
          <div className="font-bold text-white text-5xl uppercase font-['SchoolBook']">Šeit no jauna top Baltijas īsfilmu<br/></div>
          <div className="font-bold text-white text-5xl uppercase font-['SchoolBook']">straumēšanas platforma</div>
        </div>
        <div className="text-center text-white text-xl p-2 font-['SchoolBook']">A streaming platform for Baltic short films is going to be here soon</div>
      </div>
    </div>
    </>
  );
}
  
  export default Prod;