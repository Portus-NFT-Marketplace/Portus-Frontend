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

import {
  Link,
  withRouter,
  NavLink,
  Redirect,
  useHistory,
} from "react-router-dom";

import axios from "axios";

// import { Route, Redirect, Switch } from "react-router-dom";
// import Protected from "../../../utils/ProtectedRoute";
// import CreatingArtworkForm from "../NFTCreatingPage";
import Cookies from "js-cookie";
import Routers from "../../../Routers";

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

// function checkFormError (res) {
//   if (res == 422)

//   return userInput === fetchInput
// }

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const [isSignedIn, setIsSignedIn] = useState(null);

  const url = "https://portus-api.herokuapp.com/foundations/sign_in";
  const history = useHistory();

  let userToken = Cookies.set("userToken", null, { expires: 29 });
  let isSignedIn = Cookies.set("isSignedIn", false, { expires: 29 });
  let foundationName = Cookies.set("foundationName", null, { expires: 29 });

  Cookies.remove("userToken");
  Cookies.remove("isSignedIn");
  Cookies.remove("foundationName");

  const onSubmit = (data, e) => {
    e.preventDefault();
    const foundation = { ...data };

    // console.log(errors);
    // axios({
    //   method: 'post',
    //   url: url,
    //   data: {
    //     foundations: userData,
    //   }
    // });

    axios
      .post(url, { foundation })
      .then((response) => {
        //get token from response
        // document.cookie = response.data.token;

        // TEST LOGOUT
        // Cookies.remove("userToken")
        // Cookies.remove("isSignedIn")

        userToken = Cookies.set("userToken", response.data.token, {
          expires: 29,
        });

        // Cookies.set("isSignedIn", false, { expires: 29 });
        if (!userToken) {
          Cookies.set("isSignedIn", false, { expires: 29 });
          history.push("/sign_in_as_foundation");
          window.location.reload();
        } else {
          // const userSignInToken = Cookies.get("userToken");
          isSignedIn = Cookies.set("isSignedIn", true, { expires: 29 });
          foundationName = Cookies.set("foundationName", response.data.foundation_name, { expires: 29 });

          // setIsSignedIn(true);
          <Routers isSignedIn={isSignedIn} userToken={userToken} />;
          history.push("/create_artwork");
          window.location.reload();
        }

        // if (document.cookie != "") {
        //   setIsSignedIn(true);
        //   <Routers isSignedIn={isSignedIn} />;
        // } else {
        //   setIsSignedIn(false);
        //   <Routers isSignedIn={isSignedIn} />;
        // }
        // console.log(document.cookie);
        // console.log(response);
      })
      .catch((err) => {
        setError("email", {
          type: err.response.status,
          message: "Username or password is invalid!",
        });
        setError("password", {
          type: err.response.status,
          message: "Username or password is invalid!",
        });
        console.log(err);
      });
    // console.log(foundations);
    // console.log({ foundations });
    // console.log(`Test ${token}`);
  };

  // if (document.cookie !== "") {
  //   console.log("yes");
  // }

  // console.log(Cookies.get("userToken"));
  // console.log(Cookies.get("isSignedIn"));
  // console.log(Cookies.get("foundationName"));
  // console.log(isSignedIn);

  return (
    <StyledRoot>
      <StyledBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledGrid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4">Sign In</Typography>
              <Divider style={{ marginBottom: "10px" }} />
              <Typography variant="caption" color="text.secondary">
                <i>เข้าสู่ระบบด้วยบัญชีมูลนิธิของคุณ</i>
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
                      label="อีเมล"
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
                      label="รหัสผ่าน"
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
              // href="/create_artwork"
            >
              เข้าสู่ระบบ
            </Button>
          </StyledGrid>
        </form>
      </StyledBox>
    </StyledRoot>
  );
};

export default LoginForm;
