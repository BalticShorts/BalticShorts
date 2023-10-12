import './App.css';
import { Amplify, API, graphqlOperation, Storage  } from 'aws-amplify';
import { Authenticator, TextField } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import { listMovies, getMovie } from './graphql/queries.js'
import { updateMovie } from './graphql/mutations.js'
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ReactHlsPlayer from "@ducanh2912/react-hls-player";
import { MovieCreateForm } from './ui-components';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import moment from "moment";

// https://mui.com/material-ui/material-icons/


Amplify.configure(awsExports);

export default function App() {

  const [movies, setMovies] = useState([]);
  const [moviePlaying, setMoviePlaying] = useState('');
  const [movieURL, setMovieURL] = useState('');
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [files, setFiles] = useState({});
  const moviePrefix = 'https://d2tilt02qfznkt.cloudfront.net/';
  

  useEffect(() => {
    fetchMovies();
  }, []);

  const toggleMovie = async idx => {
    if (moviePlaying === idx) {
      setMoviePlaying('');
      return;
    }

    const movieFilePath = movies[idx].file_path;
    try {
        const fileAccessUrl = await Storage.get(movieFilePath, {expires: 60})
        console.log(moviePrefix + movieFilePath)
        console.log('url',fileAccessUrl);
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
        const movieData = await API.graphql(graphqlOperation(listMovies));
        const movieList = movieData.data.listMovies.items;
        console.log('movies', movieData);
        console.log('moviesssss', movieList);
        setMovies(movieList);
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





  return (
    
    <Authenticator>
      {({ signOut, user }) => (

        <main>
          {/* <h1>Hello {user.username}</h1>
          <h1>Baltic Shorts is under costruction!</h1> */}
          <button onClick={signOut}>Sign out</button>

          <div className='movieList'>
            { movies.map( (movie, idx) => {
                return (
                  <Paper variant="outlined" elevation={2} key={`movie${idx}`}>
                      <div className='movieCard'>
                        <IconButton aria-label="play" onClick={() => toggleMovie(idx)}>
                          { moviePlaying  === idx ? <PauseIcon /> :<PlayArrowIcon />}
                        </IconButton>
                        <div>
                          <div className='movieTitle'>{movie.name}</div>
                          <div className='movieOwner'>{movie.created_year}</div>
                        </div>
                        <div>
                          <div className='movieDescription'>{movie.description}</div>
                          <div className='movieLength' onClick={() => testFunction(idx)}>{movie.length}</div>
                        </div>
                      </div>
                  </Paper>
                    // {
                    //   moviePlaying === idx ? (
                    

                    //   ) : null
                    // }
                )
            })}
          </div>
          <div>
            {/* <ReactPlayer url={movieURL} /> */}
            {/* 'https://deuudnain4nbt.cloudfront.net/public/Destination/TestName1/pexels-videos-1390942.m3u8' */}
            <ReactHlsPlayer
              src={"https://d2tilt02qfznkt.cloudfront.net/3269890a-66b6-40ac-9733-aed7652d8dcd/hls/istockphoto-1248937440-640_adpp_is2_Ott_Hls_Ts_Avc_Aac_16x9_1280x720p_6.0Mbps_qvbr.m3u8"}
              autoPlay={false}
              controls={true}
              width="100%"
              height="auto"
            />
          </div>
          {
            showAddMovie ? (
              <AddMovie />
            ) : <IconButton onClick={() => setShowAddMovie(true)}><AddIcon/></IconButton>
          }


        </main>
      )}
    </Authenticator>
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

// We have the UNIQUE filename in the upload.
// TODO : have tho populate the MOVIES table with the GUID of the movie associated =?
//    GET API call to the db with the fileName - get guid