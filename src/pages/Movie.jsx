import {useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


function Movie () {
    const {guid} = useParams();
    const [data, SetData] = useState(null);
    
    useEffect(() => {
      const fetchData = async () => {
        try{
          const requestOptions = {
            method: 'POST',
            headers: {
              'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
              "Access-Control-Allow-Origin": "*",
              'Access-Control-Allow-Methods': 'POST,OPTIONS'
          }
        };
        fetch('https://uwmvm4vk6a.execute-api.eu-north-1.amazonaws.com/Dev/movies/'+guid, requestOptions)
            .then(response => response.json())
            .then(data => SetData(data));
        }catch (error){
          console.log('Error on fetching: ',error)
        }
      }
      fetchData()
      }, []);
      console.log(data)
    
    return (
      // get movie on update
      // get FIGMA access - need to change the min/max values
      // get Baltic Shorts design access
    <div>
      <h1>Movie Title</h1>
      <h1>{guid}</h1>
    </div>
    );
  };
  
  
// https://uwmvm4vk6a.execute-api.eu-north-1.amazonaws.com/Dev/movies/6b57ea0b-6434-4d5f-8340-cd92c563625b
// https://uwmvm4vk6a.execute-api.eu-north-1.amazonaws.com/Dev/movies/'+guid
  export default Movie;