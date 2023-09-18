import { Stack } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputCustom from "Components/input/InputCustom";
import { toast } from "react-toastify";
import ButtonCustom from "Components/button/ButtonCustom";
import {
  BACK_TO_LOGIN,
  NOT_RECEIVE_CODE,
  RESEND,
  TITLE_PAGE_VERIFY,
  VERIFY_CODE,
} from "Assets/Constant/constVerifyCode";
import ApiCommon from "API/ApiCommon";
import {
  BackToPageStyle,
  PageNameStyle,
  TitlePageStyle,
} from "style/style.const";
import FormSubmit from "Components/formCustom/FormSubmit";

const VerifyCode = () => {
  const [verifyCode, setVerifyCode] = useState(true);
  console.log("verifyCode: ", verifyCode);

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiCommon.verifyCode({
        email: "",
        enteredOTP: verifyCode,
      });
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
      <BackToPageStyle to={"/login"}>
        <KeyboardArrowLeftIcon /> <span>{BACK_TO_LOGIN}</span>
      </BackToPageStyle>
      <PageNameStyle variant="h4" component={"h5"}>
        {VERIFY_CODE}
      </PageNameStyle>
      <TitlePageStyle>{TITLE_PAGE_VERIFY}</TitlePageStyle>
      <FormSubmit onSubmit={handleVerifyCode}>
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
          <span>{NOT_RECEIVE_CODE}</span>
          <Link to={"/"} style={{ color: "#FF8682", fontWeight: "500" }}>
            {RESEND}
          </Link>
        </Stack>
        <ButtonCustom content="Verify" color="#8DD3BB" />
      </FormSubmit>
    </>
  );
};

export default VerifyCode;
