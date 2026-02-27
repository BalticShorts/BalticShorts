import React, { useState, useEffect, useContext } from "react";
import { API } from "aws-amplify";
import { MyGridMovies } from "../modified-ui-components/Grid";
import { useParams } from "react-router-dom";
import { getMoviesByPlaylistId } from "../custom-queries/queries";
import image from "./static/H_B.jpg";
import { GlobalContext } from "../App";
import { Navbar } from "../modified-ui-components/Header";
import { useTranslation } from "react-i18next";

const Playlist = () => {
  const context = useContext(GlobalContext);
  const [playlist, setPlaylist] = useState(null);
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [backgroundImage, setBackgroundImage] = useState(image);
  const { id } = useParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const playlistData = await API.graphql({
          query: getMoviesByPlaylistId,
          variables: { id: id },
          authMode: 'AWS_IAM'
        });
        setPlaylist(playlistData.data.getMoviePlaylist);
        setMovies(playlistData.data.getMoviePlaylist.movies.items.map((item) => item.movie));
        setBackgroundImage(playlistData.data.getMoviePlaylist.photo_location ?`https://balticshortsphotos.s3.eu-north-1.amazonaws.com/${ playlistData.data.getMoviePlaylist.photo_location.replace("balticshortsphotos/", "")}` : image);
        console.log("Playlist:", playlistData.data.getMoviePlaylist);

      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };
    fetchPlaylist();
    
  }, [id]);

  useEffect(() => {
    sortItems(sortBy, sortOrder);
  }, [sortBy, sortOrder]);

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortBy(option);
  };

  const handleSortOrderChange = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
  };

  const sortItems = (option, order) => {
    let sortedItems = [...movies];

    switch (option) {
      case 'date':
        sortedItems.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'year':
        sortedItems.sort((a, b) => b.created_year - a.created_year);
        break;
      case 'alphabet':
        sortedItems.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case 'length':
        sortedItems.sort((a, b) => a.length - b.length);
        break;
      default:
        break;
    }
    if (order === 'desc') {
      sortedItems.reverse();
    }

    setMovies(sortedItems);
  };

    useEffect(() => {
      document.title = 'Baltic Shorts - ' + playlist?.title;
    }, [playlist]);

  if (!playlist) return <div className="text-center mt-4 typography-body-large">Loading...</div>;

  return (
    <div className="bg-beige min-h-screen">
      <div className='absolute top-0 left-0 w-full z-10 text-beige hover:text-black hover:bg-beige fill-beige hover:fill-black !h-50 transition-colors duration-1000 ease-in-out'><Navbar/></div>
      
      <div
        className="relative w-full desktop:h-64 mobile:h-[75vh] flex flex-col desktop:items-center justify-between mobile:px-25"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-x-0 top-0 desktop:h-64 mobile:h-[75vh] bg-gradient-to-t from-slate-600 to-transparent z-0 mobile:opacity-50" />
        <div className="absolute inset-x-0 top-0 desktop:h-32 mobile:h-[35vh] bg-gradient-to-b from-slate-600 to-transparent z-0 mobile:opacity-70" />
        <div className="flex flex-col text-left gap-10 !items-start justify-left mx-10 w-full max-w-[1100px]">
          <h1 className="typography-h1 !text-beige mt-150 w-full max-w-[1100px] text-left desktop:mb-10 z-10">
            {playlist.title}
          </h1>
          <p className="typography-body w-full max-w-[1100px] text-left text-beige desktop:mb-50 mobile:mt-auto z-10">
            {playlist.creator}
          </p>
        </div>
      </div>
      <div className="mx-auto py-8 max-w-[1100px] mobile:px-25">
        <div className="flex justify-between items-center mb-6">
          <h2 className="typography-h2">{movies.length} {t("Filmas")}</h2>
          <div className="flex items-center">
            <span className="mr-2 typography-technical !uppercase">{t("Kārtot pēc:")}</span>
            <select value={sortBy} onChange={handleSortChange} className="p-1 bg-beige">
              <option value="date">{t("Ievietošanas datums")}</option>
              <option value="year">{t("Gads")}</option>
              <option value="alphabet">{t("Alfabēts")}</option>
              <option value="length">{t("Ilgums")}</option>
            </select>
            <button onClick={handleSortOrderChange} className="ml-2">
              {sortOrder === 'asc' ? '▲' : '▼'}
            </button>
          </div>
        </div>
        <MyGridMovies data={movies} maxRows={3} maxColumns={4} isLoggedIn={context.currentUser && Object.keys(context.currentUser).length > 0}/>
      </div>
    </div>
  );
};

export default Playlist;
