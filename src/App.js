import React, { Fragment, useEffect, useState } from "react";
import logo from "./logo.svg";

import "./App.css";
import {
  BrowserRouter as Router,
  useParams,
  useLocation,
} from "react-router-dom";

// import Routers from "./Routers";
import { Header } from "./components/layouts";

function App() {
  return (
    <Router>
      <div>
        <Header />    
        {/* <Routers /> */}
      </div>
  
    </Router>
  );
}

export default App;
