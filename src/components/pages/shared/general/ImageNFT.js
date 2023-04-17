import React from "react";
import "./styles/NFTImg.css";
import ZoomInOutlinedIcon from "@mui/icons-material/ZoomInOutlined";
import { Stack, Typography } from "@mui/material";

export default function NFTImage({ img_url }) {
  const handleClick = () => {
    window.open(img_url, "_blank");
  };

  return (
    <div
      style={{
        position: "relative",
        height: 776,
        maxWidth: 680,
        width: "100%",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <img
        src={img_url}
        style={{ height: "100%", width: "100%", objectFit: "cover" }}
        className="nft-image"
      />
      <div className="overlay" onClick={handleClick}>
        <Stack direction="row" style={{ alignItems: "center" }} spacing={0.5}>
          <Typography>คลิกเพื่อดูรูปภาพขนาดเต็ม</Typography>
          <ZoomInOutlinedIcon />
        </Stack>
      </div>
    </div>
  );
}
