import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function MyGridPlaylists({data, maxRows, maxColumns}) {
    const navigate = useNavigate();
    const [rows, setRows] = useState(maxRows);
    const [columns, setColumns] = useState(maxColumns);
    console.log(data)

    const checkRow = (idx) => {    
        if((idx + 1) / columns > rows)
            return false
        return true
    }

    return (
        
        <div className='left-[15%] w-[75%] h-fit gap-6 flex flex-col items-center relative justify-center '>
            <div className={`grid grid-cols-3 items-center`}>
                {data.map((item, idx) => (
                    <>
                    {checkRow(idx) && (
                        <div key={item.id} className="p-4 h-full">
                            <div className="SarakstsInLists m-auto w-80 h-48 relative" onClick={() => navigate('/playlist/'+item.id)} >
                                <img className="Thumb w-80 h-24 left-0 top-0 relative" src="https://via.placeholder.com/350x100" />
                                <div className="w-80 h-48 left-0 top-0 absolute bg-white bg-opacity-0 border border-black" />
                                <div className="w-80 h-10 relative mt-1 ml-4 items-center justify-center">
                                <div>
                                    <span className="text-black text-base font-bold font-['SchoolBook']">{item?.title}<br/></span>
                                    <span className="text-black text-sm font-normal font-['SchoolBook']">by {item?.creator}</span>
                                </div>
                                </div>
                                <div className="w-80 h-2.5 left-[15.09px] top-[172.45px] absolute text-black text-xs font-normal font-['Arial'] tracking-wide">FILMAS  {item?.length}  |  SEKOTĀJI  10</div>
                            </div>
                        </div>
                    )}
                    </>
                ))}
                {data.length / columns > rows && (
                    <div className={`h-24 relative flex -top-8 mb-4 col-span-3`}>
                        <div className='w-full h-20 relative flex opacity-60'>
                            <div className="w-full h-16 relative bg-gradient-to-b from-stone-50 to-zinc-300" />
                        </div>
                            <div className="w-full h-2.5 m-auto mt-12 absolute flex items-center justify-center">
                            <div className="w-full h-2 top-[1px] relative text-black text-xs font-normal font-['Arial'] tracking-wide text-center" onClick={() => setRows(rows+1)}>Vairāk</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
  }