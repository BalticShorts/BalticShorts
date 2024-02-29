import { useEffect, useState } from "react"
import CloseIcon from '@mui/icons-material/Close';

export const AbonetPopup = ({showing, parentSetShowModal}) => {
    const [showModal, setShowModal] = useState(showing);

    useEffect(() => {
        setShowModal(showing);
    },[showing])

    useEffect(() => {
        parentSetShowModal(showModal);
    }, [showModal])
    
    const goToPayement = async () => {
        
    }

    return(
        <>
            {showModal && (
            <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-md bg-opacity-50">
                <div className="w-96 h-64 px-5 pt-5 bg-beige border border-black flex-col justify-start items-end gap-10 inline-flex">
                    <div className="w-3.5 h-3.5 relative">
                        <CloseIcon className="cursor-pointer" onClick={() => setShowModal(false)}/>
                    </div>
                    <div className="pb-12 self-stretch flex-col justify-start items-center inline-flex">
                        <div className=" w-96 text-center text-black text-base font-normal font-['SchoolBook']">
                            Lai skatītos šo saturu ir nepieciešams abonements.<br/><br/>Abonē Baltic Shorts un skaties 500+ filmas no Baltijas valstīm tikai par €2.99 mēnesī.
                            </div>
                        <div className="Frame137 pt-6 flex-col justify-start items-start flex">
                            <div className="Button h-7 px-2.5 pt-1 pb-0.5 bg-beige border border-black justify-center items-center gap-2.5 inline-flex cursor-pointer">
                                <div className="cursor-pointer grow shrink basis-0 text-center text-black text-base font-normal font-['SchoolBook'] " onClick={() => goToPayement()}>Abonēt</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}



