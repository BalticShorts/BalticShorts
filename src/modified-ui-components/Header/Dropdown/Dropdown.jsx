import { useContext } from "react";
import { GlobalContext } from "../../../App";

export const Dropdown = () => {
  const context = useContext(GlobalContext);  

  const signOut = async () => {
    try {
      await context.auth.signOut();
      context.setLoggedIn(false);
      context.setCurrentUser({});
      window.location.reload(true);
    } catch (error) {
      console.log("error on logging out: " + error);
    }
  };

  return (
    <>
      <div className="w-40 h-fit pb-0 justify-start inline-flex z-20">
        <div className={`w-full ${context.loggedIn ? "h-64" : "h-44"} absolute z-20`}>
          <div className="w-full h-full absolute bg-beige shadow border border-black flex-col justify-start items-center inline-flex z-20">
            <div className="h-full w-full flex-col justify-center items-center flex z-20">
              <div className="h-full w-full flex-col justify-center items-start gap-3.5 flex z-20">
                {context.loggedIn && (
                  <>
                  <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide">
                    <a href={"/user/" + context.currentUser.id}>
                      MANS PROFILS
                    </a>
                    </div>
                    {context.currentUser.is_admin && (
                      <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide">
                      <a href="/upload">PIETEIKT DARBU</a>
                    </div>
                    )}
                  </>
                )}
                <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide">
                  <a href="/catalogue">KATALOGS</a>
                </div>

                <hr className="w-full h-px border border-gray-700" />
                <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide">
                  <a href="/about">PAR PROJEKTU</a>
                </div>
                {context.loggedIn && (
                  <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide">
                    <a href={"/settings/" + context.currentUser.id}>
                      UZSTĀDĪJUMI
                    </a>
                  </div>
                )}
                <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide">
                  <a href={"/faq"}>
                    lietošanas noteikumi
                  </a>
                </div>
                {context.loggedIn && (
                  <div
                    className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide"
                    onClick={() => signOut()}
                  >
                    IZIET
                  </div>
                )}
                <hr className="w-full h-px border border-gray-700" />
                <div className="w-full justify-center items-center inline-flex">
                  <span className="text-black text-xs font-bold font-['Arial'] uppercase leading-none tracking-wide">
                    LV
                  </span>
                  {/* <span className="text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide"> | LT | EE | EN</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};