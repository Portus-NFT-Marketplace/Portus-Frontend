import React, { useEffect, useState } from "react";
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
  Box,
  Stack,
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

import { Link, withRouter, NavLink, Redirect } from "react-router-dom";

import axios from "axios";

import "./styles.css";
import IPFSImageUploader from "./IPFSUploader";

import Cookies from "js-cookie";

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

const StyledBox = styled(Box)({
  border: "1px solid",
  borderColor: "#CFD3D7",
  borderRadius: "12px",
  padding: 35,
  marginTop: "80px",
});

const schema = yup.object().shape({
  name: yup
    .string()
    .max(15, "ชื่อผลงานศิลปะต้องมีไม่เกิน 15 ตัวอักษร")
    .required("กรุณากรอกชื่อผลงานศิลปะ"),
  description: yup.string(),
  // ownerName: yup.string().required("This field is required."),
  price: yup
    .number()
    .typeError("ราคาต้องเป็นตัวเลขเท่านั้น")
    .positive("ราคาต้องมากกว่า 0 GWEI")
    .required(),
  image_url: yup.string().required("กรุณากรอก URL ของภาพงานศิลปะ"),
  // image_url: yup.mixed().required("A file is required"),
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

export default function CreatingArtworkForm({ isSignedIn, userToken }) {
  // force reloading a page when user using browser back button
  window.onpopstate = function (event) {
    if (event && event.state && event.state.reloaded) {
      // If the state object exists and has the "reloaded" property set to true,
      // it means that we already reloaded the page on the previous navigation,
      // so we don't want to reload it again.
      return;
    }

    // Reload the page and pass a state object to indicate that we already reloaded it.
    window.location.reload();
    window.history.replaceState({ reloaded: true }, "");
    // alert("You are back!");
  };

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
      // ownerName: "",
      description: "",
      price: "",
    },
  });

  const url = "https://portus-api.herokuapp.com/api/v1/artworks";
  const [token, setToken] = useState({});
  useEffect(() => {
    axios
      .post("https://portus-api.herokuapp.com/oauth/token", {
        grant_type: "client_credentials",
        client_id: `${process.env.REACT_APP_CLIENT_ID}`,
        client_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
      })
      .then((response) => {
        //get token from response
        console.log(response);
        setToken(response.data.access_token);
        console.log(token);
      })
      .catch((err) => console.log(err));
  }, []);

  isSignedIn = Cookies.get("isSignedIn");
  if (isSignedIn != "true") {
    return <Redirect to="/sign_in_as_foundation" replace />;
  }

  userToken = Cookies.get("userToken");

  const onSubmit = (data) => {
    const newData = { ...data };

    // console.log(errors);
    axios.post(url, newData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Foundation-Identifier": `${userToken}`,
      },
    });
    // console.log(newData);
    // console.log(`Test ${token}`);
  };

  return (
    <StyledRoot>
      <Container maxWidth="md">
        <StyledBox>
          <IPFSImageUploader />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5">สร้างงานศิลปะ</Typography>
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
                        label="ชื่อผลงานศิลปะ (ไม่เกิน 15 ตัวอักษร)"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>
                {/* <Grid item xs={12}>
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
              </Grid> */}
                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextFieldTheme
                        {...field}
                        label="คำอธิบาย"
                        multiline={true}
                        rows={4}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="image_url"
                    control={control}
                    render={({ field }) => (
                      <TextFieldTheme
                        {...field}
                        label="URL ของภาพงานศิลปะ"
                        error={!!errors.image_url}
                        helperText={errors.image_url?.message}
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
                        label="ราคา (GWEI)"
                        error={!!errors.price}
                        helperText={errors.price?.message}
                      />
                    )}
                  />

                  {/* <Stack style={{ marginTop: "16px" }}>
                  <Controller
                    name="image_url"
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
                    {errors.image_url?.message}
                  </StyledSpanErrorMessage>
                </Stack> */}
                </Grid>
                {/* <input type="file" name="picture" /> */}
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: 20, borderRadius: 8 }}
              // href="/"
            >
              สร้างงานศิลปะ
            </Button>
          </form>
        </StyledBox>
      </Container>
    </StyledRoot>
  );
}
