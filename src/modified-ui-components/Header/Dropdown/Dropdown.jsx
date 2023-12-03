import { useContext } from "react";
import { GlobalContext } from "../../../App";

export const Dropdown = () => {
    const context = useContext(GlobalContext);

    const signOut = async () => {
        try {
          await context.auth.signOut()
          context.setLoggedIn(false);
        } catch (error) {
          console.log('error on logging out: ' + error);
        }
      }


    return(
        <>
            <div className="w-40 h-fit pb-0 justify-start inline-flex z-10">
                <div className={`w-full ${context.loggedIn ? 'h-60' : 'h-40'} absolute`}>
                    <div className="w-full h-full absolute bg-beige shadow border border-black flex-col justify-start items-center inline-flex">
                        <div className="h-full w-full flex-col justify-center items-center flex">
                            <div className="h-full w-full flex-col justify-center items-start gap-3.5 flex">
                                {context.loggedIn && (
                                    <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide">
                                            <a href="/profile">MANS PROFILS</a>
                                    </div>
                                )}
                                <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide"><a href="/catalogue">KATALOGS</a></div>
                                <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide">PIETEIKT DARBU</div>
                                <hr className="w-full h-px border border-gray-700"/>
                                <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide"><a href="/about">PAR PROJEKTU</a></div>
                                {context.loggedIn && (
                                    <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide">
                                            <a href="/profile">UZSTĀDĪJUMI</a>
                                    </div>
                                )}
                                <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide">palīdzība</div>
                                {context.loggedIn && (
                                    <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide" onClick={() => signOut()}>IZIET</div>
                                )}
                                <hr className="w-full h-px border border-gray-700"/>
                                <div className="w-full justify-center items-center inline-flex">
                                    <span className="text-black text-xs font-bold font-['Arial'] uppercase leading-none tracking-wide">LV</span>
                                    {/* <span className="text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide"> | LT | EE | EN</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}