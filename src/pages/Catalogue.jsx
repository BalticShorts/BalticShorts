import { useEffect, useState } from "react";
import { Footer } from "../modified-ui-components/Footer";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { getSearch, getMoviesMain } from "../custom-queries/queries";
import { MyGridMovies, MyGridPlaylists } from "../modified-ui-components/Grid";
import { PersonList } from "../modified-ui-components/PersonList";

const getTab = async (id) => {
  return document.getElementById(id);
};

const Catalogue = () => {
  const [tab, setTab] = useState(['Movies', null]);
  const [data, setData] = useState({ movies: [], persons: [], playlists: [] });
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');

  const { givenTab } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    const get = async () => {
      setLoading(true);
      try {
        const moviesData = await API.graphql({
          query: getMoviesMain,
          authMode: 'AWS_IAM'
        });
        const movies = moviesData.data.listMovies.items.sort(
          (a, b) => b.created_year - a.created_year
        );

        const datas = await API.graphql({
          query: getSearch,
          variables: {
            searchString: '',
            lowSearchString: '',
            firstCapitalisedSearchString: '',
            capitalisedSearchString: '',
          },
          authMode: 'AWS_IAM'
        });
        const persons = datas.data.listPeople.items;
        const playlists = datas.data.listMoviePlaylists.items;

        setData({ movies, persons, playlists });

        if (givenTab !== undefined) {
          setTab([givenTab, tab[0]]);
        }
      } catch (error) {
        console.log('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    get();
  }, [givenTab]);

  useEffect(() => {
    const changeTab = async () => {
      getTab(tab[1]).then((currentTab) => {
        if (currentTab !== null) {
          currentTab.classList.remove("font-bold");
          currentTab.classList.add("font-normal");
        }
      });
      getTab(tab[0]).then((currentTab) => {
        if (currentTab !== null) {
          currentTab.classList.remove("font-normal");
          currentTab.classList.add("font-bold");
        }
      });
    };
    changeTab();
  }, [tab]);

    useEffect(() => {
      const footer = document.getElementById("footer");
      const offsetHeight = document.getElementById("container")?.offsetHeight;
      if (offsetHeight > 500)
        footer?.classList.add('relative')
      else
        footer?.classList.remove('relative')
    }, [data])

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    sortItems(option, sortOrder);
  };

  const handleSortOrderChange = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    sortItems(sortOption, newOrder);
  };

  const sortItems = (option, order) => {
    let sortedItems = [];
    if (tab[0] === 'Movies') {
      sortedItems = [...data.movies];
    } else if (tab[0] === 'Persons') {
      sortedItems = [...data.persons];
    }

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

    if (tab[0] === 'Movies') {
      setData({ ...data, movies: sortedItems });
    } else if (tab[0] === 'Persons') {
      setData({ ...data, persons: sortedItems });
    }
  };

  return (
    <>
      <div className="bg-beige" id="container">
        <div className="w-full h-12 relative">
          <div className="w-full h-12 absolute bg-beige border-b border-black" />
          <div className="w-full mt-1 h-6 flex items-center justify-center relative">
            <div
              id="Movies"
              className="h-5 mx-2 text-center text-black tex text-xl font-bold font-['SchoolBook'] tracking-tight inline-flex cursor-pointer"
              onClick={() => setTab(['Movies', tab[0]])}
            >
              Filmas
            </div>
            <div
              id="Persons"
              className="h-5 mx-6 text-center text-black text-xl font-['SchoolBook'] font-normal tracking-tight inline-flex cursor-pointer"
              onClick={() => setTab(['Persons', tab[0]])}
            >
              Personas
            </div>
            <div
              id="Playlists"
              className="h-5 mx-2 my-auto text-center text-black text-xl font-normal font-['SchoolBook'] tracking-tight inline-flex cursor-pointer"
              onClick={() => setTab(['Playlists', tab[0]])}
            >
              Saraksti
            </div>
          </div>
        </div>
        <div className='w-4/5 h-fit gap-6 flex flex-col items-center relative justify-center m-auto py-8'>
          {/* Conditionally render content */}
          {loading ? (
            <div className="text-center mt-4">Loading...</div>
          ) : (
            <>
              {tab[0] === 'Movies' && (
                <>
                  <div className="w-full flex justify-between items-center mb-4">
                    <div className="text-xl font-bold">{data.movies.length} Filmas</div>
                    <div className="flex items-center">
                      <span className="mr-2">Kārtot pēc:</span>
                      <select value={sortOption} onChange={handleSortChange} className="p-1 bg-beige">
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
                  <MyGridMovies
                    data={data.movies}
                    maxRows={2}
                    maxColumns={3}
                  />
                </>
              )}
              {tab[0] === 'Persons' && (
                <>
                  <div className="w-full flex justify-between items-center mb-4">
                    <div className="text-xl font-bold">{data.persons.length} Personas</div>
                    <div className="flex items-center">
                      <span className="mr-2">Kārtot pēc:</span>
                      <select value={sortOption} onChange={handleSortChange} className="p-1 bg-beige">
                        <option value="alphabet">Alfabēts</option>
                      </select>
                      <button onClick={handleSortOrderChange} className="ml-2">
                        {sortOrder === 'asc' ? '▲' : '▼'}
                      </button>
                    </div>
                  </div>
                  <div className='w-[75%]'>
                    <PersonList data = {data.persons !== undefined ? data.persons : []}></PersonList>
                  </div>
                </>
              )}
              {tab[0] === 'Playlists' && (
                <>
                  <div className="w-full flex justify-between items-center mb-4">
                    <div className="text-xl font-bold">{data.playlists.length} Saraksti</div>
                  </div>
                  <div className='w-[75%] h-fit gap-6 my-24 flex flex-col items-center relative justify-center '>
                    <MyGridPlaylists data = {data.playlists !== undefined ? data.playlists : []} maxRows={2} maxColumns={3}></MyGridPlaylists>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div id="footer" className="mt-10 min-h-fit" >
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Catalogue;