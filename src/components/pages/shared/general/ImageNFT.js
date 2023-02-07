import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import { Grid, Container, Stack, Box, Typography } from "@mui/material";

const StyledBox = styled(Box)({
  border: "1px solid",
  borderColor: "#CFD3D7",
  borderRadius: "12px",
  padding: 35,
});

export default function NFTImage({ img_url }) {
  return (
    <img
      src={img_url}
      style={{ height: 776, maxWidth: 680, width: "100%", borderRadius: 12 }}
    />
  );
}
