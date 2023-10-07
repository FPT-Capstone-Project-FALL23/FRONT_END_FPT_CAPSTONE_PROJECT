import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import InputCustom from "../../Components/Common/Input/InputCustom";
// import { toast } from "react-toastify";
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
import { useLocation, useNavigate } from "react-router-dom";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";

const VerifyEmail = () => {

  const location = useLocation();
  const { state } = location;
  console.log("State:", state.clientType);
  localStorage.setItem("role", state.clientType);

  const [email, setEmail] = useState("");
  console.log("Email:", email);

  let navigate = useNavigate();

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    
    try {
      const response = await ApiCommon.verifyEmail({
        email: email,
      });
      console.log("data: ", response);
      if (response.status === true) {
        navigate("/verify-code", {state: {email}});
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
      <TitlePageStyle>{TITLE_PAGE_VERIFY_EMAIL}</TitlePageStyle>
      <FormSubmit onSubmit={handleVerifyEmail} style={{ marginTop: "40px" }}>
        <InputCustom 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email" />

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
