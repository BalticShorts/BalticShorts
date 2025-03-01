import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { movieMoviePlaylistsByMovieId } from '../graphql/queries.js';
import { Amplify, API } from 'aws-amplify';
import awsExports from '../aws-exports';
import { getMovieQuery } from '../custom-queries/queries';
import config from '../config';
import { isMobile } from 'react-device-detect';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { VideoModal } from '../components/VideoModal/VideoModal';
import WatchlistModal from "../components/WatchlistModal/WatchlistModal";
import { MyGridPlaylists } from '../modified-ui-components/Grid/playlistGrid.jsx';
import { GlobalContext } from "../App";

Amplify.configure(awsExports);
const IdentityPoolId = "eu-north-1:1383e4fb-6f2d-462e-bc3d-7b9adc03e8d1";
var AWS = require('aws-sdk');

const movieTeamKeyOrder = ['Director', 'Actor', 'Executive producer', 'Operator', 'Costume artist', 'Producer', 'Author of the scenario', 'Makeup artist', 'Production company', 'Editing director', 'Film artist', 'Sound director', 'Composer'];
const fetchMovie = async id => {
  const movieData = await API.graphql({
    query: getMovieQuery,
    variables: { id: id },
    authMode: 'AWS_IAM'
  });
  const movie = movieData.data.getMovie;
  return movie;
};

const fetchVideo = async guid => {
  const requestOptions = { method: 'POST' };
  const data = await fetch(config.aws_api_gateway + 'movies/' + guid, requestOptions).then((response) => response.json());
  const resp = {
    "hls": data.Item.hlsUrl?.S.replace('d3tou2oin9ei82.cloudfront.net', 'vod.balticshorts.com'),
    "dash": data.Item.dashUrl?.S.replace('d3tou2oin9ei82.cloudfront.net', 'vod.balticshorts.com'),
    "cmafDash": data.Item.cmafDashUrl?.S.replace('d3tou2oin9ei82.cloudfront.net', 'vod.balticshorts.com'),
    "cmafHls": data.Item.cmafHlsUrl?.S.replace('d3tou2oin9ei82.cloudfront.net', 'vod.balticshorts.com'),
    "keyId": data.Item.keyId?.S, "resourceId": data.Item.resourceId?.S
  };
  return resp !== undefined ? resp : '';
};

const signVideo = async (keyId, resourceId) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ 'keyId': keyId }),
  };
  const data = await fetch(config.aws_api_gateway + 'signLink', requestOptions).then((response) => response.json());
  const body = JSON.parse(data.body);
  return body.token;
};

const fetchPlaylists = async id => {
  const movieData = await API.graphql({
    query: movieMoviePlaylistsByMovieId,
    variables: { movieId: id },
    authMode: 'AWS_IAM'
  });
  const playlistInfo = movieData.data.movieMoviePlaylistsByMovieId.items;
  const playlistsList = [];
  let row = [];
  playlistInfo.map((item) => {
    if (item.moviePlaylist.is_public) {
      if (row.length < 3)
        row.push(item.moviePlaylist);
      else {
        playlistsList.push(row);
        row = [];
        row.push(item.moviePlaylist);
      }
    }
    return item;
  });
  if (row.length !== 0)
    playlistsList.push(row);
  return playlistsList;
};

