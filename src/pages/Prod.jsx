import React, { useState, useEffect } from "react";
import logo from './static/logo_small.svg';
// import video_src from './static/test.mp4';
import video_src from './static/prod_vid.mp4';
import mobileBackground from './static/mobile_background.jpg';

const Prod = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen font-['SchoolBook']">
        <div className="w-full h-screen overflow-hidden brightness-75">
          {isMobile ? (
            <img src={mobileBackground} alt="Mobile Background" className="w-full h-screen object-cover -z-10" />
          ) : (
            <video className='videoTag w-full h-screen overflow-hidden object-cover -z-10' autoPlay loop muted>
              <source src={video_src} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="absolute top-2.5">
          <div className="flex justify-center items-center">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="absolute justify-center items-center h-screen flex flex-col select-none">
          <div className="py-5 text-center">
            <div className={`font-bold text-white uppercase font-['SchoolBook'] ${isMobile ? 'text-3xl' : 'text-4xl'}`}>
              Šeit no jauna top{isMobile && <br/>} Baltijas īsfilmu<br/></div>
            <div className={`font-bold text-white uppercase font-['SchoolBook'] ${isMobile ? 'text-3xl' : 'text-4xl'}`}>
              straumēšanas{isMobile && <br/>} platforma</div>
          </div>
          <div className={`text-center text-white p-2 font-['SchoolBook'] ${isMobile ? 'text-lg' : 'text-xl'}`}>
            A streaming platform for Baltic short films{isMobile && <br/>} is going to be here soon
          </div>
        </div>
      </div>
    </>
  );
}

export default Prod;
