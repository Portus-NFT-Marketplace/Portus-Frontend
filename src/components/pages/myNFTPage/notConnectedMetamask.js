import React, { useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { Button, Typography, Stack, Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AppContext } from "../../../utils/AppProvider";
import { useHistory } from "react-router";

const StyledRoot = styled("div")({
  minWidth: 350,
  width: "100%",
  paddingTop: 40,
  paddingBottom: 36,
  justifyContent: "center",
  marginTop: "50px",
});

const StyledBox = styled(Box)({
  border: "1px solid",
  borderColor: "#CFD3D7",
  borderRadius: "12px",
  padding: 35,
  justifyContent: "center",
  alignItems: "center",
});

const StyledButton = styled(Button)({
  marginTop: 50,
  width: 200,
  borderColor: "#E46842",
  color: "#ffffff",
  backgroundColor: "#E46842",
  borderRadius: 8,
  "&:hover": {
    borderColor: "#BC6530",
    backgroundColor: "#BC6530",
  },
});

export default function NotiNotConnectedMetamask() {
  const history = useHistory();
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

          Cookies.remove("userAddress");
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

        setUserAddress(accounts[0]);
        window.location.reload();
      } else {
        alert("Please install MetaMask to use this feature");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (userAddress) {
    history.push("/myNFT");
    return window.location.reload();
  }

  return (
    <StyledRoot>
      <Container style={{ justifyContent: "center" }} maxWidth="lg">
        <Stack
          style={{ justifyContent: "center", alignItems: "center" }}
          spacing={3}
        >
          <StyledBox>
            <Stack
              style={{ justifyContent: "center", alignItems: "center" }}
              spacing={3}
            >
              <Typography>กรุณาเชื่อมต่อกับ MetaMask ของคุณ ก่อนเข้าดูหน้านี้</Typography>
              <StyledButton onClick={connectMetamask}>
                เชื่อมต่อกับ MetaMask
              </StyledButton>
            </Stack>
          </StyledBox>
        </Stack>
      </Container>
    </StyledRoot>
  );
}
