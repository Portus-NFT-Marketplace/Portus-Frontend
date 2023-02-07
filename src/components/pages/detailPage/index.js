import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Grid, Container, Stack, Box, Typography, Chip } from "@mui/material";
import { useParams } from "react-router-dom";

import FaceIcon from "@mui/icons-material/Face";
import FoundationIcon from "@mui/icons-material/Foundation";

import NFTImage from "../shared/general/ImageNFT";
import ButtonOrange from "../shared/general/ButtonOrange";

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

function DetailPage(props) {
  const { id } = useParams();
  const url = `https://portus-api.herokuapp.com/api/v1/artworks/${id}`;

  const [token, setToken] = useState({});
  const [artwork, setArtwork] = useState({});
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
      .then((res) => setArtwork(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <StyledRoot className={`page`}>
      <Container style={{ justifyContent: "center" }} maxWidth="lg">
        <Stack
          style={{ marginTop: 60, justifyContent: "space-between" }}
          spacing={5}
          direction="row"
        >
          <NFTImage img_url={artwork?.image_url} />
          <Stack style={{ justifyContent: "space-between", width: "55%" }}>
            <Stack>
              <Stack
                direction="row"
                style={{
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
                spacing={5}
              >
                <Typography variant="h3">{artwork?.price}</Typography>
                <Chip
                  style={{
                    width: 90,
                    height: 25,
                    backgroundColor: "#5EDF3E",
                    color: "white",
                  }}
                  label={artwork?.status}
                />
              </Stack>
              <Stack
                style={{ alignItems: "center", marginTop: 20 }}
                spacing={2}
              >
                <Chip
                  icon={<FaceIcon />}
                  style={{
                    fontSize: "15px",
                    padding: "10px",
                    height: 35,
                    width: 350,
                  }}
                  label="NAME OF THE NFT OWNER"
                />
                <Chip
                  icon={<FoundationIcon />}
                  style={{
                    fontSize: "10px",
                    padding: "10px",
                    height: 35,
                    width: 250,
                  }}
                  label="OWNER'S FOUNDATION NAME"
                  variant="outlined"
                />
                <Typography variant="h4"> {artwork?.name}</Typography>
              </Stack>
              <Stack style={{ marginTop: 18 }} spacing={2}>
                <StyledBox>
                  <Typography>{artwork?.description}</Typography>
                </StyledBox>
              </Stack>
            </Stack>
            <Stack style={{ alignItems: "center" }}>
              <ButtonOrange
                style={{ marginTop: 50, width: 150 }}
                variant="contained"
              >
                Buy
              </ButtonOrange>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </StyledRoot>
  );
}

export default DetailPage;