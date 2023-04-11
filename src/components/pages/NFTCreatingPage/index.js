import React, { useState, useEffect } from "react";
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
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@material-ui/core";
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
    marginBottom: 30,
  },
  "& .register-body": {},
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
  status: yup.string().required("กรุณาเลือกสถานะ"),
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
  const [alertSeverity, setAlertSeverity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const imgURLCookie = Cookies.get("imgURL");
    setImageUrl(imgURLCookie || "");
  }, []);

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
  };

  const statusOptions = [
    { value: "available", label: "พร้อมขาย" },
    { value: "unavailable", label: "ไม่สามารถซื้อได้" },
  ];

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      status: "",
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

    if (imageUrl === "") {
      setAlertSeverity("warning");
      setAlertMessage("กรุณาสร้าง URL ของงานศิลปะของคุณ");
      setIsLoading(false);
      return;
    }

    const sentData = {
      name: newData.name,
      description: newData.description,
      price: newData.price,
      image_url: imageUrl,
      status: newData.status,
    };

    axios
      .post(url, sentData, {
        headers: {
          Authorization: `Bearer ${oauthToken}`,
          "Foundation-Identifier": `${userToken}`,
        },
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          setAlertSeverity("success");
          setAlertMessage("สร้างผลงานศิลปะสำเร็จ");
          Cookies.remove("imgURL");
          history.push("/");
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setAlertSeverity("error");
          setAlertMessage("ไม่สามารถสร้างผลงานศิลปะได้ กรุณาลองใหม่อีกครั้ง");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertMessage("");
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
                <Typography variant="h5">2. สร้างงานศิลปะของคุณ</Typography>
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
                <Grid item xs={12} sm={5}>
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
                <Grid item xs={12} sm={5} style={{marginLeft: "30px"}}>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                        component="fieldset"
                        error={errors.status !== undefined}
                      >
                        <FormLabel component="legend">สถานะ</FormLabel>
                        <RadioGroup {...field}>
                          {statusOptions.map((option) => (
                            <FormControlLabel
                              key={option.value}
                              value={option.value}
                              control={<Radio />}
                              label={option.label}
                            />
                          ))}
                        </RadioGroup>
                        {errors.status && (
                          <FormHelperText>
                            {errors.status.message}
                          </FormHelperText>
                        )}
                      </FormControl>
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
