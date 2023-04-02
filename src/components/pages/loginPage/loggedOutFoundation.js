import Cookies from "js-cookie";

function LoggedOutFromFoundation({}) {
  Cookies.remove("userToken");
  Cookies.remove("isSignedIn");
  Cookies.remove("foundationName");
}

export default LoggedOutFromFoundation;
