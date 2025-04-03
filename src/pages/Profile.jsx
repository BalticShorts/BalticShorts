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

function Profile () {
    const context = useContext(GlobalContext);
    const [profile, setProfile] = useState({});
    const [movieCount, setMovieCount] = useState(0);
    const { id, mode } = useParams();

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

      return (
        <div className="min-h-screen bg-inherit text-black max-w-[1100px] m-auto">
          <section className="mt-25 mb-50 flex flex-row justify-between">
            <div className="flex flex-col">
                <h1 className="text-4xl font-bold">{profile.name} {profile.surname} <span className="text-xs">{profile.nationality}</span></h1>
                <h2 className="text-md mt-2 font-semibold">{profile.role}</h2>
                <h2 className="text-md mt-2 font-semibold">{movieCount} {movieCount === 1 ? "Filma" : "Filmas"}</h2>
                <p className="text-gray-700 mt-4 max-w-3xl">
                {profile.description}
                </p>
            </div>
            <div className="flex flex-col items-end">
              <a href={`mailto:${profile.email}`} className="mb-2 text-sm text-gray-700 cursor-pointer">E-PASTS</a>
              <a href={profile.Instagram} className="mb-2 text-sm text-gray-700 cursor-pointer">INSTAGRAM</a>
              <a href={profile.IMBD} className="text-sm text-gray-700 cursor-pointer">IMDB</a>
            </div>
          </section>
    
          {groupedMovies && Object.keys(groupedMovies).map((roleName, index) => (
            <section key={index} className="w-full mx-auto mb-100">
              <div className="flex flex-row mb-25">
              <h3 className="typography-h2">{roleName}</h3><div className="typography-technical">{  groupedMovies[roleName].length}</div>
              </div>
              <MyGridMovies data={groupedMovies[roleName]} maxRows={1} maxColumns={3} isLoggedIn={context.currentUser && Object.keys(context.currentUser).length > 0}/>
            </section>
          ))}
    
        </div>
      );
}

export default Profile;