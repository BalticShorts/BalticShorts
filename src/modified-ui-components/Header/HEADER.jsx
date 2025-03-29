import React, { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Dropdown } from "./Dropdown";
import { useContext } from "react";
import { GlobalContext } from "../../App";
import { LoginPopup } from "../../components/LoginPopup/LoginPopup";
import gifAnimation from "../../assets/images/bs_logo_animation.gif";
import { ReactComponent as Logo } from "../../assets/images/bs_logo_wide.svg";
import { ReactComponent as User } from "../../assets/images/user.svg";
import { ReactComponent as X } from "../../assets/images/x.svg";
import Search from "../../pages/Search";

export const Navbar = () => {
  const context = useContext(GlobalContext);

  const [showDropdown, setShowDropdown] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false); // State to control search modal visibility

  function toggleDropdown(){
    setShowDropdown(!showDropdown);
  }

  function openModal(){
    if (showDropdown)
      setShowDropdown(!showDropdown);
    context.setLoggedInModal(true);
  }

  function openSearchModal() {
    setShowSearchModal(true);
  }

  function closeSearchModal() {
    setShowSearchModal(false); // Close the search modal
  }

  useEffect(() => {
    if (showSearchModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSearchModal]);

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
    // }
    // console.log('context.currentUser')
    // console.log(context.currentUser)
    // need to finish creating profile
    //   }
    // }
  }, [context.loggedIn]);

  return (
    <>
      <div className="w-full h-50 min-h-full bg-inherit flex flex-row justify-center items-center">
        <div className="w-full flex flex-row justify-between items-center m-auto !max-w-[1100px] my-15">
          <div className="flex flex-row gap-25">
            <div className="typography-body-small text-center items-center flex">
              {showSearchModal ? (
                <div onClick={closeSearchModal} className="cursor-pointer flex flex-row items-center">
                  <X className="w-15 h-15 mr-2" />
                  <div className="typography-body-small">Aizvērt</div>
                </div>
              ) : (
                <span onClick={openSearchModal} className="cursor-pointer typography-body-small">
                  Meklēt
                </span>
              )}
            </div>
            {!showSearchModal && (
              <div className="typography-body-small text-center items-center flex cursor-pointer">
              <a href="/catalogue">Katalogs</a>
            </div>
            )}
          </div>

          <div className="relative text-center justify-center items-center w-1/3 group" 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            
            {!isHovered ? (
            <Logo onClick={() => window.location.href = '/'}/>
            ):(
            <img
              src= {gifAnimation}
              alt="Baltic Shorts"
              className="w-auto h-4/5 cursor-pointer"
              onClick={() => window.location.href = '/'}
            />
            )}
          </div>

          <div className="flex flex-row gap-25">
          {!showSearchModal && (
            <div className="relative flex flex-row cursor-pointer">
              {context.loggedIn ? (
                <div className="m-auto relative">
                  <User className="text-white" onClick={() => window.location.href = "/user/" + context.currentUser?.id}/>
                </div>
              ) : (
                <div
                  className="cursor-pointer typography-body-small text-center items-center flex"
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
            )}
          </div>
        </div>
      </div>
      {showSearchModal && (
        <div className="absolute top-[50px] left-0 right-0 bottom-0 bg-beige z-[80] overflow-auto min-h-screen h-full">
          <div className="relative w-full h-fit min-h-screen">
            <Search />
          </div>
        </div>
      )}
      <LoginPopup />
    </>
  );  
}
