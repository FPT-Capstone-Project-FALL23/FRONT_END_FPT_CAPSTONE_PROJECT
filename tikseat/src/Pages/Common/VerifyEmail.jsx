import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { toastOptions } from "../../Assets/Constant/Common/dataCommon";
import ApiCommon from "../../API/Common/ApiCommon";
import InputCustom from "../../Components/Common/Input/InputCustom";
import {
  BACK_TO_LOGIN,
  TITLE_PAGE_VERIFY_EMAIL,
  VERIFY_EMAIL,
} from "../../Assets/Constant/Common/constCommon";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import {
  BackToPageStyle,
  PageNameStyle,
  TitlePageStyle,
} from "../../Assets/CSS/Style/style.const";
import { setLocalStorageRole } from "../../Store/authStore";

const VerifyEmail = () => {
  const location = useLocation();
  const { state } = location;
  console.log("State:", state.clientType);
  setLocalStorageRole(state.clientType);

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
        navigate("/verify-code", { state: { email } });
      } else {
        console.log("error!");
      }
    } catch (error) {
      console.log("error: ", error);
      const err = error.response.data.message;
      toast.error(err, toastOptions);
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
        <Grid style={{ marginBottom: "30px" }}>
          <InputCustom
            type="email"
            value={email}
            setValue={(value) => setEmail(value)}
            label="Email"
          />
        </Grid>
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
        <ToastContainer />
      </FormSubmit>
    </>
  );
};

export default VerifyEmail;
