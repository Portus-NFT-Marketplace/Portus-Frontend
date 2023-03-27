import React from "react";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import TuneIcon from "@mui/icons-material/Tune";

import ButtonOrange from "./ButtonOrange";
import { Typography } from "@mui/material";

export default function ButtonFilter({}) {
  return (
    <ButtonOrange variant="outlined" style={{ marginBottom: 20, width: 120 }}>
      <Stack direction="row">
        <Typography>ตัวกรอง</Typography>
        <TuneIcon style={{ marginLeft: 5 }} />
      </Stack>
    </ButtonOrange>
  );
}
