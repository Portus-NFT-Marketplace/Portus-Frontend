import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Container,
  Typography,
  Button,
  Grid,
  Divider,
  IconButton,
  Paper,
  TextField,
  MenuItem,
  Chip,
} from "@mui/material";
import { Stack } from "@mui/system";

import axios from "axios";

import ButtonOrange from "../shared/general/ButtonOrange";

const StyledRoot = styled("div")({
  marginTop: 100,
  "& .register-head": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 100,
    marginBottom: 30,
  },
  "& .register-body": {
    // display: "flex"
  },
});

function IPFSImageUploader() {
  const [fileImg, setFileImg] = useState(null);
  const [ImgHash, setImgHash] = useState("");
  const sendFileToIPFS = async (e) => {
    e.preventDefault();
    if (fileImg) {
      try {
        const formData = new FormData();
        formData.append("file", fileImg);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `${process.env.REACT_APP_PINATA_API_KEY}`,
            pinata_secret_api_key: `${process.env.REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setImgHash(
          `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`
        );
        // ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  return (
    <StyledRoot>
      <Container maxWidth="md">
        <Stack spacing={2} style={{ marginBottom: "40px" }}>
          <Grid item xs={12}>
            <Typography variant="h5">อัปโหลดงานศิลปะของคุณ</Typography>
            <Divider />
          </Grid>
          <Stack>
            <Typography variant="caption" color="text.secondary">
              1. อัปโหลดงานศิลปะของคุณ คลิก "Choose File"
            </Typography>
            <Typography variant="caption" color="text.secondary">
              2. คลิก "สร้าง URL งานศิลปะของคุณ" เพื่อแปลงงานศิลปะของคุณเป็น URL
            </Typography>
            <Typography variant="caption" color="text.secondary">
              3. คัดลอก URL ของคุณเพื่อป้อนลงในแบบฟอร์มสร้างงานศิลป์ด้านล่าง
            </Typography>
            <Typography variant="caption" color="text.secondary"></Typography>
          </Stack>
          <Stack style={{ marginTop: 40 }}>
            <form onSubmit={sendFileToIPFS}>
              <Stack direction="row" style={{ alignItems: "center" }}>
                <input
                  type="file"
                  onChange={(e) => setFileImg(e.target.files[0])}
                  required
                />
                <ButtonOrange variant="contained" type="submit">
                  สร้าง URL งานศิลปะของคุณ
                </ButtonOrange>
              </Stack>
            </form>
            <Stack spacing={1} style={{ marginTop: 15 }}>
              <Typography variant="h6">URL งานศิลปะของคุณ:</Typography>
              <Chip label={ImgHash} style={{ height: 45 }} />
            </Stack>
          </Stack>
        </Stack>
        {/* <Stack style={{ alignItems: "flex-end" }}>
          <Button
            // component={NavLink}
            variant="outlined"
            // to="/create_artwork"
            href="/create_artwork"
            style={{
              borderRadius: 8,
              marginTop: 20,
            }}
          >
            Next
          </Button>
        </Stack> */}
      </Container>
    </StyledRoot>
  );
}

export default IPFSImageUploader;
