import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function MyGridPersons({data, maxRows, maxColumns}) {
    const navigate = useNavigate();
    const [rows, setRows] = useState(maxRows);
    const [columns, setColumns] = useState(maxColumns);

    const checkRow = (idx) => {    
        if((idx + 1) / columns > rows)
            return false
        return true
    }

    return (
        
        <div className='left-[15%] w-[75%] h-fit gap-6 flex flex-col items-center relative justify-center '>
            <div className={`grid grid-cols-5 items-center`}>
                {data.map((item, idx) => (
                    <>
                    {checkRow(idx) &&  
                        <div key={item.id} className="p-4 h-full mt-6">
                            <div className="m-auto w-60 h-72 relative" onClick={() => navigate('/profile/'+item.id)} >
                                <img className="w-48 h-72 left-0 top-0 relative" src="https://via.placeholder.com/200x260" />
                                <div className="w-80 h-10 relative mt-1 ml-4 items-center justify-center">
                                    <div>
                                        <span className="text-black text-base font-bold font-['SchoolBook']">{item.name} {item.surname}<br/></span>
                                        <span className="text-black text-sm font-normal font-['SchoolBook']">{item.role}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    </>
                ))}
                {data.length / columns > rows && (
                    <div className={`-left-6 h-24 relative flex -top-8 mb-4 col-span-5`}>
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