import React, { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Dropdown } from "./Dropdown";
import { useContext } from "react";
import { GlobalContext } from "../../App";
import { LoginPopup } from "../../components/LoginPopup/LoginPopup";

export const Navbar = () => {
  const context = useContext(GlobalContext)

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

    // Are there users, that are logged in and are no paying???

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
      <div className="w-full h-11 min-h-full relative bg-inherit flex flex-row justify-center items-center">
        <div className="w-full max-w-screen-lg flex flex-row justify-between items-center px-4 sm:px-6 m-auto">
          <div className="flex flex-row gap-4 sm:gap-20 px-1 m-auto pr-0">
            <div className="pt-1 text-black text-lg font-normal font-['SchoolBook'] tracking-tight">
              <a href="/search">Meklēt</a>
            </div>
            <div className="pt-1 text-black text-lg font-normal font-['SchoolBook'] tracking-tight">
              <a href="/catalogue">Katalogs</a>
            </div>
          </div>
  
          {/* Centered Title */}
          <div className="flex-grow text-black text-xl sm:text-2xl md:text-3xl font-bold font-['SchoolBook'] uppercase tracking-[5px] sm:tracking-[9px] text-center overflow-hidden min-w-fit flex justify-center items-center m-auto px-1">
            <a href="/">Baltic Shorts</a>
          </div>
  
          <div className="flex flex-row gap-4 sm:gap-20">
            <div className="relative m-auto pt-1 flex flex-row cursor-pointer">
              {context.loggedIn ? (
                <div className="m-auto relative mr-4">{context.currentUser?.name}</div>
              ) : (
                <div
                  className="cursor-pointer m-auto pt-1 text-black text-lg font-normal font-['SchoolBook'] mr-4"
                  onClick={() => openModal()}
                >
                  Ienākt
                </div>
              )}
  
              <div className="inline-flex justify-end items-center relative ml-0 sm:ml-20">
                <div className="flex flex-col relative gap-4 sm:gap-20">
                  <MenuIcon onClick={() => toggleDropdown()} />
                  {showDropdown && (
                    <div className="absolute top-full right-0 mt-1 z-10 flex items-end flex-col">
                      <svg
                        className="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="9"
                        height="7"
                        viewBox="0 0 9 7"
                        fill="none"
                      >
                        <path d="M4.50035 0L8.99993 7H-6.90431e-05L4.50035 0Z" fill="black" />
                      </svg>
                      <Dropdown />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <AbonetPopup showing={showModal} parentSetShowModal={setShowModal}/> */}
      <LoginPopup />
    </>
  );  
} 
