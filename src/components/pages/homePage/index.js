import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Grid, Container, Stack, Box } from "@mui/material";

import CarouselAds from "./carousel";
import NFTCard from "../shared/general/CardNFT";
import ButtonFilter from "../shared/general/ButtonFilter";

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
  gridTemplateColumns: "repeat(3, 1fr)",
  // justifyContent: "space-evenly"
});

function HomePage(props) {
  const url = "https://portus-api.herokuapp.com/api/v1/artworks";

  const [token, setToken] = useState({});
  const [artworks, setArtworks] = useState([{}]);

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
      .then((res) => setArtworks(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  console.log(token);
  console.log(artworks);

  return (
    <StyledRoot className={`page`}>
      <Container style={{ justifyContent: "center" }} maxWidth="lg">
        <Stack
          spacing={1}
          justifyContent="center"
          alignItems="center"
          style={{ marginBottom: 20, marginTop: 20 }}
        >
          <Stack
            style={{
              width: "100%",
              height: "100%",
              marginTop: 15,
              maxWidth: "1400px",
              maxHeight: "500px",
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CarouselAds />
          </Stack>
        </Stack>
        <Stack style={{ justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonFilter />
          </div>
          <StyledBox>
            {Array.isArray(artworks["data"]) ? (
              artworks["data"].map((value, index) => {
                return (
                  <NFTCard
                    name={value.name}
                    price={value.price}
                    description={value.description}
                    img_url={value.image_url}
                  />
                );
              })
            ) : (
              <div></div>
            )}
          </StyledBox>
        </Stack>
      </Container>
    </StyledRoot>
  );
}

export default HomePage;
