import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Container,
  Stack,
  Box,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useParams } from "react-router-dom";

import FoundationIcon from "@mui/icons-material/Foundation";

import NFTImage from "../shared/general/ImageNFT";
import BuyButton from "../shared/general/BuyButton";
import AppProvider from "../../../utils/AppProvider";

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
  wordWrap: "break-word",
});

const StyledTypography = styled(Typography)({
  "&::first-letter": {
    paddingLeft: "4em",
  },
});

function DetailPage({ oauthToken }) {
  const [isLoading, setIsLoading] = useState(true); // set initial state to true to show the loading progress
  const { id } = useParams();
  const url = `https://portus-api.herokuapp.com/api/v1/artworks/${id}`;

  const [artwork, setArtwork] = useState({});

  let chipColor = "#5EDF3E"; // default color for available artwork
  let chipLabel = artwork?.status; // default label

  if (artwork?.status === "unavailable") {
    chipColor = "grey";
    chipLabel = "ขายแล้ว"; // change label to "ขายแล้ว"
  } else if (artwork?.status === "available") {
    chipLabel = "พร้อมขาย"; // change label to "พร้อมขาย"
  }

  useEffect(() => {
    setIsLoading(true); // set isLoading to true before making the API call
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${oauthToken}`,
        },
      })
      .then((res) => {
        setArtwork(res.data);
        setIsLoading(false); // set isLoading to false after the API call is complete
      })
      .catch((err) => console.log(err));
  }, [oauthToken]);

  return (
    <StyledRoot className={`page`}>
      <Container style={{ justifyContent: "center" }} maxWidth="lg">
        {isLoading ? (
          <Stack
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <CircularProgress style={{ marginTop: "50px" }} />
          </Stack>
        ) : (
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
                  <Chip
                    style={{
                      width: 90,
                      height: 25,
                      backgroundColor: chipColor, // use dynamic color
                      color: "white",
                    }}
                    label={chipLabel} // use dynamic label
                  />
                  <Stack
                    direction="row"
                    style={{ alignItems: "center" }}
                    spacing={2}
                  >
                    <Typography variant="h3" style={{ color: "#E46842" }}>
                      {artwork?.price / 10 ** 18 || ""}
                    </Typography>
                    <Typography variant="h5" style={{ color: "#E46842" }}>
                      SepoliaETH
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  style={{ alignItems: "center", marginTop: 20 }}
                  spacing={2}
                >
                  <Typography variant="h4">{artwork?.name}</Typography>
                </Stack>
                <Divider
                  style={{
                    marginTop: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "static !important",
                  }}
                >
                  <Chip
                    icon={<FoundationIcon />}
                    style={{
                      fontSize: "12px",
                      padding: "10px",
                      height: 35,
                      width: 250,
                    }}
                    label={artwork?.foundation_name}
                    variant="outlined"
                  />
                </Divider>
                <Stack style={{ marginTop: 18 }} spacing={2}>
                  <StyledBox>
                    <StyledTypography>{artwork?.description}</StyledTypography>
                  </StyledBox>
                </Stack>
              </Stack>
              <Stack style={{ alignItems: "center" }}>
                <AppProvider>
                  {artwork?.status === "available" ? (
                    <BuyButton
                      artworkPrice={artwork?.price}
                      artworkId={artwork?.id}
                      oauthToken={oauthToken}
                    />
                  ) : (
                    <Button
                      style={{ borderRadius: 8 }}
                      variant="contained"
                      disabled
                    >
                      ไม่สามารถซื้อได้
                    </Button>
                  )}
                </AppProvider>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Container>
    </StyledRoot>
  );
}

export default DetailPage;
