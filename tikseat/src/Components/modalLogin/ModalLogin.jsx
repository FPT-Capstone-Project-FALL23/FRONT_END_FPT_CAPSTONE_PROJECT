import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Grid,
  Button,
} from "@mui/material";
import { setLocalStorageToken } from "../../Store/authStore";
import { useNavigate, useLocation } from "react-router-dom";

import {
  setLocalStorageUserData,
  setLocalStorageUserInfo,
} from "../../Store/userStore";
import { toastOptions } from "../../Assets/Constant/Common/dataCommon";
import { toast } from "react-toastify";
import ApiCommon from "../../API/Common/ApiCommon";
import InputCustom from "../Common/Input/InputCustom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FormSubmit from "../Common/FormCustom/FormSubmit";
import { LOGIN } from "../../Assets/Constant/Common/constCommon";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  // pt: 2,
  // px: 4,
  // pb: 3,
};
const ModalLogin = ({ showLogin, setShowLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy thông tin đường link hiện tại
  const currentURL = location.pathname;
  console.log("currentURL: ", currentURL);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [responseLogin, setResponseLogin] = useState(null);

  useEffect(() => {
    const updateLocalStorage = async () => {
      if (responseLogin?.status === true) {
        const token = await responseLogin?.token;
        const dataUser = await responseLogin?.data.dataUser;
        const dataInfo = await responseLogin?.data.dataInfo;
        setLocalStorageToken(token);
        setLocalStorageUserData(dataUser);
        setLocalStorageUserInfo(dataInfo);
        navigate(currentURL);
      }
    };
    updateLocalStorage();
  }, [responseLogin]);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiCommon.login({
        email: email,
        password: password,
      });
      console.log("response", response);

      if (response?.status === true) {
        setResponseLogin(response);
        setShowLogin(false);
      }
    } catch (error) {
      console.log("error: ", error.response.data);
      const err = error.response.data.message;
      toast.error(err, toastOptions);
    }
  };
  return (
    <Modal
      open={showLogin}
      onClose={() => setShowLogin(false)}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Box
        sx={{ ...style, width: "70%", padding: "20px", borderRadius: "10px" }}
      >
        <FormSubmit onSubmit={handleLogin}>
          <Grid style={{ marginBottom: "30px" }}>
            <InputCustom
              className="email"
              label="Email"
              placeholder="Email"
              fullWidth
              required
              type="email"
              value={email}
              setValue={setEmail}
            />
          </Grid>
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginBottom: "20px" }}
          >
            <InputLabel htmlFor="outlined-adornment-password" required>
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end" variant="standard">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
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
            {LOGIN}
          </Button>
        </FormSubmit>
      </Box>
    </Modal>
  );
};

export default React.memo(ModalLogin);
