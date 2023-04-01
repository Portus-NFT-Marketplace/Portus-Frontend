import React, { useEffect, useState } from "react";
import { Typography, Grid, Divider, Stack, Chip } from "@mui/material";
import DeleteIcon from "@material-ui/icons/Delete";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";
import Cookies from "js-cookie";

import ButtonOrange from "../shared/general/ButtonOrange";

function IPFSImageUploader() {
  const [fileImg, setFileImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const imgURLCookie = Cookies.get("imgURL");
    setImageUrl(imgURLCookie || "");
  }, []);

  const sendFileToIPFS = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        Cookies.set(
          "imgURL",
          `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`
        );
        setLoading(false);
        window.location.reload();
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  return (
    <Stack spacing={2} style={{ marginBottom: "40px" }}>
      <Grid item xs={12}>
        {imageUrl ? (
          <Stack direction="row" spacing={2} style={{ alignItems: "center" }}>
            <Typography variant="h5">1. อัปโหลดงานศิลปะของคุณ</Typography>

            <CheckCircleOutlinedIcon />
          </Stack>
        ) : (
          <Stack direction="row" spacing={2} style={{ alignItems: "center" }}>
            <Typography variant="h5">1. อัปโหลดงานศิลปะของคุณ</Typography>
          </Stack>
        )}
        <Divider />
      </Grid>
      <Stack>
        <Typography variant="caption" color="text.secondary">
          - อัปโหลดงานศิลปะของคุณ คลิก "Choose File (เลือกไฟล์)"
        </Typography>
        <Typography variant="caption" color="text.secondary">
          - คลิก "สร้าง URL งานศิลปะของคุณ" เพื่อแปลงงานศิลปะของคุณเป็น URL
        </Typography>
        <Typography variant="caption" color="text.secondary">
          - URL งานศิลปะของคุณจะปรากฎข้างล่าง
        </Typography>
      </Stack>
      <Stack style={{ marginTop: 40 }}>
        <form onSubmit={sendFileToIPFS}>
          <Stack
            direction="row"
            style={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={2} style={{ alignItems: "center" }}>
              <input
                type="file"
                onChange={(e) => setFileImg(e.target.files[0])}
                required
              />
              {loading && <CircularProgress size={30} />}
            </Stack>
            <ButtonOrange variant="contained" type="submit">
              สร้าง URL งานศิลปะของคุณ
            </ButtonOrange>
          </Stack>
        </form>
        <Chip
          style={{ height: 45, width: "100%", marginTop: "20px" }}
          label={imageUrl || "URL งานศิลปะของคุณจะปรากฎที่นี่"}
          onDelete={
            imageUrl
              ? () => {
                  Cookies.remove("imgURL");
                  setImageUrl("");
                }
              : undefined
          }
          deleteIcon={imageUrl ? <DeleteIcon /> : null}
        />
      </Stack>
    </Stack>
  );
}

export default IPFSImageUploader;
