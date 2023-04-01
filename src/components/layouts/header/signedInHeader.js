import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {  withRouter, NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack, Button } from "@mui/material";

import Logo from "../../../components/pages/assets/portus_logo.png";
import ButtonOrange from "../../pages/shared/general/ButtonOrange";

import LoggedOutFromFoundation from "../../pages/loginPage/loggedOutFoundation";

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
  const foundationName = Cookies.get("foundationName");

  const renderMenu = <></>;

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
                <Divider orientation="vertical" />{" "}
                <ButtonOrange variant={"text"} href="/myNFT">
                  NFT ของฉัน
                </ButtonOrange>
                <ButtonOrange variant={"text"} href="/foundations">
                  มูลนิธิ
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
                </Stack>
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
