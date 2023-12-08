import React from "react";
import "./style.css";
import '../App.css';
import { Amplify, API, graphqlOperation, Storage  } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { listMovies, getMovie } from '../graphql/queries.js'
import { updateMovie } from '../graphql/mutations.js'
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { MovieCreateForm } from '../ui-components';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import moment from "moment";
import awsExports from '../aws-exports';
import { useNavigate } from "react-router-dom";
import { Footer } from "../modified-ui-components/Footer";
import { MyGridMovies } from "../modified-ui-components/Grid/movieGrid.jsx";
import { getMoviesMain } from "../custom-queries/queries.js";
import { DisplayedPlaylistGroup } from "../components/DisplayedPlaylistGroup/DisplayedPlaylistGroup.jsx";
// https://mui.com/material-ui/material-icons/


const Home = () => {
    Amplify.configure(awsExports);
    const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [moviePlaying, setMoviePlaying] = useState('');
  const [movieURL, setMovieURL] = useState('');
  const [showAddMovie, setShowAddMovie] = useState(false);
  const moviePrefix = 'https://d2tilt02qfznkt.cloudfront.net/';
  

  useEffect(() => {
    const mov = async () => {
    try {
      await fetchMovies();  
    } catch (error) {
      
    }
  }
   mov() 
  }, []);

  const toggleMovie = async idx => {
    if (moviePlaying === idx) {
      setMoviePlaying('');
      return;
    }

    const movieFilePath = movies[idx].file_path;
    try {
        const fileAccessUrl = await Storage.get(movieFilePath, {expires: 60})
        // console.log(moviePrefix + movieFilePath)
        // console.log('url',fileAccessUrl);
        setMoviePlaying(idx);
        setMovieURL(moviePrefix + movieFilePath);
        return;
    } catch (error) {
      console.error('error accessing s3 file', error)
      setMoviePlaying('');
      setMovieURL('');
    }
  }

  const fetchMovies = async () => {
    try {
        const movieData = await API.graphql({
          query: getMoviesMain,
          authMode: 'AWS_IAM'
        });
        const movieList = movieData.data.listMovies;
        // console.log('movies', movieData);
        // console.log('moviesssss', movieList);
        setMovies(movieList);
        console.log(movieList)
    }catch (error) {
      console.log('Error on fetchnig movies', error);
    }
  }

  const testFunction = async (idx) => {
    // updating a DB entity
    try {
      console.log('index', idx);
      const movie = movies[idx];
      console.log('data', movie);

      movie.length = movie.length + 1;
      console.log('data', movie);

      delete movie.createdAt;
      delete movie.updatedAt;
      delete movie.__typename;
      delete movie._deleted;
      delete movie._lastChangedAt;
      console.log('data', movie);

      const movieData = await API.graphql(graphqlOperation(updateMovie, {input: movie}));
      console.log('data', movie);

      const movieList = [...movies];
      movieList[idx] = movieData.data.updateMovie;
      setMovies(movieList);
      
    } catch (error) {
      console.log('Error on testFunction', error);
    }
  }

  const goMovie = async (idx) => {
    try{
        const id = movies[idx].id
        navigate("/movie/" + id)
    } catch (error) {
        console.log('Error on goMovie', error);
    }

  }

  return (
    <div className="w-full">
      <div id="nedelasIsfilma"  className="w-full relative h-fit">
        <img className="w-full h-fit max-h-[920px]" src={require("./static/ad_2.jpg")} alt="Changed to highlighted movie" />
        {/* will be changed to a highlighted moovie */}
      </div>
      <div className="flex flex-row w-4/5 my-10 m-auto items-center justify-center gap-6">
        <div className="w-80 h-48 relative border border-black flex flex-col items-center justify-center m-auto gap-10 cursor-pointer" onClick={() => navigate('/catalogue/Movies')}>
          <div className="w-80 h-3 relative text-center text-black text-opacity-80 text-xl font-bold font-['Arial'] uppercase tracking-wide">
            DARBI
          </div>
          <div className="w-80 h-2.5 relative text-center text-black text-opacity-80 text-sm font-normal font-['SchoolBook']">
            Jaunas, senas, vislabākās un vissliktākās<br />īsfilmas no visas Baltijas
          </div>
        </div>

        <div className="w-80 h-48 relative border border-black flex flex-col items-center justify-center m-auto gap-10 cursor-pointer" onClick={() => navigate('/catalogue/Persons')}>
          <div className="w-80 h-3 relative text-center text-black text-opacity-80 text-xl font-bold font-['Arial'] uppercase tracking-wide">
            PERSONAS
          </div>
          <div className="w-80 h-2.5 relative text-center text-black text-opacity-80 text-sm font-normal font-['SchoolBook']">
          Režisori, scenāriju autori, aktieri, mākslinieki un visi pārējie īsfilmu komandu dalībnieki
          </div>
        </div>

        <div className="w-80 h-48 relative border border-black flex flex-col items-center justify-center m-auto gap-10 cursor-pointer" onClick={() => navigate('/catalogue/Playlists')}>
          <div className="w-80 h-3 relative text-center text-black text-opacity-80 text-xl font-bold font-['Arial'] uppercase tracking-wide">
            SARAKSTI
          </div>
          <div className="w-80 h-2.5 relative text-center text-black text-opacity-80 text-sm font-normal font-['SchoolBook']">
            Baltic Shorts kuratoru un lietotāju <br/> veidotie īsfilmu saraksti
          </div>
        </div>

      </div>

      <div className='w-4/5 h-fit gap-6 my-24 flex flex-col items-center relative justify-center m-auto'>
        <div className="my-5 w-full h-5 text-black text-xl font-bold font-['Arial'] uppercase tracking-wide relative">
          BALTIC SHORTS IESAKA
        </div>
        <DisplayedPlaylistGroup elementsShown = {3}/>
        {/* Need to list the highlighted playlists and give the data */}
    
        {movies.items?.length > 0 &&
            <MyGridMovies data={movies.items} maxRows={2} maxColumns={3}></MyGridMovies>
        }
      </div>

      <div className="relative mt-10 flex flex-row w-3/5 items-center justify-center m-auto">
        <div className="m-auto">
          <img className="w-full h-fit" src={require("./static/Black_Logo.png")} alt="Subscribe" />

        </div>
        <div className="text-black text-base font-normal font-['SchoolBook'] uppercase tracking-wider m-auto">
        JAUNAS, VECAS, SLIKTĀKĀS, LABĀKĀS,<br/> LIELBUDŽETA, BEZBUDŽETA ĪSFILMAS,<br/>REŽISORI, OPERATORI UN CITI FILMU VAROŅI <br/>NO baltijas valstu filmu industrijas.
        </div>

      </div>

      <div className="flex-col justify-center items-center gap-12 my-24 w-3/5 m-auto">
        <div className="text-center text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">PAR PROJEKTU</div>
        <div className="m-auto w-3/5 text-black text-lg font-normal font-['SchoolBook'] my-10">Baltic Shorts ir digitāla straumēšanas platforma, kas fokusējas uz Baltijas valstīs (Latvija, Lietuva, Igaunija) radītu īsfilmu izrādīšanu. Projekta mērķis ir radīt un uzturēt ērti lietojamu plaša satura mājaslapu, kas attīsta īsfilmu formas pieejamību un to autoru atpazīstamību plašākā tirgū.</div>
        <div className="w-fit px-5 m-auto grow shrink basis-0 text-center text-black text-base font-normal font-['SchoolBook'] border border-black cursor-pointer" onClick={() => navigate('/about')}>Uzzināt vairāk</div>
      </div>



          {/* <Footer/> */}
    </div>
  );
}


