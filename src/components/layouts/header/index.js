import React, { Fragment, useEffect, useState } from "react";

import PropTypes from "prop-types";
import { Link, withRouter, NavLink, useHistory } from "react-router-dom";
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

import Cookies from "js-cookie";

import MetamaskButton from "../../pages/shared/general/MetaMaskButton";
import AppProvider from "../../../utils/AppProvider";

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

function Header(props) {
  const renderMenu = <></>;
  const userAddress = Cookies.get("userAddress");
  // const [account, setAccount] = useState(null);
  // function checkMetamaskConnection() {
  //   if (window.ethereum.selectedAddress) {
  //     console.log("Metamask is connected");
  //     setAccount(window.ethereum.selectedAddress);
  //     console.log(window.ethereum.selectedAddress);
  //   } else {
  //     console.log("Metamask is not connected");
  //     console.log(window.ethereum.selectedAddress);
  //   }
  // }
  // checkMetamaskConnection();

  // console.log(window.ethereum.selectedAddress)
  // console.log(Cookies.get("userAddress"));
  // if (!window.ethereum.selectedAddress) {
  //   Cookies.remove("userAddress");
  // }

  // function connectMetamask() {
  //   // Check if Metamask is installed and enabled
  //   if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
  //     // Connect to Metamask
  //     window.ethereum.request({ method: "eth_requestAccounts" });

  //     // Check Metamask connection status periodically
  //     const checkMetamask = setInterval(() => {
  //       if (!window.ethereum.isConnected()) {
  //         // Remove the userAddress cookie
  //         Cookies.remove("userAddress");
  //         // Stop checking Metamask connection status
  //         clearInterval(checkMetamask);
  //       }
  //     }, 1000);
  //   }
  // }

  return (
    <div>
      <ElevationScroll {...props}>
        <StyledAppBar>
          <Toolbar>
            <Container maxWidth="lg">
              {" "}
              <a href="/">
                <img src={Logo} alt="logo" width={190} />
              </a>
              <Stack direction="row" spacing={2}>
                <Divider orientation="vertical" />
                <ButtonOrange variant={"text"} component={NavLink} to="/">
                  FOUNDATION
                </ButtonOrange>
                <ButtonOrange variant={"text"} component={NavLink} to="/">
                  RESOURCES
                </ButtonOrange>
                <ButtonOrange variant={"text"} component={NavLink} to="/">
                  ABOUT US
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
                    <AppProvider>
                      <MetamaskButton id={userAddress} />
                    </AppProvider>

                    {/* <Button
                      variant="outlined"
                      onClick={connectMetamask}
                      style={{
                        borderColor: "#E46842",
                        color: "#ffffff",
                        backgroundColor: "#E46842",
                        borderRadius: 8,
                        "&:hover": {
                          borderColor: "#BC6530",
                          backgroundColor: "#BC6530",
                        },
                      }}
                    >
                      Connect Wallet
                    </Button> */}
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
}

export default withRouter(Header);
