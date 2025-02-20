import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { movieMoviePlaylistsByMovieId } from '../graphql/queries.js'
import { Amplify, API  } from 'aws-amplify';
import awsExports from '../aws-exports';
// import { isVideoPlaying } from '../components/VideoPlayer';
import { useNavigate } from "react-router-dom";
import { getMovieQuery } from '../custom-queries/queries';
import config from '../config';
import {isMobile} from 'react-device-detect';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
  //     "cmafDash" : data.Item.dashUrl?.S.replace('d3tou2oin9ei82.cloudfront.net', 'vod.balticshorts.com').replace(/(\d+)\.mpd$/, '$1_dash_h264.mpd'),

  const resp = {
    "hls": data.Item.hlsUrl?.S.replace('d3tou2oin9ei82.cloudfront.net', 'vod.balticshorts.com'),
    "dash" : data.Item.dashUrl?.S.replace('d3tou2oin9ei82.cloudfront.net', 'vod.balticshorts.com'),
    "cmafDash" : data.Item.cmafDashUrl?.S.replace('d3tou2oin9ei82.cloudfront.net', 'vod.balticshorts.com'),
    "cmafHls" : data.Item.cmafHlsUrl?.S.replace('d3tou2oin9ei82.cloudfront.net', 'vod.balticshorts.com'),
    "keyId" : data.Item.keyId?.S, "resourceId" : data.Item.resourceId?.S
  };

  return resp !== undefined ? resp : '';
}

