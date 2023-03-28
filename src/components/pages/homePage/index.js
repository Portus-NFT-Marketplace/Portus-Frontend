import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Grid, Container, Stack, Box, Typography } from "@mui/material";

import Carousel from "./carousel";
import CarouselAds from "./carouselAds";
import NFTCard from "../shared/general/CardNFT";
import ButtonFilter from "../shared/general/ButtonFilter";

const StyledRoot = styled("div")({
  minWidth: 350,
  width: "100%",
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
});

const StyledBoxForNoti = styled(Box)({
  border: "1px solid",
  borderColor: "#CFD3D7",
  borderRadius: "12px",
  padding: 35,
});

function HomePage(props) {
  const [token, setToken] = useState({});
  const [artworks, setArtworks] = useState([{}]);
  const [selectedFoundation, setSelectedFoundation] = useState(null);

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
    const url = selectedFoundation
      ? `https://portus-api.herokuapp.com/api/v1/artworks/by_foundation/${selectedFoundation}`
      : "https://portus-api.herokuapp.com/api/v1/artworks";

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setArtworks(res.data.data))
      .catch((err) => console.log(err));
  }, [token, selectedFoundation]);

  return (
    <StyledRoot className={`page`}>
      <Container style={{ justifyContent: "center" }} maxWidth="lg">
        <Stack style={{ justifyContent: "center" }}>
          <Stack style={{ alignItems: "center" }}>
            <div
              style={{
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <CarouselAds />
              <Stack spacing={2} style={{ padding: "20px" }}>
                <Typography variant="h3" style={{ paddingLeft: "20px" }}>
                  ผลงานศิลปะยอดนิยม
                </Typography>
                <Carousel />
              </Stack>
            </div>
          </Stack>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          >
            <ButtonFilter setSelectedFoundation={setSelectedFoundation} />
          </div>
          {artworks.length > 0 ? (
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
          ) : (
            <StyledBoxForNoti>
              <Typography
                variant="h4"
                align="center"
                style={{ marginTop: "20px" }}
                color="text.secondary"
              >
                มูลนิธินี้ไม่มีผลงานศิลปะที่คุณสามารถซื้อได้ในขณะนี้
              </Typography>
            </StyledBoxForNoti>
          )}
        </Stack>
      </Container>
    </StyledRoot>
  );
}

export default HomePage;
