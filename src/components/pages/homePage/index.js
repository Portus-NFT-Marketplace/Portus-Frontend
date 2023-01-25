import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Container, Stack, Box } from "@mui/material";

import CarouselAds from "./carousel";
import NFTCard from "../shared/general/CardNFT";

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
});

function HomePage(props) {
  //   const dispatch = useDispatch();

  useEffect(() => {
    async function getdata() {}
    getdata();
  }, []);

  return (
    <StyledRoot className={`page`}>
      <Container style={{justifyContent: "center"}} maxWidth="lg">
        <Grid
          container
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
        </Grid>
        <Stack style={{ justifyContent: "center" }}>
          <StyledBox><NFTCard/></StyledBox>
        </Stack>
      </Container>
    </StyledRoot>
  );
}

export default HomePage;
