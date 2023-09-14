import { Box, Typography } from "@mui/material";
import InputCustom from "../Components/input/InputCustom";
import { useState } from "react";
import axios from "axios";
import { environment } from "../environment/environment";
import { toast } from "react-toastify";
import ButtonCustom from "../Components/button/ButtonCustom";

const SetPassword = () => {
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const handleSetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(environment.apiUrl, {
        newPassword,
        confirmPassword,
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
      <Typography
        variant="h4"
        component={"h5"}
        style={{ marginTop: "20px", fontStyle: "italic" }}
      >
        Set a password
      </Typography>
      <p style={{ color: "#112211", marginTop: "20px" }}>
        Your previous password has been reseted. Please set a new password for
        your account.
      </p>
      <Box
        component={"form"}
        onSubmit={handleSetPassword}
        style={{ marginTop: "50px" }}
      >
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

        <ButtonCustom content="Set Password" color="#F5BD19" />
      </Box>
    </>
  );
};

export default SetPassword;
