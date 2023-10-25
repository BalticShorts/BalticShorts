import React from 'react';
import { HashLink } from 'react-router-hash-link';

export const Footer = () => {
  const filePath = "./static/img/"
  return(
    <div className="w-[100%] h-[4vh] absolute bottom-0 bg-amber-50">
      <div className="Rectangle1 w-full h-48 left-0 top-0 absolute bg-amber-50 border-t border-black" />
      <div className="Group45 w-44 h-24 left-[12.5%] top-[35px] absolute">
        <div className="Group w-40 h-20 left-[0] top-[8.53px] absolute">
          <img id='footer-logo'
            alt="Group"
            src= {require(filePath+"group-45.png")}
          />
        </div>
      </div>
      <div className="2023 w-80 left-[12.5%] top-[147px] absolute text-black text-xl font-normal font-['SchoolBook']">©️ 2023</div>
      <div className="Frame18 w-80 h-16 left-[35%] top-[44px] absolute flex-col justify-start items-start inline-flex">
        <div className="ParProjektu py-1 w-80 text-black text-xl font-normal font-['SchoolBook']"><a href='/about'>Par projektu</a></div>
        <div className="Katalogs py-1 w-80 text-black text-xl font-normal font-['SchoolBook']"><a href='/about'>Katalogs</a></div>
        <div className="Kontakti py-1 w-80 text-black text-xl font-normal font-['SchoolBook']"><a href='/about#contact'>Kontakti</a></div>
        {/* <div className="Kontakti py-1 w-80 text-black text-xl font-normal font-['SchoolBook']"><HashLink smooth to='/about#contact'>Kontakti</HashLink></div> */}
      </div>
      <div className="Frame19 w-80 h-16 left-[65%] top-[44px] absolute flex-col justify-start items-start inline-flex">
        <div className="Instagram py-2 w-80 text-black text-xl font-normal font-['SchoolBook']"><a href='/about'>Instagram</a></div>
        <div className="Facebook py-2 w-80 text-black text-xl font-normal font-['SchoolBook']"><a href='/about'>Facebook</a></div>
      </div>
    </div>
  )
}
