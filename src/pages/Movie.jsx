import {useParams } from 'react-router-dom';


const Movie = () => {
    let {guid} = useParams();
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
  
  export default Movie;