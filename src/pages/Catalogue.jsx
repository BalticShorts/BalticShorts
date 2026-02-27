import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MyGridMovies, MyGridPlaylists } from "../modified-ui-components/Grid";
import { PersonList } from "../modified-ui-components/PersonList";
import { GlobalContext } from "../App";
import Profile from "./Profile";
import { useTranslation } from "react-i18next";

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
  const [selectedPersonId, setSelectedPersonId] = useState(null);
  const [rolesList, setRolesList] = useState([]);

  const { givenTab } = useParams();

  const handlePersonClicked = (id) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setSelectedPersonId(id);
  }
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    const get = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://balticshortsphotos.s3.eu-north-1.amazonaws.com/catalogue.json");
        if (!response.ok) throw new Error("Failed to fetch catalogue.json");

        const catalogue = await response.json();       
        const movies = catalogue.movies.sort((a, b) => b.created_year - a.created_year);
        const persons = catalogue.people;
        const playlists = catalogue.playlists;
        const allRoles = catalogue.roles || [];
        const movieTypes = catalogue.movieTypes || [];
        const countryCodes = catalogue.countryCodes || [];
        setRolesList(allRoles);
        const fetchedData = { movies, persons, playlists };
        setData(fetchedData);
        setOriginalData(fetchedData);
        console.log("Fetched catalogue data:", rolesList);

        if (givenTab !== undefined) {
          setTab([givenTab, tab[0]]);
        }

        const countryList = countryCodes.map(item => item.Code);
        setCountryOptions(countryList);
        setFilteredOptions(prev => ({ ...prev, Country: countryList }));

        const typeList = movieTypes.map(item => item.type);
        setTypeOptions(typeList);
        setFilteredOptions(prev => ({ ...prev, Type: typeList }));

        const genres = [...new Set(movies.map(movie => movie.genre))];
        setGenreOptions(genres);
        setFilteredOptions(prev => ({ ...prev, Genre: genres }));

        const audioLanguages = [...new Set(movies.map(movie => movie.screen_language))];
        setAudioOptions(audioLanguages);
        setFilteredOptions(prev => ({ ...prev, Audio: audioLanguages }));

        const subtitleLanguages = [...new Set(movies.map(movie => movie.captions_language))];
        setSubtitleOptions(subtitleLanguages);
        setFilteredOptions(prev => ({ ...prev, Subtitles: subtitleLanguages }));

      } catch (error) {
        console.log("Error fetching catalogue.json: ", error);
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
          currentTab.classList.remove("typography-body-bold");
          currentTab.classList.add("typography-body");
          currentTab.classList.add("link-hover");
        }
      });
      getTab(tab[0]).then((currentTab) => {
        if (currentTab !== null) {
          currentTab.classList.remove("typography-body");
          currentTab.classList.remove("link-hover");
          currentTab.classList.add("typography-body-bold");
        }
      });
      setSelectedPersonId(null);
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
      filteredItems = filteredItems.filter(person =>
        (person.PersonRoles?.items || []).some(
          r => r.Role?.name_eng === filter
        )
      );
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

  useEffect(() => {
    document.title = `Baltic Shorts - ${t("Katalogs")}`;
  }, [t]);

  return (
    <>
      <div className="bg-beige flex flex-col min-h-[70vh]" id="container">
        <div className="w-full h-50 relative border-b border-black flex items-center justify-center">
          <div className="w-full flex items-center justify-center relative my-auto">
            <div
              id="Movies"
              className="h-5 text-center typography-body link-hover inline-flex cursor-pointer"
              onClick={() => setTab(['Movies', tab[0]])}
            >
              {t("Filmas")}
            </div>
            <div
              id="Persons"
              className="h-5 mx-25 text-center typography-body link-hover inline-flex cursor-pointer"
              onClick={() => setTab(['Persons', tab[0]])}
            >
              {t("Personas")}
            </div>
            <div
              id="Playlists"
              className="h-5 text-center typography-body link-hover inline-flex cursor-pointer"
              onClick={() => setTab(['Playlists', tab[0]])}
            >
              {t("Saraksti")}
            </div>
          </div>
        </div>
        <div className='w-full max-w-[1100px] mx-auto h-fit flex flex-col items-center relative justify-center'>
          {loading ? (
            <div className="text-center mt-4 typography-body-large">Loading...</div>
          ) : (
            <div className=' mobile:px-25'>
              {tab[0] === 'Movies' && (
                <>
                  <div className="w-full flex justify-center items-center mt-15">
                    <div className="relative flex justify-center items-center">
                      <div className="flex flex-col items-center">
                        <div className="cursor-pointer font-bold uppercase mt-0 typography-technical" onClick={() => setShowFiltri(!showFiltri)}>
                          {t("Filtri")} {showFiltri ? '▲' : '▼'}
                        </div>
                        {showFiltri && (
                          <>
                            <div className="absolute right-0 top-0 flex items-center gap-4 typography-technical">
                              <div className="cursor-pointer" onClick={() => clearFilters()}>{t("Noņemt filtrus")}</div>
                            </div>
                            <div className="flex justify-start items-start gap-12 p-4">
                              {['Country', 'Year', 'Length', 'Type', 'Genre', 'Audio', 'Subtitles'].map((filter) => (
                                <div key={filter} className="relative">
                                  <div className="cursor-pointer flex items-center typography-technical" onClick={() => toggleDropdown(filter)}>
                                    {t(filterLabels[filter])} {dropdowns[filter] ? '▼' : '▲'}
                                  </div>
                                  {dropdowns[filter] && (
                                    <div className="absolute bg-beige border border-black mt-2 p-2 max-h-48 overflow-y-auto z-20 min-w-full whitespace-nowrap typography-technical">
                                      {filter === 'Year' ? (
                                        <div className="flex flex-col">
                                          {years.map((year) => (
                                            <label key={year} className="flex items-center">
                                              <input
                                                type="checkbox"
                                                checked={selectedFilters.Year.includes(year)}
                                                onChange={() => handleCheckboxChange('Year', year)}
                                              />
                                              <span className="ml-2 typography-technical">{year}</span>
                                            </label>
                                          ))}
                                        </div>
                                      ) : filter === 'Country' ? (
                                        <div className="flex flex-col">
                                          <input type="text" placeholder={t("Meklēt")} className="p-1 mb-2 w-full bg-beige" onChange={(e) => handleFilterSelect('Country', e.target.value)} />
                                          {filteredOptions.Country.map((country) => (
                                            <label key={country} className="flex items-center">
                                              <input
                                                type="checkbox"
                                                checked={selectedFilters.Country.includes(country)}
                                                onChange={() => handleCheckboxChange('Country', country)}
                                              />
                                              <span className="ml-2 typography-technical">{country}</span>
                                            </label>
                                          ))}
                                        </div>
                                      ) : filter === 'Type' ? (
                                        <div className="flex flex-col">
                                          <input type="text" placeholder={t("Meklēt")} className="p-1 mb-2 w-full bg-beige" onChange={(e) => handleFilterSelect('Type', e.target.value)} />
                                          {filteredOptions.Type.map((type) => (
                                            <label key={type} className="flex items-center">
                                              <input
                                                type="checkbox"
                                                checked={selectedFilters.Type.includes(type)}
                                                onChange={() => handleCheckboxChange('Type', type)}
                                              />
                                              <span className="ml-2 typography-technical">{type}</span>
                                            </label>
                                          ))}
                                        </div>
                                      ) : filter === 'Genre' ? (
                                        <div className="flex flex-col">
                                          <input type="text" placeholder={t("Meklēt")} className="p-1 mb-2 w-full bg-beige" onChange={(e) => handleFilterSelect('Genre', e.target.value)} />
                                          {filteredOptions.Genre.map((genre) => (
                                            <label key={genre} className="flex items-center">
                                              <input
                                                type="checkbox"
                                                checked={selectedFilters.Genre.includes(genre)}
                                                onChange={() => handleCheckboxChange('Genre', genre)}
                                              />
                                              <span className="ml-2 typography-technical">{t(genre)}</span>
                                            </label>
                                          ))}
                                        </div>
                                      ) : filter === 'Audio' ? (
                                        <div className="flex flex-col">
                                          <input type="text" placeholder={t("Meklēt")} className="p-1 mb-2 w-full bg-beige" onChange={(e) => handleFilterSelect('Audio', e.target.value)} />
                                          {filteredOptions.Audio.map((audio) => (
                                            <label key={audio} className="flex items-center">
                                              <input
                                                type="checkbox"
                                                checked={selectedFilters.Audio.includes(audio)}
                                                onChange={() => handleCheckboxChange('Audio', audio)}
                                              />
                                              <span className="ml-2 typography-technical">{audio}</span>
                                            </label>
                                          ))}
                                        </div>
                                      ) : filter === 'Subtitles' ? (
                                        <div className="flex flex-col">
                                          <input type="text" placeholder={t("Meklēt")} className="p-1 mb-2 w-full bg-beige" onChange={(e) => handleFilterSelect('Subtitles', e.target.value)} />
                                          {filteredOptions.Subtitles.map((subtitle) => (
                                            <label key={subtitle} className="flex items-center">
                                              <input
                                                type="checkbox"
                                                checked={selectedFilters.Subtitles.includes(subtitle)}
                                                onChange={() => handleCheckboxChange('Subtitles', subtitle)}
                                              />
                                              <span className="ml-2 typography-technical">{subtitle}</span>
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
                                              <span className="ml-2 typography-technical">{length} min</span>
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
                  <div className="w-full flex justify-between items-center my-25">
                    <div className="typography-h2 font-bold">{data.movies.length} {t("Filmas")}</div>
                    <div className="flex items-center">
                      <span className="mr-2 typography-technical !uppercase">{t("Kārtot pēc:")}</span>
                      <select value={sortOption} onChange={handleSortChange} className="p-1 bg-beige typography-technical">
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
                  {!selectedPersonId ? (
                    <>
                      <div className="w-full h-full flex flex-col relative justify-between my-25 typography-technical">
                        <div className="relative text-center typography-technical">
                          <button onClick={() => setShowFilter(!showFilter)} className="ml-2 !uppercase">
                            {t("Profesiju saraksts")} {showFilter ? '▲' : '▼'}
                          </button>
                          {showFilter && (
                            <div className="bg-beige flex flex-wrap justify-center gap-x-25 text-center w-full !uppercase">
                              {rolesList.map(role => (
                                <div
                                  key={role.id}
                                  className={`typography-technical cursor-pointer ${filterOption === role.name_eng ? 'font-bold' : ''}`}
                                  onClick={() => handlePersonFilterChange(role.name_eng)}
                                >
                                  {t(role.name)}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="w-full flex justify-between items-center mb-4">
                        <div className="typography-h2 font-bold">{data.persons.length} {t("Personas")}</div>
                        <div className="flex items-center typography-technical">
                          <span className="mr-2 typography-technical !uppercase">{t("Kārtot pēc:")}</span>
                          <select value={sortOption} onChange={handleSortChange} className="p-1 bg-beige">
                            <option value="alphabet">{t("Alfabēts")}</option>
                          </select>
                          <button onClick={handleSortOrderChange} className="ml-2">
                            {sortOrder === 'asc' ? '▲' : '▼'}
                          </button>
                        </div>
                      </div>

                      <div className="w-full">
                        <PersonList
                          data={data.persons !== undefined ? data.persons : []}
                          onPersonClick={(id) => handlePersonClicked(id)}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="w-full">
                      {/* <button onClick={() => handlePersonClicked(null)} className="mb-4 underline">← Atpakaļ uz sarakstu</button> */}
                      <Profile personId={selectedPersonId} />
                    </div>
                  )}
                </>
              )}
              {tab[0] === 'Playlists' && (
                <>
                  <div className="w-full h-full flex flex-col relative justify-between my-25">
                    <div className="typography-h2">{data.playlists.length} {t("Saraksti")}</div>
                  </div>
                  <div className='w-full h-fit gap-6 flex flex-col items-center relative justify-center '>
                    <MyGridPlaylists data = {data.playlists !== undefined ? data.playlists : []} maxRows={2} maxColumns={3}></MyGridPlaylists>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Catalogue;