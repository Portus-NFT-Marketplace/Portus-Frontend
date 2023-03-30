import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Container,
  Stack,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { Pagination } from "@mui/material";

import NFTCard from "../shared/general/CardNFT";
import Cookies from "js-cookie";

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

function MyNFTPage() {
  const userAddress = Cookies.get("userAddress");
  const url = `https://portus-api.herokuapp.com/api/v1/artworks/by_owner/${userAddress}`;

  const [token, setToken] = useState({});
  const [artworks, setArtworks] = useState([{}]);

  const history = useHistory();

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    if (!userAddress) {
      history.push("/");
      window.location.reload();
    }
  }, [userAddress, history]);

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
      .get(`${url}?page=${page}&limit=${itemsPerPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setArtworks(res.data.data))
      .catch((err) => console.log(err));
  }, [url, token, page, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  console.log(token);
  console.log(artworks);

  return (
    <StyledRoot className={`page`}>
      <Container style={{ justifyContent: "center" }} maxWidth="lg">
        <Typography variant="h3" style={{ marginTop: "50px" }}>
          NFT ของฉัน
        </Typography>
        <Divider style={{ marginTop: "10px", marginBottom: "15px" }} />
        {artworks.length === 0 ? (
          <StyledBoxForNoti>
            <Typography variant="h4" align="center" color="text.secondary">
              คุณไม่มีผลงานศิลปะ
            </Typography>
          </StyledBoxForNoti>
        ) : (
          <>
            <StyledBox>
              {artworks
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((value, index) => {
                  return (
                    <NFTCard
                      name={value.name}
                      price={value.price}
                      description={value.description}
                      img_url={value.image_url}
                      id={value.id}
                      foundation_owner={value.foundation_name}
                    />
                  );
                })}
            </StyledBox>{" "}
            <Stack style={{ alignItems: "center" }}>
              <Pagination
                count={Math.ceil(artworks.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                style={{ marginTop: "16px" }}
                disabled={artworks.length === 0}
              />
            </Stack>
          </>
        )}
      </Container>
    </StyledRoot>
  );
}

export default MyNFTPage;
