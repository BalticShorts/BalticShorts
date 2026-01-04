import { useContext } from "react";
import "./style.css";
import '../App.css';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { useEffect, useState } from 'react';
import awsExports from '../aws-exports';
import { useNavigate } from "react-router-dom";
import { MyGridMovies } from "../modified-ui-components/Grid/movieGrid.jsx";
import { DisplayedPlaylistGroup } from "../components/DisplayedPlaylistGroup/DisplayedPlaylistGroup.jsx";
import MainMovie from "../components/MainMovie/MainMovie.jsx";
import { ReactComponent as Logo } from "../assets/images/bs_logo.svg";
import { useTranslation } from "react-i18next";

// https://mui.com/material-ui/material-icons/
import { GlobalContext } from "../App";


const Home = () => {
  const context = useContext(GlobalContext);
  Amplify.configure(awsExports);
  const navigate = useNavigate();
  const IdentityPoolId = "eu-north-1:1383e4fb-6f2d-462e-bc3d-7b9adc03e8d1";
  var AWS = require('aws-sdk');

  const [movies, setMovies] = useState([]);
  const [highlightedMovie, setHighlightedMovie] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [recomendedPlaylists, setRecomendedPlaylists] = useState([]);
  const [catalogue, setCatalogue] = useState(null);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    updateAWSConfigAndGetClient(IdentityPoolId, "eu-north-1");
    fetchCatalogue();
  }, []);

  useEffect(() => {
    if (catalogue) {
      fetchMovies();
      fetchPlaylists();
    }
  }, [catalogue]);

  function updateAWSConfigAndGetClient(cognitoIdentityCredentials, region) {
    if (cognitoIdentityCredentials != null) {
      AWS.config.region = region;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials(cognitoIdentityCredentials);
    }
  }

  const fetchCatalogue = async () => {
    try {
      const response = await fetch("https://balticshortsphotos.s3.eu-north-1.amazonaws.com/catalogue.json");
      if (!response.ok) throw new Error("Failed to fetch catalogue.json");
      const catalogueData = await response.json();
      setCatalogue(catalogueData);
    } catch (error) {
      setCatalogue(null);
      setMovies({ items: [] });
      setHighlightedMovie(null);
      setRecomendedPlaylists([]);
      console.error(error);
    }
  }

  const fetchMovies = () => {
    if (catalogue && catalogue.movies) {
      const movieList = { items: catalogue.movies || [] };
      setMovies(movieList);
      const highlighted = movieList.items.find(movie => movie.is_highlighted);
      setHighlightedMovie(highlighted);
    } else {
      setMovies({ items: [] });
      setHighlightedMovie(null);
    }
  }

  const fetchPlaylists = () => {
    if (catalogue && catalogue.playlists) {
      const playlistInfo = catalogue.playlists;
      const recommendedPlaylists = playlistInfo.filter(playlist => playlist.is_recommended);
      setRecomendedPlaylists(recommendedPlaylists);
    } else {
      setRecomendedPlaylists([]);
    }
  }

  return (
    <>
      <div className="w-full" id="container">
        <MainMovie movie={highlightedMovie} isLoggedIn = {context.currentUser && Object.keys(context.currentUser).length > 0} />
        <div className="max-w-[1100px] flex flex-col justify-center items-center m-auto">
          <div className="flex flex-row mt-50 gap-25 w-full h-fit justify-center items-center">
            <div className="w-1/3 h-48 border border-black flex flex-col items-center justify-between cursor-pointer p-4 hover-opacity" onClick={() => navigate('/catalogue/Movies')}>
              <div className="w-4/5 text-center typography-h2 my-auto">
                {t("Darbi")}
              </div>
              <div className="h-2.5 text-center typography-body-small mb-20">
                {t("Darbi_Apr")}
              </div>
            </div>

            <div className="w-1/3 h-48 border border-black flex flex-col items-center justify-between cursor-pointer p-4 hover-opacity" onClick={() => navigate('/catalogue/Persons')}>
              <div className="w-4/5 text-center typography-h2 my-auto">
                {t("Personas")}
              </div>
              <div className="h-2.5 text-center typography-body-small mb-20">
                {t("Personas_Apr")}
              </div>
            </div>

            <div className="w-1/3 h-48 border border-black flex flex-col items-center justify-between cursor-pointer p-4 hover-opacity" onClick={() => navigate('/catalogue/Playlists')}>
              <div className="w-4/5 text-center typography-h2 my-auto">
                {t("Saraksti")}
              </div>
              <div className="h-2.5 text-center typography-body-small mb-20">
                {t("Saraksti_Apr")}
              </div>
            </div>

          </div>

          <div className='w-full h-fit gap-6 mt-100 mb-25 flex flex-col items-center relative justify-center'>
            <div className="w-full typography-h2">
              {t("BS_Iesaka")}
            </div>
            <DisplayedPlaylistGroup elementsShown={recomendedPlaylists.length} playlists={recomendedPlaylists} />
        
            {movies.items?.length > 0 &&
                <MyGridMovies data={movies.items} maxRows={2} maxColumns={3} isLoggedIn={context.currentUser && Object.keys(context.currentUser).length > 0}></MyGridMovies>
            }
          </div>

          <div className="relative my-100 flex flex-row w-full items-center justify-center gap-50">
            <div className="mr-50">
              <Logo className="w-full h-fit"/>
            </div>
            <div className="typography-body uppercase !tracking-[0.1em] !font-normal whitespace-pre-line">
              {t("BS_apraksts")}
            </div>

          </div>

          <div className="flex-col justify-center items-center mb-50 w-full">
            <div className="text-center text-black typography-h2">{t("Par Projektu")}</div>
            <div className="my-50 m-auto w-2/3 text-black typography-body-large !text-justify">{t("Par_Projektu_Apr")}</div>
            <div className="w-fit px-10 m-auto text-center text-black !typography-body flex items-center button-default button-white cursor-pointer" onClick={() => navigate(`/${i18n.language}/about`)}>{t("Uzzināt vairāk")}</div>
          </div>
        </div>
      </div>
    </>
  );
}

  export default Home;