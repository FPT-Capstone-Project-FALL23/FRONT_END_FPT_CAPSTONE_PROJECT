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
import { Grid, Button } from "@mui/material";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiCommon.forgotPassword({ email });
      console.log("data: ", response);
      if (response.status === true) {
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
      <TitlePageStyle>{TITLE_PAGE_VERIFY_EMAIL}</TitlePageStyle>
      <FormSubmit onSubmit={handleForgotPassword} style={{ marginTop: "30px" }}>
        <InputCustom type="text" setValue={setEmail} label="Email" />
        <Grid className="btnLogin">
          <Button
            style={{
              padding: "10px",
              color: "black",
              fontWeight: "bold",
              fontSize: "18px",
            }}
            type="submit"
            fullWidth>
            Verify
          </Button>
        </Grid>
      </FormSubmit>
    </>
  );
};

export default ForgotPassword;
