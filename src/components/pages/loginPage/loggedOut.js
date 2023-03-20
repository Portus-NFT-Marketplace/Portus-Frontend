import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

function LoggedOutFromFoundation({}) {
  Cookies.remove("userToken");
  Cookies.remove("isSignedIn");
//   console.log("logged out");
//   console.log(Cookies.get("userToken"));
//   console.log(Cookies.get("isSignedIn"));

//   <Redirect to="/sign_in_as_foundation" replace />;
//   console.log("xxxx");
}

export default LoggedOutFromFoundation;
