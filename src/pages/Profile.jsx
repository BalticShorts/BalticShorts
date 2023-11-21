import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../custom-queries/queries";
import { API, graphqlOperation  } from 'aws-amplify';
import { Footer } from "../modified-ui-components/Footer";

const fetchProfile = async id => {
    const profileData = await API.graphql(graphqlOperation(getProfile, {'id':id}));
    const person = profileData.data.getPerson;
    return person;
}

function getMovies(PersonMovieTeam){

} 



function Profile () {

    const [profile, setProfile] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const get = async () => {
            if (id === undefined)
                return;
            const profileData = await fetchProfile(id);
            console.log(profileData)
          try {     
            setProfile(profileData);

          } catch (error) {
            console.log('Error on fetching: ', error);
          }
        }
        get();
      }, [id]);

    return (
        <div className="bg-amber-50">
            <div className="w-full h-12 relative">
                <div className="w-full h-12 absolute bg-amber-50 border-b border-black" />
                <div className="w-full mt-1 h-6 flex items-center justify-center relative">
                    <div className="h-5 mx-2 text-center text-black tex text-xl font-normal font-['SchoolBook'] tracking-tight inline-flex"><a href="/catalogue/Movies">Filmas</a></div>
                    <div className="h-5 mx-6 text-center text-black text-xl font-bold font-['SchoolBook'] tracking-tight inline-flex"><a href="/catalogue/Persons">Personas</a></div>
                    <div className="h-5 mx-2 my-auto text-center text-black text-xl font-normal font-['SchoolBook'] tracking-tight inline-flex"><a href="/catalogue/Playlists">Saraksti</a></div>
                </div>
            </div>

            <div className="Content left-[12%] relative pt-2 my-2 h-fit w-5/6">
                <div className="PersonalInfo flex flex-row h-full">
                    <img className="Rectangle32 w-52 h-72 border border-black mx-4" src="https://via.placeholder.com/200x260" />
                    <div className="flex flex-col relative ml-4 space-y-3">
                        <div className="text-black text-4xl font-bold font-['SchoolBook'] uppercase leading-10">{profile.name} {profile.surname}</div>
                        <div className="text-black text-xl font-normal font-['SchoolBook'] uppercase tracking-wider">{profile?.role}</div>
                        <div className="text-black text-sm font-normal font-['Arial'] uppercase leading-tight tracking-wide felx flex-col space-y-2">
                            <div><a>E-PASTS</a><br/></div>
                            <div><a href={profile?.instagram}>INSTAGRAM</a><br/></div>
                            <div><a href={profile?.IMBD}>IMDB</a><br/></div>
                        </div>
                        <div className="w-full text-black text-lg font-normal font-['SchoolBook']">{profile.description}</div>


                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}



export default Profile;