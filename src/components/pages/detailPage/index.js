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
  Link,
  Divider,
} from "@mui/material";
import NotesOutlinedIcon from "@mui/icons-material/NotesOutlined";
import { useParams } from "react-router-dom";
import Web3 from "web3";

import NFTImage from "../shared/general/ImageNFT";
import BuyButton from "../shared/general/BuyButton";
import EditButton from "../shared/general/EditButton";
import AppProvider from "../../../utils/AppProvider";
import "./style.css";

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
  padding: 15,
  wordWrap: "break-word",
});

const StyledTypography = styled(Typography)({
  "&::first-letter": {
    paddingLeft: "4em",
  },
});

function DetailPage({ oauthToken }) {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const url = `https://portus-api.herokuapp.com/api/v1/artworks/${id}`;

  const [artwork, setArtwork] = useState({});
  const [currentAddress, setCurrentAddress] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  let chipColor = "#5EDF3E";
  let chipLabel = artwork?.status;

  if (artwork?.status === "unavailable") {
    chipColor = "grey";
    chipLabel = "ไม่พร้อมขาย";
  } else if (artwork?.status === "available") {
    chipLabel = "พร้อมขาย";
  }

  const checkOwnershipAndSetEditable = () => {
    if (
      artwork?.current_owner?.toLowerCase() === currentAddress?.toLowerCase()
    ) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${oauthToken}`,
        },
      })
      .then((res) => {
        setArtwork(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [oauthToken]);

  useEffect(() => {
    checkOwnershipAndSetEditable();
  }, [artwork, currentAddress]);

  useEffect(() => {
    const fetchAddress = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setCurrentAddress(accounts[0]);
      }
    };
    fetchAddress();
  });

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
                    marginBottom: "25px",
                  }}
                  spacing={5}
                >
                  <Stack
                    direction="row"
                    style={{ alignItems: "center" }}
                    spacing={1.5}
                  >
                    <Typography
                      variant="h4"
                      style={{ color: "#E46842", fontWeight: "bold" }}
                    >
                      {artwork?.price / 10 ** 18 || ""}
                    </Typography>
                    <Typography
                      variant="h4"
                      style={{ color: "#E46842", fontWeight: "bold" }}
                    >
                      SepoliaETH
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    style={{ alignItems: "center" }}
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
                    {isEditable && <EditButton />}
                  </Stack>
                </Stack>
                <Stack spacing={1.5}>
                  <Stack style={{ marginTop: 20 }} spacing={2}>
                    <Typography variant="h4" style={{ fontWeight: "bold" }}>
                      {artwork?.name}
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    style={{ alignItems: "center" }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      เป็นเจ้าของโดย
                    </Typography>
                    <Link
                      href={`/foundations/${artwork.foundation.id}`}
                      underline="hover"
                      color="blue"
                      variant="body2"
                    >
                      {artwork?.foundation.name}
                    </Link>
                  </Stack>
                </Stack>
                <Stack style={{ marginTop: 40 }} spacing={2}>
                  <StyledBox>
                    <Typography style={{ fontWeight: "bold" }}>
                      <NotesOutlinedIcon />
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      style={{ alignItems: "center" }}
                    >
                      <StyledTypography>
                        {artwork?.description}
                      </StyledTypography>
                    </Stack>
                  </StyledBox>
                </Stack>
              </Stack>
              <Stack style={{ alignItems: "center" }}>
                <AppProvider>
                  {artwork?.status === "available" && !isEditable ? (
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
