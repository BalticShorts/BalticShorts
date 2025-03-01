import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Catalogue from "./pages/Catalogue";
import AdminPlaylist from "./pages/AdminPlaylists";
import PlaylistUpload from "./pages/PlaylistUpload";
import React, {useEffect, useState } from "react";
import { API, Amplify, Auth } from "aws-amplify";
import awsExports from './aws-exports';
import Subscribe from "./pages/Subscribe";
import { getPersonByEmail } from "./custom-queries/queries";
import Upload from "./pages/Upload";
import Buj from "./pages/Buj";
import Playlist from "./pages/Playlists";
import UserProfilePage from "./pages/UserProfile";
import SettingsPage from "./pages/Settings";
import Purchase from "./pages/Purchase";

Amplify.configure(awsExports);
export const GlobalContext = React.createContext();

export default function App() {
  const [loggedIn, setLoggedIn ] = useState(false);
  const [loggedInModal, setLoggedInModal ] = useState(false);
  const [currentUser, setCurrentUser ] = useState({});
  const [admin, setAdmin] = useState(false);
  
  const assessLoggedInState = async () => {
    // try {
    //   await Auth.signOut();
    //   setLoggedIn(false);
    // } catch (error) {
    //   console.log("error on logging out: " + error);
    // }
    Auth.currentAuthenticatedUser()
      .then(sess => {
        console.log('logged in');
        setLoggedIn(true);
        getUser(sess).then(user => {
          setAdmin(user.is_admin);
          if(user !== currentUser)
            setCurrentUser(user);
        });
      })
      .catch(() => {
        console.log('not logged in')
        setLoggedIn(false);
        Auth.signOut();
      })
    }

  async function getUser(sess){
    const exists = await API.graphql({
      query: getPersonByEmail,
      variables : {
          email: sess.attributes.email
      },
      authMode: "AWS_IAM",
    });
    return exists.data.listUserProfiles.items[0];
  }

  useEffect(() => {
    assessLoggedInState();
  }, [loggedIn]);

  return (
    <GlobalContext.Provider
      value={{
        auth: Auth,
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        loggedInModal: loggedInModal,
        setLoggedInModal: setLoggedInModal,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />

            {loggedIn ? (
              <>
                <Route path="movie/:name/:id" element={<Movie />} />
                <Route path="profile/:id/:mode?" element={<Profile />} />
                <Route path="search/:query?" element={<Search />} />
                <Route path="catalogue/:givenTab?" element={<Catalogue />} />
                <Route path="user/:id" element={<UserProfilePage />} />
                <Route path="faq" element={<Buj />} />
                <Route path="playlist/:id" element={<Playlist />} />
                <Route path="subscribe" element={<Purchase />} />
                <Route path="settings/:id" element={<SettingsPage />} />
                {admin ? (
                  <>
                    <Route path="admin/playlists" element={<AdminPlaylist />} />
                    <Route path="addPlaylist/:id?" element={<PlaylistUpload />} />
                    <Route path="upload" element={<Upload />} />
                  </>
                ):(
                  <Route path="*" element={<Home/>} />
                )}
              </>
            ) : (
              <>
                <Route path="settings/:id" element={<SettingsPage />} />
                <Route path="subscribe" element={<Purchase />} />
                <Route path="*" element={<Subscribe />} />
              </>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
