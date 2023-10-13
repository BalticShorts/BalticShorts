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

  const goMovie = async (idx) => {
    try{
        const guid = movies[idx].guid
        navigate("/movie/" + guid)
    } catch (error) {
        console.log('Error on goMovie', error);
    }

  }





  return (
          <div className='movieList'>
            { movies.map( (movie, idx) => {
                return (
                  <Paper variant="outlined" elevation={2} key={`movie${idx}`} onClick={() => goMovie(idx)}>
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
                      {/* {
            showAddMovie ? (
              <AddMovie />
            ) : <IconButton onClick={() => setShowAddMovie(true)}><AddIcon/></IconButton>
          } */}
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

// We have the UNIQUE filename in the upload.
// TODO : have tho populate the MOVIES table with the GUID of the movie associated =?
//    GET API call to the db with the fileName - get guid

  
  export default Home;