import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { getMovie, movieMoviePlaylistsByMovieId } from '../graphql/queries.js'
import { Amplify, API, graphqlOperation  } from 'aws-amplify';
import awsExports from '../aws-exports';
import { isVideoPlaying } from '../components/VideoPlayer';
import { useNavigate } from "react-router-dom";
import { getMovieQuery } from '../custom-queries/queries';
import { Footer } from '../modified-ui-components/Footer';

Amplify.configure(awsExports);

const fetchMovie = async id => {
  const movieData = await API.graphql({
    query: getMovieQuery,
    variables : {
      id: id
    },
    authMode: 'AWS_IAM'
  });
  const movie = movieData.data.getMovie;
  return movie;
}

const fetchVideo = async guid => {
  const requestOptions = {
    method: 'POST',
  };
  const data = await fetch(
    'https://uwmvm4vk6a.execute-api.eu-north-1.amazonaws.com/Dev/movies/' + guid,
    requestOptions
  ).then((response) => response.json());
  return data;
}

const fetchPlaylists = async id => {
  const movieData = await API.graphql({
    query : movieMoviePlaylistsByMovieId,
    variables :  {
      movieId : id
    },
    authMode: 'AWS_IAM'
  });
  const playlistInfo = movieData.data.movieMoviePlaylistsByMovieId.items;
  const playlistsList = [];
  let row = [];
  playlistInfo.map( (item) => {
    if(item.moviePlaylist.is_public){
      if(row.length < 3)
        row.push(item.moviePlaylist);
      else {
        playlistsList.push(row);
        row = [];
        row.push(item.moviePlaylist)
      }
    }
    return item;
  })
  if(row.length !== 0)
    playlistsList.push(row);
  return playlistsList
}


