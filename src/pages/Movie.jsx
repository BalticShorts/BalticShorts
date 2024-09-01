import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { movieMoviePlaylistsByMovieId } from '../graphql/queries.js'
import { Amplify, API  } from 'aws-amplify';
import awsExports from '../aws-exports';
import { isVideoPlaying } from '../components/VideoPlayer';
import { useNavigate } from "react-router-dom";
import { getMovieQuery } from '../custom-queries/queries';
import { Footer } from '../modified-ui-components/Footer';
import config from '../config';
import Cookies from 'js-cookie';
import {isMobile, isSafari} from 'react-device-detect';

Amplify.configure(awsExports);
const IdentityPoolId = "eu-north-1:1383e4fb-6f2d-462e-bc3d-7b9adc03e8d1";
var AWS = require('aws-sdk');

const movieTeamKeyOrder = ['Director', 'Actor', 'Executive producer', 'Operator', 'Costume artist', 'Producer', 'Author of the scenario', 'Makeup artist', 'Production company', 'Editing director', 'Film artist', 'Sound director', 'Composer']
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
    config.aws_api_gateway + 'movies/' + guid,
    requestOptions
  ).then((response) => response.json());
  const resp = {"hls": data.Item.hlsUrl?.S.replace('d3tou2oin9ei82.cloudfront.net', 'vod.balticshorts.com'), "dash" : data.Item.dashUrl?.S.replace('d3tou2oin9ei82.cloudfront.net', 'vod.balticshorts.com')};
  return resp !== undefined ? resp : '';
}

const signVideo = async url => {
  // const a = url.replace(/index\.m3u8$/, '*');
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ }),
  };
  const data = await fetch(
    config.aws_api_gateway + 'signLink',
    requestOptions
  ).then((response) => response.json());

  const setData = async (cookies) => {
    for (const [name, value] of Object.entries(cookies)) {
      // console.log(name, value);
      Cookies.set(name, value, { path: '/', domain: '.balticshorts.com', sameSite: 'Lax' });
    }
  };

  // console.log(data.body);
  await setData(data.body);
  return data.body;
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
  AWS.config.region = "eu-north-1";
  AWS.config.credentials = new AWS.CognitoIdentityCredentials(IdentityPoolId);

  const { id } = useParams();
  const [movieURL, setMovieURL] = useState('');
  const [movieData, setMovieData] = useState({});
  const [cookies, setCokies] = useState({});
  const [movieTeamData, setMovieTeamData] = useState({});
  const [textOnMovie, setTextOnMovie] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [playlistRows, setPlaylistRows] = useState(1);
  const [subtitles, setSubtitles] = useState([]);

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    async function get() {
      const movie = await fetchMovie(id);
      const url = await fetchVideo(movie.guid);
      const playlists = await fetchPlaylists(id);
      const team = await getMovieCast(movie.MovieTeam.PersonMovieTeams.items);
      const signedUrl = await signVideo(url);
      await getSrc(movie.subtitles_location);
      try {     
        setCokies(signedUrl);
        setMovieURL(url);
        setMovieData(movie);
        setMovieTeamData(team);
        setPlaylists(playlists);
      } catch (error) {
        console.log('Error on fetching: ', error);
      }
    }
    get();
    return () => {};
  }, [id]);

  async function getSrc(location) {
  
    const config = {
        region: "eu-north-1",
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IdentityPoolId,
        }),
        bucketName : "balticshortsphotos",
    };
    var myBucket = new AWS.S3(config);
    if(location != null && location !== ''){
      const split = location.split("/");
      const key = split.pop()
      const bucketLoc = split.join("/");
      const extension = key.split(".").pop();
      var params = {
          Bucket: bucketLoc, 
          Key: key
      };
      try{
        const data = await myBucket.getObject(params).promise();
        const type = extension === 'vtt' ? 'text/vtt' : 'text/plain';
        var dataBlob = new Blob([data.Body], { type: type });
        if (extension !== 'vtt'){
          var srtText = await readBlobAsSrtText(dataBlob);
          var srtRegex = /(.*\n)?(\d\d:\d\d:\d\d),(\d\d\d --> \d\d:\d\d:\d\d),(\d\d\d)/g;
          var vttText = 'WEBVTT\n\n' + srtText.replace(srtRegex, '$1$2.$3.$4');
          dataBlob = new Blob([vttText], { type: 'text/vtt' });
        }
        var blobURL = URL.createObjectURL(dataBlob);
        setSubtitles(blobURL);
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }  
    }
    return () => {};
  }

  const readBlobAsSrtText = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const srtText = reader.result;
        resolve(srtText);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(blob);
    });
  };

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

  async function getMovieCast(team){
    const teamMap = {};
    team.map( (person) => {
      if(!(person.Role.name_eng in teamMap))
        teamMap[person.Role.name_eng] = []
      teamMap[person.Role.name_eng].push({"name":person.Person.name + " " + person.Person.surname, "id":person.Person.id, "roleName": person.Role.name})
    })
    return teamMap
  }
  var teamList = [];

  return (
    <>
    <div className="FilmasSkats w-full relative bg-beige rounded-3xl">
      <div className='MovieContainer max-h-[80vh] w-full' >
        <div onClick={() => removeText()} className='MovieContainer max-h-[80vh]' >
          <VideoPlayer movieURL={movieURL} subtitles={subtitles} thumbnail={''} />
        </div>
        {!isMobile && 
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
                Režisors {movieTeamData.Director?.map((person) => person.name).join(", ")}
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
        }
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

            <div className="m-auto w-full">
              {movieTeamKeyOrder.map((key, idx) => {
                if (key in movieTeamData) {
                  teamList.push(movieTeamData[key]);
                }
                if (teamList.length % 3 === 0 || (idx === movieTeamKeyOrder.length - 1 && teamList.length !== 0)) {
                  const tm = teamList;
                  teamList = [];
                  return (
                    <div key={idx} className="grid grid-cols-3 gap-8 py-4 mx-auto">
                      {tm.map((item, teamIdx) => (
                        <div key={teamIdx} className="flex flex-col items-center gap-4">
                          <span className="text-black text-base font-['SchoolBook']">{item[0].roleName}</span>
                          <div className="flex flex-col">
                            {item.map((person) => (
                              <div key={person.id} className="flex flex-col items-center">
                                <span className="text-black text-base font-bold font-['SchoolBook']">
                                  <a href={"/profile/" + person.id}>{person.name}</a>
                                  <br />
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
              })}
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