import React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const StyleTextField = styled(TextField)(({ variant }) => ({
  width: "100%",

  "& .MuiOutlinedInput-root": {
    borderRadius: 8,
    "& .MuiOutlinedInput-input": {
      padding: "13.5px 14px",
    },
    "& .MuiInputBase-inputMultiline": {
      padding: 0,
    },
  },
  ...(variant === "filled" && {
    "& .MuiFilledInput-root, .MuiFilledInput-root:-webkit-autofill": {
      borderRadius: 8,
      backgroundColor: "#919eab14",
      "& .MuiFilledInput-input": {
        borderRadius: 8,
      },
    },
    "& .MuiFilledInput-root:before, .MuiFilledInput-root:after": {
      display: "none",
    },
  }),
}));

const TextFieldTheme = (props) => {
  return (
    <StyleTextField
      className={props.className}
      style={props.style}
      value={props.value}
      onChange={props.onChange}
      fullWidth={props.fullWidth}
      size={props.size}
      label={props.label}
      variant={props.variant}
      name={props.name}
      type={props.type}
      multiline={props.multiline}
      maxRows={props.maxRows}
      rows={props.rows}
      error={props.error}
      helperText={props.helperText}
      inputProps={props.inputProps}
      inputRef={props.inputRef}
      ref={props.ref}
      select={props.select}
      placeholder={props.placeholder}
    >
      {props.children}
    </StyleTextField>
  );
};

export default TextFieldTheme;
