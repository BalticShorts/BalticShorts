import {useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ReactHlsPlayer from "@ducanh2912/react-hls-player";


function Movie () {
    const {guid} = useParams();
    const [movieURL, SetMovieURL] = useState('');
    
    useEffect(() => {
      const fetchData = async () => {
        try{
          const requestOptions = {
            method: 'POST'
        };
        fetch('https://uwmvm4vk6a.execute-api.eu-north-1.amazonaws.com/Dev/movies/'+guid, requestOptions)
            .then(response => response.json())
            .then(data => SetMovieURL(data.Item.hlsUrl.S));
        }catch (error){
          console.log('Error on fetching: ',error)
        }
      }
      fetchData()
      }, []);
      console.log(movieURL)
    
    return (
    <div>
      <h1>Movie Title</h1>
      <div>
        <ReactHlsPlayer
          src={movieURL}
          autoPlay={false}
          controls={true}
          width="100%"
          height="auto"
        />
      </div>
    </div>
    );
  };
  
  
  export default Movie;