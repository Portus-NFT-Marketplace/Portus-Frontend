import React, { lazy, Suspense } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Route, Redirect, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";

import HomePage from "./components/pages/homePage";
import CreatingArtworkForm from "./components/pages/NFTCreatingPage";
import DetailPage from "./components/pages/detailPage";
import IPFSImageUploader from "./components/pages/NFTCreatingPage/IPFSUploader";

const Routers = () => {
  // const classes = useStyles();
  // const { user: currentUser } = useSelector((state) => state.auth);

  // const RedirectLogin = () => (
  //   <Route>
  //     <Redirect to="/login" />
  //   </Route>
  // );

  // const AdminRoute = ({ component: Component, ...rest }) => {
  //   if (currentUser) {
  //     return (
  //       <Route
  //         {...rest}
  //         render={(props) =>
  //           currentUser.roles.includes("ROLE_ADMIN") === true ? (
  //             <Component {...props} />
  //           ) : (
  //             <Redirect to="/unauthorized" />
  //           )
  //         }
  //       />
  //     );
  //   } else {
  //     return <RedirectLogin />;
  //   }
  // };

  // const AdminVendorRoute = ({ component: Component, ...rest }) => {
  //   if (currentUser) {
  //     return (
  //       <Route
  //         {...rest}
  //         render={(props) =>
  //           currentUser.roles.includes("ROLE_VENDOR") === true ? (
  //             <Component {...props} />
  //           ) : (
  //             <Redirect to="/unauthorized" />
  //           )
  //         }
  //       />
  //     );
  //   } else {
  //     return <RedirectLogin />;
  //   }
  // };

  // const ManagerRoute = ({ component: Component, ...rest }) => {
  //   if (currentUser) {
  //     return (
  //       <Route
  //         {...rest}
  //         render={(props) =>
  //           currentUser.roles.includes("ROLE_MANAGER") === true ? (
  //             <Component {...props} />
  //           ) : (
  //             <Redirect to="/unauthorized" />
  //           )
  //         }
  //       />
  //     );
  //   } else {
  //     return <RedirectLogin />;
  //   }
  // };

  // const UserRoute = ({ component: Component, ...rest }) => {
  //   if (currentUser) {
  //     return (
  //       <Route
  //         {...rest}
  //         render={(props) =>
  //           currentUser.roles.includes("ROLE_USER") === true ? (
  //             <Component {...props} />
  //           ) : (
  //             <Redirect to="/unauthorized" />
  //           )
  //         }
  //       />
  //     );
  //   } else {
  //     return <RedirectLogin />;
  //   }
  // };

  // const WarehouseRoute = ({ component: Component, ...rest }) => {
  //   if (currentUser) {
  //     return (
  //       <Route
  //         {...rest}
  //         render={(props) =>
  //           currentUser.roles.includes("ROLE_WAREHOUSE") === true ? (
  //             <Component {...props} />
  //           ) : (
  //             <Redirect to="/unauthorized" />
  //           )
  //         }
  //       />
  //     );
  //   } else {
  //     return <RedirectLogin />;
  //   }
  // };

  return (
    <Container maxWidth={false} style={{ padding: 0 }}>
      <Suspense fallback={<div>Loading..</div>}>
        <Switch>
          <Route exact path={["/", ""]} component={HomePage} />
          <Route exact path="/create_artwork" component={CreatingArtworkForm} />
          <Route exact path="/details/:id" component={DetailPage} />
          <Route exact path="/image_uploader" component={IPFSImageUploader} />
        </Switch>
      </Suspense>
    </Container>
  );
};

export default Routers;
