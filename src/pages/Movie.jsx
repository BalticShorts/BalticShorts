import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { movieMoviePlaylistsByMovieId, listFolder } from '../graphql/queries.js';
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
import { LoginPopup } from "../components/LoginPopup/LoginPopup";
import { Navbar } from '../modified-ui-components/Header/HEADER.jsx';
import { ReactComponent as Plus } from "../assets/images/plus.svg";
import { ReactComponent as List } from "../assets/images/list.svg";
import { ReactComponent as PlayBig } from "../assets/images/play_big.svg";
import { ReactComponent as Play } from "../assets/images/triangle.svg";
import { ReactComponent as Audio } from "../assets/images/audio.svg";
import { ReactComponent as Subtitles } from "../assets/images/subtitles.svg";
import { useTranslation } from "react-i18next";

Amplify.configure(awsExports);

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

const fetchVideo = async movie => {
  // Movies published through the admin publish flow carry their stream info directly.
  if (movie.hls_url || movie.dash_url) {
    return {
      "hls": movie.hls_url,
      "dash": movie.dash_url,
      "cmafDash": movie.cmaf_dash_url,
      "cmafHls": movie.cmaf_hls_url,
      "keyId": movie.drm_key_id,
      "resourceId": movie.drm_resource_id,
    };
  }

  // Fallback for movies published before the direct-field pipeline existed.
  const requestOptions = { method: 'POST' };
  const data = await fetch(config.aws_api_gateway + 'movies/' + movie.guid, requestOptions).then((response) => response.json());
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
  const location = useLocation();

  const { id } = useParams();
  const initialMovie = location.state && location.state.movie ? (location.state.movie.item || location.state.movie) : {};
  const [movieURL, setMovieURL] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [movieTrailer, setMovieTrailer] = useState('');
  const [movieData, setMovieData] = useState(initialMovie);
  const [urlAddon, setUrlAddon] = useState({});
  const [movieTeamData, setMovieTeamData] = useState({});
  const [shouldAutoplay] = useState(!!(location.state && location.state.play));
  const [textOnMovie, setTextOnMovie] = useState(!shouldAutoplay);
  const [playlists, setPlaylists] = useState([]);
  const [playlistRows, setPlaylistRows] = useState(1);
  const [subtitles, setSubtitles] = useState([]);
  const [photoURLs, setPhotoURLs] = useState([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isWatchlistModalOpen, setIsWatchlistModalOpen] = useState(false);
  const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { t, i18n } = useTranslation();
  const isDesktop = window.matchMedia("(min-width: 1100px)").matches;
  const cols = isDesktop ? 3 : 2;

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  useEffect(() => {
    let isMounted = true;
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    if (initialMovie && Object.keys(initialMovie).length > 0) {
      setMovieData(initialMovie);
      if (initialMovie.MovieTeam?.PersonMovieTeams?.items) {
        getMovieCast(initialMovie.MovieTeam.PersonMovieTeams.items).then(team => {
          if (isMounted) setMovieTeamData(team);
        });
      }
      getSrc(initialMovie.subtitles_location);
      getPhotoSrc(initialMovie.thumbnail_location);
      getPhotosFromFolder(initialMovie.photo_location).then(photos => {
        if (isMounted) setPhotoURLs(photos);
      });
    }
    async function get() {
      try {
        const movie = await fetchMovie(id);
        if (movie && movie.approved !== true) {
          if (isMounted) setNotFound(true);
          return;
        }
        if (isMounted) setMovieData(movie);
        await getPhotoSrc(movie.thumbnail_location);

        const playlists = await fetchPlaylists(id);
        if (isMounted) setPlaylists(playlists);

        const team = await getMovieCast(movie.MovieTeam.PersonMovieTeams.items);
        if (isMounted) setMovieTeamData(team);

        await getSrc(movie.subtitles_location);
        const photos = await getPhotosFromFolder(movie.photo_location);
        if (isMounted) setPhotoURLs(photos);

        if (context.currentUser.is_member) {
          const url = await fetchVideo(movie);
          const signedUrlAddon = await signVideo(url.keyId, url.resourceId);
          if (isMounted) {
            setUrlAddon(signedUrlAddon);
            setMovieURL(url);
          }
        }
      } catch (error) {
        console.log('Error on fetching: ', error);
      }
    }
    get();

    return () => { isMounted = false; };
  }, [id, context.currentUser.is_member]);

  useEffect(() => {
    if (movieData !== undefined && movieData.trailer_location !== undefined && movieData.trailer_location !== '' && movieData.trailer_location !== null) {
      setMovieTrailer(`${config.photos_bucket_url}/` + movieData.trailer_location.replace("balticshortsphotos/", ""));
    }
  }, [movieData]);

  useEffect(() => {
    if (isVideoModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isVideoModalOpen]);

  useEffect(() => {
    if (location.state && location.state.play) {
      setTextOnMovie(false);
      setTimeout(() => {
        const videoElement = document.querySelector('video');
        if (videoElement) {
          videoElement.play();
        }
      }, 100);
    }
  }, [location.state]);

  async function getSrc(location) {
    if (location == null || location === '') {
      return;
    }
    const publicUrl = `${config.photos_bucket_url}/${location.replace("balticshortsphotos/", "")}`;
    const extension = publicUrl.split(".").pop();
    try {
      const srtOrVttText = await fetch(publicUrl).then((response) => response.text());
      let vttText = srtOrVttText;
      if (extension !== 'vtt') {
        const srtRegex = /(\d+)\n(\d{2}:\d{2}:\d{2}),(\d{3}) --> (\d{2}:\d{2}:\d{2}),(\d{3})/g;
        vttText = 'WEBVTT\n\n' + srtOrVttText.replace(srtRegex, '$1\n$2.$3 --> $4.$5');
      }
      const blobURL = URL.createObjectURL(new Blob([vttText], { type: 'text/vtt' }));
      setSubtitles(blobURL);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function removeText() {
  if (!context.currentUser || Object.keys(context.currentUser).length === 0) {
      context.setLoggedInModal(true);
      return;
    }  else  if (!context.currentUser.is_member) {
      setShowSubscribeModal(true);
      return;
    } else {
      const elements = document.getElementById('textOnMovie');
      const videoElement = document.querySelector('video');
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
    const fallbackImage = require("../assets/images/no_image_1.jpg");
    const objectURL = item && item !== null && item !== undefined ? `${config.photos_bucket_url}/${item.replace("balticshortsphotos/", "")}` : fallbackImage;
    setThumbnailURL(objectURL);
    const element = document.getElementById('textOnMovie');
    if (element) {
      element.setAttribute('style', `background-image: url('${objectURL}'); background-size: cover;`);
    }
  }

  async function getPhotosFromFolder(fullPath) {
    if (!fullPath) return [];

    const folderPath = fullPath.replace("balticshortsphotos/", "");

    try {
      const result = await API.graphql({
        query: listFolder,
        variables: { prefix: folderPath },
        authMode: 'AWS_IAM',
      });
      const photoKeys = result.data.listFolder || [];
      return photoKeys.map((key) => `${config.photos_bucket_url}/${key}`);
    } catch (error) {
      console.error("Error fetching photos:", error);
      return [];
    }
  }
  useEffect(() => {
    document.title = `Baltic Shorts - ${movieData.name} (${movieData.created_year})`;
  }, [movieData]);

  useEffect(() => {
    if (shouldAutoplay) {
      const elements = document.getElementById('textOnMovie');
      elements.classList.add("hidden");
    }
  }, [shouldAutoplay]);

  if (notFound) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-beige text-black text-2xl">
        <Navbar/>
        {t("Šī filma vēl nav pieejama.")}
      </div>
    );
  }

  return (
    <>
    <div className="FilmasSkats w-full relative bg-beige rounded-3xl">
    <div className='absolute top-0 left-0 w-full z-10 text-beige hover:text-black hover:bg-beige fill-beige hover:fill-black !h-50 transition-colors duration-1000 ease-in-out'><Navbar/></div>

    <section className="MovieContainer w-full max-h-[65vh] h-[65vh] relative min-w-2/5">
      <div className="VideoWrapper w-full max-h-[65vh] h-[65vh] relative min-w-2/5">
        <VideoPlayer
          movieURL={movieURL}
          urlAddon={urlAddon}
          subtitles={subtitles}
          thumbnail={thumbnailURL}
          shouldAutoplay={shouldAutoplay}
        />
        <div
          id="textOnMovie"
          className="TextOverlay absolute w-full h-full flex flex-col justify-between pointer-events-auto inset-0 z-0"
          style={{ "background-color" : 'rgba(0, 0, 0, 1)' }}
        >        
          <div className="w-full h-[20%] flex flex-col desktop:items-center desktop:justify-center mobile:items-start mobile:justify-start bg-gradient-to-b from-stone-950 to-transparent">

            <div className="desktop:text-center mobile:text-left mix-blend-normal mt-100 desktop:mx-auto mobile:mx-20 max-w-[1100px]">
              <h1 className="text-beige typography-h1 text-opacity-90">
                {movieData.name}
              </h1>
              <p className="text-beige typography-body uppercase text-opacity-90 mt-10">
                {movieData.name_eng}
              </p>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[60px] h-[60px] flex items-center justify-center bg-transparent text-beige hover:bg-beige hover:text-black cursor-pointer" onClick={() => removeText()}>
              <PlayBig/>
            </div>
          </div>

          <div className="w-full desktop:h-[20%] mobile:h-[25%] flex desktop:items-center mobile:items-start desktop:justify-between mobile:justify-start bg-gradient-to-t from-stone-950 to-transparent">
            <div className="desktop:max-w-[1100px] mobile:w-full flex desktop:flex-row mobile:flex-col desktop:items-end mobile:items-start justify-between desktop:m-auto mobile:mx-25 w-full desktop:mb-50 mobile:mb-25">
              
              <div className="flex flex-col items-start gap-20 text-beige w-1/3 !text-opacity-70 !opacity-70 mobile:hidden">
                {movieTrailer && (
                  <button className="flex items-center button-default button-transparent z-10" onClick={() => setIsVideoModalOpen(true)}>
                    <Play/> <span className="ml-[6px]"> {t("Treileris")} </span>
                  </button>
                )}
                <div className="flex items-center gap-2 typography-body lowercase">
                  <Audio/> {movieData.screen_language}
                  <span> | </span>
                  <Subtitles/> {movieData.captions_language}
                </div>
              </div>

              <div className="flex flex-col desktop:text-center text-beige typography-body-small gap-1 desktop:w-1/3">
                <div><span className='uppercase'>{t("Režisors")} </span> {movieTeamData.Director?.map((person) => person.name).join(", ")}</div>
                <div>{movieData.origin_country} <span>&nbsp;|&nbsp;</span> {movieData.created_year} <span>&nbsp;|&nbsp;</span> {movieData.length}’ <span>&nbsp;|&nbsp;</span> {movieData.age_rating} + </div>
                <div className="!text-opacity-70 !opacity-70">{movieData.genre}</div>
              </div>

              <div className="flex flex-row desktop:items-end desktop:justify-end gap-4 w-1/3 relative pt-20 mobile:hidden">
                <div className="flex button-transparent add z-10 items-center justify-center cursor-pointer" onClick={() => {
                  if(context.currentUser && Object.keys(context.currentUser).length > 0) setIsPlaylistModalOpen(true)
                }}>
                  <List/>
                </div>
                <div className="flex button-transparent add z-10 items-center justify-center cursor-pointer" onClick={() => {
                  if(context.currentUser && Object.keys(context.currentUser).length > 0) setIsPlaylistModalOpen(true)
                }}>
                  <div className="flex items-center justify-center !w-[14px] !h-[14px]">            
                    <Plus />
                  </div> 
                </div>
              </div>
              <div className='desktop:hidden mobile:flex flex-col items-start justify-start w-full relative pt-10 gap-10'>
                <div className="flex items-center gap-2 typography-body lowercase text-beige">
                  <Audio/> {movieData.screen_language}
                  <span> | </span>
                  <Subtitles/> {movieData.captions_language}
                </div>
                <div className="flex flex-row gap-4">
                  {movieTrailer && (
                    <button className="flex items-center button-default button-transparent z-10" onClick={() => setIsVideoModalOpen(true)}>
                      <Play/> <span className="ml-[6px]"> {t("Treileris")} </span>
                    </button>
                  )}
                  <div className="flex button-transparent add z-10 items-center justify-center cursor-pointer" onClick={() => {
                    if(context.currentUser && Object.keys(context.currentUser).length > 0) setIsPlaylistModalOpen(true)
                  }}>
                    <List/>
                  </div>
                  <div className="flex button-transparent add z-10 items-center justify-center cursor-pointer" onClick={() => {
                    if(context.currentUser && Object.keys(context.currentUser).length > 0) setIsPlaylistModalOpen(true)
                  }}>
                    <div className="flex items-center justify-center !w-[14px] !h-[14px]">            
                      <Plus />
                    </div> 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className='!max-w-[1100px] items-center justify-center m-auto flex flex-col z-0 '>
      <div className='w-full flex flex-col desktop:items-center mobile:items-start mt-50 mobile:!px-25'>
        <div className="w-full relative desktop:text-center mobile:text-left typography-h2 mb-25">{t("Anotācija")}</div>
        <div className="w-full relative text-justify typography-body-large desktop:max-w-3xl mb-100">{i18n.language === movieData.description_language?.toLowerCase() ? movieData.description : movieData.description_eng}</div>
      </div>
      <div className='Description w-full flex flex-col desktop:items-center mobile:items-start mobile:!px-25'>
        <div className="w-full relative desktop:text-center mobile:text-left typography-h2 mb-25">{t("Autoru Komentārs")}</div>
        <div className="w-full relative text-justify typography-body-large desktop:max-w-3xl mb-100">{movieData.creators_comment}</div>
      </div>
      <div className='flex flex-col mb-100 mobile:!px-25 mobile:w-full'>
        <div className="w-full relative typography-h2 mb-25">{t("Komanda")}</div>
        <div className="relative justify-center gap-6 inline-flex flex-row items-start max-w-full min-w-fit">
          <div className="m-auto w-full">
            <div className="grid desktop:grid-cols-3 mobile:grid-cols-2 gap-25 mb-20">
              {[0, 1, 2].map((colIdx) => (
                <div key={colIdx} className="flex flex-col gap-4">
                  {movieTeamKeyOrder
                    .filter((key, idx) => idx % cols === colIdx && key in movieTeamData)
                    .map((key, idx) => {
                      const roleGroup = movieTeamData[key];
                      return (
                        <div key={idx} className="flex flex-col gap-1 w-full">
                          <span className="typography-body-small uppercase">{t(roleGroup[0].roleName)}</span>
                          <div className="flex flex-col">
                            {roleGroup.map((person) => (
                              <div key={person.id} className="flex flex-col mb-1">
                                <span className="typography-body-bold cursor-pointer">
                                  <a href={`/${i18n.language}/profile/${person.id}`}>{person.name}</a>
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
        <div className='flex flex-col mb-100'>
          <div className="w-full relative typography-h2 mb-25 mobile:!px-25">{t("Kadri")}</div>
          <div className="relative justify-center inline-flex flex-row items-center max-w-full min-w-fit">
            <div className="carousel-container w-full relative m-auto">
              {photoURLs.length > 0 ? (
                <Carousel showIndicators = {false} showStatus = {false} infiniteLoop showThumbs = {isDesktop} >
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
        {(movieData?.awards && Array.isArray(movieData.awards.items) && movieData.awards.items.length > 0) && (
          <div className="flex flex-col mb-100 w-full mobile:!px-25">
            <div className="w-full relative typography-h2 mb-25">
              {t("Panākumi & Festivāli")}
            </div>
            <div className="relative flex flex-col w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-25">
                {movieData.awards.items.map((award, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start justify-start rounded-md"
                  >
                    <div className="typography-body-bold">
                      {award.name}
                    </div>
                    <div className="flex items-center typography-body-small">
                      <span className='mr-1'>{award.year}</span>
                      <span className='mr-1'>{award.category}</span>
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
        <div className='h-fit flex flex-col relative justify-center m-auto items-center mb-100 mobile:!px-25'>
          <div className="w-full relative typography-h2 mb-25">{t("Saraksti, kuros filma ir iekļauta")}</div>
          <div className='w-full h-fit gap-6 flex flex-col items-center relative justify-center '>
            <MyGridPlaylists data={playlists.flat()} maxRows={3} maxColumns={3} />
          </div>
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
            <h2 className="text-2xl font-bold mb-4">{t("Abonējiet!")}</h2>
            <p className="mb-4">{t("Lai skatītos īsfilmas, nepieciešams aktīvs abonements.")}</p>
            <button
              className="bg-beige text-black px-2 py-2 rounded mt-4 border border-black px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-black hover:text-beige transition mx-2 cursor-pointer"
              onClick={() => navigate('/subscribe')}
            >
              {t("Abonēt")}
            </button>
            <button
              className="bg-beige text-black px-2 py-2 rounded mt-4 border border-black px-4 py-2 text-sm font-semibold uppercase tracking-wide hover:bg-black hover:text-beige transition mx-2 cursor-pointer"
              onClick={() => setShowSubscribeModal(false)}
            >
              {t("Aizvērt")}
            </button>
          </div>
        </div>
      )}
      <LoginPopup showing={context.loggedInModal} parentSetShowModal={context.setLoggedInModal}/>
    </>
  );
}

export default Movie;