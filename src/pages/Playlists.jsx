import React, { useState, useEffect, useContext } from "react";
import { API } from "aws-amplify";
import { MyGridMovies } from "../modified-ui-components/Grid";
import { useParams } from "react-router-dom";
import { getMoviesByPlaylistId } from "../custom-queries/queries";
import image from "./static/H_B.jpg";
import { GlobalContext } from "../App";
import { Navbar } from "../modified-ui-components/Header";

const Playlist = () => {
  const context = useContext(GlobalContext);
  const [playlist, setPlaylist] = useState(null);
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [backgroundImage, setBackgroundImage] = useState(image);
  const { id } = useParams();

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

  if (!playlist) return <div>Loading...</div>;

  return (
    <div className="bg-beige min-h-screen">
      <div className='absolute top-0 left-0 w-full z-10 text-beige hover:text-black hover:bg-beige fill-beige hover:fill-black !h-50 transition-colors duration-1000 ease-in-out'><Navbar/></div>
      
      <div
        className="relative w-full h-64 bg-gradient-to-b from-gray-800 to-transparent flex flex-col items-center justify-between"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", }}
      >
        <h1 className="typography-h1 !text-beige mt-150 w-full max-w-[1100px] text-left mb-10">
          {playlist.title}
        </h1>
        <p className="typography-body w-full max-w-[1100px] text-left text-beige mb-50">{playlist.creator}</p>
      </div>
      <div className="mx-auto py-8 max-w-[1100px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{movies.length} FILMAS</h2>
          <div className="flex items-center">
            <span className="mr-2">Kārtot pēc:</span>
            <select value={sortBy} onChange={handleSortChange} className="p-1 bg-beige">
              <option value="date">Ievietošanas datums</option>
              <option value="year">Gads</option>
              <option value="alphabet">Alfabēts</option>
              <option value="length">Ilgums</option>
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
