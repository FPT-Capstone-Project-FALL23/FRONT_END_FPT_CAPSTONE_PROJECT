import React, { useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Box, Typography } from "@mui/material";
import InputCustom from "../Components/input/InputCustom";
import { environment } from "../environment/environment";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonCustom from "../Components/button/ButtonCustom";

const VerifyEmail = () => {
  const [code, setCode] = useState(null);
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(environment.apiUrl, { code });
      console.log("data: ", response);
      if (response.statusCode === 200) {
        toast.success("Register Success");
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
        Verify code
      </Typography>
      <p style={{ color: "#112211", marginTop: "20px" }}>
        Don’t worry, happens to all of us. Enter your email below to recover
        your password
      </p>
      <Box
        onSubmit={handleVerifyEmail}
        component={"form"}
        autoComplete="off"
        style={{ marginTop: "40px" }}
      >
        <InputCustom type="password" setValue={setCode} label="Code" />

        <ButtonCustom content="Submit" color="#F5BD19" />
      </Box>
    </>
  );
};

export default VerifyEmail;
