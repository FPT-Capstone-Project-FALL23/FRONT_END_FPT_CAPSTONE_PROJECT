import { Box, Stack, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputCustom from "../Components/input/InputCustom";
import axios from "axios";
import { toast } from "react-toastify";
import ButtonCustom from "../Components/button/ButtonCustom";

const VerifyCode = () => {
  const [verifyCode, setVerifyCode] = useState(true);
  console.log("verifyCode: ", verifyCode);

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("", { verifyCode });
      if (response.status === 200) {
        toast.success("success");
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
        An authentication code has been sent to your email.
      </p>
      <Box component={"form"} onSubmit={handleVerifyCode}>
        <InputCustom
          type="password"
          setValue={setVerifyCode}
          label="Enter Code"
        />
        <Stack
          spacing={1}
          alignItems={"center"}
          direction={"row"}
          style={{ fontSize: "14px" }}
        >
          <span>Didn’t receive a code? </span>
          <Link to={"/"} style={{ color: "#FF8682", fontWeight: "500" }}>
            Resend
          </Link>
        </Stack>
        <ButtonCustom content="Verify" color="black" backgroundcolor="#F5BD19" />
      </Box>
    </>
  );
};

export default VerifyCode;
