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
            if (id === undefined)
                return;
            const profileData = await fetchProfile(id);
          try {     
            setProfile(profileData);
            const uniqueMovies = new Set(profileData.PersonMovieTeams?.items.map(team => team.MovieTeam.Movie.id));
            setMovieCount(uniqueMovies.size);
          } catch (error) {
            console.log('Error on fetching: ', error);
          }
        }
        get();
      }, [id]);

      return (
        <div className="min-h-screen bg-inherit text-gray-900">
          <section className="w-4/5 mx-auto px-6 py-12 flex flex-row justify-between">
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
    
          {profile.PersonMovieTeams?.items.map((team, index) => (
            <section key={index} className="w-4/5 mx-auto px-6 py-8">
              <h3 className="text-lg font-bold mb-4">{team.Role.name}</h3>
              <MyGridMovies data={team.MovieTeam.Movie ? [team.MovieTeam.Movie] : []} maxRows={1} maxColumns={3} isLoggedIn={context.currentUser && Object.keys(context.currentUser).length > 0}/>
            </section>
          ))}
    
        </div>
      );
}

export default Profile;