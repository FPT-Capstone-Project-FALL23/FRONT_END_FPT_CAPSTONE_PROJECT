import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import IconFB from "../Components/Icons/IconFB";
import IconGG from "../Components/Icons/IconGG";
import IconApple from "../Components/Icons/IconApple";
import { Link } from "react-router-dom";
import InputCustom from "../Components/input/InputCustom";
import axios from "axios";
import { toast } from "react-toastify";
import { environment } from "../environment/environment";
import ButtonCustom from "../Components/button/ButtonCustom";

const anotherChoice = [
  { logo: <IconFB /> },
  { logo: <IconGG /> },
  { logo: <IconApple /> },
];
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  console.log("confirmPassword: ", confirmPassword);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const newData = await {
        email,
        password,
        role: "client",
      };

      const response = await axios.post(environment.apiUrl, newData);
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
      <Typography
        variant="h4"
        component={"h5"}
        style={{ marginTop: "20px", fontStyle: "italic" }}
      >
        Sign Up
      </Typography>
      <div style={{ color: "#112211", marginTop: "20px" }}>
        Let’s get you all st up so you can access your personal account.
      </div>
      <div>
        <Box
          onSubmit={handleSignUp}
          component="form"
          noValidate
          autoComplete="off"
          style={{ marginTop: "30px" }}
        >
          <Stack direction="row" spacing={6}>
            <InputCustom
              type="text"
              setValue={setFirstName}
              label="First Name"
            />
            <InputCustom type="text" setValue={setLastName} label="Last Name" />
          </Stack>
          <Stack direction="row" spacing={6}>
            <InputCustom type="email" setValue={setEmail} label="Email" />
            <InputCustom
              type="text"
              setValue={setPhoneNumber}
              label="Phone Number"
            />
          </Stack>

          <InputCustom
            type="password"
            setValue={setPassword}
            label="Password"
          />
          <InputCustom
            type="password"
            setValue={setConfirmPassword}
            label="Confirm Password"
          />

          <div>
            <FormControlLabel
              style={{ fontSize: "14px" }}
              control={<Checkbox />}
              label={
                <span>
                  I agree to all the{" "}
                  <span style={{ color: "#FF8682" }}>Terms</span> and
                  <span style={{ color: "#FF8682" }}> Privacy Policies</span>
                </span>
              }
            />
          </div>
          <ButtonCustom content="Create account" color="#8DD3BB" />
        </Box>
        <Stack
          justifyContent="center"
          spacing={1}
          alignItems={"center"}
          direction={"row"}
          style={{ fontSize: "14px" }}
        >
          <span>Already have an account? </span>
          <Link to={"/login"} style={{ color: "#FF8682", fontWeight: "500" }}>
            Login
          </Link>
        </Stack>
        <Stack direction={"column"} style={{ marginTop: "40px" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "1px",
              background: "gray",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
                background: "white",
                padding: "0 10px",
                color: "#112211",
                fontSize: "14px",
              }}
            >
              Or Sign up with
            </span>
          </div>
          <Stack
            direction="row"
            justifyContent="space-between"
            style={{ marginTop: "50px" }}
            spacing={2}
          >
            {anotherChoice.length > 0 &&
              anotherChoice.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      padding: "15px 20px",
                      borderRadius: "10px",
                      border: "1px solid #8DD3BB",
                      textAlign: "center",
                      flex: "1",
                    }}
                  >
                    {item.logo}
                  </div>
                );
              })}
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default SignUp;
