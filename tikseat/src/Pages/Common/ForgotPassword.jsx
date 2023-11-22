import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { toast } from "react-toastify";
import InputCustom from "../../Components/Common/Input/InputCustom";
import {
  BACK_TO_LOGIN,
  FORGOT_PASSWORD,
  TITLE_PAGE_VERIFY_EMAIL,
} from "../../Assets/Constant/Common/constCommon";
import ApiCommon from "../../API/Common/ApiCommon";
import {
  BackToPageStyle,
  PageNameStyle,
  TitlePageStyle,
} from "../../Assets/CSS/Style/style.const";
import { Grid, Button, TextField, IconButton, Stack } from "@mui/material";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [callAPI, setCallAPI] = useState("verifyEmail");
  const [showCode, setShowCode] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [displayCode, setDisplayCode] = useState("none");
  const [displayEmail, setDisplayEmail] = useState("block");
  const [displayPass, setDisplayPass] = useState("none");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (callAPI === "verifyEmail") {
      try {
        const response = await ApiCommon.forgotPassword({ email });
        console.log("data: ", response);
        if (response.status === true) {
          setCallAPI("verifyCode");
          setDisplayCode("block");
        } else {
          console.log("Invalid email or other error!");
        }
      } catch (error) {
        console.log("error: ", error);
      }
    } else if (callAPI === "verifyCode") {
      try {
        const response = await ApiCommon.verifyCode({
          email: email,
          enteredOTP: verifyCode,
        });
        if (response.status === true) {
          setCallAPI("changePass");
          setDisplayCode("none");
          setDisplayEmail("none");
          setDisplayPass("block");
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await ApiCommon.resetPassword({
          email: email,
          newPassword: newPassword,
        });
        if (response.status === true) {
          navigate("/login");
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();
    try {
      await ApiCommon.resendOTP({
        email: email,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      <BackToPageStyle to={"/login"}>
        <KeyboardArrowLeftIcon /> <span>{BACK_TO_LOGIN}</span>
      </BackToPageStyle>
      <PageNameStyle variant="h4" component={"h5"}>
        {FORGOT_PASSWORD}
      </PageNameStyle>
      <TitlePageStyle>{TITLE_PAGE_VERIFY_EMAIL}</TitlePageStyle>
      <FormSubmit onSubmit={handleForgotPassword} style={{ marginTop: "30px" }}>
        <Grid style={{ marginBottom: "40px", display: displayEmail }}>
          <InputCustom
            type="email"
            value={email}
            setValue={setEmail}
            label="Email"
          />
        </Grid>
        <Grid sx={{ display: displayCode }}>
          <TextField
            fullWidth
            type={showCode ? "text" : "password"}
            onChange={(e) => setVerifyCode(e.target.value)}
            value={verifyCode === undefined ? "" : verifyCode}
            label="Enter Code"
          />
          <IconButton
            sx={{
              float: "right",
              marginTop: "-48px",
              marginRight: "2px",
            }}
            aria-label="toggle password visibility"
            onClick={() => setShowCode(!showCode)}
            edge="end"
          >
            {showCode ? <VisibilityOff /> : <Visibility />}
          </IconButton>
          <Stack
            spacing={1}
            alignItems={"center"}
            direction={"row"}
            style={{
              fontSize: "18px",
              margin: "20px",
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            <Link
              component="button"
              onClick={handleResendOTP}
              style={{
                color: "#F5BD19",
                fontWeight: "500",
                textDecoration: "none",
              }}
            >
              RESEND
            </Link>
          </Stack>
        </Grid>
        <Grid sx={{ display: displayPass }}>
          <Grid sx={{ marginBottom: "30px" }}>
            <TextField
              fullWidth
              type={showPass ? "text" : "password"}
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword === undefined ? "" : newPassword}
              label="Enter Code"
            />
            <IconButton
              sx={{
                float: "right",
                marginTop: "-48px",
                marginRight: "2px",
              }}
              aria-label="toggle password visibility"
              onClick={() => setShowPass(!showPass)}
              edge="end"
            >
              {showPass ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Grid>
          <Grid sx={{ marginBottom: "30px" }}>
            <TextField
              fullWidth
              type={showRePass ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword === undefined ? "" : confirmPassword}
              label="Enter Code"
            />
            <IconButton
              sx={{
                float: "right",
                marginTop: "-48px",
                marginRight: "2px",
              }}
              aria-label="toggle password visibility"
              onClick={() => setShowRePass(!showRePass)}
              edge="end"
            >
              {showRePass ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Grid>
        </Grid>
        <Grid className="btnLogin">
          <Button
            style={{
              padding: "10px",
              color: "black",
              fontWeight: "bold",
              fontSize: "18px",
            }}
            type="submit"
            fullWidth
          >
            {callAPI}
          </Button>
        </Grid>
      </FormSubmit>
    </>
  );
};

export default ForgotPassword;
