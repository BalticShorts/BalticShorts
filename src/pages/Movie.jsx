import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { getMovie, getMovieTeam } from '../graphql/queries.js'
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
  const [movieTeamData, setMovieTeamData] = useState({});
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
        setMovieTeamData(movie.MovieTeam);
        console.log(movie.MovieTeam)
      } catch (error) {
        console.log('Error on fetching: ', error);
      }
    }
    get();
  }, [id]);

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
      <div className='MovieContainer max-h-[80vh]' >
        <div onClick={() => removeText()} className='MovieContainer max-h-[80vh]' >
          <VideoPlayer movieURL={movieURL} />
        </div>
        <div id='textOnMovie'>
          <div>
            <div className="Rectangle3 w-full h-52 left-0 top-[0]  absolute mix-blend-multiply bg-gradient-to-b from-slate-500 to-zinc-300" />
            <div className="w-full m-auto top-[8%] absolute text-center text-stone-50 text-4xl font-bold font-['SchoolBook'] uppercase leading-10">{movieData.name}</div>
            <div className="w-full m-auto top-[12%] absolute text-center text-stone-50 text-base font-normal font-['SchoolBook'] uppercase tracking-wider">{movieData.name_eng}</div>
          </div>
          <div className='w-full h-full top-[60vh] absolute py-4'>
            <div className="Rectangle4 w-full h-[19vh] left-[0] top-0 relative -rotate-180 mix-blend-multiply bg-gradient-to-b from-slate-600 to-zinc-300" />
            <div className="w-full top-14 absolute text-center flex flex-col items-center">
              <span className="text-stone-50 text-xl font-normal font-['SchoolBook'] uppercase relative inline">
                Režisors {movieTeamData.director}
              </span>
              <span className="text-stone-50 text-xl font-normal font-['SchoolBook'] relative">
                {movieData.origin_country} | {movieData.created_year} | {movieData.length}’ | 18+
              </span>
              <span className="text-stone-50 text-opacity-70 text-xl font-normal font-['SchoolBook']">
                {movieData.genre}
              </span>
            </div>

          </div>
        </div>
      </div>
      {/* <div className="FilmasKadri w-full h-5 left-[305px] top-[1531px] absolute text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">FILMAS KADRI</div>
      <div className="SarakstiKurosFilmaIrIekAuta w-full h-5 left-[305px] top-[2288px] absolute text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">Saraksti, kuros filma ir iekļauta</div>
      <div className="SaistTiDarbi w-full h-5 left-[305px] top-[2579px] absolute text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">SAISTĪTI DARBI</div>
      <div className="LvEn left-[305px] top-[919px] absolute text-stone-50 text-opacity-70 text-base font-normal font-['SchoolBook']">[ ] lv  |  [ ] en</div>
      <div className="PlayButton w-24 h-24 left-[805px] top-[442px] absolute" />
      <div className="Arrow w-9 h-3.5 left-[838px] top-[960px] absolute" /> */}
      <div className='Description w-full pt-8 flex flex-col items-center'>
        <div className="w-full h-5 py-8 relative text-center text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">ANOTĀCIJA</div>
        <div className="w-full h-45 mt-5 py-2 relative text-justify text-black text-xl font-normal font-['SchoolBook'] max-w-3xl">Description: {movieData.description}</div>
        <div className="w-full h-45 mt-5 py-2 relative text-justify text-black text-xl font-normal font-['SchoolBook'] max-w-3xl">Description in english: {movieData.description_eng}  </div>
      </div>
      <div className='Team w-[75%] pt-8 flex flex-col'>
        <div className="Komanda w-full h-5 left-[15%] relative text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">KOMANDA</div>
          <div className="relative justify-center pt-8 gap-6 inline-flex flex-row items-center left-[15%] max-w-full min-w-fit">

            <div className="w-40 mr-auto">
              <span className="text-black text-sm font-normal font-['SchoolBook']">REŽISORS<br/></span>
              <span className="text-black text-base font-bold font-['SchoolBook']">{movieTeamData.director}<br/><br/></span>
              <span className="text-black text-sm font-normal font-['SchoolBook']">OPERATORS<br/></span>
              { movieTeamData.operator.map( (person) => {
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']">{person}<br/></span>
                )
              }) }
              <span className="text-black text-base font-normal font-['SchoolBook']"><br/></span>
              <span className="text-black text-sm font-normal font-['SchoolBook']">SCENĀRIJA AUTORS<br/></span>
              { movieTeamData.scenario.map( (person) => {
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']">{person}<br/></span>
                )
              }) }
              <span className="text-black text-base font-normal font-['SchoolBook']"><br/></span>
              <span className="text-black text-sm font-normal font-['SchoolBook']">MONTĀŽAS REŽISORS<br/></span>
              { movieTeamData.editor.map( (person) => {
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']">{person}<br/></span>
                )
              }) }
            </div>

            <div className="w-40 mr-auto">
              <span className="text-black text-sm font-normal font-['SchoolBook']">LOMĀS<br/></span>
              { movieTeamData.actors.map( (person) => {
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']">{person}<br/></span>
                )
              }) }
              <span className="text-black text-base font-normal font-['SchoolBook']"><br/></span>
              <span className="text-black text-sm font-normal font-['SchoolBook']">TĒRPU MĀKSLINIEKS<br/></span>
              { movieTeamData.costumes.map( (person) => {
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']">{person}<br/></span>
                )
              }) }
              <span className="text-black text-base font-normal font-['SchoolBook']"><br/></span>
              <span className="text-black text-sm font-normal font-['SchoolBook']">GRIMMA MĀKSLINIEKS<br/></span>
              { movieTeamData.makeup.map( (person) => {
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']">{person}<br/></span>
                )
              }) }
              
            </div>

            <div className="w-40 mr-auto">
              <span className="text-black text-sm font-normal font-['SchoolBook']">IZPILDPRODUCENTS<br/></span>
              { movieTeamData.executive_producer.map( (person) => {
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']">{person}<br/></span>
                )
              }) }
              <span className="text-black text-base font-normal font-['SchoolBook']"><br/></span>
              <span className="text-black text-sm font-normal font-['SchoolBook']">PRODUCENTS<br/></span>
              { movieTeamData.producer.map( (person) => {
                
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']">{person}<br/></span>
                )
              }) }
              
            </div>
          </div>

          
      </div>
    </div>
    </>
  );
}

export default Movie;