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
      <div className="w-36 h-fit justify-start inline-flex z-20 bg-beige border border-black">
        <div className="h-full w-full flex flex-col justify-center items-start gap-3 flex z-20 my-10">
          <div className="flex flex-col ml-2 text-black typography-technical-12 uppercase gap-2">
            <div>
              <a href="/">Sākums</a>
            </div>
            {context.loggedIn && (
              <>
                <div>
                  <a href={"/user/" + context.currentUser.id}>
                    MANS PROFILS
                  </a>
                </div>
                {context.currentUser.is_admin && (
                  <div>
                    <a href="/upload">PIETEIKT DARBU</a>
                  </div>
                )}
              </>
            )}
            <div>
              <a href="/catalogue">KATALOGS</a>
            </div>
          </div>
          <div className="w-full border-b border-black" />
          <div className="flex flex-col ml-2 text-black typography-technical-12 uppercase gap-2">

            <div>
              <a href="/about">PAR PROJEKTU</a>
            </div>
            {context.loggedIn && (
              <div>
                <a href={"/settings/" + context.currentUser.id}>
                  UZSTĀDĪJUMI
                </a>
              </div>
            )}
            <div>
              <a href={"/faq"}>
                lietošanas noteikumi
              </a>
            </div>
            {context.loggedIn && (
              <div
              
                onClick={() => signOut()}
              >
                IZIET
              </div>
            )}
          </div>
          {/* <hr className="w-full h-px border border-gray-700" />
          <div className="w-full justify-center items-center inline-flex">
            <span className="text-black typography-technical-12">
              LV
            </span>
            <span className="text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide"> | LT | EE | EN</span>
          </div> */}
        </div>
      </div>
    </>
  );
};