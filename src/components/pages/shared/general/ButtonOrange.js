import React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const StyleButtonOrange = styled(Button)(({ variant, color }) => ({
  ...(variant === "contained" && {
    borderColor: "#E46842",
    color: "#ffffff",
    backgroundColor: "#E46842",
    borderRadius: 8,
    "&:hover": {
      borderColor: "#BC6530",
      backgroundColor: "#BC6530",
    },
  }),
  ...(variant === "outlined" && {
    borderColor: "#E46842",
    backgroundColor: "transparent",
    color: "#E46842",
    borderRadius: 8,
    "&:hover": {
      borderColor: "#BC6530",
    },
  }),
  ...(variant === "text" && {
    backgroundColor: "transparent",
    color: "#E46842",
    borderRadius: 8,
    "&:hover": {
      backgroundColor: "#1976d20a",
    },
  }),
  ...(variant === "text" && color === "secondary" && {
    backgroundColor: "transparent",
    color: "#212b36",
    borderRadius: 8,
    "&:hover": {
      backgroundColor: "#1976d20a",
    },
  }),
}));

const ButtonOrange = (props) => {
  return (
    <StyleButtonOrange
      startIcon={props.startIcon}
      endIcon={props.endIcon}
      style={props.style}
      size={props.size}
      type={props.type}
      variant={props.variant}
      onClick={props.onClick}
      component={props.component}
      to={props.to}
      className={props.className}
      color={props.color}
    >
      {props.children}
    </StyleButtonOrange>
  );
};

export default ButtonOrange;