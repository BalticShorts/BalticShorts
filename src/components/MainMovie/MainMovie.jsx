import React, { useState} from "react";
import WatchlistModal from "../WatchlistModal/WatchlistModal";

const MainMovie = ({ movie }) => {

    const director = movie.MovieTeam?.PersonMovieTeams.items.find(person => person.Role.name === "Režisors");
    const mov = 'https://balticshortsphotos.s3.eu-north-1.amazonaws.com/' + movie?.trailer_location.replace("balticshortsphotos/", "")

    const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] bg-black z-0">
      <div className="absolute inset-0">
        <video className='videoTag overflow-hidden object-cover w-full h-full -z-10' autoPlay loop muted>
          <source src={mov} type="video/mp4" alt={movie.name}/>
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      <div className="relative z-0 flex flex-col justify-between h-full text-white px-6 sm:px-20 mx-24">
        <div className="mt-12 sm:mt-20">
          <p className="uppercase text-sm sm:text-base tracking-widest mb-2 sm:mb-4">
            Nedēļas īsfilma
          </p>

          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            {movie.name.toUpperCase()}
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mt-1">
            {movie.name_eng}
          </p>
        </div>

        <div className="mb-12 sm:mb-20 flex items-center justify-center sm:justify-between gap-6">
          <div className="flex flex-col sm:ml-10">
            <p className="text-sm sm:text-base text-gray-300">
              <span className="font-semibold">{director?.Person.name + ' ' + director?.Person.surname}</span>
            </p>
            <p className="text-sm sm:text-base text-gray-300 mb-4">
              <span className="text-gray-400">{movie.length}’, {movie.created_year}, {movie.origin_country}</span>
            </p>

            <div className="flex gap-4">
              <button className="flex items-center px-4 py-2 border border-white bg-black text-white hover:bg-white hover:text-black transition" onClick={() => window.location.href = '/movie/'+encodeURIComponent(movie.name) + '/' + encodeURIComponent(movie.id)}>
                ▶ Skatīties
              </button>
              <button className="px-3 py-2 border border-white text-white bg-transparent hover:bg-white hover:text-black transition" onClick={() => setModalOpen(true)}>
                +
              </button>
            </div>
          </div>

          <p className="max-w-2xl sm:max-w-3xl text-sm sm:text-base text-gray-300 text-left px-20 sm:p-10">
            {movie.description}
          </p>
        </div>
      </div>
      <WatchlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} movieId={movie.id} />
    </section>
  );
};

export default MainMovie;
