import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import IconGG from "../../Components/Common/Icons/IconGG";
import { toast } from "react-toastify";
import InputCustom from "../../Components/Common/Input/InputCustom";
import ButtonCustom from "../../Components/Common/Button/ButtonCustom";
import {
  BACK_TO_LOGIN,
  FORGOT_PASSWORD,
  TITLE_PAGE,
} from "../../Assets/Constant/Common/constForgotPassword";
import ApiCommon from "../../API/Common/ApiCommon";
import {
  BackToPageStyle,
  OrtherSignUpMethodStyle,
  PageNameStyle,
  TitlePageStyle,
} from "../../Assets/CSS/Style/style.const";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiCommon.forgotPassword({ email });
      console.log("data: ", response);
      if (response.status === 200) {
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
      <BackToPageStyle to={"/login"}>
        <KeyboardArrowLeftIcon /> <span>{BACK_TO_LOGIN}</span>
      </BackToPageStyle>
      <PageNameStyle variant="h4" component={"h5"}>
        {FORGOT_PASSWORD}
      </PageNameStyle>
      <TitlePageStyle>{TITLE_PAGE}</TitlePageStyle>
      <FormSubmit onSubmit={handleForgotPassword} style={{ marginTop: "30px" }}>
        <InputCustom type="text" setValue={setEmail} label="Email" />

        <ButtonCustom content=" SEND VERIFY CODE" color="#F5BD19" />
      </FormSubmit>
      <OrtherSignUpMethodStyle>
        <IconGG />
      </OrtherSignUpMethodStyle>
    </>
  );
};

export default ForgotPassword;
