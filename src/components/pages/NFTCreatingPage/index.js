import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import {
  Container,
  Typography,
  Button,
  Grid,
  Divider,
  Box,
  Stack,
} from "@mui/material";
import TextFieldTheme from "../shared/general/TextFieldTheme";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import LinearProgress from "@mui/material/LinearProgress";

import { Redirect, useHistory } from "react-router-dom";

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
    .max(12, "ชื่อผลงานศิลปะต้องมีไม่เกิน 12 ตัวอักษร")
    .required("กรุณากรอกชื่อผลงานศิลปะ"),
  description: yup.string(),
  price: yup
    .number()
    .typeError("ราคาต้องเป็นตัวเลขเท่านั้น")
    .positive("ราคาต้องมากกว่า 0 SepoliaETH")
    .test(
      "maxDecimalPlaces",
      "ราคาต้องไม่เกิน 4 ตำแหน่งทศนิยม",
      function (value) {
        if (value) {
          const pattern = /^\d+(\.\d{1,4})?$/;
          return pattern.test(value.toString());
        }
        return true;
      }
    )
    .required(),
  image_url: yup.string().required("กรุณากรอก URL ของภาพงานศิลปะ"),
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CreatingArtworkForm({
  isSignedIn,
  userToken,
  oauthToken,
}) {
  const history = useHistory();

  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [isLoading, setIsLoading] = useState(false);

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
      description: "",
      price: "",
    },
  });

  const url = "https://portus-api.herokuapp.com/api/v1/artworks";

  isSignedIn = Cookies.get("isSignedIn");
  if (isSignedIn != "true") {
    return <Redirect to="/sign_in_as_foundation" replace />;
  }

  userToken = Cookies.get("userToken");

  const onSubmit = (data) => {
    setIsLoading(true);
    const newData = { ...data };

    // Convert price to wei (10^18)
    newData.price = parseInt(parseFloat(newData.price) * 10 ** 18);
    console.log(newData);

    axios
      .post(url, newData, {
        headers: {
          Authorization: `Bearer ${oauthToken}`,
          "Foundation-Identifier": `${userToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setAlertSeverity("success");
          setAlertMessage("สร้างผลงานศิลปะสำเร็จ");
          history.push("/");
          window.location.reload();
          // setTimeout(() => {
          //   window.location.href = "/";
          // }, 3000);
        } else {
          setAlertSeverity("error");
          setAlertMessage("ไม่สามารถสร้างผลงานศิลปะได้ กรุณาลองใหม่อีกครั้ง");
          clearForm();
        }
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setAlertSeverity("success");
          setAlertMessage("สร้างผลงานศิลปะสำเร็จ");
          history.push("/");
          window.location.reload();
        } else {
          setAlertSeverity("error");
          setAlertMessage("ไม่สามารถสร้างผลงานศิลปะได้ กรุณาลองใหม่อีกครั้ง");
          clearForm();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const clearForm = () => {
    setValue("name", "");
    setValue("description", "");
    setValue("price", "");
    setValue("image_url", "");
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertMessage("");
    setAlertSeverity("success");
  };

  return (
    <StyledRoot>
      <Container maxWidth="md">
        <Snackbar
          open={!!alertMessage}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity={alertSeverity}>
            {alertMessage}
          </Alert>
        </Snackbar>
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
                        label="ชื่อผลงานศิลปะ (ไม่เกิน 12 ตัวอักษร)"
                        error={!!errors.name}
                        helperText={errors.name?.message}
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
                        label="ราคา (SepoliaETH)"
                        error={!!errors.price}
                        helperText={errors.price?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: 20, borderRadius: 8 }}
            >
              สร้างงานศิลปะ
            </Button>
            <Stack style={{ justifyContent: "center", marginTop: "20px" }}>
              {isLoading && <LinearProgress />}
            </Stack>
          </form>
        </StyledBox>
      </Container>
    </StyledRoot>
  );
}
