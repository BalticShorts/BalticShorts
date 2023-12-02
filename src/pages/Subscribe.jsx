import { useContext } from "react";
import { Footer } from "../modified-ui-components/Footer";
import { LoginPopup } from "../components/LoginPopup/LoginPopup";
import { GlobalContext } from "../App";

const Subscribe = () => {
    const context = useContext(GlobalContext)


    return(
        <>
        <div className="ParBalticShorts w-full h-fit relative bg-beige z-10">
            <div className="Advertisement w-full h-fit flex-col justify-start items-start inline-flex">
                <img className="w-full h-fit max-h-[980px]" src={require("./static/ad_1.jpg")} alt="Subscribe" />
                <div className="w-full flex-col justify-center items-center flex absolute">
                    <div className="flex-col justify-center items-center gap-28 flex mt-[10%] m-auto content-center">
                        <span className="w-96 h-9 text-center text-stone-50 text-4xl font-bold font-['SchoolBook'] uppercase leading-10 relative">SKATIES ĪSFILMAS NO VISAS BALTIJAS</span>
                        <span className="w-96 h-5 text-center text-stone-50 text-xl font-bold font-['Arial'] uppercase tracking-wide">NIEKA €2.99 mēnesī</span>
                        <div className="Button h-7 px-2.5 pt-1 pb-0.5 border border-stone-50 justify-center items-center gap-2.5 inline-flex cursor-pointer">
                            <span className="grow shrink basis-0 text-center text-stone-50 text-base font-normal font-['SchoolBook']" onClick={() => context.setLoggedInModal(true)}>Ienākt</span>
                    </div>
                    </div>
                </div>
            </div>
            <LoginPopup showing={context.loggedInModal} parentSetShowModal={context.setLoggedInModal}/>
            <Footer/>
        </div>
        </>
    );
}


export default Subscribe;