function Movie() {
  const context = useContext(GlobalContext);
  const navigate = useNavigate();
  AWS.config.region = "eu-north-1";
  AWS.config.credentials = new AWS.CognitoIdentityCredentials(IdentityPoolId);

  const { id } = useParams();
  const [movieURL, setMovieURL] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [movieTrailer, setMovieTrailer] = useState('');
  const [movieData, setMovieData] = useState({});
  const [urlAddon, setUrlAddon] = useState({});
  const [movieTeamData, setMovieTeamData] = useState({});
  const [textOnMovie, setTextOnMovie] = useState(true);
  const [playlists, setPlaylists] = useState([]);
  const [playlistRows, setPlaylistRows] = useState(1);
  const [subtitles, setSubtitles] = useState([]);
  const [photoURLs, setPhotoURLs] = useState([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isWatchlistModalOpen, setIsWatchlistModalOpen] = useState(false);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    async function get() {
      const movie = await fetchMovie(id);
      const playlists = await fetchPlaylists(id);
      const team = await getMovieCast(movie.MovieTeam.PersonMovieTeams.items);
      await getSrc(movie.subtitles_location);
      await getPhotoSrc(movie.thumbnail_location);
      const photos = await getPhotosFromFolder(movie.photo_location);
      try {
        setMovieData(movie);
        setMovieTeamData(team);
        setPlaylists(playlists);
        setPhotoURLs(photos);
        if (context.currentUser.is_member) {
          const url = await fetchVideo(movie.guid);
          const signedUrlAddon = await signVideo(url.keyId, url.resourceId);
          setUrlAddon(signedUrlAddon);
          setMovieURL(url);
        }
      } catch (error) {
        console.log('Error on fetching: ', error);
      }
    }
    get();
    return () => { };
  }, [id, context.currentUser.is_member]);

  useEffect(() => {
    if (movieData !== undefined && movieData.trailer_location !== undefined && movieData.trailer_location !== '' && movieData.trailer_location !== null) {
      setMovieTrailer('https://balticshortsphotos.s3.eu-north-1.amazonaws.com/' + movieData.trailer_location.replace("balticshortsphotos/", ""));
    }
  }, [movieData]);

  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isVideoModalOpen]);

  async function getSrc(location) {
    const config = {
      region: "eu-north-1",
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId,
      }),
      bucketName: "balticshortsphotos",
    };
    var myBucket = new AWS.S3(config);
    if (location != null && location !== '') {
      const split = location.split("/");
      const key = split.pop();
      const bucketLoc = split.join("/");
      const extension = key.split(".").pop();
      var params = {
        Bucket: bucketLoc,
        Key: key
      };
      try {
        const data = await myBucket.getObject(params).promise();
        const type = extension === 'vtt' ? 'text/vtt' : 'text/plain';
        var dataBlob = new Blob([data.Body], { type: type });
        if (extension !== 'vtt') {
          var srtText = await readBlobAsSrtText(dataBlob);
          const srtRegex = /(\d+)\n(\d{2}:\d{2}:\d{2}),(\d{3}) --> (\d{2}:\d{2}:\d{2}),(\d{3})/g;
          const vttText = 'WEBVTT\n\n' + srtText.replace(srtRegex, '$1\n$2.$3 --> $4.$5');
          dataBlob = new Blob([vttText], { type: 'text/vtt' });
        }
        var blobURL = URL.createObjectURL(dataBlob);
        setSubtitles(blobURL);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    return () => { };
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
    if (!context.currentUser.is_member) {
      setShowSubscribeModal(true);
      return;
    }else{
    const elements = document.getElementById('textOnMovie');
    const videoElement = document.querySelector('video');
    console.log(elements)
    sleep(3).then(() => {
      if (textOnMovie) {
        
        elements.classList.add("hidden");
        videoElement.play();
      } else {
        elements.classList.remove("hidden");
        videoElement.pause();
      }
      setTextOnMovie(!textOnMovie);
    });
    }
  }

  async function getMovieCast(team) {
    const teamMap = {};
    team.map((person) => {
      if (!(person.Role.name_eng in teamMap))
        teamMap[person.Role.name_eng] = [];
      teamMap[person.Role.name_eng].push({ "name": person.Person.name + " " + person.Person.surname, "id": person.Person.id, "roleName": person.Role.name });
    });
    return teamMap;
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
    <section
      className="MovieContainer w-full max-h-[80vh] relative min-w-2/5"
    >
      <div className="VideoWrapper w-full max-h-[80vh] relative min-w-2/5">
        <VideoPlayer
          movieURL={movieURL}
          urlAddon={urlAddon}
          subtitles={subtitles}
          thumbnail={thumbnailURL}
        />

        {!isMobile && (
          <div
            id="textOnMovie"
            className="TextOverlay absolute w-full h-full flex flex-col justify-between pointer-events-auto inset-0 z-0"
            style={{ "background-image": `url(${thumbnailURL})`, "background-size": "cover" }}
          >
            <div className="Rectangle3 w-full h-[20%] flex items-center justify-center bg-gradient-to-b from-stone-950 to-transparent">
              <div className="text-center mix-blend-normal">
                <h1 className="text-white text-sm sm:text-3xl lg:text-4xl font-bold font-['SchoolBook'] uppercase leading-10 text-opacity-90">
                  {movieData.name}
                </h1>
                <p className="text-white text-xs sm:text-sm lg:text-base font-normal font-['SchoolBook'] uppercase tracking-wider text-opacity-90">
                  {movieData.name_eng}
                </p>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-14 h-14 flex items-center justify-center border border-white bg-transparent text-white hover:bg-white hover:text-black transition" onClick={() => removeText()}>
                ▶
              </button>
            </div>

            <div className="Rectangle4 w-full h-[20%] flex flex-col sm:flex-row items-center justify-between px-6 bg-gradient-to-t from-stone-950 to-transparent">
              <div className="flex flex-col items-center gap-4 text-white ml-10 px-10">
                <button className="flex items-center gap-2 border border-white px-4 py-2 hover:bg-white hover:text-black transition z-10" onClick={() => setIsVideoModalOpen(true)}>
                  ▶ Treileris
                </button>
                <div className="flex items-center gap-2 text-sm">
                  🔊 {movieData.screen_language} | 🌍 {movieData.captions_language}
                </div>
              </div>

              <div className="text-center items-center text-white text-opacity-90 text-sm sm:text-lg lg:text-xl font-normal font-['SchoolBook'] m-auto">
                <p>Režisors {movieTeamData.Director?.map((person) => person.name).join(", ")}</p>
                <p>{movieData.origin_country} | {movieData.created_year} | {movieData.length}’ | {movieData.age_rating}+</p>
                <p>{movieData.genre}</p>
              </div>

              <div className="flex items-center gap-4 mr-10 px-10">
                <button className="border border-white text-white px-3 py-2 hover:bg-white hover:text-black transition z-10" onClick={() => setIsPlaylistModalOpen(true)}>
                  ☰
                </button>
                <button className="border border-white text-white px-3 py-2 hover:bg-white hover:text-black transition z-10" onClick={() => setIsWatchlistModalOpen(true)}>
                  ＋
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
      <div className='Description w-full pt-8 flex flex-col items-center'>
        <div className="w-full h-5 py-8 relative text-center text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">ANOTĀCIJA</div>
        <div className="w-full h-45 mt-5 py-2 relative text-justify text-black text-xl font-normal font-['SchoolBook'] max-w-3xl">{movieData.description}</div>
        {/* <div className="w-full h-45 mt-5 py-2 relative text-justify text-black text-xl font-normal font-['SchoolBook'] max-w-3xl">Description in english: {movieData.description_eng}  </div> */}
      </div>
      <div className='Description w-full pt-8 flex flex-col items-center'>
        <div className="w-full h-5 py-8 relative text-center text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">AUTORU KOMENTARS</div>
        <div className="w-full h-45 mt-5 py-2 relative text-justify text-black text-xl font-normal font-['SchoolBook'] max-w-3xl">{movieData.creators_comment}</div>
      </div>
      <div className='Team w-3/4 pt-8 flex flex-col'>
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
        <div className='Team w-3/4 py-8 flex flex-col'>
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
          <div className="Team w-3/4 pt-8 flex flex-col">
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
        <div className='h-fit gap-6 my-24 flex flex-col relative justify-center m-auto items-center'>
          <div className="w-3/4 h-5 text-black text-xl font-bold font-['Arial'] uppercase tracking-wide relative">Saraksti, kuros filma ir iekļauta</div>
          <div className='w-3/4 h-fit gap-6 flex flex-col items-center relative justify-center '>
            <MyGridPlaylists data={playlists.flat()} maxRows={3} maxColumns={3} />
          </div>
        </div>
      </div>
      {isVideoModalOpen && (
        <VideoModal
          videoSrc={movieTrailer}
          onClose={() => setIsVideoModalOpen(false)}
        />
      )}
      {isWatchlistModalOpen && (
        <WatchlistModal
          isOpen={isWatchlistModalOpen}
          onClose={() => setIsWatchlistModalOpen(false)}
          movieId={movieData.id}
        />
      )}
      {isPlaylistModalOpen && (
        <WatchlistModal
          isOpen={isPlaylistModalOpen}
          onClose={() => setIsPlaylistModalOpen(false)}
          movieId={movieData.id}
        />
      )}
      {showSubscribeModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-beige p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Abonējiet!</h2>
            <p className="mb-4">Lai skatītos īsfilmas, nepieciešams aktīvs abonaments.</p>
            <button
              className="bg-beige text-black px-2 py-2 rounded mt-4 border border-black px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-black hover:text-white transition mx-2"
              onClick={() => navigate('/subscribe')}
            >
              Abonēt
            </button>
            <button
              className="bg-beige text-black px-2 py-2 rounded mt-4 border border-black px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-black hover:text-white transition mx-2"
              onClick={() => setShowSubscribeModal(false)}
            >
              Aizvērt
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Movie;