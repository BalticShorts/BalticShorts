import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Dropdown } from "./Dropdown";
import { useContext } from "react";
import { GlobalContext } from "../../App";
import { LoginPopup } from "../../components/LoginPopup/LoginPopup";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const context = useContext(GlobalContext)
  const Auth = context.auth

  const [showDropdown, setShowDropdown] = useState(false);

  function toggleDropdown(){
    setShowDropdown(!showDropdown);
  }

  function openModal(){
    if (showDropdown)
      setShowDropdown(!showDropdown)
    context.setLoggedInModal(true)
  }

  useEffect(() => {

    // need fixing
    // console.log('test')
    // if(context.loggedIn){
    //   console.log('test2')


    //   if(!context.currentUser.completed_setup){
    //     console.log('test3')

    //     if(context.currentUser.id !== undefined){
    //       console.log('test4')

        
    //     if(window.location.pathname !== '/profile/'+context.currentUser.id+'/setup'){
    //       console.log('test5')

    //       navigate('/profile/'+context.currentUser.id+'/setup');
    //     }
    //   }
        // console.log('context.currentUser')
        // console.log(context.currentUser)
        // need to finish creating profile
    //   }
    // }
  }, [context.loggedIn])

  return (
  <>
    <div className="w-full h-[44px] relative bg-beige flex flex-row justify-center items-center">
      <div className="w-full h-full left-0 top-0 absolute bg-beige border-b border-black" />
      <div className="w-[65%] flex flex-row">
        <div className="flex flex-row gap-20">
          <div className="m-auto pt-1 relative text-black text-lg font-normal font-['SchoolBook'] tracking-tight"><a href="/search">Meklēt</a></div>
          <div className="m-auto pt-1 relative text-black text-lg font-normal font-['SchoolBook'] tracking-tight"><a href="/catalogue">Katalogs</a></div>
        </div>
        <div className="m-auto pt-3 relative text-black text-2xl font-bold font-['SchoolBook'] uppercase tracking-[9px]"><a href="/">Baltic Shorts</a></div>
        <div className="flex flex-row gap-20">
          {/* <div className="h-[19px] m-auto pt-1 text-lg relative text-right text-black font-normal font-['SchoolBook'] tracking-tight"><a href="/profile">Mans profils</a></div> */}
          <div className="relative m-auto pt-1 flex flex-row cursor-pointer" >
            {context.loggedIn ? 
              <div className="m-auto relative mr-20">{context.currentUser.name}</div> 
              : 
              <div className="cursor-pointer m-auto pt-1 relative text-black text-lg font-normal font-['SchoolBook'] mr-20" onClick={() => openModal()}>Ienākt</div>}

            <div className="inline-flex justify-end items-center relative">
              <div className="flex flex-col relative">
                <MenuIcon onClick={() => toggleDropdown()}></MenuIcon>
                {showDropdown && (
                  <div className="absolute top-full right-0 mt-1 z-10 flex items-end flex-col">
                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M4.50035 0L8.99993 7H-6.90431e-05L4.50035 0Z" fill="black"/>
                    </svg>
                    <Dropdown ></Dropdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <AbonetPopup showing={showModal} parentSetShowModal={setShowModal}/> */}
    <LoginPopup showing={context.loggedInModal} parentSetShowModal={context.setLoggedInModal}/>
  </>
  );
} 
