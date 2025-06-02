import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../custom-queries/queries";
import { API } from 'aws-amplify';
import { MyGridMovies } from "../modified-ui-components/Grid/movieGrid";
import { GlobalContext } from "../App";

const fetchProfile = async id => {
    const profileData = await API.graphql({
        query : getProfile,
        variables :  {
            id:id
        },
        authMode: 'AWS_IAM'
    });
    const person = profileData.data.getPerson;
    return person;
}

const countryNameToCode = {
  "Portugal": "PT",
  "Republic of Ireland": "IE",
  "Czech Republic": "CZ",
  "Malta": "MT",
  "Latvia": "LV",
  "Slovenia": "SI",
  "Poland": "PL",
  "Sweden": "SE",
  "Slovakia": "SK",
  "Luxembourg": "LU",
  "Belgium": "BE",
  "Bulgaria": "BG",
  "Italy": "IT",
  "Denmark": "DK",
  "Finland": "FI",
  "Croatia": "HR",
  "United Kingdom": "GB",
  "England": "EN",
  "France": "FR",
  "Ukraine": "UA",
  "Spain": "ES",
  "Lithuania": "LT",
  "Cyprus": "CY",
  "Russian Federation": "RU",
  "Estonia": "EE",
  "Netherlands": "NL",
  "Greece": "GR",
  "Romania": "RO",
  "Austria": "AT",
  "Germany": "DE",
};

function Profile({ personId }) {
    const context = useContext(GlobalContext);
    const [profile, setProfile] = useState({});
    const [movieCount, setMovieCount] = useState(0);
    var { id, mode } = useParams();
    if (personId !== undefined && personId !== null) {
        id = personId;
    }

    useEffect(() => {
        const get = async () => {
          if (id === undefined || id === null)
            return;
          let profileData = await fetchProfile(id);
          const filteredMovies = profileData.PersonMovieTeams?.items.filter(team => team.MovieTeam.Movie !== null);
          profileData.PersonMovieTeams.items = filteredMovies;
          try {     
            setProfile(profileData);
            const uniqueMovies = new Set(filteredMovies?.map(team => team.MovieTeam.Movie.id));
            setMovieCount(uniqueMovies.size);
          } catch (error) {
            console.log('Error on fetching: ', error);
          }
        }
        get();
      }, [id]);

      const groupedMovies = profile.PersonMovieTeams?.items.reduce((acc, team) => {
        const roleName = team.Role.name;
        if (!acc[roleName]) {
          acc[roleName] = [];
        }
        acc[roleName].push(team.MovieTeam.Movie);
        return acc;
      }, {});

      useEffect(() => {
        document.title = 'Baltic Shorts - Persona';
      }, []);

      return (
        <div className="min-h-screen bg-inherit text-black max-w-[1100px] m-auto">
          <section className="mt-25 mb-50 flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="flex gap-2">
                  <div className="typography-h1">
                    {profile.name} {profile.surname}
                  </div>
                  <div className="typography-technical align-top text-left">
                    {countryNameToCode[profile.nationality] || profile.nationality}
                  </div>
                </div>                
                <div className="typography-body-small mt-2">{profile.role}</div>
                <div className="typography-technical-12 mt-2 uppercase">{movieCount} {movieCount === 1 ? "darbs" : "darbi"}</div>
                <p className="typography-body mt-4 max-w-3xl">
                {profile.description}
                </p>
            </div>
            <div className="flex flex-col items-end">
              <a href={`mailto:${profile.email}`} className="mb-2 typography-technical-12 hover-opacity cursor-pointer">E-PASTS</a>
              <a href={profile.Instagram} className="mb-2 typography-technical-12 hover-opacity cursor-pointer">INSTAGRAM</a>
              <a href={profile.IMBD} className="typography-technical-12 hover-opacity cursor-pointer">IMDB</a>
            </div>
          </section>
    
          {groupedMovies && Object.keys(groupedMovies).map((roleName, index) => (
            <section key={index} className="w-full mx-auto mb-100">
              <div className="flex flex-row mb-25">
              <div className="typography-h2 font-bold mr-1">{roleName}</div><div className="typography-technical">{  groupedMovies[roleName].length}</div>
              </div>
              <MyGridMovies data={groupedMovies[roleName]} maxRows={1} maxColumns={3} isLoggedIn={context.currentUser && Object.keys(context.currentUser).length > 0}/>
            </section>
          ))}
    
        </div>
      );
}

export default Profile;