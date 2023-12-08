import { useState } from "react";

export const DisplayedPlaylist = ({photoPosition}) => {
    const [postition, setPosition] = useState(photoPosition);


    return(
        <>
        {postition === 'left' ? (
        <div className="w-fit h-fit border border-black border-opacity-40 justify-center items-center flex flex-row my-6">
            <div className="relative w-[750px] h-[360px] border-r border-black border-opacity-40">
                <img className="w-fit h-fit" src="https://via.placeholder.com/750x360" />
                <div className="pl-2 absolute bottom-0 w-4/5 text-stone-50 text-3xl font-bold font-['SchoolBook'] leading-loose">LKA NACIONĀLĀS FILMU SKOLAS ABSOLVENTU DARBU IZLASE</div>
            </div>
            <div className="w-80 max-h-[360px] p-7 flex-col justify-between items-start inline-flex ">
                <div></div>
                <div className="m-auto w-72 h-60 text-black text-base font-normal font-['SchoolBook']">Baltic Shorts kuratoru veidota izlase ar jaunākajām Latvijas Kultūras Akadēmijas Nacionālās filmu skolas jauno režisoru veidotajām īsfilmām.</div>
                <div className="text-black text-base font-normal font-['SchoolBook'] border border-black h-fit w-fit px-6 cursor-pointer">Skatīties</div>
            </div>
        </div>
        ) : (
        <div className="w-fit h-fit border border-black border-opacity-40 justify-center items-center flex flex-row">
            <div className="w-80 max-h-[360px] p-7 flex-col justify-between items-start inline-flex ">
                <div></div>
                <div className="m-auto w-72 h-60 text-black text-base font-normal font-['SchoolBook']">Baltic Shorts kuratoru veidota izlase ar jaunākajām Latvijas Kultūras Akadēmijas Nacionālās filmu skolas jauno režisoru veidotajām īsfilmām.</div>
                <div className="text-black text-base font-normal font-['SchoolBook'] border border-black h-fit w-fit px-6 cursor-pointer">Skatīties</div>
            </div>
            <div className="relative w-[750px] h-[360px] border-l border-black border-opacity-40">
                <img className="w-fit h-fit" src="https://via.placeholder.com/750x360" />
                <div className="pl-2 absolute bottom-0 w-4/5 text-stone-50 text-3xl font-bold font-['SchoolBook'] leading-loose">LKA NACIONĀLĀS FILMU SKOLAS ABSOLVENTU DARBU IZLASE</div>
            </div>

        </div>  
        )}
        
        </>
    )
}