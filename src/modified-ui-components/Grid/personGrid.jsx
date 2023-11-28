import { useNavigate } from "react-router-dom";
export function MyGridPersons({data}) {
    const navigate = useNavigate();
    return (
        
        <div className='left-[15%] w-[75%] h-fit gap-6 flex flex-col items-center relative justify-center '>
            <div className="grid grid-cols-5 items-center">
                {data.map((item) => (
                <div key={item.id} className="p-4 h-full">
                    <div className="SarakstsInLists m-auto w-60 h-72 relative" onClick={() => navigate('/profile/'+item.id)} >
                        <img className="w-48 h-72 left-0 top-0 relative" src="https://via.placeholder.com/200x260" />
                        <div className="w-80 h-10 relative mt-1 ml-4 items-center justify-center">
                            <div>
                                <span className="text-black text-base font-bold font-['SchoolBook']">{item.name} {item.surname}<br/></span>
                                <span className="text-black text-sm font-normal font-['SchoolBook']">{item.role}</span>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
  }