import InputCustom from "../../Components/Common/Input/InputCustom";
import { Grid, Button } from "@mui/material";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiCommon from "../../API/Common/ApiCommon";
import FormSubmit from "../../Components/Common/FormCustom/FormSubmit";
import {
  PageNameStyle,
  TitlePageStyle,
} from "../../Assets/CSS/Style/style.const";
import { json, useLocation, useNavigate } from "react-router-dom";
import {
  ROLE,
  SET_PASSWORD,
  TITLE_PAGE_SETPASSWORD,
} from "../../Assets/Constant/Common/constCommon";
import {
  getLocalStorageRole,
  setLocalStorageToken,
} from "../../Store/authStore";
import { setLocalStorageUserData } from "../../Store/userStore";
import { toastOptions } from "../../Assets/Constant/Common/dataCommon";

const SetPassword = () => {
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  console.log("Email: ", state.email);

  const roleToken = getLocalStorageRole();
  console.log(roleToken);

  const navigateAfterConfirmPassword = (roleUser) => {
    if (roleUser == ROLE[0]) {
      navigate("/profileClient");
    } else {
      navigate("/createProfileOrganizers");
    }
  };

  const handleSetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiCommon.registerUser({
        email: state.email,
        password: newPassword,
        role: roleToken,
      });
      console.log("data: ", response);
      const token = response.token;
      const roleUser = response.data.role;
      const userData = response.data;
      setLocalStorageToken(token);
      setLocalStorageUserData(userData);
      navigateAfterConfirmPassword(roleUser);
    } catch (error) {
      console.log("error: ", error);
      const err = error.response.data.message;
      toast.error(err, toastOptions);
    }
  };
  return (
    <>
      <PageNameStyle variant="h4" component={"h5"}>
        {SET_PASSWORD}
      </PageNameStyle>
      <TitlePageStyle>{TITLE_PAGE_SETPASSWORD}</TitlePageStyle>

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
        <ToastContainer />
      </FormSubmit>
    </>
  );
};

export default SetPassword;
