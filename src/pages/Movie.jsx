import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { getMovie } from '../graphql/queries.js'
import { Amplify, API, graphqlOperation  } from 'aws-amplify';
import awsExports from '../aws-exports';
import { isVideoPlaying } from '../components/VideoPlayer';

Amplify.configure(awsExports);

const fetchMovie = async id => {
      const movieData = await API.graphql(graphqlOperation(getMovie, {"id":id}));
      const movie = movieData.data.getMovie;
      return movie;
}



function Movie() {
  const { id } = useParams();
  const [movieURL, setMovieURL] = useState('');
  const [movieData, setMovieData] = useState({});
  const [textOnMovie, setTextOnMovie] = useState(true);

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  useEffect(() => {
    const get = async () => {
      const movie = await fetchMovie(id);
      try {
        const requestOptions = {
          method: 'POST',
        };
        const data = await fetch(
          'https://uwmvm4vk6a.execute-api.eu-north-1.amazonaws.com/Dev/movies/' + movie.guid,
          requestOptions
        ).then((response) => response.json());
        setMovieURL(data.Item.hlsUrl.S);
        setMovieData(movie);
      } catch (error) {
        console.log('Error on fetching: ', error);
      }
    }
    get()
  }, []);

  function removeText() {
    const elements = document.getElementById('textOnMovie')
    const videoElement = document.querySelector('video');
    sleep(3)
    const playing = isVideoPlaying(videoElement);
    textOnMovie ? elements.classList.add("hidden") : setTextOnMovie(textOnMovie) // elements.classList.remove("hidden")
    setTextOnMovie(!textOnMovie)
  }

  return (
    <>
    <div className="FilmasSkats w-full h-200 relative bg-stone-50 rounded-3xl">
      <div onClick={() => removeText()}>
        <VideoPlayer movieURL={movieURL} />
      </div>
      <div id='textOnMovie'>
        <div className="Rectangle3 w-full h-60 left-0 top-[0] absolute mix-blend-multiply bg-gradient-to-b from-slate-500 to-zinc-300" />
        <div className="ViUSaucaHaossBRzi w-full left-[0] top-[10%] absolute text-center text-stone-50 text-4xl font-bold font-['SchoolBook'] uppercase leading-10">{movieData.name}</div>
        <div className="HeWasCalledChaosBRzi w-full left-0 top-[15%] absolute text-center text-stone-50 text-base font-normal font-['SchoolBook'] uppercase tracking-wider">{movieData.name_eng}</div>
        <div className='w-full top-[92%] absolute'>
          <div className="Rectangle4 w-full h-50 left-[100%] top-[80%] absolute origin-top-left -rotate-180 mix-blend-multiply bg-gradient-to-b from-slate-400 to-zinc-300" />
          <div className="w-80 left-[43%] -top-20 relative text-center"><span className="text-stone-50 text-xl font-normal font-['SchoolBook'] uppercase">Režisors  </span><span className="text-stone-50 text-xl font-bold font-['SchoolBook']">Test Name<br/></span><span className="text-stone-50 text-xl font-normal font-['SchoolBook']">{movieData.origin_country}  |  {movieData.created_year}  |  {movieData.length}’  |  18+<br/></span><span className="text-stone-50 text-opacity-70 text-xl font-normal font-['SchoolBook']">{movieData.genre}</span></div>
        </div>
      </div>
      {/* <div className="AnotCija w-full h-5 left-[519px] top-[1030px] absolute text-center text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">ANOTĀCIJA</div>
      <div className="Komanda w-full h-5 left-[305px] top-[1227px] absolute text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">KOMANDA</div>
      <div className="FilmasKadri w-full h-5 left-[305px] top-[1531px] absolute text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">FILMAS KADRI</div>
      <div className="SarakstiKurosFilmaIrIekAuta w-full h-5 left-[305px] top-[2288px] absolute text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">Saraksti, kuros filma ir iekļauta</div>
      <div className="SaistTiDarbi w-full h-5 left-[305px] top-[2579px] absolute text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">SAISTĪTI DARBI</div>
      <div className="LvEn left-[305px] top-[919px] absolute text-stone-50 text-opacity-70 text-base font-normal font-['SchoolBook']">[ ] lv  |  [ ] en</div>
      <div className="PlayButton w-24 h-24 left-[805px] top-[442px] absolute" />
      <div className="Arrow w-9 h-3.5 left-[838px] top-[960px] absolute" /> */}
      <div className="w-full h-45 left-[15%] top-20 py-2 relative text-justify text-black text-xl font-normal font-['SchoolBook']">Description: {movieData.description}</div>
      <div className="w-full h-45 left-[15%] top-20 py-2 relative text-justify text-black text-xl font-normal font-['SchoolBook']">Description in english: {movieData.description_eng}  </div>
    </div>
    </>
  );
}

export default Movie;