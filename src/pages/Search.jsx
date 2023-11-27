import { useEffect, useState } from "react";
import { Footer } from "../modified-ui-components/Footer";

const Search = () => {

    const [inputText, setInputText] = useState("");
    const [searchResult, setSearchResult] = useState({"movies": [], "persons": [], "playlists": []})


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
        if (inputText.length > 0) {
            console.log(inputText)
// Add search request to the db
// maybe add cooldown for too many requests?
          }
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
                <Footer/>
            </div>
        </>
    );
}


export default Search;