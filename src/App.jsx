import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Catalogue from "./pages/Catalogue";
import Playlist from "./pages/Playlist";
import PlaylistUpload from "./pages/PlaylistUpload";
import React, {useEffect, useState } from "react";
import { API, Amplify, Auth } from "aws-amplify";
import awsExports from './aws-exports';
import Subscribe from "./pages/Subscribe";
import { getPersonByEmail } from "./custom-queries/queries";
import Upload from "./pages/Upload";

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
                <Route path="movie/:id" element={<Movie />} />
                <Route path="profile/:id/:mode?" element={<Profile />} />
                <Route path="search/:query?" element={<Search />} />
                <Route path="catalogue/:givenTab?" element={<Catalogue />} />
                <Route path="upload" element={<Upload />} />
                {admin ? (
                  <>
                    <Route path="playlists" element={<Playlist />} />
                    <Route path="addPlaylist/:id?" element={<PlaylistUpload />} />
                  </>
                ):(
                  <Route path="*" element={<Home/>} />
                )}
              </>
            ) : (
              <>
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
