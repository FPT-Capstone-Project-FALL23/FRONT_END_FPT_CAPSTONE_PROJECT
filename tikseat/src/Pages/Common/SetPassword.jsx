import InputCustom from "../../Components/Common/Input/InputCustom";
import { Grid, Button } from "@mui/material";
import { useState } from "react";
// import { toast } from "react-toastify";
import { SET_PASSWORD, TITLE_PAGE } from "../../Assets/Constant/Common/constSetPassword";
import ApiCommon from "../../API/Common/ApiCommon";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import {
  PageNameStyle,
  TitlePageStyle,
} from "../../Assets/CSS/Style/style.const";
import { json, useLocation, useNavigate } from "react-router-dom";


const SetPassword = () => {
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const {state} = location;
  console.log("Email: ", state.email)

  const roleToken = localStorage.getItem("role");
      console.log(roleToken);



  const handleSetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiCommon.registerUser({
        email: state.email,
        password: newPassword,
        role: roleToken
      });
      console.log("data: ", response.token)
      localStorage.setItem("userSignUp", JSON.stringify(response.token));
      if (response.status === true) {
        if (roleToken === "client") {
          navigate("/profileClient");
        } else {
          navigate("/profileOrganizers");
        }
      } else {
        console.log("error!")
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <>
      <PageNameStyle variant="h4" component={"h5"}>
        {SET_PASSWORD}
      </PageNameStyle>
      <TitlePageStyle>{TITLE_PAGE}</TitlePageStyle>

      <FormSubmit onSubmit={handleSetPassword}>
        <InputCustom
          type="password"
          setValue={setNewPassword}
          label="New Password"
        />
        <InputCustom
          type="password"
          setValue={setConfirmPassword}
          label=" Re-enter Password"
        />
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
            Confirm
          </Button>
          
        </Grid>
      </FormSubmit>
    </>
  );
};

export default SetPassword;
