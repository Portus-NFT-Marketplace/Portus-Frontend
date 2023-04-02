import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import {
  Button,
  Typography,
  Stack,
  Alert,
  AlertTitle,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AppContext } from "../../../../utils/AppProvider";

import Web3 from "web3";
import axios from "axios";

const StyledBuyButton = styled(Button)({
  marginTop: 50,
  width: 150,
  borderColor: "#E46842",
  color: "#ffffff",
  backgroundColor: "#E46842",
  borderRadius: 8,
  "&:hover": {
    borderColor: "#BC6530",
    backgroundColor: "#BC6530",
  },
});

export default function BuyButton(artwork, oauthToken) {
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { userAddress, setUserAddress } = useContext(AppContext);

  const web3 = new Web3(window.ethereum);
  const contractAbi = JSON.parse(process.env.REACT_APP_CONTRACT_ABI);
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  const buyNFT = async (price, tokenId, setIsLoading) => {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    if (chainId !== "0xaa36a7") {
      setAlert(
        <Alert severity="warning">
          <AlertTitle>คำเตือน</AlertTitle>
          กรุณาเลือก Blockchain เป็น SepoliaETH ก่อนทำการซื้อผลงานศิลปะ
        </Alert>
      );
      return;
    }
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Check if price is a valid number
      if (typeof price !== "number" || isNaN(price)) {
        throw new Error(`Invalid price: ${price}`);
      }

      setIsLoading(true);

      const result = await contract.methods.buyNFT(tokenId).send({
        from: accounts[0],
        value: price,
      });
      console.log(result);

      // Check if the transaction was successful and the owner of the artwork has changed
      if (result.status) {
        const data = { id: String(tokenId) };
        await axios.post(
          "https://portus-api.herokuapp.com/api/v1/artworks/sold",
          data,
          {
            headers: {
              Authorization: `Bearer ${oauthToken}`,
            },
          }
        );
        setIsLoading(false);
        history.push("/myNFT");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

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
        alert("โปรดติดตั้ง MetaMask เพื่อใช้ฟีดเจอร์นี้");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (alert) {
      // Display the alert for 5 seconds
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
  }, [alert]);

  if (userAddress) {
    return (
      <div>
        <Stack style={{ justifyContent: "center", alignItems: "center" }}>
          {alert}
          <Stack
            style={{
              justifyContent: "center",
              marginBottom: "12px",
              alignItems: "center",
            }}
          >
            {isLoading && <CircularProgress />}
          </Stack>
          <StyledBuyButton
            onClick={() =>
              buyNFT(artwork.artworkPrice, artwork.artworkId, setIsLoading)
            }
          >
            ซื้อผลงานชิ้นนี้
          </StyledBuyButton>
        </Stack>
      </div>
    );
  }

  return (
    <>
      <StyledBuyButton onClick={connectMetamask}>
        ซื้อผลงานชิ้นนี้
      </StyledBuyButton>
    </>
  );
}
