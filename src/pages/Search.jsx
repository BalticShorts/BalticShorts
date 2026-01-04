import { useContext, useEffect, useState } from "react";
import { getSearch } from "../custom-queries/queries";
import { API } from "aws-amplify";
import { MyGridMovies, MyGridPersons, MyGridPlaylists } from "../modified-ui-components/Grid";
import { GlobalContext } from "../App";
import { PersonList } from "../modified-ui-components/PersonList";
import { useTranslation } from "react-i18next";

const Search = () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const context = useContext(GlobalContext);
    const { t, i18n } = useTranslation();

    const [inputText, setInputText] = useState("");
    const [searchResult, setSearchResult] = useState({"movies": [], "persons": [], "playlists": []})
    const [searching, setSearching] = useState(false);


    const fetchSearch = async searchString => {
      const original = searchString;
      const lowSearchString = searchString.toLowerCase();
      const firstCapitalisedSearchString = searchString.charAt(0).toUpperCase() + searchString.slice(1).toLowerCase();
      const capitalisedSearchString = searchString.toUpperCase();
      const res = await API.graphql({
        query : getSearch,
        variables : {'searchString':original, 'lowSearchString':lowSearchString, 'firstCapitalisedSearchString':firstCapitalisedSearchString, 'capitalisedSearchString':capitalisedSearchString},
        authMode: 'AWS_IAM'
        });
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
      }, [inputText]);

      
      useEffect(() => {
      const footer = document.getElementById("footer");
      const offsetHeight = document.getElementById("searchResult")?.offsetHeight;
      if (offsetHeight > 500)
        footer?.classList.add('relative')
      else
        footer?.classList.remove('relative')
      }, [searchResult])
      useEffect(() => {
        document.title = 'Baltic Shorts - Search';
      }, []);

    return(
        <>
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-beige overflow-auto max-w-[1100px] m-auto flex flex-col items-center justify-center no-scrollbar !mb-50">
            <div className="bg-beige h-full w-full">
              <div id="searchResult" className="w-full h-full ">
                <div className="w-full h-fit mt-50 relative flex flex-col items-center justify-center">
                    <div className="w-3/5 h-px top-[30px] absolute border border-black"></div>
                    <div className="w-80 h-6 top-0 absolute text-center text-black text-opacity-70 text-xl font-normal font-['SchoolBook'] tracking-tight">
                        <input placeholder={t("Meklēt")} className="bg-beige text-center border-none outline-none" onChange={handleChange} value={inputText}></input>
                    </div>
                </div>
                {searchResult.movies?.length > 0 &&
                <div className='w-full h-fit flex flex-col items-center relative justify-center m-auto !my-50'>
                  <div className="w-full typography-h2 relative mb-25">{t("Filmas")}</div>
                  <MyGridMovies data={searchResult.movies} maxRows={2} maxColumns={3} isLoggedIn={context.currentUser && Object.keys(context.currentUser).length > 0}></MyGridMovies>
                  </div>
                }
                {searchResult.persons?.length > 0 &&
                  <div className='w-full h-fit flex flex-col items-center relative justify-center m-auto !mb-50'>
                    <div className="w-full typography-h2 relative mb-25">{t("Personas")}</div>
                  {/* //   <MyGridPersons data={searchResult.persons} maxRows={2} maxColumns={5}></MyGridPersons> */}
                    <PersonList data = {searchResult.persons !== undefined ? searchResult.persons : []}></PersonList>
                  </div>

                }
                {searchResult.playlists?.length > 0 &&
                  <div className='w-full h-fit flex flex-col items-center relative justify-center m-auto !mb-50'>
                    <div className="w-full typography-h2 relative mb-25">{t("Saraksti")}</div>
                    <MyGridPlaylists data = {searchResult.playlists !== undefined ? searchResult.playlists : []} maxRows={2} maxColumns={3}></MyGridPlaylists>
                  </div>
                }
              </div>
            </div>
          </div>
        </>
    );
}


export default Search;