const AddMovie = () => {
  const [files, setFiles] = useState({});
  console.log(files);

  const processFile = async ({ file }) => {
    const fileExtension = file.name.split('.').pop();
  
    return file
      .arrayBuffer()
      .then((filebuffer) => window.crypto.subtle.digest('SHA-1', filebuffer))
      .then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const currentDate = moment().valueOf();
        const hashHex = hashArray
          .map((a) => a.toString(16).padStart(2, '0'))
          .join('');
        console.log(`${hashHex}.${fileExtension}`)
        return { file, key: `${hashHex}${currentDate}.${fileExtension}` };
      });
  };


  return (
    <div>

      <MovieCreateForm
        disabled = {true}
        onSubmit={(fields) => {
            const updatedFields = {}
            Object.keys(fields).forEach(key => {
                if (typeof fields[key] === 'string') {
                    updatedFields[key] = fields[key].trim()
                } else {
                    updatedFields[key] = fields[key]
                }
            })
            return updatedFields
        }}
      />

      <StorageManager
        acceptedFileTypes={['video/*']}
        accessLevel="public"
        // maxFileCount={1}
        autoUpload={false}
        isResumable
        processFile={processFile}
        onUploadSuccess={({ key }) => {
          setFiles((prevFiles) => {
            return {
              ...prevFiles,
              [key]: {
                status: 'success',
              },
            };
          });
        }}
    />
      {Object.keys(files).map((key) => {
        return files[key] ? (
          <div>
            {key}: {files[key].status}
          </div>
        ) : null;
      })}

    </div>
  )
}
  
  export default Home;