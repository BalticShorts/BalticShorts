import { useEffect, useState } from "react";
import { Footer } from "../modified-ui-components/Footer";
import { getSearch } from "../custom-queries/queries";
import { API, graphqlOperation } from "aws-amplify";

const Search = () => {

    const [inputText, setInputText] = useState("");
    const [searchResult, setSearchResult] = useState({"movies": [], "persons": [], "playlists": []})


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
          if (inputText.length > 0) {
            const res = await fetchSearch(inputText);
            try {
              setSearchResult(res)
            } catch (error) {      
            }
              // maybe add cooldown for too many requests?
          }
        }
        search();
      }, [inputText]);


    return(
        <>
            <div className="bg-beige">
                <div className="w-full h-7 mt-10 relative flex items-center justify-center">
                    <div className="w-2/6 h-px top-[30px] absolute border border-black"></div>
                    <div className="w-80 h-6 top-0 absolute text-center text-black text-opacity-70 text-xl font-normal font-['SchoolBook'] tracking-tight">
                        <input placeholder="Meklēt" className="bg-beige text-center border-none outline-none" onChange={handleChange} value={inputText}></input>
                    </div>
                </div>
                {searchResult.movies?.length > 0 ?
                <div className='w-[75%] h-fit gap-6 my-24 flex flex-col items-center relative justify-center '>
                  <div className="w-full h-5 text-black text-xl font-bold font-['Arial'] uppercase tracking-wide relative left-[15%]">Filmas</div>
                  
                  {searchResult.movies?.map( movie => {
                    return(
                      <span className="text-black text-base font-bold font-['SchoolBook']"><a href={'/movie/'+movie.id}>{movie.name}</a><br/></span>
                    )
                  })}
                  </div>
                : <></>}
                {searchResult.persons?.length > 0 ?
                  <div className='w-[75%] h-fit gap-6 my-24 flex flex-col items-center relative justify-center '>
                    <div className="w-full h-5 text-black text-xl font-bold font-['Arial'] uppercase tracking-wide relative left-[15%]">Personas</div>
                {searchResult.persons?.map( person => {
                    return(
                      <span className="text-black text-base font-bold font-['SchoolBook']"><a href={'/profile/'+person.id}>{person.name} {person.surname}</a><br/></span>
                    )
                  })}
                  </div>
                : <></>}
                {searchResult.playlists?.length > 0 ?
                  <div className='w-[75%] h-fit gap-6 my-24 flex flex-col items-center relative justify-center '>
                    <div className="w-full h-5 text-black text-xl font-bold font-['Arial'] uppercase tracking-wide relative left-[15%]">Saraksti</div>
                  {searchResult.playlists?.map( playlist => {
                    return(
                      <span className="text-black text-base font-bold font-['SchoolBook']"><a href={'/playlist/'+playlist.id}>{playlist.Title}</a><br/></span>
                    )
                  })}
                  </div>
                : <></>}
                <Footer/>
            </div>
        </>
    );
}


export default Search;