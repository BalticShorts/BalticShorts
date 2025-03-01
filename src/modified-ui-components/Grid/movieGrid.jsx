import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WatchlistModal from "../../components/WatchlistModal/WatchlistModal";
import { MdFormatListBulleted } from "react-icons/md";

export function getDirectors(data) {
  const result = {};
  data.forEach((item) => {
    if (item === null) return;
    const itemId = item.id;
    const names = [];
    if (item.MovieTeam === null) return;
    item.MovieTeam?.PersonMovieTeams.items.forEach((person) => {
      if (person.Role.name === "Režisors") {
        names.push(`${person.Person.name} ${person.Person.surname}`);
      }
    });
    result[itemId] = names.join(", ");
  });
  return result;
}

export function MyGridMovies({ data, maxRows, maxColumns, isLoggedIn }) {
  const [photoSrc, setPhotoSrc] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [fetched, setFetched] = useState(false);

  const navigate = useNavigate();
  const [rows, setRows] = useState(maxRows);
  const [directors, setDirectors] = useState(getDirectors(data));

  async function getSrc(items) {
    try {
      setFetched(true);
      const newPhotoSrc = {};
      items.forEach((item) => {
        if(item.thumbnail_location && item.thumbnail_location !== null && item.thumbnail_location !== undefined)
          newPhotoSrc[item.id] = `https://balticshortsphotos.s3.eu-north-1.amazonaws.com/${item.thumbnail_location.replace("balticshortsphotos/", "")}`;
        else
          newPhotoSrc[item.id] = require("../../assets/images/no_image_1.jpg");
      });
      setPhotoSrc(newPhotoSrc);
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      if (data.length === 0) return;
      await getSrc(data);
      setDirectors(getDirectors(data));
    }
    fetchData();
  }, [data]);

  const checkRow = (idx) => {
    if ((idx + 1) / maxColumns > rows) return false;
    return true;
  };

  return (
    <div className="w-full h-auto p-4 flex flex-col items-center bg-inherit">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center w-full bg-inherit`}
      >
        {data.map((item, idx) => (
          <>
            {checkRow(idx) && (
              <>
                {item !== null && (
                  <div
                    key={item.id}
                    className="relative flex flex-col shadow-md bg-inherit border border-black max-h-[292px] sm:min-h-[292px] overflow-hidden"
                    onClick={() => navigate('/movie/'+encodeURIComponent(item.name) + '/' + encodeURIComponent(item.id))}
                  >
                    <div className="relative w-full h-full h-20 sm:h-36 lg:h-48 lg:min-h-[192px] overflow-hidden bg-inherit">
                      <img
                        className="w-full h-full object-cover"
                        src={photoSrc[item.id]}
                        alt={item.name}
                      />
                      {isLoggedIn && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMovieId(item.id);
                          setModalOpen(true);
                        }}
                        className="absolute top-2 right-2 p-1 bg-transparent text-white rounded border border-white hover:bg-white hover:text-black"
                      >
                        <MdFormatListBulleted size={20} />
                      </button>
                      )}
                    </div>
                    <div className="mt-1 lg:mt-2 flex flex-col bg-inherit lg:px-4 px-2">
                      <span className="text-black text-sm lg:text-lg font-bold">
                        {item.name}
                      </span>
                      <div className="text-sm text-gray-600 mt-1">
                        {directors[item.id]}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.length}', {item.created_year}, {item.origin_country}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        ))}
      </div>
      {data.length / maxColumns > rows && (
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 text-black rounded-md shadow-md"
            onClick={() => setRows(rows + 1)}
          >
            Vairāk
          </button>
        </div>
      )}
      <WatchlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} movieId={selectedMovieId} />
    </div>
  );
}
