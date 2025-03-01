import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { MyGridMovies, MyGridPlaylists } from "../modified-ui-components/Grid";
import { getUserPlaylistsFull } from "../custom-queries/queries";
import { GlobalContext } from "../App";

const fetchProfile = async (id) => {
  try {
    const profileData = await API.graphql({
      query: getUserPlaylistsFull,
      variables: { id },
      authMode: "AWS_IAM",
    });
    return profileData.data.getUserProfile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};

const UserProfilePage = () => {
  const context = useContext(GlobalContext);
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const [myLists, setMyLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfileData = async () => {
      if (!id) return;
      try {
        const data = await fetchProfile(id);
        setProfile(data);

        const watchLater = data.MoviePlaylists.items.find(
          (playlist) => playlist.title.toLowerCase() === "watch later".toLowerCase()
        );
        if (watchLater) {
          setWatchLaterMovies(watchLater.movies.items.map((item) => item.movie));
        }

        const otherLists = data.MoviePlaylists.items.filter(
          (playlist) => playlist.title.toLowerCase() !== "watch later".toLowerCase()
        );
        setMyLists(otherLists);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    getProfileData();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-beige min-h-screen felx flex-col">
      <header className="py-10 m-auto mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold tracking-wide">{profile.name} {profile.surname}</h1>
        <nav className="mt-2 text-sm font-semibold">
          {/* <a href="#" className="mr-6">SKATĪŠANĀS VĒSTURE</a> */}
          <a href={"/settings/" + id}>UZSTĀDĪJUMI</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto">
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">SKATĪTIES VĒLĀK <sup>{watchLaterMovies.length}</sup></h2>
          </div>

          <MyGridMovies data={watchLaterMovies} maxRows={3} maxColumns={3} isLoggedIn={context.currentUser && Object.keys(context.currentUser).length > 0}/>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">MANI SARAKSTI</h2>
          <MyGridPlaylists data={myLists} maxRows={2} maxColumns={2} />
        </section>
      </main>
    </div>
  );
};

export default UserProfilePage;
