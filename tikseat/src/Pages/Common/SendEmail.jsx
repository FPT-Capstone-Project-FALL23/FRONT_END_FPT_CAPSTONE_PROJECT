import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
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
  PageNameStyle,
  TitlePageStyle,
} from "../../Assets/CSS/Style/style.const";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import { TroubleshootSharp } from "@mui/icons-material";



function SendEmail() {

   const [email, setEmail] = useState("");
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiCommon.forgotPassword({ email });
      console.log("data: ", response);
      if (response.status === TroubleshootSharp) {
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
        <KeyboardArrowLeftIcon/> <span>{BACK_TO_LOGIN}</span>
      </BackToPageStyle>
      <PageNameStyle variant="h4" component={"h5"}>
        Verify Email
      </PageNameStyle>
      <TitlePageStyle>The first step is to confirm your Email</TitlePageStyle>
      <FormSubmit onSubmit={handleForgotPassword} style={{ marginTop: "30px" }}>
        <InputCustom 
          type="email" 
          setValue={setEmail} 
          label="Email" 
        />
        <ButtonCustom content=" SEND VERIFY CODE" color="#F5BD19" />
      </FormSubmit>
    </>
  )
}

export default SendEmail