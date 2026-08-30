import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Catalogue from "./pages/Catalogue";
import AdminPlaylist from "./pages/AdminPlaylists";
import AdminReview from "./pages/AdminReview";
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
import { DropdownProvider } from "./context/DropdownContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import LanguageWrapper from "./LanguageWrapper";

Amplify.configure(awsExports);
export const GlobalContext = React.createContext();

export default function App() {
  const [loggedIn, setLoggedIn ] = useState(false);
  const [loggedInModal, setLoggedInModal ] = useState(false);
  const [currentUser, setCurrentUser ] = useState({});
  const [admin, setAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const assessLoggedInState = async () => {
    try {
      const sess = await Auth.currentAuthenticatedUser();
      setLoggedIn(true);

      const user = await getUser(sess);
      if (user) {
        if (user !== currentUser) {
          setCurrentUser(user);
        }
      }

      const currentSession = await Auth.currentSession();
      const groups = currentSession.getIdToken().payload["cognito:groups"] || [];
      setAdmin(groups.includes("Admins"));
    } catch (error) {
      console.log("not logged in");
      setLoggedIn(false);
    }
  };

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
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        auth: Auth,
        loggedIn: loggedIn,
        setLoggedIn: setLoggedIn,
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
        admin: admin,
        loggedInModal: loggedInModal,
        setLoggedInModal: setLoggedInModal,
        assessLoggedInState: assessLoggedInState,
        forceReload: () => setResetKey(prev => prev + 1)
      }}
    >
      <I18nextProvider i18n={i18n}>
        <DropdownProvider>
          <div key={resetKey}>
            <BrowserRouter>
              <Routes>
                <Route path="/:lang" element={<LanguageWrapper><Layout /></LanguageWrapper>}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="movie/:name/:id" element={<Movie />} />
                  <Route path="search/:query?" element={<Search />} />
                  <Route path="catalogue/:givenTab?" element={<Catalogue />} />
                  <Route path="profile/:id/:mode?" element={<Profile />} />
                  <Route path="playlist/:id" element={<Playlist />} />

                  {loggedIn ? (
                    <>
                      <Route path="user/:id" element={<UserProfilePage />} />
                      <Route path="faq" element={<Buj />} />
                      <Route path="subscribe" element={<Purchase />} />
                      <Route path="settings/:id" element={<SettingsPage />} />
                      {admin ? (
                        <>
                          <Route path="admin/playlists" element={<AdminPlaylist />} />
                          <Route path="admin/review" element={<AdminReview />} />
                          <Route path="addPlaylist/:id?" element={<PlaylistUpload />} />
                          <Route path="upload" element={<Upload />} />
                        </>
                      ):(
                        <Route path="*" element={<Home/>} />
                      )}
                    </>
                  ) : (
                    <>
                      <Route path="subscribe" element={<Purchase />} />
                      <Route path="*" element={<Subscribe />} />
                    </>
                  )}
                </Route>
                <Route path="*" element={<Navigate to="/en" replace />} />
              </Routes>
            </BrowserRouter>
          </div>
        </DropdownProvider>
      </I18nextProvider>
    </GlobalContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
