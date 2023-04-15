import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import ReactMarkdown from 'react-markdown';

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
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import ChatIcon from '@mui/icons-material/Chat';

const StyledRoot = styled("div")({
  minWidth: 350,
  width: "100%",
  paddingTop: 40,
  paddingBottom: 36,
  justifyContent: "center",
});

const StyledImage = styled("img")({
  borderRadius: "15px",
  width: "350px",
  height: "345px",
  objectFit: "cover",
  boxShadow: "0px 0px 5px 0px rgba(0, 0, 0, 0.5)",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  margin: "16px 4px 16px 4px",
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
      marginBottom={0.5}
      direction="row"
      spacing={1}
      style={{ alignItems: "left", justifyContent: "left" }}
    >
      <Typography variant="body2" color="text.secondary">
        <PlaceOutlinedIcon />
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {foundations.location}
      </Typography>
    </Stack>
  );

  const web = (
    <Stack
      marginBottom={0.5}
      direction="row"
      spacing={1}
      style={{ alignItems: "left", justifyContent: "left" }}
    >
      <Typography variant="body2" color="text.secondary">
        <LanguageIcon />
      </Typography>
      <a href={foundations.website}>
        <Typography variant="body2" color="text.secondary">
          {foundations.website}
        </Typography>
      </a>
    </Stack>
  );

  const facebook = (
    <Stack
      marginBottom={0.5}
      direction="row"
      spacing={1}
      style={{ alignItems: "left", justifyContent: "left" }}
    >
      <Typography variant="body2" color="text.secondary">
        <FacebookIcon />
      </Typography>
      <a href={foundations.facebook}>
        <Typography variant="body2" color="text.secondary">
          {foundations.facebook}
        </Typography>
      </a>
    </Stack>
  );

  const line = (
    <Stack
      marginBottom={0.5}
      direction="row"
      spacing={1}
      style={{ alignItems: "left", justifyContent: "left" }}
    >
      <Typography variant="body2" color="text.secondary">
        <ChatIcon />
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {foundations.line}
      </Typography>
    </Stack>
  );

  const tel = (
    <Stack
      marginBottom={0.5}
      direction="row"
      spacing={1}
      style={{ alignItems: "left", justifyContent: "left" }}
    >
      <Typography variant="body2" color="text.secondary">
        <LocalPhoneOutlinedIcon />
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {foundations.telephone_number}
      </Typography>
    </Stack>
  );

  return (
    <StyledRoot className={`page`}>
      <Container style={{ justifyContent: "center" }} maxWidth="lg">
        <Stack style={{ justifyContent: "center" }}>
          {isLoading ? (
            <Stack style={{ justifyContent: "center", alignItems: "center" }}>
              <CircularProgress style={{ marginTop: "150px" }} />
            </Stack>
          ) : (
            <StyledBox>
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  style={{ justifyContent: "space-between" }}
                >
                  <Typography variant="h4">{foundations.name}</Typography>{" "}
                </Stack>
              </Stack>
              <Stack>
                  <Typography variant="small" marginTop={1} color="text.secondary">{foundations.foundation_type}</Typography>{" "}
              </Stack>
              <Divider style={{ marginBottom: 40, marginTop: 10 }} />
              <Stack
                direction="row"
                spacing={2}
                style={{ justifyContent: "space-between", marginBottom: 50, alignItems: "center" }}
              >
                <StyledImage
                  src={foundations.second_image}
                  alt="second_image"
                />
                <StyledImage src={foundations.third_image} alt="third_image" />
                <StyledImage
                  src={foundations.fourth_image}
                  alt="fourth_image"
                />
              </Stack>
              <StyledTypography paragraph variant="body1" dangerouslySetInnerHTML={{ __html: foundations.description }}></StyledTypography>
              <Divider style={{ marginBottom: 20, marginTop: 20 }} />
              <Stack style={{ justifyContent: "left", marginBottom: 20 }}>
                {location}
                {tel}
                {line}
                {web}
                {facebook}
              </Stack>
            </StyledBox>
          )}
        </Stack>
      </Container>
    </StyledRoot>
  );
}

export default DetailFoundationPage;
