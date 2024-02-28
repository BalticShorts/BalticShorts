import React from "react";
import "./style.css";
import '../App.css';
import { Amplify, API } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import { listMoviePlaylists } from '../graphql/queries.js'
import { useEffect, useState } from 'react';
import awsExports from '../aws-exports';
import { useNavigate } from "react-router-dom";
import { Footer } from "../modified-ui-components/Footer";
import { MyGridMovies } from "../modified-ui-components/Grid/movieGrid.jsx";
import { getMoviesMain } from "../custom-queries/queries.js";
import { DisplayedPlaylistGroup } from "../components/DisplayedPlaylistGroup/DisplayedPlaylistGroup.jsx";
// https://mui.com/material-ui/material-icons/


const Home = () => {
    Amplify.configure(awsExports);
    const navigate = useNavigate();
    const IdentityPoolId = "eu-north-1:1383e4fb-6f2d-462e-bc3d-7b9adc03e8d1";
    var AWS = require('aws-sdk');

  const [movies, setMovies] = useState([]);
  const [playlists, setPlaylists] = useState([]);

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
      const playlistInfo = playlistData.data;
      // setPlaylists(playlistInfo);
      console.log(playlistInfo)
    } catch (error) {
      console.log('Error on fetchnig playlists', error);
    }
  }

  useEffect(() => {
    const footer = document.getElementById("footer");
    const offsetHeight = document.getElementById("container")?.offsetHeight;
    if (offsetHeight > 500)
      footer?.classList.add('relative')
    else
      footer?.classList.remove('relative')
  }, [playlists])

  return (
    <>
      <div className="w-full" id="container">
        <div id="nedelasIsfilma"  className="w-full relative h-fit">
          <img className="w-full h-fit max-h-[920px]" src={require("./static/ad_2.jpg")} alt="Changed to highlighted movie" />
          {/* will be changed to a highlighted moovie */}
        </div>
        <div className="flex flex-row w-4/5 my-10 m-auto items-center justify-center gap-6">
          <div className="w-80 h-48 relative border border-black flex flex-col items-center justify-center m-auto gap-10 cursor-pointer" onClick={() => navigate('/catalogue/Movies')}>
            <div className="w-80 h-3 relative text-center text-black text-opacity-80 text-xl font-bold font-['Arial'] uppercase tracking-wide">
              DARBI
            </div>
            <div className="w-80 h-2.5 relative text-center text-black text-opacity-80 text-sm font-normal font-['SchoolBook']">
              Jaunas, senas, vislabākās un vissliktākās<br />īsfilmas no visas Baltijas
            </div>
          </div>

          <div className="w-80 h-48 relative border border-black flex flex-col items-center justify-center m-auto gap-10 cursor-pointer" onClick={() => navigate('/catalogue/Persons')}>
            <div className="w-80 h-3 relative text-center text-black text-opacity-80 text-xl font-bold font-['Arial'] uppercase tracking-wide">
              PERSONAS
            </div>
            <div className="w-80 h-2.5 relative text-center text-black text-opacity-80 text-sm font-normal font-['SchoolBook']">
            Režisori, scenāriju autori, aktieri, mākslinieki un visi pārējie īsfilmu komandu dalībnieki
            </div>
          </div>

          <div className="w-80 h-48 relative border border-black flex flex-col items-center justify-center m-auto gap-10 cursor-pointer" onClick={() => navigate('/catalogue/Playlists')}>
            <div className="w-80 h-3 relative text-center text-black text-opacity-80 text-xl font-bold font-['Arial'] uppercase tracking-wide">
              SARAKSTI
            </div>
            <div className="w-80 h-2.5 relative text-center text-black text-opacity-80 text-sm font-normal font-['SchoolBook']">
              Baltic Shorts kuratoru un lietotāju <br/> veidotie īsfilmu saraksti
            </div>
          </div>

        </div>

        <div className='w-4/5 h-fit gap-6 my-24 flex flex-col items-center relative justify-center m-auto'>
          <div className="my-5 w-full h-5 text-black text-xl font-bold font-['Arial'] uppercase tracking-wide relative">
            BALTIC SHORTS IESAKA
          </div>
          <DisplayedPlaylistGroup elementsShown = {3}/>
          {/* Need to list the highlighted playlists and give the data */}
      
          {movies.items?.length > 0 &&
              <MyGridMovies data={movies.items} maxRows={2} maxColumns={3}></MyGridMovies>
          }
        </div>

        <div className="relative mt-10 flex flex-row w-3/5 items-center justify-center m-auto">
          <div className="m-auto">
            <img className="w-full h-fit" src={require("./static/Black_Logo.png")} alt="Subscribe" />

          </div>
          <div className="text-black text-base font-normal font-['SchoolBook'] uppercase tracking-wider m-auto px-6">
          JAUNAS, VECAS, SLIKTĀKĀS, LABĀKĀS,<br/> LIELBUDŽETA, BEZBUDŽETA ĪSFILMAS,<br/>REŽISORI, OPERATORI UN CITI FILMU VAROŅI <br/>NO baltijas valstu filmu industrijas.
          </div>

        </div>

        <div className="flex-col justify-center items-center gap-12 my-24 w-3/5 m-auto">
          <div className="text-center text-black text-xl font-bold font-['Arial'] uppercase tracking-wide">PAR PROJEKTU</div>
          <div className="m-auto w-3/5 text-black text-lg font-normal font-['SchoolBook'] my-10">Baltic Shorts ir digitāla straumēšanas platforma, kas fokusējas uz Baltijas valstīs (Latvija, Lietuva, Igaunija) radītu īsfilmu izrādīšanu. Projekta mērķis ir radīt un uzturēt ērti lietojamu plaša satura mājaslapu, kas attīsta īsfilmu formas pieejamību un to autoru atpazīstamību plašākā tirgū.</div>
          <div className="w-fit px-5 m-auto grow shrink basis-0 text-center text-black text-base font-normal font-['SchoolBook'] border border-black cursor-pointer" onClick={() => navigate('/about')}>Uzzināt vairāk</div>
        </div>
      </div>
      <div id="footer" className="mt-10 min-h-fit" >
        <Footer/>
      </div>
    </>
  );
}
  
  export default Home;