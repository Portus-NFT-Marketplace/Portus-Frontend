import React, { Fragment, useEffect, useState } from "react";

import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Routers from "./Routers";
import Fonts from "./utils/fonts";
import { Footer, Header, SignedInHeader } from "./components/layouts";

import Cookies from "js-cookie";
import axios from "axios";

import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    opacity: 0,
    transition: "opacity 1s ease-in-out",
    backgroundColor: theme.palette.common.white,
  },
  visible: {
    opacity: 1,
  },
}));

function CheckSignedInHeader() {
  const isSignedIn = Cookies.get("isSignedIn");
  const userToken = Cookies.get("userToken");

  if (isSignedIn && userToken) {
    return <div>{<SignedInHeader />}</div>;
  } else {
    return <div>{<Header />}</div>;
  }
}

function App() {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const [token, setToken] = useState(null);

  useEffect(() => {
    let isMounted = true; // set a flag to check if the component is mounted

    const getToken = async () => {
      try {
        const tokenTimestamp = Cookies.get("oauth-token-timestamp");
        const currentTime = new Date().getTime();

        if (tokenTimestamp && currentTime - tokenTimestamp < 90 * 60 * 1000) {
          // Token is still valid, set it and schedule next token check
          const token = Cookies.get("oauth-token");
          setToken(token);
          setTimeout(() => {
            if (isMounted) getToken();
          }, 90 * 60 * 1000);
        } else {
          // Token is not valid or not present, get a new one
          console.log("api called");
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
            Cookies.set("oauth-token", token, { expires: 1.5 / 24 }); // expires in 1 hour and 30 minutes
            Cookies.set("oauth-token-timestamp", new Date().getTime());
            setToken(token);
            setTimeout(() => {
              Cookies.remove("oauth-token");
              Cookies.remove("oauth-token-timestamp");
              if (isMounted) getToken();
            }, 90 * 60 * 1000);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const tokenTimestamp = Cookies.get("oauth-token-timestamp");
    const currentTime = new Date().getTime();

    if (tokenTimestamp && currentTime - tokenTimestamp < 90 * 60 * 1000) {
      // Token is still valid, set it and schedule next token check
      const token = Cookies.get("oauth-token");
      setToken(token);
      setTimeout(() => {
        if (isMounted) getToken();
      }, 90 * 60 * 1000);
    } else {
      getToken();
    }

    return () => {
      isMounted = false; // set the flag to false when the component is unmounted
    };
  }, []);

  return (
    <Router>
      <CheckSignedInHeader />
      <div className={`${classes.root} ${isVisible && classes.visible}`}>
        <CssBaseline />
        <Fonts />
        {/* <Header /> */}
        <Routers oauthToken={token} />
      </div>
      <Footer />
    </Router>
  );
}

export default App;
