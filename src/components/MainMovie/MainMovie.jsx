import React, { useState, useRef} from "react";
import WatchlistModal from "../WatchlistModal/WatchlistModal";
import { ReactComponent as Plus } from "../../assets/images/plus.svg";
import { ReactComponent as Play } from "../../assets/images/triangle.svg";
import { Navbar } from "../../modified-ui-components/Header";

const MainMovie = ({ movie, isLoggedIn }) => {

    const director = movie.MovieTeam?.PersonMovieTeams.items.find(person => person.Role.name === "Režisors");
    const mov = 'https://balticshortsphotos.s3.eu-north-1.amazonaws.com/' + movie?.trailer_location.replace("balticshortsphotos/", "")
    const img = 'https://balticshortsphotos.s3.eu-north-1.amazonaws.com/' + movie?.thumbnail_location.replace("balticshortsphotos/", "")

    const [modalOpen, setModalOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);

    const videoRef = useRef(null);

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

  return (
    <section className="relative w-full h-[60vh] sm:h-[65vh] bg-black z-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="absolute inset-0">
        
        <video ref={videoRef} className={`videoTag overflow-hidden object-cover w-full h-full -z-10 transition-opacity duration-300${
          isHovered ? "opacity-100" : "opacity-0"
        }`} loop muted onLoadedData={handleVideoLoaded}>
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
        <div className="relative z-0 flex flex-col justify-between h-full text-beige max-w-[1100px] m-auto">

          <div className="mt-25">
            <p className="typography-technical uppercase !font-bold">
              Nedēļas īsfilma
            </p>

            <h1 className="typography-h1 my-10 cursor-pointer" onClick={() => window.location.href = '/movie/'+encodeURIComponent(movie.name) + '/' + encodeURIComponent(movie.id)}>
              {movie.name.toUpperCase()}
            </h1>

            <p className="typography-body uppercase cursor-pointer" onClick={() => window.location.href = '/movie/'+encodeURIComponent(movie.name) + '/' + encodeURIComponent(movie.id)}>
              {movie.name_eng}
            </p>
          </div>

          <div className="mb-12 sm:mb-50 flex items-center justify-center sm:justify-between gap-6">
            <div className="flex flex-col sm:ml-10">
              <p className="typography-body-bold mb-[3px]">
                <span>{director?.Person.name + ' ' + director?.Person.surname}</span>
              </p>
              <p className="typography-technical mb-10">
                <span>{movie.length}’, {movie.created_year}, {movie.origin_country}</span>
              </p>

              <div className="flex gap-10">
                <button className="flex flex-row items-center button-default button-white" onClick={() => window.location.href = '/movie/'+encodeURIComponent(movie.name) + '/' + encodeURIComponent(movie.id)}>
                  <Play/> <span className="ml-[6px]"> Skatīties </span>
                </button>
                <button className="flex items-center justify-center button-default button-transparent add" onClick={() => {if(isLoggedIn)setModalOpen(true)}}>
                  <div className="flex items-center justify-center !w-[11px] !h-[11px]">            
                    <Plus />
                  </div>    
                </button>
              </div>
            </div>

            <p className="typography-body-small text-beige w-2/3 pl-10">
              {movie.description.length > 320
                ? movie.description.slice(0, 320) + "..."
                : movie.description}
            </p>
            </div>
          </div>
        </div>
      <WatchlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} movieId={movie.id} />
    </section>
  );
};

export default MainMovie;
