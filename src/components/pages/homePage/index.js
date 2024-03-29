import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Container,
  Stack,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";

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

function HomePage({ oauthToken }) {
  const [artworks, setArtworks] = useState([{}]);
  const [selectedFoundation, setSelectedFoundation] = useState(null);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const ROWS_PER_PAGE = 12;

  const pageCount = Math.ceil(artworks.length / ROWS_PER_PAGE);

  const handleClick = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    setLoading(true); // Set loading state to true before making API call
    const url = selectedFoundation
      ? `https://portus-api.herokuapp.com/api/v1/artworks/by_foundation/${selectedFoundation}`
      : "https://portus-api.herokuapp.com/api/v1/artworks";

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${oauthToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setArtworks(res.data.data);
        setLoading(false); // Set loading state to false when API call succeeds
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading state to false when API call fails
      });
  }, [oauthToken, selectedFoundation]);

  const startIdx = (page - 1) * ROWS_PER_PAGE;
  const endIdx = Math.min(page * ROWS_PER_PAGE, artworks.length);

  return (
    <StyledRoot className={`page`}>
      <Container style={{ justifyContent: "center" }} maxWidth="lg">
        <Stack style={{ justifyContent: "center" }}>
          <Stack style={{ alignItems: "center" }}>
            <div
              style={{
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              <CarouselAds />
              <Stack spacing={2} style={{ padding: "20px" }}>
                <Typography
                  variant="h3"
                  style={{ paddingLeft: "20px", marginTop: "15px" }}
                >
                  ผลงานศิลปะล่าสุด
                </Typography>
                <Carousel oauthToken={oauthToken} />
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
            <ButtonFilter
              setSelectedFoundation={setSelectedFoundation}
              oauthToken={oauthToken}
            />
          </div>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          ) : artworks.length > 0 && Object.keys(artworks[0]).length > 0 ? (
            <>
              <StyledBox>
                {artworks.slice(startIdx, endIdx).map((value, index) => (
                  <NFTCard
                    key={index}
                    name={value.name}
                    price={value.price}
                    description={value.description}
                    img_url={value.image_url}
                    id={value.id}
                    foundation_owner={value.foundation.name}
                  />
                ))}
              </StyledBox>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={handleClick}
                  disabled={artworks.length === 0}
                />
              </Box>
            </>
          ) : (
            <StyledBoxForNoti>
              <Typography
                variant="h4"
                align="center"
                style={{ marginTop: "20px" }}
                color="text.secondary"
              >
                ไม่มีผลงานศิลปะที่คุณสามารถซื้อได้ในขณะนี้
              </Typography>
            </StyledBoxForNoti>
          )}
        </Stack>
      </Container>
    </StyledRoot>
  );
}

export default HomePage;
