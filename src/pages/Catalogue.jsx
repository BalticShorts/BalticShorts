import { useEffect, useState } from "react";
import { Footer } from "../modified-ui-components/Footer";
import { useParams } from "react-router-dom";


const getTab = async id => {
  return document.getElementById(id);
}


const Catalogue = () => {
    const [tab, setTab] = useState(['Movies', null]);

    const { givenTab } = useParams();
    useEffect(() => {

      const get = async () => {
        try {
            if(givenTab !== undefined){
              setTab([givenTab, tab[0]]);}

          } catch (error) {
            console.log('Error on fetching: ', error);
          }
        }
      get();

      }, []);

    useEffect(() =>{
      const changeTab = async () => {
        getTab(tab[1]).then((currentTab) => {
          if(currentTab !== null){
            currentTab.classList.remove("font-bold")
            currentTab.classList.add("font-normal")
          }
        });
        getTab(tab[0]).then((currentTab) => {
          if(currentTab !== null){
            currentTab.classList.remove("font-normal")
            currentTab.classList.add("font-bold")
          }
        });
        
      }
      changeTab();
    }, [tab]);



    return(
        <>
          <div className="bg-beige">
              <div className="w-full h-12 relative">
                  <div className="w-full h-12 absolute bg-beige border-b border-black" />
                  <div className="w-full mt-1 h-6 flex items-center justify-center relative">
                      <div id="Movies" className="h-5 mx-2 text-center text-black tex text-xl font-bold font-['SchoolBook'] tracking-tight inline-flex cursor-pointer" onClick={ () => setTab(['Movies', tab[0]]) }>Filmas</div>
                      <div id="Persons" className="h-5 mx-6 text-center text-black text-xl font-['SchoolBook'] font-normal tracking-tight inline-flex cursor-pointer" onClick={ () => setTab(['Persons', tab[0]]) }>Personas</div>
                      <div id="Playlists" className="h-5 mx-2 my-auto text-center text-black text-xl font-normal font-['SchoolBook'] tracking-tight inline-flex cursor-pointer" onClick={ () => setTab(['Playlists', tab[0]]) }>Saraksti</div>
                  </div>
              </div>
              <Footer/>
          </div>
        </>
    );
}


export default Catalogue;