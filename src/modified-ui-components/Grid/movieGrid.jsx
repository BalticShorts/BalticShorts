import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WatchlistModal from "../../components/WatchlistModal/WatchlistModal";
import { ReactComponent as TriangleDown } from "../../assets/images/triangle_down.svg";
import { ReactComponent as PlayBig } from "../../assets/images/play_big.svg";
import { ReactComponent as List } from "../../assets/images/list.svg";
import { ReactComponent as Plus } from "../../assets/images/plus.svg";
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
    <div className="w-full h-auto flex flex-col items-center bg-inherit">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-25 items-center w-full bg-inherit`}
      >
        {data.map((item, idx) => (
          <>
            {checkRow(idx) && (
              <>
                {item !== null && (
                  <div
                    key={item.id}
                    className="relative flex flex-col bg-inherit border border-black max-h-[285px] overflow-hidden cursor-pointer"
                    onClick={() => navigate(
                      '/movie/' + encodeURIComponent(item.name) + '/' + encodeURIComponent(item.id),
                      { state: { movie: {} } }
                      // { state: { movie: item } } NEED TO GIX THIS. NEW CATALOGUE.JSON BREAKS THIS
                    )}
                  >
                    <div className="relative w-full h-full h-20 sm:h-36 lg:h-48 lg:min-h-[195px] overflow-hidden bg-inherit">
                      <img
                        className="w-full h-full object-cover"
                        src={photoSrc[item.id]}
                        alt={item.name}
                      />
                      <div className="hover:opacity-100 opacity-0 transition-opacity duration-300 absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                        {isLoggedIn && (
                          <div className="absolute top-0 right-0 mt-10 mr-10">
                            <div className="flex flex-row items-center justify-end gap-10">
                              <div className="flex button-transparent add z-10 items-center justify-center" onClick={(e) => {e.stopPropagation();setSelectedMovieId(item.id);setModalOpen(true);}}>
                                <List/>
                              </div>
                              <div className="flex button-transparent add z-10 items-center justify-center" onClick={(e) => {e.stopPropagation();setSelectedMovieId(item.id);setModalOpen(true);}}>
                                <Plus className="!w-[14px] !h-[14px]"/>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-[40px] h-[40px] flex items-center justify-center bg-transparent text-beige hover:bg-beige hover:text-black">
                            <PlayBig/>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 lg:mt-15 flex flex-col bg-inherit mx-15 justify-between">
                      <div className="typography-body-bold uppercase !font-bold">
                        {item.name}
                      </div>
                      <div className="mb-15 flex flex-row bg-inherit justify-between">
                        <div className="typography-body-small">
                          {directors[item.id]}
                        </div>
                        <div className="typography-technical">
                          {item.length}', {item.created_year}, {item.origin_country}
                        </div>
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
        <>
          <div className="relative w-full h-10">
            <div className="w-full absolute inset-x-0 -top-[70px] h-28 bg-[linear-gradient(180deg,rgba(253,252,245,0.2)_0%,rgba(253,252,245,0.8)_50%,rgba(253,252,245,1)_100%)]"/>
            <div className="flex justify-center mt-20 ">
              <div
                className="typography-technical z-10 flex flex-row justify-center items-center gap-1 cursor-pointer"
                onClick={() => setRows(rows + 1)}
              >
                <span className="typography-technical !tracking-[0.1em]">VAIRĀK</span><TriangleDown/>
              </div>
            </div>
          </div>
        </>
        )}
      <WatchlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} movieId={selectedMovieId} />
    </div>
  );
}
