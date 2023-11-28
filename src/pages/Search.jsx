import { useEffect, useState } from "react";
import { Footer } from "../modified-ui-components/Footer";
import { getSearch } from "../custom-queries/queries";
import { API, graphqlOperation } from "aws-amplify";
import { MyGridMovies, MyGridPersons, MyGridPlaylists } from "../modified-ui-components/Grid";

const Search = () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const [inputText, setInputText] = useState("");
    const [searchResult, setSearchResult] = useState({"movies": [], "persons": [], "playlists": []})
    const [searching, setSearching] = useState(false);


    const fetchSearch = async searchString => {
      const original = searchString;
      const lowSearchString = searchString.toLowerCase();
      const firstCapitalisedSearchString = searchString.charAt(0).toUpperCase() + searchString.slice(1).toLowerCase();
      const capitalisedSearchString = searchString.toUpperCase();
      const res = await API.graphql(graphqlOperation(getSearch,
        {'searchString':original, 'lowSearchString':lowSearchString, 'firstCapitalisedSearchString':firstCapitalisedSearchString, 'capitalisedSearchString':capitalisedSearchString}
        ));
      return {"movies": res.data.listMovies.items, "persons": res.data.listPeople.items, "playlists": res.data.listMoviePlaylists.items}
    }

    useEffect(() => {
        const get = async () => {

          try {     

          } catch (error) {
            console.log('Error on fetching: ', error);
          }
        }
        get();
      }, []);

      const handleChange = (e) => {
        e.preventDefault();
        setInputText(e.target.value);
      };
      

      useEffect(() => {
        const search = async () => {
          if(!searching){
            setSearching(true);
            if (inputText.length > 0 ) {
              const res = await fetchSearch(inputText);
              try {
                setSearchResult(res);
                sleep(1000);

              } catch (error) {      
              }
                // maybe add cooldown for too many requests?
            }else{
              setSearchResult({"movies": [], "persons": [], "playlists": []})
            }
          }
          setSearching(false);
        }
        setSearchResult({"movies": [], "persons": [], "playlists": []})
        search();
        console.log(searchResult)
      }, [inputText]);

      
      useEffect(() => {
      const footer = document.getElementById("footer");
      const offsetHeight = document.getElementById("searchResult")?.offsetHeight;
      if (offsetHeight > 500)
        footer?.classList.add('relative')
      else
        footer?.classList.remove('relative')
      }, [searchResult])

    return(
        <>
            <div className="bg-beige">
              <div id="searchResult" className="w-full h-fit mb-24">
                <div className="w-full h-7 mt-10 relative flex items-center justify-center">
                    <div className="w-2/6 h-px top-[30px] absolute border border-black"></div>
                    <div className="w-80 h-6 top-0 absolute text-center text-black text-opacity-70 text-xl font-normal font-['SchoolBook'] tracking-tight">
                        <input placeholder="Meklēt" className="bg-beige text-center border-none outline-none" onChange={handleChange} value={inputText}></input>
                    </div>
                </div>
                {searchResult.movies?.length > 0 ?
                <div className='w-[75%] h-fit gap-6 my-24 flex flex-col items-center relative justify-center '>
                  <div className="w-full h-5 text-black text-xl font-bold font-['Arial'] uppercase tracking-wide relative left-[15%]">Filmas</div>
                  <MyGridMovies data={searchResult.movies}></MyGridMovies>
                  </div>
                : <></>}
                {searchResult.persons?.length > 0 ?
                  <div className='w-[75%] h-fit gap-6 my-24 flex flex-col items-center relative justify-center '>
                    <div className="w-full h-5 text-black text-xl font-bold font-['Arial'] uppercase tracking-wide relative left-[15%]">Personas</div>
                    <MyGridPersons data={searchResult.persons}></MyGridPersons>
                  </div>
                : <></>}
                {searchResult.playlists?.length > 0 ?
                  <div className='w-[75%] h-fit gap-6 my-24 flex flex-col items-center relative justify-center '>
                    <div className="w-full h-5 text-black text-xl font-bold font-['Arial'] uppercase tracking-wide relative left-[15%]">Saraksti</div>
                    <MyGridPlaylists data = {searchResult.playlists !== undefined ? searchResult.playlists : []}></MyGridPlaylists>
                  </div>
                : <></>}
              </div>
              <div id="footer" className="mt-10 min-h-fit" >
                <Footer/>
              </div>
            </div>
            
        </>
    );
}


export default Search;