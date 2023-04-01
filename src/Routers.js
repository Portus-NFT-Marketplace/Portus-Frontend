import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Container from "@mui/material/Container";
import ProtectedRoute from "./utils/ProtectedRoute";
import AppProvider from "./utils/AppProvider";

import HomePage from "./components/pages/homePage";
import CreatingArtworkForm from "./components/pages/NFTCreatingPage";
import DetailPage from "./components/pages/detailPage";
import LoginForm from "./components/pages/loginPage";
import MyNFTPage from "./components/pages/myNFTPage";
import NotiNotConnectedMetamask from "./components/pages/myNFTPage/notConnectedMetamask";

export default function Routers({ isSignedIn, userToken, oauthToken }) {
  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      <Suspense fallback={<div>Loading..</div>}>
        <Switch>
          <Route
            exact
            path={["/", ""]}
            render={(props) => <HomePage {...props} oauthToken={oauthToken} />}
          />
          <Route exact path="/create_artwork">
            <CreatingArtworkForm
              isSignedIn={isSignedIn}
              userToken={userToken}
              oauthToken={oauthToken}
            />
          </Route>
          <Route
            exact
            path="/details/:id"
            render={(props) => (
              <DetailPage {...props} oauthToken={oauthToken} />
            )}
          />
          <Route exact path="/sign_in_as_foundation" component={LoginForm} />
          <ProtectedRoute exact path="/myNFT" component={MyNFTPage} />
          <AppProvider>
            <Route
              exact
              path="/not_connected_to_metamask"
              component={NotiNotConnectedMetamask}
            />
          </AppProvider>
        </Switch>
      </Suspense>
    </Container>
  );
}
