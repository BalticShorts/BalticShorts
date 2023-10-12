import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';

function Movie() {
  const { guid } = useParams();
  const [movieURL, setMovieURL] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: 'POST',
        };
        const data = await fetch(
          'https://uwmvm4vk6a.execute-api.eu-north-1.amazonaws.com/Dev/movies/' + guid,
          requestOptions
        ).then((response) => response.json());

        console.log(data.Item);
        setMovieURL(data.Item.hlsUrl.S);
      } catch (error) {
        console.log('Error on fetching: ', error);
      }
    };
    fetchData();
  }, [guid]);

  return (
    <div>
      <h1>Movie Title</h1>
      <div>
      <VideoPlayer movieURL={movieURL} />
      </div>
    </div>
  );
}

export default Movie;