import React, { useState, useRef, useContext} from "react";
import WatchlistModal from "../WatchlistModal/WatchlistModal";
import { ReactComponent as Plus } from "../../assets/images/plus.svg";
import { ReactComponent as Play } from "../../assets/images/triangle.svg";
import { Navbar } from "../../modified-ui-components/Header";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import { useTranslation } from "react-i18next";
import config from "../../config";

const MainMovie = ({ movie, isLoggedIn }) => {
    const context = useContext(GlobalContext)
    console.log("MainMovie render with movie:", movie);  
    const [modalOpen, setModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const videoRef = useRef(null);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    if (!movie) {
      return <div className="w-full h-[60vh] sm:h-[65vh] bg-black" />;
    }

    const handlePlayClick = () => {
      if (context.loggedIn) {
          navigate('/movie/' + encodeURIComponent(movie.name) + '/' + encodeURIComponent(movie.id),
                      { state: { movie, play: true } })
      } else {
          context.setLoggedInModal(true);
      }
    };

    const director = movie.MovieTeam?.PersonMovieTeams.items.find(person => person.Role.name === "Režisors");
    const mov = `${config.photos_bucket_url}/` + movie?.trailer_location.replace("balticshortsphotos/", "")
    const img = `${config.photos_bucket_url}/` + movie?.thumbnail_location.replace("balticshortsphotos/", "")

    const handleMouseEnter = () => {
      setIsHovered(true);
      if (isVideoLoaded && videoRef.current) {
        videoRef.current.play();
      }
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
      if (isVideoLoaded &&videoRef.current) {
        videoRef.current.pause();
      }
    };

    const handleVideoLoaded = () => {
      setIsVideoLoaded(true);
      console.log("isHovered");
      if (isHovered && videoRef.current) {
        videoRef.current.play();
      }
    };

    const description = i18n.language === movie.description_language.toLowerCase() && movie.description.length > 320
      ? movie.description.slice(0, 320) + "..."
      : i18n.language !== movie.description_language.toLowerCase() && movie.description_eng.length > 320
      ? movie.description_eng.slice(0, 320) + "..."
      : i18n.language === movie.description_language.toLowerCase() ? movie.description : movie.description_eng;
  return (
    <section className="relative w-full desktop:h-[60vh] h-[100vh] bg-black z-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="absolute inset-0">
        
        <video ref={videoRef} className={`videoTag overflow-hidden object-cover w-full h-full -z-10 transition-opacity duration-300
        ${ isHovered  ? "opacity-100" : "opacity-0"}`} loop muted onLoadedData={handleVideoLoaded}>
          <source src={mov} type="video/mp4" alt={movie.name}/>
        </video>
        <img
        src={img}
        alt="Thumbnail"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative z-0 flex flex-col h-full text-beige m-auto">
      <div className='w-full z-10 hover:bg-beige text-beige hover:text-black fill-beige hover:fill-black hover:border-b-2 hover:border-black border-none !h-50 transition-colors duration-1000 ease-in-out'><Navbar/></div>
        <div className="relative z-0 flex flex-col justify-between h-full text-beige desktop:max-w-[1100px] desktop:mx-auto desktop:px-0 mx-20">

          <div className="mt-35">
            <p className="typography-technical uppercase !font-bold">
              {t("Nedēļas īsfilma")}
            </p>

            <h1
              className="desktop:typography-h1 typography-h1-mobile my-10 cursor-pointer"
              onClick={() => navigate(`/${i18n.language}/movie/${encodeURIComponent(movie.name)}/${encodeURIComponent(movie.id)}`, { state: { movie } })}
            >
              {movie.name.toUpperCase()}
            </h1>

            <p
              className="typography-body uppercase cursor-pointer"
              onClick={() => navigate(`/${i18n.language}/movie/${encodeURIComponent(movie.name)}/${encodeURIComponent(movie.id)}`, { state: { movie } })}
            >
              {movie.name_eng}
            </p>
          </div>

          <div className="desktop:mb-12 mb-25 flex items-center justify-between gap-6">
            <div className="flex flex-col sm:ml-10">
              <p className="typography-body-bold mb-[3px]">
                <span>{director?.Person.name + ' ' + director?.Person.surname}</span>
              </p>
              <p className="typography-technical mb-10">
                <span>{movie.length}’, {movie.created_year}, {movie.origin_country}</span>
              </p>

              <div className="flex gap-10">
                <button
                  className="flex flex-row items-center button-default button-white cursor-pointer"
                  onClick={() => handlePlayClick()}
                >
                  <Play /> <span className="ml-[6px]"> {t("Skatīties")} </span>
                </button>
                <button
                  className="flex items-center justify-center button-default button-transparent add"
                  onClick={() => {
                    if (isLoggedIn) setModalOpen(true);
                  }}
                >
                  <div className="flex items-center justify-center !w-[14px] !h-[14px]">
                    <Plus />
                  </div>
                </button>
              </div>
            </div>

            <p className="hidden desktop:block typography-body-small text-beige w-2/3 pl-10 self-end -mb-1">
              {description}
            </p>
          </div>

          </div>
        </div>
      <WatchlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} movieId={movie.id} />
    </section>
  );
};

export default MainMovie;
