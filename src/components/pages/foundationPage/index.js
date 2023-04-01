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
  marginTop: 50,
});

const StyledBoxForNoti = styled(Box)({
  border: "1px solid",
  borderColor: "#CFD3D7",
  borderRadius: "12px",
  padding: 35,
  marginTop: 40,
});

const StyledImage = styled("img")({
  width: "100%",
  height: 345,
  objectFit: "cover",
  borderRadius: 15,
  boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.5)",
  transition: "transform 0.3s ease-in-out",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  marginBottom: 20,
  position: "relative", // added this to the image style
});

const ImageOverlay = styled("div")({
  position: "absolute",
  bottom: 0,
  left: 0,
  width: "100%",
  height: "100%", // modify height to be 100% to match the height of the image
  backgroundImage:
    "linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 15,
  color: "white",
  fontSize: 36,
  fontWeight: "bold",
  textAlign: "center",
  maxWidth: "100%",
  maxHeight: "100%",
  "&:hover": {
    fontSize: 50,
  },
});

function FoundationPage({ oauthToken }) {
  const [foundations, setFoundations] = useState([]);
  const [imgFoundations, setImgFoundations] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // set initial state to true to show the loading progress
  const [page, setPage] = useState(1);
  const FOUNDATIONS_PER_PAGE = 5;
  const startIndex = (page - 1) * FOUNDATIONS_PER_PAGE;
  const endIndex = startIndex + FOUNDATIONS_PER_PAGE;

  useEffect(() => {
    axios
      .get("https://portus-api.herokuapp.com/api/v1/foundations", {
        headers: {
          Authorization: `Bearer ${oauthToken}`,
        },
      })
      .then((response) => {
        setFoundations(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [oauthToken]);

  useEffect(() => {
    setIsLoading(true); // set isLoading to true before making the API call
    const imgRequests = foundations.map((foundation) =>
      axios.get(
        `https://portus-api.herokuapp.com/api/v1/foundations/${foundation.id}`,
        {
          headers: {
            Authorization: `Bearer ${oauthToken}`,
          },
        }
      )
    );

    Promise.all(imgRequests)
      .then((responses) => {
        const imgData = responses.map((response) => response.data.first_image);
        setImgFoundations(imgData);
        setIsLoading(false); // set isLoading to false after the API call is complete
      })
      .catch((error) => {
        console.error(error);
      });
  }, [foundations, oauthToken]);

  return (
    <StyledRoot className={`page`}>
      <Container style={{ justifyContent: "center" }} maxWidth="lg">
        <Stack style={{ justifyContent: "center" }}>
          {isLoading ? (
            <Stack style={{ justifyContent: "center", alignItems: "center" }}>
              <CircularProgress style={{ marginTop: "50px" }} />
            </Stack>
          ) : foundations.length > 0 ? (
            <StyledBox>
              {foundations
                .slice(startIndex, endIndex)
                .map((foundation, index) => (
                  <a
                    href={`/foundations/${foundation.id}`}
                    style={{ color: "white", textDecoration: "none" }}
                    key={foundation.id}
                  >
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "100%",
                        height: 345,
                        maxWidth: "100%",
                        maxHeight: "100%",
                        marginBottom: 10,
                      }}
                    >
                      <StyledImage
                        src={imgFoundations[index]}
                        alt={`${foundation.name} logo`}
                      />
                      <ImageOverlay>{foundation.name}</ImageOverlay>
                    </div>
                  </a>
                ))}
              <Stack style={{ alignItems: "center", marginTop: 10 }}>
                <Pagination
                  count={Math.ceil(foundations.length / FOUNDATIONS_PER_PAGE)}
                  page={page}
                  onChange={(event, value) => setPage(value)}
                />
              </Stack>
            </StyledBox>
          ) : (
            <StyledBoxForNoti>
              <Typography
                variant="h4"
                align="center"
                style={{ marginTop: "20px" }}
                color="text.secondary"
              >
                ไม่มีมูลนิธิ
              </Typography>
            </StyledBoxForNoti>
          )}
        </Stack>
      </Container>
    </StyledRoot>
  );
}

export default FoundationPage;
