import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import InputCustom from "Components/input/InputCustom";
import { toast } from "react-toastify";
import ButtonCustom from "Components/button/ButtonCustom";
import {
  BACK_TO_LOGIN,
  TITLE_PAGE_VERIFY_EMAIL,
  VERIFY_CODE,
} from "Assets/Constant/constVerifyEmail";
import ApiCommon from "API/ApiCommon";
import {
  BackToPageStyle,
  PageNameStyle,
  TitlePageStyle,
} from "style/style.const";
import FormSubmit from "Components/formCustom/FormSubmit";

const VerifyEmail = () => {
  const [code, setCode] = useState(null);
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiCommon.verifyEmail({
        email: "",
        enteredOTP: code,
      });
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
      <BackToPageStyle to={"/login"}>
        <KeyboardArrowLeftIcon /> <span>{BACK_TO_LOGIN}</span>
      </BackToPageStyle>
      <PageNameStyle variant="h4" component={"h5"}>
        {VERIFY_CODE}
      </PageNameStyle>
      <TitlePageStyle>{TITLE_PAGE_VERIFY_EMAIL}</TitlePageStyle>
      <FormSubmit onSubmit={handleVerifyEmail} style={{ marginTop: "40px" }}>
        <InputCustom type="password" setValue={setCode} label="Code" />

        <ButtonCustom content="Submit" color="#F5BD19" />
      </FormSubmit>
    </>
  );
};

export default VerifyEmail;
