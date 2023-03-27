import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Container,
  Stack,
  Box,
  Typography,
  Divider,
} from "@mui/material";

import NFTCard from "../shared/general/CardNFT";
import ButtonFilter from "../shared/general/ButtonFilter";
import Cookies from "js-cookie";

const StyledRoot = styled("div")({
  minWidth: 350,
  width: "100%",
  // backgroundColor: "#f1f4f9",
  paddingTop: 40,
  paddingBottom: 36,
  justifyContent: "center",
});

const StyledBox = styled(Box)({
  border: "1px solid",
  borderColor: "#CFD3D7",
  borderRadius: "12px",
  padding: 35,
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  // justifyContent: "space-evenly"
});

function MyNFTPage() {
  const userAddress = Cookies.get("userAddress");
  const url = `https://portus-api.herokuapp.com/api/v1/artworks/by_owner/${userAddress}`;

  const [token, setToken] = useState({});
  const [artworks, setArtworks] = useState([{}]);

  const history = useHistory();

  useEffect(() => {
    if (!userAddress) {
      history.push("/");
      window.location.reload();
    }
  }, [userAddress, history]);

  useEffect(() => {
    axios
      .post("https://portus-api.herokuapp.com/oauth/token", {
        grant_type: "client_credentials",
        client_id: `${process.env.REACT_APP_CLIENT_ID}`,
        client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
      })
      .then((res) => setToken(res.data.access_token))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setArtworks(res.data.data))
      .catch((err) => console.log(err));
  }, [token]);

  console.log(token);
  console.log(artworks);

  return (
    <StyledRoot className={`page`}>
      <Container style={{ justifyContent: "center" }} maxWidth="lg">
        <Typography variant="h2" style={{ marginTop: "50px" }}>
          NFT ของฉัน
        </Typography>
        <Divider style={{ marginTop: "10px", marginBottom: "15px" }} />
        <Stack style={{ justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonFilter />
          </div>
          <StyledBox>
            {artworks.map((value, index) => {
              return (
                <NFTCard
                  name={value.name}
                  price={value.price}
                  description={value.description}
                  img_url={value.image_url}
                  id={value.id}
                  foundation_owner={value.foundation_name}
                />
              );
            })}
          </StyledBox>
        </Stack>
      </Container>
    </StyledRoot>
  );
}

export default MyNFTPage;
