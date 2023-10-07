import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import InputCustom from "../../Components/Common/Input/InputCustom";
import { toast } from "react-toastify";
import { Grid, Button } from "@mui/material";
import {
  BACK_TO_LOGIN,
  TITLE_PAGE_VERIFY_EMAIL,
  VERIFY_EMAIL,
} from "../../Assets/Constant/Common/constVerifyEmail";
import ApiCommon from "../../API/Common/ApiCommon";
import {
  BackToPageStyle,
  PageNameStyle,
  TitlePageStyle,
} from "../../Assets/CSS/../../Assets/CSS/Style/style.const";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";

const VerifyEmail = () => {

  const [email, setEmail] = useState(null);

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    console.log("Login button clicked");
    console.log("Email:", email);
    try {
      const response = await ApiCommon.verifyEmail({
        email: email
      });
      console.log("data: ", response.data);
      if (response.status === true) {
        console.log("thanh cong");
      } else {
        console.log("error!");
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
        {VERIFY_EMAIL}
      </PageNameStyle>
      <TitlePageStyle>
          {TITLE_PAGE_VERIFY_EMAIL}
      </TitlePageStyle>
      <FormSubmit 
        onSubmit={handleVerifyEmail} 
        style={{ marginTop: "40px" }}
      >
        <InputCustom type="email" setValue={setEmail} label="Email" />

        <Grid className="btnLogin">
          <Button
            style={{
              padding: "10px",
              color: "black",
              fontWeight: "bold",
              fontSize: "18px",
            }}
            type="submit"
            fullWidth
          >
            Verify
          </Button>
        </Grid>
      </FormSubmit>
    </>
  );
};

export default VerifyEmail;
