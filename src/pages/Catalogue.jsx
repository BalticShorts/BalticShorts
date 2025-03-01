import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { getSearch, getMoviesMain } from "../custom-queries/queries";
import { MyGridMovies, MyGridPlaylists } from "../modified-ui-components/Grid";
import { PersonList } from "../modified-ui-components/PersonList";
import { listCountryCodes, listMovieTypes } from "../graphql/queries";
import { GlobalContext } from "../App";

const getTab = async (id) => {
  return document.getElementById(id);
};

const Catalogue = () => {
  const context = useContext(GlobalContext);
  const [tab, setTab] = useState(['Movies', null]);
  const [data, setData] = useState({ movies: [], persons: [], playlists: [] });
  const [originalData, setOriginalData] = useState({ movies: [], persons: [], playlists: [] });
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterOption, setFilterOption] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [showFiltri, setShowFiltri] = useState(false);
  const [dropdowns, setDropdowns] = useState({
    Country: false,
    Year: false,
    Length: false,
    Type: false,
    Genre: false,
    Audio: false,
    Subtitles: false,
  });
  const [selectedFilters, setSelectedFilters] = useState({
    Country: [],
    Year: [],
    Length: [],
    Type: [],
    Genre: [],
    Audio: [],
    Subtitles: [],
  });
  const [countryOptions, setCountryOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [audioOptions, setAudioOptions] = useState([]);
  const [subtitleOptions, setSubtitleOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState({
    Country: [],
    Type: [],
    Genre: [],
    Audio: [],
    Subtitles: [],
  });

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

        const fetchedData = { movies, persons, playlists };
        setData(fetchedData);
        setOriginalData(fetchedData);

        if (givenTab !== undefined) {
          setTab([givenTab, tab[0]]);
        }

        const countryData = await API.graphql({ query: listCountryCodes, authMode: 'AWS_IAM' });
        const countryList = countryData.data.listCountryCodes.items.map(item => item.Code);
        setCountryOptions(countryList);
        setFilteredOptions(prevOptions => ({ ...prevOptions, Country: countryList }));

        const typeData = await API.graphql({ query: listMovieTypes, authMode: 'AWS_IAM' });
        const typeList = typeData.data.listMovieTypes.items.map(item => item.type);
        setTypeOptions(typeList);
        setFilteredOptions(prevOptions => ({ ...prevOptions, Type: typeList }));

        const genres = [...new Set(movies.map(movie => movie.genre))];
        setGenreOptions(genres);
        setFilteredOptions(prevOptions => ({ ...prevOptions, Genre: genres }));

        const audioLanguages = [...new Set(movies.map(movie => movie.screen_language))];
        setAudioOptions(audioLanguages);
        setFilteredOptions(prevOptions => ({ ...prevOptions, Audio: audioLanguages }));

        const subtitleLanguages = [...new Set(movies.map(movie => movie.captions_language))];
        setSubtitleOptions(subtitleLanguages);
        setFilteredOptions(prevOptions => ({ ...prevOptions, Subtitles: subtitleLanguages }));
      } catch (error) {
        console.log('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };
    setFilterOption('');

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
    console.log(sortedItems)

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

  const handleFilterChange = () => {
    let filteredItems = originalData.movies;

    if (selectedFilters.Country.length > 0) {
      filteredItems = filteredItems.filter(movie => selectedFilters.Country.includes(movie.origin_country));
    }
    if (selectedFilters.Year.length > 0) {
      filteredItems = filteredItems.filter(movie => selectedFilters.Year.includes(movie.created_year));
    }
    if (selectedFilters.Length.length > 0) {
      filteredItems = filteredItems.filter(movie => {
        return selectedFilters.Length.some(length => {
          const [min, max] = length.split('-').map(Number);
          return movie.length >= min && movie.length <= max;
        });
      });
    }
    if (selectedFilters.Type.length > 0) {
      filteredItems = filteredItems.filter(movie => selectedFilters.Type.includes(movie.MovieType.type));
    }
    if (selectedFilters.Genre.length > 0) {
      filteredItems = filteredItems.filter(movie => selectedFilters.Genre.includes(movie.genre));
    }
    if (selectedFilters.Audio.length > 0) {
      filteredItems = filteredItems.filter(movie => selectedFilters.Audio.includes(movie.screen_language));
    }
    if (selectedFilters.Subtitles.length > 0) {
      filteredItems = filteredItems.filter(movie => selectedFilters.Subtitles.includes(movie.captions_language));
    }

    setData({ ...data, movies: filteredItems });
  };

  const handlePersonFilterChange = (filter) => {    
    let filteredItems = originalData.persons;

    if (filter && filter !== filterOption) {
      filteredItems = filteredItems.filter(person => person.role === filter);
    }
    setFilterOption(filter && filter !== filterOption ? filter : '');
    setData({ ...data, persons: filteredItems });
  };

  const clearFilters = () => {
    setSelectedFilters({
      Country: [],
      Year: [],
      Length: [],
      Type: [],
      Genre: [],
      Audio: [],
      Subtitles: [],
    });
    setData(originalData);
  };

  const toggleDropdown = (dropdown) => {
    setDropdowns((prevDropdowns) => {
      const newDropdowns = { ...prevDropdowns };
      Object.keys(newDropdowns).forEach(key => {
        newDropdowns[key] = key === dropdown ? !newDropdowns[key] : false;
      });
      return newDropdowns;
    });
  };

  const handleFilterSelect = (filter, value) => {
    const options = {
      Country: countryOptions,
      Type: typeOptions,
      Genre: genreOptions,
      Audio: audioOptions,
      Subtitles: subtitleOptions,
    };

    setFilteredOptions((prevOptions) => ({
      ...prevOptions,
      [filter]: value ? options[filter].filter(option => option?.toLowerCase().includes(value.toLowerCase())) : options[filter],
    }));
  };

  const handleCheckboxChange = (filter, value) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
  
      const existingValues = newFilters[filter] ? [...newFilters[filter]] : [];
  
      if (existingValues.includes(value)) {
        newFilters[filter] = existingValues.filter((v) => v !== value);
      } else {
        newFilters[filter] = [...existingValues, value];
      }

      return newFilters;
    });
  };
  
  useEffect(() => {
    handleFilterChange();
  }, [selectedFilters]); 

  const lengths = Array.from({ length: 12 }, (_, i) => `${i * 5}-${(i + 1) * 5}`);

  const years = Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, i) => 1950 + i);

  const filterLabels = {
    Country: 'Valsts',
    Year: 'Gads',
    Length: 'Ilgums',
    Type: 'Tips',
    Genre: 'Žanrs',
    Audio: 'Audio',
    Subtitles: 'Subtitri',
  };

  return (
    <>
      <div className="bg-beige flex flex-col min-h-[70vh]" id="container">
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
        <div className='w-4/5 h-fit gap-6 flex flex-col items-center relative justify-center p-8 mx-auto'>
          {loading ? (
            <div className="text-center mt-4">Loading...</div>
          ) : (
            <>
              {tab[0] === 'Movies' && (
                <>
                  <div className="w-full flex justify-center items-center mb-4 p-2">
                    <div className="relative flex justify-center items-center">
                      <div className="flex flex-col items-center">
                        <div className="cursor-pointer font-bold uppercase mt-0" onClick={() => setShowFiltri(!showFiltri)}>
                          Filtri {showFiltri ? '▲' : '▼'}
                        </div>
                        {showFiltri && (
                          <>
                            <div className="absolute right-0 top-0 flex items-center gap-4">
                              <div className="cursor-pointer" onClick={() => clearFilters()}>Noņemt filtrus</div>
                            </div>
                            <div className="flex justify-start items-start gap-12 p-4">
                              {['Country', 'Year', 'Length', 'Type', 'Genre', 'Audio', 'Subtitles'].map((filter) => (
                                <div key={filter} className="relative">
                                  <div className="cursor-pointer flex items-center" onClick={() => toggleDropdown(filter)}>
                                    {filterLabels[filter]} {dropdowns[filter] ? '▼' : '▲'}
                                  </div>
                                  {dropdowns[filter] && (
                                    <div className="absolute bg-beige border mt-2 p-2 max-h-48 overflow-y-auto z-20 min-w-full whitespace-nowrap">
                                      {filter === 'Year' ? (
                                        <div className="flex flex-col">
                                          {years.map((year) => (
                                            <label key={year} className="flex items-center">
                                              <input
                                                type="checkbox"
                                                checked={selectedFilters.Year.includes(year)}
                                                onChange={() => handleCheckboxChange('Year', year)}
                                              />
                                              <span className="ml-2">{year}</span>
                                            </label>
                                          ))}
                                        </div>
                                      ) : filter === 'Country' ? (
                                        <div className="flex flex-col">
                                          <input type="text" placeholder={`Meklēt `} className="p-1 mb-2 w-full bg-beige" onChange={(e) => handleFilterSelect('Country', e.target.value)} />
                                          {filteredOptions.Country.map((country) => (
                                            <label key={country} className="flex items-center">
                                              <input
                                                type="checkbox"
                                                checked={selectedFilters.Country.includes(country)}
                                                onChange={() => handleCheckboxChange('Country', country)}
                                              />
                                              <span className="ml-2">{country}</span>
                                            </label>
                                          ))}
                                        </div>
                                      ) : filter === 'Type' ? (
                                        <div className="flex flex-col">
                                          <input type="text" placeholder={`Meklēt `} className="p-1 mb-2 w-full bg-beige" onChange={(e) => handleFilterSelect('Type', e.target.value)} />
                                          {filteredOptions.Type.map((type) => (
                                            <label key={type} className="flex items-center">
                                              <input
                                                type="checkbox"
                                                checked={selectedFilters.Type.includes(type)}
                                                onChange={() => handleCheckboxChange('Type', type)}
                                              />
                                              <span className="ml-2">{type}</span>
                                            </label>
                                          ))}
                                        </div>
                                      ) : filter === 'Genre' ? (
                                        <div className="flex flex-col">
                                          <input type="text" placeholder={`Meklēt `} className="p-1 mb-2 w-full bg-beige" onChange={(e) => handleFilterSelect('Genre', e.target.value)} />
                                          {filteredOptions.Genre.map((genre) => (
                                            <label key={genre} className="flex items-center">
                                              <input
                                                type="checkbox"
                                                checked={selectedFilters.Genre.includes(genre)}
                                                onChange={() => handleCheckboxChange('Genre', genre)}
                                              />
                                              <span className="ml-2">{genre}</span>
                                            </label>
                                          ))}
                                        </div>
                                      ) : filter === 'Audio' ? (
                                        <div className="flex flex-col">
                                          <input type="text" placeholder={`Meklēt `} className="p-1 mb-2 w-full bg-beige" onChange={(e) => handleFilterSelect('Audio', e.target.value)} />
                                          {filteredOptions.Audio.map((audio) => (
                                            <label key={audio} className="flex items-center">
                                              <input
                                                type="checkbox"
                                                checked={selectedFilters.Audio.includes(audio)}
                                                onChange={() => handleCheckboxChange('Audio', audio)}
                                              />
                                              <span className="ml-2">{audio}</span>
                                            </label>
                                          ))}
                                        </div>
                                      ) : filter === 'Subtitles' ? (
                                        <div className="flex flex-col">
                                          <input type="text" placeholder={`Meklēt `} className="p-1 mb-2 w-full bg-beige" onChange={(e) => handleFilterSelect('Subtitles', e.target.value)} />
                                          {filteredOptions.Subtitles.map((subtitle) => (
                                            <label key={subtitle} className="flex items-center">
                                              <input
                                                type="checkbox"
                                                checked={selectedFilters.Subtitles.includes(subtitle)}
                                                onChange={() => handleCheckboxChange('Subtitles', subtitle)}
                                              />
                                              <span className="ml-2">{subtitle}</span>
                                            </label>
                                          ))}
                                        </div>
                                      ) : filter === 'Length' ? (
                                        <div className="flex flex-col">
                                          {lengths.map((length) => (
                                            <label key={length} className="flex items-center">
                                              <input
                                                type="checkbox"
                                                checked={selectedFilters.Length.includes(length)}
                                                onChange={() => handleCheckboxChange('Length', length)}
                                              />
                                              <span className="ml-2">{length} min</span>
                                            </label>
                                          ))}
                                        </div>
                                      ) : null}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
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
                  <div className="relative flex justify-center items-center w-full">
                    <MyGridMovies
                      data={data.movies}
                      maxRows={2}
                      maxColumns={3}
                      isLoggedIn={context.currentUser && Object.keys(context.currentUser).length > 0}
                    />
                  </div>
                </>
              )}
              {tab[0] === 'Persons' && (
                <>
                  <div className="w-full flex justify-center items-center mb-4">
                    <div className="relative text-center">
                      <button onClick={() => setShowFilter(!showFilter)} className="ml-2">
                        Profesiju saraksts {showFilter ? '▲' : '▼'}
                      </button>
                      {showFilter && (
                        <div className="bg-beige mt-2 p-2 flex flex-wrap justify-center gap-4 text-center w-full">
                          <div className={`cursor-pointer ${filterOption === 'Director' ? 'font-bold' : ''}`} onClick={() => handlePersonFilterChange('Director')}>REŽISORS</div>
                          <div className={`cursor-pointer ${filterOption === 'Actor' ? 'font-bold' : ''}`} onClick={() => handlePersonFilterChange('Actor')}>AKTIERIS</div>
                          <div className={`cursor-pointer ${filterOption === 'Cinematographer' ? 'font-bold' : ''}`} onClick={() => handlePersonFilterChange('Cinematographer')}>OPERATORS</div>
                          <div className={`cursor-pointer ${filterOption === 'Editor' ? 'font-bold' : ''}`} onClick={() => handlePersonFilterChange('Editor')}>MONTĀŽAS REŽISORS</div>
                          <div className={`cursor-pointer ${filterOption === 'Screenwriter' ? 'font-bold' : ''}`} onClick={() => handlePersonFilterChange('Screenwriter')}>SCENĀRIJA AUTORS</div>
                          <div className={`cursor-pointer ${filterOption === 'Costume Designer' ? 'font-bold' : ''}`} onClick={() => handlePersonFilterChange('Costume Designer')}>TĒRPU MĀKSLINIEKS</div>
                          <div className={`cursor-pointer ${filterOption === 'Production Designer' ? 'font-bold' : ''}`} onClick={() => handlePersonFilterChange('Production Designer')}>FILMAS MĀKSLINIEKS</div>
                          <div className={`cursor-pointer ${filterOption === 'Makeup Artist' ? 'font-bold' : ''}`} onClick={() => handlePersonFilterChange('Makeup Artist')}>GRIMA MĀKSLINIEKS</div>
                          <div className={`cursor-pointer ${filterOption === 'Sound Designer' ? 'font-bold' : ''}`} onClick={() => handlePersonFilterChange('Sound Designer')}>SKAŅAS REŽISORS</div>
                          <div className={`cursor-pointer ${filterOption === 'Driver' ? 'font-bold' : ''}`} onClick={() => handlePersonFilterChange('Driver')}>ŠOFERIS</div>
                          <div className={`cursor-pointer ${filterOption === 'Graphic Designer' ? 'font-bold' : ''}`} onClick={() => handlePersonFilterChange('Graphic Designer')}>GRAFIKAS DIZAINERS</div>
                          <div className={`cursor-pointer ${filterOption === 'Producer' ? 'font-bold' : ''}`} onClick={() => handlePersonFilterChange('Producer')}>PRODUCENTS</div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full flex justify-between items-center mb-4">
                    <div className="text-xl font-bold">{data.persons.length} Personas</div>
                    <div class="flex items-center">
                      <span class="mr-2">Kārtot pēc:</span>
                      <select value={sortOption} onChange={handleSortChange} class="p-1 bg-beige">
                        <option value="alphabet">Alfabēts</option>
                      </select>
                      <button onClick={handleSortOrderChange} class="ml-2">
                        {sortOrder === 'asc' ? '▲' : '▼'}
                      </button>
                    </div>
                  </div>
                  <div className='w-3/4'>
                    <PersonList data = {data.persons !== undefined ? data.persons : []}></PersonList>
                  </div>
                </>
              )}
              {tab[0] === 'Playlists' && (
                <>
                  <div className="w-full flex justify-between items-center mb-4">
                    <div className="text-xl font-bold">{data.playlists.length} Saraksti</div>
                  </div>
                  <div className='w-3/4 h-fit gap-6 my-24 flex flex-col items-center relative justify-center '>
                    <MyGridPlaylists data = {data.playlists !== undefined ? data.playlists : []} maxRows={2} maxColumns={3}></MyGridPlaylists>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Catalogue;