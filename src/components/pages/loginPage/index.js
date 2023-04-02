import React from "react";

import { useForm, Controller } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { Typography, Button, Grid, Divider, Box } from "@mui/material";

import TextFieldTheme from "../shared/general/TextFieldTheme";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { useHistory } from "react-router-dom";

import axios from "axios";

import Cookies from "js-cookie";
import Routers from "../../../Routers";

const StyledRoot = styled("div")({
  marginTop: 100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& .register-head": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("กรุณากรอกชื่อผู้ใช้ของคุณ")
    .typeError("ชื่อผู้ใช้ไม่ถูกต้อง"),
  password: yup
    .string()
    .required("กรุณากรอกรหัสผ่านของคุณ")
    .typeError("รหัสผ่านไม่ถูกต้อง"),
});

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

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

    axios
      .post(url, { foundation })
      .then((response) => {
        userToken = Cookies.set("userToken", response.data.token, {
          expires: 29,
        });

        if (!userToken) {
          Cookies.set("isSignedIn", false, { expires: 29 });
          history.push("/sign_in_as_foundation");
          window.location.reload();
        } else {
          // const userSignInToken = Cookies.get("userToken");
          isSignedIn = Cookies.set("isSignedIn", true, { expires: 29 });
          foundationName = Cookies.set(
            "foundationName",
            response.data.foundation_name,
            { expires: 29 }
          );

          <Routers isSignedIn={isSignedIn} userToken={userToken} />;
          history.push("/create_artwork");
          window.location.reload();
        }
      })
      .catch((err) => {
        setError("email", {
          type: err.response.status,
          message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        });
        setError("password", {
          type: err.response.status,
          message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
        });
        console.log(err);
      });
  };

  return (
    <StyledRoot>
      <StyledBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledGrid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4">ลงชื่อเข้าใช้งาน</Typography>
              <Divider style={{ marginBottom: "10px" }} />
              <Typography variant="caption" color="text.secondary">
                <i>ลงชื่อเข้าใช้งานด้วยบัญชีมูลนิธิของคุณ</i>
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
