import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import IconGG from "../Components/Icons/IconGG";
import { environment } from "../environment/environment";
import axios from "axios";
import { toast } from "react-toastify";
import InputCustom from "../Components/input/InputCustom";
import ButtonCustom from "../Components/button/ButtonCustom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(environment.apiUrl, { email });
      console.log("data: ", response);
      if (response.statusCode === 200) {
        toast.success(" Success");
      } else {
        toast.error("error");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <>
      <Link to={"/login"}
        style={{
          marginTop: "20px",
          fontStyle: "italic",
          display: "flex",
          alignItems: "center",
        }}
      >
        <KeyboardArrowLeftIcon /> <span>Back to login</span>
      </Link>
      <Typography
        variant="h4"
        component={"h5"}
        style={{ marginTop: "20px", fontStyle: "italic" }}
      >
        Forgot your password?
      </Typography>
      <Box component={"p"} style={{ color: "#112211", marginTop: "20px" }}>
        Don’t worry, happens to all of us. Enter your email below to recover
        your password
      </Box>
      <Box
        component={"form"}
        onSubmit={handleForgotPassword}
        autoComplete="off"
        style={{ marginTop: "30px" }}
      >
        <InputCustom type="text" setValue={setEmail} label="Email" />

        <ButtonCustom content=" SEND VERIFY CODE" color="#F5BD19" />
      </Box>
      <Box
        component={"div"}
        style={{
          padding: "15px 20px",
          borderRadius: "10px",
          border: "1px solid #F5BD19",
          textAlign: "center",
          flex: "1",
        }}
      >
        <IconGG />
      </Box>
    </>
  );
};

export default ForgotPassword;
