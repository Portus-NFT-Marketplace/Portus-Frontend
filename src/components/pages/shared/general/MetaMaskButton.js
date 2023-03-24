import React, { useEffect, useContext } from "react";
// import Cookies from "js-cookie";
import { Button, Typography } from "@mui/material";
import { AppContext } from "../../../../utils/AppProvider";
import formatAddress from "../../../../utils/formatAddress";

const MetamaskButton = () => {
  const { userAddress, setUserAddress } = useContext(AppContext);

  useEffect(() => {
    async function checkMetamaskConnection() {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
          //   Cookies.set("userAddress", accounts[0]);
        } else {
          setUserAddress(null);
          //   Cookies.remove("userAddress");
        }
      } else {
        setUserAddress(null);
        // Cookies.remove("userAddress");
      }
    }

    checkMetamaskConnection();
  }, []);

  const connectMetamask = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        //   Cookies.set('userAddress', accounts[0], { expires: 7, path: '/' });
        setUserAddress(accounts[0]);
      } else {
        // MetaMask is not installed, prompt the user to install it
        alert("Please install MetaMask to use this feature");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (userAddress) {
    return (
      <div>
        <Button
          disabled
          style={{
            color: "black",
            marginRight: "5px",
            alignItems: "center",
          }}
        >
          <Typography variant="caption">You are connected as</Typography>
          <Typography
            variant="body1"
            style={{
              color: "#E46842",
              marginLeft: "5px",
              fontStyle: "italic",
              textTransform: "none",
            }}
          >
            <b>{formatAddress(userAddress)}</b>
          </Typography>
        </Button>
      </div>
    );
  }

  return (
    <Button
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
      Connect to Metamask
    </Button>
  );
};

export default MetamaskButton;