function Movie() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [movieURL, setMovieURL] = useState('');
  const [movieData, setMovieData] = useState({});
  const [movieTeamData, setMovieTeamData] = useState({});
  const [movieDirectors, setMovieDirectors] = useState([]);
  const [textOnMovie, setTextOnMovie] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [playlistRows, setPlaylistRows] = useState(1);

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  useEffect(() => {
    const get = async () => {
      const movie = await fetchMovie(id);
      const data = await fetchVideo(movie.guid);
      const playlists = await fetchPlaylists(id);
      const team = getMovieCast(movie.MovieTeam.PersonMovieTeams.items);
      try {     
        setMovieURL(data.Item.hlsUrl.S);
        setMovieData(movie);
        setMovieTeamData(team);
        setPlaylists(playlists);
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

  function showMorePlaylists(){
    setPlaylistRows(playlistRows + 1);
  }

  function goPlaylist(row,item){
    try{
        const id = playlists[row][item].id
        navigate("/playlist/" + id)
    } catch (error) {
        console.log('Error on goMovie', error);
    }
  }

  function getMovieCast(team){
    const teamMap = {};
    team.map( (person) => {
      if(!(person.Role.name_eng in teamMap))
        teamMap[person.Role.name_eng] = []
      teamMap[person.Role.name_eng].push({"name":person.Person.name + " " + person.Person.surname, "id":person.Person.id})
    })
    return teamMap
  }

  return (
    <>
    <div className="FilmasSkats w-full relative bg-beige rounded-3xl">
      <div className='MovieContainer max-h-[80vh]' >
        <div onClick={() => removeText()} className='MovieContainer max-h-[80vh]' >
          <VideoPlayer movieURL={movieURL} />
        </div>
        <div id='textOnMovie' className='max-h-[80vh] h-full'>
        <div className="Rectangle3 w-full h-52 left-0 top-[0]  absolute mix-blend-multiply bg-gradient-to-b from-slate-500 to-zinc-300" />
          <div className='w-full top-0 absolute py-4 flex flex-col items-center justify-center gap-6 mt-12'>
            <div className="w-full m-auto text-center text-stone-50 text-4xl font-bold font-['SchoolBook'] uppercase leading-10">{movieData.name}</div>
            <div className="w-full m-auto text-center text-stone-50 text-base font-normal font-['SchoolBook'] uppercase tracking-wider">{movieData.name_eng}</div>
          </div>
          <div className='w-full top-[60vh] absolute py-4'>
            <div className="Rectangle4 w-full h-[19vh] left-[0] top-0 relative -rotate-180 mix-blend-multiply bg-gradient-to-b from-slate-600 to-zinc-300" />
            <div className="w-full top-14 absolute text-center flex flex-col items-center">
              <span className="text-stone-50 text-xl font-normal font-['SchoolBook'] uppercase relative inline">
                Režisors {movieTeamData.director?.map((person) => person.name).join(", ")}
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

            <div className="w-40 m-auto">
              <span className="text-black text-sm font-normal font-['SchoolBook']">REŽISORS<br/></span>
              { movieTeamData.director?.map( (person) => {
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']"><a href={'/profile/'+person.id}>{person.name}</a><br/></span>
                )
              }) }
              <span className="text-black text-sm font-normal font-['SchoolBook']">OPERATORS<br/></span>
              { movieTeamData.operator?.map( (person) => {
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']"><a href={'/profile/'+person.id}>{person.name}</a><br/></span>
                )
              }) }
              <span className="text-black text-base font-normal font-['SchoolBook']"><br/></span>
              <span className="text-black text-sm font-normal font-['SchoolBook']">SCENĀRIJA AUTORS<br/></span>
              { movieTeamData.scenario?.map( (person) => {
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']"><a href={'/profile/'+person.id}>{person.name}</a><br/></span>
                )
              }) }
              <span className="text-black text-base font-normal font-['SchoolBook']"><br/></span>
              <span className="text-black text-sm font-normal font-['SchoolBook']">MONTĀŽAS REŽISORS<br/></span>
              { movieTeamData.editor?.map( (person) => {
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']"><a href={'/profile/'+person.id}>{person.name}</a><br/></span>
                )
              }) }
            </div>

            <div className="w-40 m-auto">
              <span className="text-black text-sm font-normal font-['SchoolBook']">LOMĀS<br/></span>
              { movieTeamData.actors?.map( (person) => {
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']"><a href={'/profile/'+person.id}>{person.name}</a><br/></span>
                )
              }) }
              <span className="text-black text-base font-normal font-['SchoolBook']"><br/></span>
              <span className="text-black text-sm font-normal font-['SchoolBook']">TĒRPU MĀKSLINIEKS<br/></span>
              { movieTeamData.costumes?.map( (person) => {
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']"><a href={'/profile/'+person.id}>{person.name}</a><br/></span>
                )
              }) }
              <span className="text-black text-base font-normal font-['SchoolBook']"><br/></span>
              <span className="text-black text-sm font-normal font-['SchoolBook']">GRIMMA MĀKSLINIEKS<br/></span>
              { movieTeamData.makeup?.map( (person) => {
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']"><a href={'/profile/'+person.id}>{person.name}</a><br/></span>
                )
              }) }
              
            </div>

            <div className="w-40 m-auto">
              <span className="text-black text-sm font-normal font-['SchoolBook']">IZPILDPRODUCENTS<br/></span>
              { movieTeamData.executive_producer?.map( (person) => {
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']"><a href={'/profile/'+person.id}>{person.name}</a><br/></span>
                )
              }) }
              <span className="text-black text-base font-normal font-['SchoolBook']"><br/></span>
              <span className="text-black text-sm font-normal font-['SchoolBook']">PRODUCENTS<br/></span>
              { movieTeamData.producer?.map( (person) => {
                
                return(
                  <span className="text-black text-base font-bold font-['SchoolBook']"><a href={'/profile/'+person.id}>{person.name}</a><br/></span>
                )
              }) }
              
            </div>
          </div>

          
      </div>
      <div className='w-[75%] h-fit gap-6 my-24 flex flex-col items-center relative justify-center '>
        <div className="w-full h-5 text-black text-xl font-bold font-['Arial'] uppercase tracking-wide relative left-[15%]">Saraksti, kuros filma ir iekļauta</div>
        {playlists?.slice(0, playlists?.length >= playlistRows ? playlistRows : playlists.length).map((row, rowIdx) => {
          return(
          <>
            <div className="w-full h-44 gap-6 mt-10 flex flex-row items-center relative justify-cente left-[15%]">

              {row.map( (item, itemIdx) => {
                return(
                  <div className="SarakstsInLists m-auto w-80 h-48 relative" onClick={ () => goPlaylist(rowIdx, itemIdx)}>
                    <img className="Thumb w-80 h-24 left-0 top-0 relative" src="https://via.placeholder.com/350x100" />
                    <div className="w-80 h-48 left-0 top-0 absolute bg-white bg-opacity-0 border border-black" />
                    <div className="w-80 h-10 relative mt-1 ml-4 items-center justify-center">
                      <div>
                        <span className="text-black text-base font-bold font-['SchoolBook']">{item?.Title}<br/></span>
                        <span className="text-black text-sm font-normal font-['SchoolBook']">by {item?.Creator}</span>
                      </div>
                    </div>
                    <div className="w-80 h-2.5 left-[15.09px] top-[172.45px] absolute text-black text-xs font-normal font-['Arial'] tracking-wide">FILMAS  {playlists?.length}  |  SEKOTĀJI  10</div>
                  </div>
                )
              })}
            </div>
          </>
          )}) 
        }
      </div>
      {playlists?.length > playlistRows ? (
        <div className="w-full h-24 relative flex -top-8 mb-4">
          <div className='w-full h-20 relative flex opacity-60'>
            <div className="w-full h-16 relative bg-gradient-to-b from-stone-50 to-zinc-300" />
          </div>
            <div className="w-full h-2.5 m-auto mt-12 absolute flex items-center justify-center">
              <div className="w-full h-2 top-[1px] relative text-black text-xs font-normal font-['Arial'] tracking-wide text-center" onClick={() => showMorePlaylists()}>Vairāk</div>
            </div>
          </div>
        ) : (<></>)}
      <div className='MoreWorks w-[75%] pt-8 flex flex-col'>
        <div className="Komanda w-full h-5 left-[15%] relative text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">SAISTĪTI DARBI</div>
      </div>
    <Footer />
    </div>
    </>
  );
}

export default Movie;