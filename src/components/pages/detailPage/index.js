import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Grid, Container, Stack, Box, Typography, Chip } from "@mui/material";

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

function fetchData() {
  return [
    {
      name: "test_1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      // owner_name: string,
      // foundation_name: string,
      image_url:
        "https://goodparentingbrighterchildren.com/wp-content/uploads/2019/03/Children-drawing-PB.jpg",
      //   status: string,
      //   nft_owner: string,
      //   nft_id,
      //   string,
      price: 100.0,
    },
    // {
    //   name: "test_2",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //   // owner_name: string,
    //   // foundation_name: string,
    //   image_url:
    //     "https://www.thetelegraphandargus.co.uk/resources/images/13541891/?type=responsive-gallery-fullscreen",
    //   //   status: string,
    //   //   nft_owner: string,
    //   //   nft_id,
    //   //   string,
    //   price: 100.0,
    // },
    // {
    //   name: "test_3",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //   // owner_name: string,
    //   // foundation_name: string,
    //   image_url:
    //     "https://images.squarespace-cdn.com/content/v1/618af22352c572536b8bab75/5fc89b74-517f-4a2d-8de0-58a0ed01be7f/IMG_8250.jpg?format=750w",
    //   //   status: string,
    //   //   nft_owner: string,
    //   //   nft_id,
    //   //   string,
    //   price: 100.0,
    // },
    // {
    //   name: "test_4",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //   // owner_name: string,
    //   // foundation_name: string,
    //   image_url:
    //     "https://media.istockphoto.com/id/1050915576/vector/childs-drawing-happy-family-building-car.jpg?s=612x612&w=0&k=20&c=zep-ls4og2W1aBIdIPXsLEDhMcO9d--fhCz6rAIc3L8=",
    //   //   status: string,
    //   //   nft_owner: string,
    //   //   nft_id,
    //   //   string,
    //   price: 100.0,
    // },
  ];
}

function DetailPage(props) {
  //   const dispatch = useDispatch();
  // const [data, setData] = useState([{}]);

  // useEffect(() => {
  //   getData();
  // }, []);

  // function getData() {
  //   axios
  //     .get("https://pokeapi.co/api/v2/pokemon/ditto")
  //     .then((res) => {
  //       setData(res.data);
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  return (
    <StyledRoot className={`page`}>
      <Container style={{ justifyContent: "center" }} maxWidth="lg">
        <Stack
          style={{ marginTop: 60, justifyContent: "space-between" }}
          spacing={5}
          direction="row"
        >
          {fetchData().map((value, index) => {
            return <NFTImage img_url={value.image_url} />;
          })}
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
                <Typography variant="h3">฿100</Typography>
                <Chip
                  style={{
                    width: 90,
                    height: 25,
                    backgroundColor: "#5EDF3E",
                    color: "white",
                  }}
                  label="Avaliable"
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
                <Typography variant="h4">NAME OF NFT</Typography>
              </Stack>
              <Stack style={{ marginTop: 18 }} spacing={2}>
                <StyledBox>
                  <Typography>Description</Typography>
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
