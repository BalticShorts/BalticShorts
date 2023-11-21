
export const Dropdown = ({signOut}) => {
    return(
        <div className="w-40 h-52 pb-0 justify-start inline-flex">
            <div className="w-full h-40 relative">
                <div className="w-full h-full absolute bg-stone-50 shadow border border-black flex-col justify-start items-center inline-flex">
                    <div className="h-full w-full flex-col justify-center items-center flex">
                        <div className="h-full w-full flex-col justify-center items-start gap-3.5 flex">
                            <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide"><a href="/catalogue">KATALOGS</a></div>
                            <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide">PIETEIKT DARBU</div>
                            <hr className="w-full h-px border border-gray-700"/>
                            <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide"><a href="/about">PAR PROJEKTU</a></div>
                            <div className="ml-2 text-black text-xs font-normal font-['Arial'] uppercase leading-none tracking-wide">palīdzība</div>
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
    )
}