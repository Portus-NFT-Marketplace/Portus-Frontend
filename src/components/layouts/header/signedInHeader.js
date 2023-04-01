import React, { Fragment } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Link, withRouter, NavLink, useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import EmailIcon from "@mui/icons-material/Email";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { Stack, Button } from "@mui/material";

import TranslateIcon from "@mui/icons-material/Translate";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

import Logo from "../../../components/pages/assets/portus_logo.png";
import ButtonBlue from "../../pages/shared/general/ButtonBlue";
import ButtonOrange from "../../pages/shared/general/ButtonOrange";

import LoggedOutFromFoundation from "../../pages/loginPage/loggedOutFoundation";

// import { logout } from "../../../actions/auth";
import { Box } from "@mui/system";

import Cookies from "js-cookie";

const StyledButtonLogOut = styled(Button)({
  borderColor: "#E46842",
  backgroundColor: "transparent",
  color: "#E46842",
  borderRadius: 8,
  "&:hover": {
    borderColor: "#BC6530",
  },
});

const StyledAppBar = styled(AppBar)(({}) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  "& .MuiToolbar-regular": {
    color: "#212b36",
    backgroundColor: "#ffffffcc",
    transition:
      "height 250ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
    backdropFilter: "blur(6px)",
    ["@media (min-width: 900px)"]: {
      height: 76,
    },

    "& .MuiContainer-root": {
      display: "flex",
      alignItems: "center",
      "& .headerAction": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        "& .partner": {
          ["@media only screen and (max-width: 600px)"]: {
            display: "none",
          },
        },
        "& .contact-us": {
          ["@media only screen and (max-width: 600px)"]: {
            display: "none",
          },
        },
        "& .divider": {
          margin: "0 16px",
          height: 24,
          ["@media only screen and (max-width: 600px)"]: {
            display: "none",
          },
        },
      },
    },
  },
}));

// const StyledIconButtonTranslate = styled(IconButton)(({}) => ({
//   border: "1px solid #00000030",
//   borderRadius: 8,
//   marginLeft: 8,
//   "&:hover": {
//     transform: "scale(1.09) translateZ(0px)",
//   },
//   ["@media only screen and (max-width: 600px)"]: {
//     display: "none",
//   },
// }));

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const SignedInHeader = (props) => {
  //   const { open, matchesBig, isLoggedIn } = props;
  //   const { user: currentUser } = useSelector((state) => state.auth);
  //   const [anchorEl, setAnchorEl] = React.useState(null);
  //   const dispatch = useDispatch();
  //   const isMenuOpen = Boolean(anchorEl);
  //   const handleMenuClose = () => {
  //     setAnchorEl(null);
  //   };

  //   const logOut = () => {
  //     dispatch(logout());
  //     handleMenuClose();
  //   };

  const foundationName = Cookies.get("foundationName");

  const menuId = "primary-search-account-menu";
  const renderMenu = <></>;

  const history = useHistory();

  return (
    <div>
      <ElevationScroll {...props}>
        <StyledAppBar>
          <Toolbar>
            <Container maxWidth="lg">
              <Stack
                direction="row"
                spacing={2}
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <a
                  href="/"
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    display: "flex",
                  }}
                >
                  <img src={Logo} alt="logo" width={130} />
                </a>
                <Divider orientation="vertical" />
                <ButtonOrange variant={"text"} href="/foundations">
                  มูลนิธิ
                </ButtonOrange>
                <ButtonOrange variant={"text"} href="/myNFT">
                  NFT ของฉัน
                </ButtonOrange>
                <ButtonOrange variant={"text"} component={NavLink} to="/">
                  วิธีใช้
                </ButtonOrange>
                <ButtonOrange variant={"text"} component={NavLink} to="/">
                  เกี่ยวกับเรา
                </ButtonOrange>
              </Stack>
              <div style={{ flexGrow: 1 }}></div>
              <div className={`headerAction`}>
                <Stack
                  direction="row"
                  spacing={0.3}
                  style={{ alignItems: "center" }}
                >
                  <div>
                    <Button
                      disabled
                      style={{
                        color: "black",
                        marginRight: "5px",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="caption">
                        คุณกำลังเข้าสู่ระบบ โดย
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{
                          color: "#E46842",
                          marginLeft: "5px",
                          fontStyle: "italic",
                        }}
                      >
                        <b>{foundationName}</b>
                      </Typography>
                    </Button>
                    <StyledButtonLogOut
                      variant={"outlined"}
                      onClick={LoggedOutFromFoundation}
                      href="/sign_in_as_foundation"
                      //   href="/logged_out_from_foundation"
                      // onClick={() => history.push("/sign_in")}
                      // className="partner"
                      style={{ padding: 8, minWidth: 30, marginRight: 15 }}
                    >
                      <Typography
                        style={{
                          fontSize: 11.5,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        ออกจากระบบ
                      </Typography>
                    </StyledButtonLogOut>
                  </div>
                  {/* <div>
                    <ButtonOrange
                      variant={"text"}
                      component={NavLink}
                        to="/"
                      className="partner"
                    >
                      Orders
                    </ButtonOrange>
                  </div> */}
                  {/* <div>
                    <ButtonBlue
                      variant={"text"}
                      component={NavLink}
                      to="/register"
                      className="partner"
                    >
                      Explore
                    </ButtonBlue>
                  </div> */}
                </Stack>

                {/* <Divider className="divider" orientation="vertical" /> */}

                {/* <div style={{ display: "flex", alignItems: "center" }}>
                  {isLoggedIn ? (
                    <div>
                      <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        color="inherit"
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                        size="large"
                        style={{ marginRight: 8 }}
                      >
                        <Avatar
                          alt={currentUser.username}
                          src={`${process.env.REACT_APP_API_URL}image/profile/${currentUser.image}`}
                        />
                      </IconButton>
                    </div>
                  ) : (
                    <Fragment>
                      <ButtonBlue
                        style={{ marginRight: 8 }}
                        to="/seller_dashboard"
                        variant={"outlined"}
                        className="seller-dashboard"
                        component={NavLink}
                      >
                        Switch to Selling
                      </ButtonBlue>
                      <ButtonBlue
                        to="/seller_homepage"
                        variant={"outlined"}
                        className="join-as-a-seller"
                        component={NavLink}
                      >
                        Join as a seller
                      </ButtonBlue>
                      <ButtonBlue
                        variant={"contained"}
                        style={{ marginLeft: 8 }}
                        component={NavLink}
                        to="/login"
                      >
                        Sign in
                      </ButtonBlue>
                    </Fragment>
                  )}

                  <div>
                    <StyledIconButtonTranslate aria-label="translate">
                      <TranslateIcon fontSize="small" />
                    </StyledIconButtonTranslate>
                  </div>
                </div> */}
              </div>
            </Container>
          </Toolbar>
        </StyledAppBar>
      </ElevationScroll>
      {renderMenu}
    </div>
  );
};

export default withRouter(SignedInHeader);
