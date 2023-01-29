import React from "react";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/system";
import TuneIcon from "@mui/icons-material/Tune";

import ButtonOrange from "./ButtonOrange";

export default function ButtonFilter({}) {
  return (
    <ButtonOrange variant="outlined" style={{ marginBottom: 20, width: 100 }}>
      <Stack direction="row">
        Filter <TuneIcon style={{ marginLeft: 5 }} />
      </Stack>
    </ButtonOrange>
  );
}
