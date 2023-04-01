import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Container,
  Stack,
  Box,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";

import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

const StyledRoot = styled("div")({
  minWidth: 350,
  width: "100%",
  paddingTop: 40,
  paddingBottom: 36,
  justifyContent: "center",
});

const StyledImage = styled("img")({
  width: "350px",
  height: "auto",
  borderRadius: "12px",
});

const StyledBox = styled(Box)({
  border: "1px solid",
  borderColor: "#CFD3D7",
  borderRadius: "12px",
  padding: 35,
  marginTop: 50,
});

const StyledTypography = styled(Typography)({
  "&::first-letter": {
    paddingLeft: "4em",
  },
});

function DetailFoundationPage({ oauthToken }) {
  const { id } = useParams();
  const url = `https://portus-api.herokuapp.com/api/v1/foundations/${id}`;
  const [foundations, setFoundations] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // set initial state to true to show the loading progress

  useEffect(() => {
    setIsLoading(true); // set isLoading to true before making the API call
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${oauthToken}`,
        },
      })
      .then((response) => {
        setFoundations(response.data);
        setIsLoading(false); // set isLoading to false after the API call is complete
      })
      .catch((error) => {
        console.error(error);
      });
  }, [oauthToken]);

  const location = (
    <Stack
      direction="row"
      spacing={1}
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <Typography variant="body2" color="text.secondary">
        <PlaceOutlinedIcon />
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {foundations.location}
      </Typography>
    </Stack>
  );

  const email = (
    <Stack direction="row" spacing={1} style={{ alignItems: "center" }}>
      <MailOutlineOutlinedIcon />
      <Typography variant="body2">{foundations.email}</Typography>
    </Stack>
  );

  const tel = (
    <Stack direction="row" spacing={1} style={{ alignItems: "center" }}>
      <LocalPhoneOutlinedIcon />
      <Typography variant="body2">{foundations.telephone_number}</Typography>
    </Stack>
  );

  return (
    <StyledRoot className={`page`}>
      <Container style={{ justifyContent: "center" }} maxWidth="lg">
        <Stack style={{ justifyContent: "center" }}>
          {isLoading ? (
            <Stack style={{ justifyContent: "center", alignItems: "center" }}>
              <CircularProgress style={{ marginTop: "50px" }} />
            </Stack>
          ) : (
            <StyledBox>
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  style={{ justifyContent: "space-between" }}
                >
                  <Typography variant="h4">{foundations.name}</Typography>{" "}
                  <Stack direction="row" spacing={2}>
                    {email}
                    {tel}
                  </Stack>
                </Stack>
              </Stack>
              <Divider style={{ marginBottom: 50, marginTop: 10 }} />
              <Stack
                direction="row"
                spacing={2}
                style={{ justifyContent: "space-between", marginBottom: 50 }}
              >
                <StyledImage src={foundations.first_image} alt="first_image" />
                <StyledImage
                  src={foundations.second_image}
                  alt="second_image"
                />
                <StyledImage src={foundations.third_image} alt="third_image" />
              </Stack>
              <StyledTypography paragraph variant="body1">
                {foundations.description}
              </StyledTypography>
              <Divider style={{ marginBottom: 20, marginTop: 20 }} />
              <Stack style={{ justifyContent: "center", marginBottom: 20 }}>
                {location}
              </Stack>
            </StyledBox>
          )}
        </Stack>
      </Container>
    </StyledRoot>
  );
}

export default DetailFoundationPage;
