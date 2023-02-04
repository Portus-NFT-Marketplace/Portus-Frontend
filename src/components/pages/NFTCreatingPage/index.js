import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
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
} from "@mui/material";
import ButtonBlue from "../shared/general/ButtonBlue";
import ButtonOrange from "../shared/general/ButtonOrange";
import TextFieldTheme from "../shared/general/TextFieldTheme";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Stack } from "@mui/system";

import "./style.css";

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

const StyledPaper = styled(Paper)({
  height: 96,
  borderRadius: 16,
  position: "relative",
  padding: 16,
  boxSizing: "border-box",
  cursor: "pointer",
  "&:hover": {
    color: "#1976d2",
  },

  "& .wrap-name": {
    width: 160,
    "& .MuiTypography-root": {
      fontSize: 20,
    },
  },
  "& .wrap-icon": {
    position: "absolute",
    fontSize: 35,
    color: "#919eab",
    right: 16,
    bottom: 8,
  },
});

const StyledRootPaper = styled("div")({
  "& .selected": {
    color: "#1976d2",
    border: "1px solid #1976D2",
    background: "#1976d20d",
  },
});

const StyledSpanErrorMessage = styled("span")({
  color: "#d32f2f",
  fontFamily: "Roboto,Helvetica,Arial,sans-serif",
  fontWeight: 400,
  fontSize: "0.75rem",
  marginTop: "10px",
  marginRight: "14px",
  marginLeft: "14px",
});

const schema = yup.object().shape({
  name: yup.string().required("This field is required."),
  description: yup.string(),
  ownerName: yup.string().required("This field is required."),
  price: yup
    .number()
    .typeError("Price should be a number.")
    .positive("Price should be greater than 0.")
    .required(),
  image: yup.mixed().required("A file is required"),
  // .test(
  //   "Fichier taille",
  //   "upload file",
  //   (value) => !value || (value && value.size <= 1024 * 1024)
  // )
  // .test(
  //   "format",
  //   "upload file",
  //   (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
  // ),
});

const CreatingArtworkForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      ownerName: "",
      description: "",
      price: "",
    },
  });

  const onSubmit = (data) => {
    const newData = { ...data };
    console.log(newData);
    console.log(errors);
  };

  return (
    <StyledRoot>
      <Container maxWidth="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5">Create Artwork</Typography>
              <Divider />
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextFieldTheme
                      {...field}
                      label="NFT Name"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="ownerName"
                  control={control}
                  render={({ field }) => (
                    <TextFieldTheme
                      {...field}
                      label="Owner Name"
                      error={!!errors.ownerName}
                      helperText={errors.ownerName?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextFieldTheme
                      {...field}
                      label="Description"
                      multiline={true}
                      rows={4}
                      error={!!errors.description}
                      helperText={errors.description?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <TextFieldTheme
                      {...field}
                      label="Price"
                      error={!!errors.price}
                      helperText={errors.price?.message}
                    />
                  )}
                />
                <Stack style={{ marginTop: "16px" }}>
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <input
                        //   {...field}
                        type="file"
                        onChange={(e) => {
                          field.onChange(e.target.files);
                        }}
                      />
                    )}
                  />
                  <StyledSpanErrorMessage>
                    {errors.image?.message}
                  </StyledSpanErrorMessage>
                </Stack>
              </Grid>
              {/* <input type="file" name="picture" /> */}
            </Grid>
          </Grid>
          <ButtonOrange
            type="submit"
            variant="contained"
            style={{ marginTop: 20}}
          >
            Create Artwork
          </ButtonOrange>
        </form>
      </Container>
    </StyledRoot>
  );
};

export default CreatingArtworkForm;
