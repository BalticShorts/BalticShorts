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
import { API, Amplify, Auth } from "aws-amplify";
import awsExports from './aws-exports';
import Subscribe from "./pages/Subscribe";
import { getPersonByEmail } from "./custom-queries/queries";

Amplify.configure(awsExports);
export const GlobalContext = React.createContext();

export default function App() {
  const [loggedIn, setLoggedIn ] = useState(false);
  const [loggedInModal, setLoggedInModal ] = useState(false);
  const [currentUser, setCurrentUser ] = useState({});
  
  const assessLoggedInState = async () => {
    Auth.currentAuthenticatedUser()
      .then(sess => {
        console.log('logged in');
        setLoggedIn(true);
        getUser(sess).then(user => {
          setCurrentUser(user);
        });
      })
      .catch(() => {
        console.log('not logged in')
        setLoggedIn(false);

      })
    }

  async function getUser(sess){
    const exists = await API.graphql({
      query: getPersonByEmail,
      variables : {
          email: sess.attributes.email
      },
      authMode: 'AWS_IAM'
  });
  return exists.data.listPeople.items[0];
  }

  useEffect(() => {
    assessLoggedInState();
  }, [])

  return (
    <GlobalContext.Provider value={{'auth':Auth, 'loggedIn':loggedIn, 'setLoggedIn':setLoggedIn, 'loggedInModal': loggedInModal, 'setLoggedInModal' : setLoggedInModal, 'currentUser': currentUser, 'setCurrentUser': setCurrentUser}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          {loggedIn ?
          <>
            <Route path="Movie/:id" element={<Movie />} />
            <Route path="profile/:id/:mode?" element={<Profile />} />
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
