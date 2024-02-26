import React from "react";
import backgroundImage from './static/ad_1.jpg';
import logo from './static/logo_small.svg';

const Prod = () => {
  const containerStyles = 'bg-cover bg-center h-screen flex justify-center items-center';
  const textStyles = 'text-white text-4xl font-bold';
  return (
    <>
      <div className='bg-cover bg-center h-screen flex justify-center items-center' style={{ backgroundImage: `url(${backgroundImage})` }}>
        
        <div className="absolute top-4 py-5">
          <div className="flex justify-center items-center">
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="py-5 gap-y-5 text-center">
            <div className="font-bold text-white text-5xl uppercase font-['SchoolBook']">Šeit no jauna top Baltijas īsfilmu<br/></div>
            <div className="font-bold text-white text-5xl uppercase font-['SchoolBook']">straumēšanas platforma</div>
          </div>
          <div className="font-bold text-center text-white text-xl border border-white p-2 mt-5 font-['SchoolBook']">Pieejama drīz</div>
        </div>
      </div>
    </>
  );
}
  
  export default Prod;