import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Catalogue from "./pages/Catalogue";
import React, {useEffect, useState } from "react";
import { Amplify, Auth } from "aws-amplify";
import awsExports from './aws-exports';
import Subscribe from "./pages/Subscribe";

Amplify.configure(awsExports);
export const GlobalContext = React.createContext();

export default function App() {
  const [loggedIn, setLoggedIn ] = useState(false);
  const [loggedInModal, setLoggedInModal ] = useState(false);
  
  const assessLoggedInState = () => {
    Auth.currentAuthenticatedUser()
      .then(sess => {
        console.log('logged in');
        setLoggedIn(true);
      })
      .catch(() => {
        console.log('not logged in')
        setLoggedIn(false);

      })
  }

  useEffect(() => {
    assessLoggedInState();
  }, [])

  return (
    <GlobalContext.Provider value={{'auth':Auth, 'loggedIn':loggedIn, 'setLoggedIn':setLoggedIn, 'loggedInModal': loggedInModal, 'setLoggedInModal' : setLoggedInModal}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          {loggedIn ?
          <>
            <Route path="Movie/:id" element={<Movie />} />
            <Route path="profile/:id?" element={<Profile />} />
            <Route path="search/:query?" element={<Search />} />
            <Route path="catalogue/:givenTab?" element={<Catalogue />} />
          </>
          : 
          <>
            <Route path="*" element={<Subscribe />} />
          </>
        }
          
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
