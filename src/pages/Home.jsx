import React, { useContext } from "react";
import "./style.css";
import '../App.css';
import { Amplify, API } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { listMoviePlaylists } from '../graphql/queries.js'
import { useEffect, useState } from 'react';
import awsExports from '../aws-exports';
import { useNavigate } from "react-router-dom";
import { MyGridMovies } from "../modified-ui-components/Grid/movieGrid.jsx";
import { getMoviesMain } from "../custom-queries/queries.js";
import { DisplayedPlaylistGroup } from "../components/DisplayedPlaylistGroup/DisplayedPlaylistGroup.jsx";
import MainMovie from "../components/MainMovie/MainMovie.jsx";
import { ReactComponent as Logo } from "../assets/images/bs_logo.svg";

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

  useEffect(() => {
    updateAWSConfigAndGetClient(IdentityPoolId, "eu-north-1")
    async function mov () {
      try {
        await fetchMovies();
        await fetchPlaylists()
      } catch (error) {
        
      }
    }
   mov();
  }, []);
  function updateAWSConfigAndGetClient(cognitoIdentityCredentials, region) {
    if (cognitoIdentityCredentials != null) {
      AWS.config.region = region;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials(cognitoIdentityCredentials);
    }
}
  const fetchMovies = async () => {
    try {
        const movieData = await API.graphql({
          query: getMoviesMain,
          authMode: 'AWS_IAM'
        });
        const movieList = movieData.data.listMovies;
        setMovies(movieList);
        const highlighted = movieList.items.find(movie => movie.is_highlighted);
        setHighlightedMovie(highlighted);

    }catch (error) {
      console.log('Error on fetchnig movies', error);
    }
  }

  const fetchPlaylists = async () => {
    try {
      const playlistData = await API.graphql({
        query : listMoviePlaylists,
        variables :  {
          filter: {
            is_public: {
              eq: true
            }
          }
        },
        authMode: 'AWS_IAM'
      });
      const playlistInfo = playlistData.data.listMoviePlaylists.items;
      const recommendedPlaylists = playlistInfo.filter(playlist => playlist.is_recommended);
      setRecomendedPlaylists(recommendedPlaylists);
    } catch (error) {
      console.log('Error on fetching playlists', error);
    }
  }

  return (
    <>
      <div className="w-full" id="container">
        {highlightedMovie && <MainMovie movie={highlightedMovie} isLoggedIn = {context.currentUser && Object.keys(context.currentUser).length > 0} />}
        <div className="max-w-[1100px] flex flex-col justify-center items-center m-auto">
          <div className="flex flex-row mt-50 gap-25 w-full h-fit justify-center items-center">
            <div className="w-1/3 h-48 border border-black flex flex-col items-center justify-between cursor-pointer p-4" onClick={() => navigate('/catalogue/Movies')}>
              <div className="w-4/5 text-center typography-h2 my-auto">
                DARBI
              </div>
              <div className="h-2.5 text-center typography-body-small mb-20">
                Jaunas, senas, vislabākās un vissliktākās<br />īsfilmas no visas Baltijas
              </div>
            </div>

            <div className="w-1/3 h-48 border border-black flex flex-col items-center justify-between cursor-pointer p-4" onClick={() => navigate('/catalogue/Persons')}>
              <div className="w-4/5 text-center typography-h2 my-auto">
                PERSONAS
              </div>
              <div className="h-2.5 text-center typography-body-small mb-20">
              Režisori, scenāriju autori, aktieri, mākslinieki un visi pārējie īsfilmu komandu dalībnieki
              </div>
            </div>

            <div className="w-1/3 h-48 border border-black flex flex-col items-center justify-between cursor-pointer p-4" onClick={() => navigate('/catalogue/Playlists')}>
              <div className="w-4/5 text-center typography-h2 my-auto">
                SARAKSTI
              </div>
              <div className="h-2.5 text-center typography-body-small mb-20">
                Baltic Shorts kuratoru un lietotāju <br/> veidotie īsfilmu saraksti
              </div>
            </div>

          </div>

          <div className='w-full h-fit gap-6 mt-100 mb-25 flex flex-col items-center relative justify-center'>
            <div className="w-full typography-h2">
              BALTIC SHORTS IESAKA
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
            <div className="typography-body uppercase !tracking-[0.1em] !font-normal">
            JAUNAS, VECAS, SLIKTĀKĀS, LABĀKĀS,<br/> LIELBUDŽETA, BEZBUDŽETA ĪSFILMAS,<br/>REŽISORI, OPERATORI UN CITI FILMU VAROŅI <br/>NO baltijas valstu filmu industrijas.
            </div>

          </div>

          <div className="flex-col justify-center items-center mb-50 w-full">
            <div className="text-center text-black typography-h2">PAR PROJEKTU</div>
            <div className="my-50 m-auto w-2/3 text-black typography-body-large !text-justify">Baltic Shorts ir digitāla straumēšanas platforma, kas fokusējas uz Baltijas valstīs (Latvija, Lietuva, Igaunija) radītu īsfilmu izrādīšanu. Projekta mērķis ir radīt un uzturēt ērti lietojamu plaša satura mājaslapu, kas attīsta īsfilmu formas pieejamību un to autoru atpazīstamību plašākā tirgū.</div>
            <div className="w-fit px-10 m-auto text-center text-black !typography-body flex items-center button-default button-white cursor-pointer" onClick={() => navigate('/about')}>Uzzināt vairāk</div>
          </div>
        </div>
      </div>
    </>
  );
}

  export default Home;