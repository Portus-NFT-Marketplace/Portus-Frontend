import React, { Fragment, useEffect, useState } from "react";
import logo from "./logo.svg";

import "./App.css";
import {
  BrowserRouter as Router,
  useParams,
  useLocation,
} from "react-router-dom";

import Routers from "./Routers";
import Fonts from "./utils/fonts";
import { Header, SignedInHeader } from "./components/layouts";

import Cookies from "js-cookie";
import axios from "axios";

function CheckSignedInHeader() {
  const isSignedIn = Cookies.get("isSignedIn");
  const userToken = Cookies.get("userToken");

  if (isSignedIn && userToken) {
    return <div>{<SignedInHeader />}</div>;
  } else {
    return <div>{<Header />}</div>;
  }

  // let { pathname } = useLocation();
  // // console.log(pathname);
  // // path that have log out button
  // let pathnames = ["/create_artwork"];

  // return <div>{pathnames.includes(pathname) && <SignedInHeader />}</div>;
}

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    let isMounted = true; // set a flag to check if the component is mounted

    const getToken = async () => {
      try {
        const response = await axios.post(
          "https://portus-api.herokuapp.com/oauth/token",
          {
            grant_type: "client_credentials",
            client_id: `${process.env.REACT_APP_CLIENT_ID}`,
            client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
          }
        );

        if (isMounted) {
          const token = response.data.access_token;
          Cookies.set("oauth-token", token, { expires: 1 / 24 }); // expires in 1 hour
          setToken(token);
          setTimeout(() => {
            Cookies.remove("oauth-token");
            getToken();
          }, 2 * 60 * 1000); // call getToken again after 2 minutes
        }
      } catch (error) {
        console.log(error);
      }
    };

    const token = Cookies.get("oauth-token");
    if (token) {
      setToken(token);
      setTimeout(() => {
        Cookies.remove("oauth-token");
        if (isMounted) getToken();
      }, 2 * 60 * 1000); // remove cookie and call getToken again after 2 minutes
    } else {
      getToken();
    }

    return () => {
      isMounted = false; // set the flag to false when the component is unmounted
    };
  }, []);

  console.log(token);

  return (
    <Router>
      <div>
        <Fonts />
        <CheckSignedInHeader />
        {/* <Header /> */}
        <Routers oauthToken={token} />
      </div>
    </Router>
  );
}

export default App;
