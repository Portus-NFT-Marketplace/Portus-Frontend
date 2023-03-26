import React, { useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { Button, Typography, Stack } from "@mui/material";
import { AppContext } from "../../../../utils/AppProvider";
import formatAddress from "../../../../utils/formatAddress";
import ButtonOrange from "./ButtonOrange";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export default function MetamaskButton() {
  const { userAddress, setUserAddress } = useContext(AppContext);

  useEffect(() => {
    async function checkMetamaskConnection() {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setUserAddress(accounts[0]);
          Cookies.set("userAddress", accounts[0]);
        } else {
          setUserAddress(null);
          // Cookies.set("userAddress", false);
          Cookies.remove("userAddress");
          // console.log(Cookies.get("userAddress"));
          // console.log("not connected 1");
        }
      } else {
        setUserAddress(null);
        Cookies.set("userAddress", false);
        Cookies.remove("userAddress");
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
        window.location.reload();
      } else {
        // MetaMask is not installed, prompt the user to install it
        alert("โปรดติดตั้ง MetaMask เพื่อใช้ feature นี้");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (userAddress) {
    return (
      <div>
        <Stack
          direction="row"
          spacing={1}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          {" "}
          <Stack direction="row"></Stack>
          <Button
            disabled
            style={{
              color: "black",
              marginRight: "5px",
              alignItems: "center",
            }}
          >
            <Typography variant="caption">คุณกำลังเชื่อมต่อ โดย</Typography>
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
          <ButtonOrange
            variant={"text"}
            // component={NavLink}
            // onClick={reloadPageOnce}
            href="/myNFT"
            style={{ padding: 0, minWidth: 30, marginRight: 8 }}
          >
            <PersonOutlineOutlinedIcon />
          </ButtonOrange>
        </Stack>
      </div>
    );
  }

  return (
    <>
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
        เชื่อมต่อกับ Metamask
      </Button>
    </>
  );
}
