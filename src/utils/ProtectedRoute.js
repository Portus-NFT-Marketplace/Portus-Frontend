import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ component: Component, oauthToken, ...rest }) => {
  const isAuthenticated = Cookies.get("userAddress") !== undefined;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component oauthToken={oauthToken} {...props} />
        ) : (
          <Redirect to="/not_connected_to_metamask" />
        )
      }
    />
  );
};

export default ProtectedRoute;
