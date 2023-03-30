import React, { useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { Button, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AppContext } from "../../../../utils/AppProvider";

import Web3 from "web3";

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

export default function BuyButton(artwork) {
  const { userAddress, setUserAddress } = useContext(AppContext);

  const web3 = new Web3(window.ethereum);
  const contractAbi = JSON.parse(process.env.REACT_APP_CONTRACT_ABI);
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  const buyNFT = async (price, tokenId) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Check if price is a valid number
      if (typeof price !== "number" || isNaN(price)) {
        throw new Error(`Invalid price: ${price}`);
      }

      const result = await contract.methods.buyNFT(tokenId).send({
        from: accounts[0],
        value: price,
      });
      console.log(result);
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
        alert("Please install MetaMask to use this feature");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (userAddress) {
    return (
      <div>
        <StyledBuyButton
          onClick={() => buyNFT(artwork.artworkPrice, artwork.artworkId)}
        >
          ซื้อผลงานชิ้นนี้
        </StyledBuyButton>
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