const signVideo = async (keyId, resourceId) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({'keyId': keyId}),
  };
  const data = await fetch(
    config.aws_api_gateway + 'signLink',
    requestOptions
  ).then((response) => response.json());
  const body = JSON.parse(data.body); 
  return body.token;
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
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [movieData, setMovieData] = useState({});
  const [urlAddon, setUrlAddon] = useState({});
  const [movieTeamData, setMovieTeamData] = useState({});
  const [textOnMovie, setTextOnMovie] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [playlistRows, setPlaylistRows] = useState(1);
  const [subtitles, setSubtitles] = useState([]);
  const [photoURLs, setPhotoURLs] = useState([]);

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    async function get() {
      const movie = await fetchMovie(id);
      const url = await fetchVideo(movie.guid);
      const playlists = await fetchPlaylists(id);
      const team = await getMovieCast(movie.MovieTeam.PersonMovieTeams.items);
      const signedUrlAddon = await signVideo(url.keyId, url.resourceId);
      // const signedUrlAddon = '';
      await getSrc(movie.subtitles_location);
      await getPhotoSrc(movie.thumbnail_location);
      const photos = await getPhotosFromFolder(movie.photo_location)
      try {     
        setUrlAddon(signedUrlAddon);
        setMovieURL(url);
        setMovieData(movie);
        setMovieTeamData(team);
        setPlaylists(playlists);
        setPhotoURLs(photos);
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
          const srtRegex = /(\d+)\n(\d{2}:\d{2}:\d{2}),(\d{3}) --> (\d{2}:\d{2}:\d{2}),(\d{3})/g;
          const vttText = 'WEBVTT\n\n' + srtText.replace(srtRegex, '$1\n$2.$3 --> $4.$5');
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
    // const playing = isVideoPlaying(videoElement);
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

  async function getPhotoSrc(item) {
    const config = {
      region: "eu-north-1",
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId,
      }),
      bucketName: "balticshortsphotos",
    };
    const myBucket = new AWS.S3(config);
    
    if (item === null) return;  
    const split = item.split("/");
    const key = split.pop();
    const bucketLoc = split.join("/");
  
    const params = {
      Bucket: bucketLoc,
      Key: key,
    };
  
    try {
      const data = await myBucket.getObject(params).promise();
      
      const objectURL = URL.createObjectURL(new Blob([data.Body], { type: "image/png" }));
      setThumbnailURL(objectURL);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function getPhotosFromFolder(fullPath) {
    console.log(`Fetching photos from folder: ${fullPath}`);
  
    const config = {
      region: "eu-north-1",
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId,
      }),
      bucketName: "balticshortsphotos",
    };
    const myBucket = new AWS.S3(config);
  
    if (!fullPath) return [];
  
    const folderPath = fullPath.replace(`${config.bucketName}/`, "");
  
    const params = {
      Bucket: config.bucketName,
      Prefix: folderPath,
      MaxKeys: 1000,
    };
  
    try {
      const data = await myBucket.listObjectsV2(params).promise();
      if (data.Contents.length === 0) {
        console.log("No objects found in the specified folder.");
      }
  
      const photoKeys = data.Contents.map((item) => item.Key);
      const photoURLs = await Promise.all(
        photoKeys.map(async (key) => {
          const photoParams = {
            Bucket: config.bucketName,
            Key: key,
          };
          const photoData = await myBucket.getObject(photoParams).promise();
          return URL.createObjectURL(new Blob([photoData.Body], { type: "image/png" }));
        })
      );
  
      return photoURLs;
    } catch (error) {
      console.error("Error fetching photos:", error);
      return [];
    }
  }
  
  
  

  var teamList = [];

  return (
    <>
    <div className="FilmasSkats w-full relative bg-beige rounded-3xl">
      <div className="MovieContainer w-full max-h-[80vh] relative" onClick={() => removeText()}>
        <div className="VideoWrapper w-full max-h-[80vh] relative">
          <VideoPlayer
            movieURL={movieURL}
            urlAddon={urlAddon}
            subtitles={subtitles}
            thumbnail={thumbnailURL}
          />
          {!isMobile && (
            <div
              id="textOnMovie"
              className="TextOverlay absolute w-full h-full flex flex-col justify-between pointer-events-none inset-0 "
            >
              <div className="Rectangle3 w-full h-[20%] flex items-center justify-center bg-gradient-to-b from-stone-950 to-transparent">
                <div className="text-center relative z-10 mix-blend-normal">
                  <div className="text-white text-sm sm:text-3xl lg:text-4xl font-bold font-['SchoolBook'] uppercase leading-10 text-opacity-90">
                    {movieData.name}
                  </div>
                  <div className="text-white text-xs sm:text-sm lg:text-base font-normal font-['SchoolBook'] uppercase tracking-wider text-opacity-90">
                    {movieData.name_eng}
                  </div>
                </div>
              </div>

              <div className="Rectangle4 w-full h-[20%] flex items-center justify-center bg-gradient-to-t from-stone-950 to-transparent">
                <div className="text-center relative z-10 mix-blend-normal">
                  <div className="text-white text-sm sm:text-lg lg:text-xl font-normal font-['SchoolBook'] uppercase text-opacity-90">
                    Režisors {movieTeamData.Director?.map((person) => person.name).join(", ")}
                  </div>
                  <div className="text-white text-sm sm:text-lg lg:text-xl font-normal font-['SchoolBook'] text-opacity-90">
                    {movieData.origin_country} | {movieData.created_year} | {movieData.length}’ | 18+
                  </div>
                  <div className="text-white text-opacity-90 text-sm sm:text-lg lg:text-xl font-normal font-['SchoolBook']">
                    {movieData.genre}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='Description w-full pt-8 flex flex-col items-center'>
        <div className="w-full h-5 py-8 relative text-center text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">ANOTĀCIJA</div>
        <div className="w-full h-45 mt-5 py-2 relative text-justify text-black text-xl font-normal font-['SchoolBook'] max-w-3xl">{movieData.description}</div>
        {/* <div className="w-full h-45 mt-5 py-2 relative text-justify text-black text-xl font-normal font-['SchoolBook'] max-w-3xl">Description in english: {movieData.description_eng}  </div> */}
      </div>
      <div className='Description w-full pt-8 flex flex-col items-center'>
        <div className="w-full h-5 py-8 relative text-center text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">AUTORU KOMENTARS</div>
        <div className="w-full h-45 mt-5 py-2 relative text-justify text-black text-xl font-normal font-['SchoolBook'] max-w-3xl">{movieData.creators_comment}</div>
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
      <div className='Team w-[75%] py-8 flex flex-col'>
        <div className="Komanda w-full h-5 left-[15%] relative text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">KADRI</div>
        <div className="relative justify-center py-5 inline-flex flex-row items-center left-[15%] max-w-full min-w-fit">
          <div className="carousel-container w-full relative m-auto">
            {photoURLs.length > 0 ? (
              <Carousel>
                {photoURLs.map((url, index) => (
                  <div key={index}>
                    <img src={url} alt={`photo-${index}`} />
                  </div>
                ))}
              </Carousel>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {movieData?.awards?.items.length > 0 && (
        <div className="Team w-[75%] pt-8 flex flex-col">
          <div className="Komanda w-full h-5 left-[15%] relative text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">
            PANĀKUMI & FESTIVĀLI
          </div>
          <div className="relative py-5 flex flex-col left-[15%] max-w-full min-w-fit">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {movieData.awards.items.map((award, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start justify-start p-4 rounded-md"
                >
                  <div className="text-black text-xl font-semibold font-['SchoolBook']">
                    {award.name}
                  </div>
                  <div className="flex items-center text-black text-md font-normal font-['SchoolBook'] mt-2">
                    <span className='mr-2'>{award.year}</span>
                    <span className='mr-2'>{award.category}</span>
                    {award.type && (
                      <span> - {award.type}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


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
    </div>
    </>
  );
}

export default Movie;