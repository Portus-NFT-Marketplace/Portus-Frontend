import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Grid, Container, Stack, Box } from "@mui/material";

import CarouselAds from "./carousel";
import NFTCard from "../shared/general/CardNFT";
import ButtonFilter from "../shared/general/ButtonFilter";
import CreatingArtworkForm from "../NFTCreatingPage";

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
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
    {
      name: "test_2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      // owner_name: string,
      // foundation_name: string,
      image_url:
        "https://www.thetelegraphandargus.co.uk/resources/images/13541891/?type=responsive-gallery-fullscreen",
      //   status: string,
      //   nft_owner: string,
      //   nft_id,
      //   string,
      price: 100.0,
    },
    {
      name: "test_3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      // owner_name: string,
      // foundation_name: string,
      image_url:
        "https://images.squarespace-cdn.com/content/v1/618af22352c572536b8bab75/5fc89b74-517f-4a2d-8de0-58a0ed01be7f/IMG_8250.jpg?format=750w",
      //   status: string,
      //   nft_owner: string,
      //   nft_id,
      //   string,
      price: 100.0,
    },
    {
      name: "test_4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      // owner_name: string,
      // foundation_name: string,
      image_url:
        "https://media.istockphoto.com/id/1050915576/vector/childs-drawing-happy-family-building-car.jpg?s=612x612&w=0&k=20&c=zep-ls4og2W1aBIdIPXsLEDhMcO9d--fhCz6rAIc3L8=",
      //   status: string,
      //   nft_owner: string,
      //   nft_id,
      //   string,
      price: 100.0,
    },
  ];
}

function HomePage(props) {
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
        </Stack>
        <Stack style={{ justifyContent: "center" }}>
          <div style={{ display: "flex", justifyContent: "flex-end"}}>
            <ButtonFilter />
          </div>
          <StyledBox>
            {fetchData().map((value, index) => {
              return (
                <NFTCard
                  name={value.name}
                  price={value.price}
                  description={value.description}
                  img_url={value.image_url}
                />
              );
            })}
          </StyledBox>
        </Stack>
      </Container>
    </StyledRoot>
  );
}

export default HomePage;
