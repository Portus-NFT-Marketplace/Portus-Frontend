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
} from "@mui/material";
import ButtonBlue from "../shared/general/ButtonBlue";
import ButtonOrange from "../shared/general/ButtonOrange";
import TextFieldTheme from "../shared/general/TextFieldTheme";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import YupPassword from "yup-password";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Stack } from "@mui/system";

import { Link, withRouter, NavLink } from "react-router-dom";

import axios from "axios";

// import "./styles.css";

const StyledRoot = styled("div")({
  marginTop: 100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // margin: "0px",
  // top: "50%",
  // bottom: "50%",
  // position: "absolute",
  "& .register-head": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 100,
    marginBottom: 30,
  },
  "& .register-body": {
    display: "flex",
  },
});

const StyledGrid = styled(Grid)({
  justifyContent: "center",
  alignItems: "center",
});

const StyledBox = styled(Box)({
  border: "1px solid",
  borderColor: "#CFD3D7",
  borderRadius: "12px",
  padding: 35,
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  width: "500px",
});

// YupPassword(yup)

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("Please fill in your username")
    .typeError("Invalid username"),
  password: yup
    .string()
    // .password()
    .required("Password is required")
    .typeError("Invalid password"),
});

const LoginForm = () => {
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
      email: "",
      password: "",
    },
  });

  const url = "https://portus-api.herokuapp.com/foundations/sign_in";

  const onSubmit = (data) => {
    const foundations = { ...data };

    // console.log(errors);
    // axios({
    //   method: 'post',
    //   url: url,
    //   data: {
    //     foundations: userData,
    //   }
    // });
    axios.post(url, {foundations});
    // console.log(foundations);
    // console.log({ foundations });
    // console.log(`Test ${token}`);
  };

  return (
    <StyledRoot>
      <StyledBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledGrid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4">Sign In</Typography>
              <Divider style={{ marginBottom: "10px" }} />
              <Typography variant="caption" color="text.secondary">
                <i>Sign in with your foundation account</i>
              </Typography>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextFieldTheme
                      {...field}
                      label="E-mail"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextFieldTheme
                      {...field}
                      label="Password"
                      type="password"
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              style={{
                marginTop: 20,
                borderRadius: 8,
                backgroundColor: "#E46842",
              }}
              // href="/"
            >
              Sign In
            </Button>
          </StyledGrid>
        </form>
      </StyledBox>
    </StyledRoot>
  );
};

export default LoginForm;
