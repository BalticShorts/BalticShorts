import { useContext } from "react";
import { LoginPopup } from "../components/LoginPopup/LoginPopup";
import { GlobalContext } from "../App";
import { useNavigate } from "react-router-dom";

const Subscribe = () => {
    const context = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (context.loggedIn) {
            navigate("/subscribe");
        } else {
            context.setLoggedInModal(true);
        }
    };

    return(
        <>
        <div className="ParBalticShorts w-full h-fit h-max-vh relative bg-beige z-0 flex flex-col justify-start items-star">
            <div className="Advertisement w-full h-fit flex-col justify-start items-start inline-flex">
                <img className="w-full h-fit" src={require("./static/ad_1.jpg")} alt="Subscribe" />
                <div className="w-full flex-col justify-center items-center flex absolute">
                    <div className="flex-col justify-center items-center gap-28 flex mt-[10%] m-auto content-center">
                        <span className="w-96 h-9 text-center text-stone-50 text-4xl font-bold font-['SchoolBook'] uppercase leading-10 relative">SKATIES ĪSFILMAS NO VISAS BALTIJAS</span>
                        <span className="w-96 h-5 text-center text-stone-50 text-xl font-bold font-['Arial'] uppercase tracking-wide">NIEKA €3.99 mēnesī</span>
                        <div className="Button h-7 px-2.5 pt-1 pb-0.5 border border-stone-50 justify-center items-center gap-2.5 inline-flex cursor-pointer">
                            <span className="grow shrink basis-0 text-center text-stone-50 text-base font-normal font-['SchoolBook'] cursor-pointer" onClick={handleButtonClick}>
                                {context.loggedIn ? "Abonēt" : "Ienākt"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <LoginPopup showing={context.loggedInModal} parentSetShowModal={context.setLoggedInModal}/>
        </div>
        </>
    );
}

export default Subscribe;