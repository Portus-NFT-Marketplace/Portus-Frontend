import React, { Fragment, useEffect, useState } from "react";
import logo from "./logo.svg";

import "./App.css";
import {
  BrowserRouter as Router,
  useParams,
  useLocation,
} from "react-router-dom";

import Routers from "./Routers";
import { Header, SignedInHeader } from "./components/layouts";

import Cookies from "js-cookie";

function CheckSignedInHeader() {
  const isSignedIn = Cookies.get("isSignedIn");
  const userToken = Cookies.get("userToken");

  if (isSignedIn && userToken) {
    return <div>{<SignedInHeader />}</div>;
  }

  // let { pathname } = useLocation();
  // // console.log(pathname);
  // // path that have log out button
  // let pathnames = ["/create_artwork"];

  // return <div>{pathnames.includes(pathname) && <SignedInHeader />}</div>;
}

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routers />
        <CheckSignedInHeader />
      </div>
    </Router>
  );
}

export default App;
