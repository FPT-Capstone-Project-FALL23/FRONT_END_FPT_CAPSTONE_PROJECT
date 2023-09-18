import { Box, Checkbox, FormControlLabel, Stack } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputCustom from "Components/input/InputCustom";
import { toast } from "react-toastify";
import ButtonCustom from "Components/button/ButtonCustom";
import ApiCommon from "API/ApiCommon";
import { anotherChoice } from "Assets/Constant/anotherChoie";
import {
  ACCOUNT_QUESTION_EXSIST,
  PAGE_NAME,
  SIGN_UP_WITH,
  TITLE_PAGE,
  lOGIN,
} from "Assets/Constant/constSignup";
import FormSubmit from "Components/formCustom/FormSubmit";
import {
  AnotherChoiceStyle,
  PageNameStyle,
  SignUpLineOrtherStyle,
  TitlePageStyle,
} from "style/style.const";

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
      const newData = {
        email,
        password,
        role: "client",
      };

      const response = await ApiCommon.signUp(newData);
      console.log("data: ", response);
      if (response.status === 200) {
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
      <PageNameStyle variant="h4" component={"h5"}>
        {PAGE_NAME}
      </PageNameStyle>
      <TitlePageStyle>{TITLE_PAGE}</TitlePageStyle>
      <Box component={"div"}>
        <FormSubmit onSubmit={handleSignUp} style={{ marginTop: "30px" }}>
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
        </FormSubmit>
        <Stack
          justifyContent="center"
          spacing={1}
          alignItems={"center"}
          direction={"row"}
          style={{ fontSize: "14px" }}
        >
          <span>{ACCOUNT_QUESTION_EXSIST}</span>
          <Link to={"/login"} style={{ color: "#FF8682", fontWeight: "500" }}>
            {lOGIN}
          </Link>
        </Stack>
        <Stack direction={"column"} style={{ marginTop: "40px" }}>
          <SignUpLineOrtherStyle>
            <span>{SIGN_UP_WITH}</span>
          </SignUpLineOrtherStyle>
          <Stack
            direction="row"
            justifyContent="space-between"
            style={{ marginTop: "50px" }}
            spacing={2}
          >
            {anotherChoice?.length > 0 &&
              anotherChoice.map((item, index) => {
                return (
                  <AnotherChoiceStyle key={index}>
                    {item.logo}
                  </AnotherChoiceStyle>
                );
              })}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default SignUp;
