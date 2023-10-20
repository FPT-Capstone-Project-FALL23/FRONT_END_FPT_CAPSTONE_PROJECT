import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  Checkbox,
  IconButton,
  InputAdornment,
  Button,
  FormControlLabel,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FORGOT_PASSWORD,
  LOGIN,
  ROLE,
} from "../../../Assets/Constant/Common/constCommon";
import { useNavigate, Link } from "react-router-dom";
import ApiCommon from "../../../API/Common/ApiCommon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormSubmit from "./FormSubmit";
import jwtDecode from "jwt-decode";
import { setLocalStorageToken } from "../../../Store/authStore";
import {
  setLocalStorageUserData,
  setLocalStorageUserInfo,
} from "../../../Store/userStore";
import { toastOptions } from "../../../Assets/Constant/Common/dataCommon";

function FormLogin({
  handleClickShowPassword,
  handleMouseDownPassword,
  showPassword,
}) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  let navigate = useNavigate();

  //Điều hướng login
  const navigateAfterLogin = (roleUser) => {
    if (roleUser == ROLE[0]) {
      navigate("/");
    } else {
      navigate("/Homepage");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiCommon.login({
        email: email,
        password: password,
      });
      console.log("response", response);
      const token = response.token;
      const roleUser = response.data.dataUser.role;
      const dataUser = response.data.dataUser;
      const dataInfo = response.data.dataInfo;
      console.log("token", dataUser);
      setLocalStorageToken(token);
      setLocalStorageUserData(dataUser);
      setLocalStorageUserInfo(dataInfo);
      navigateAfterLogin(roleUser);

      // if (jwtDecode(JSON.stringify(response.token)).role === "client") {
      //   // console.log("client");
      //   navigate("/");
      // } else if (
      //   jwtDecode(JSON.stringify(response.token)).role === "organizer"
      // ) {
      //   navigate("/homepageOrganizer");
      //   // console.log("homeOrganizer")
      // } else {
      //   navigate("/homepageAdmin");
      //   // console.log("Admin")
      // }
      // if (response.status === true) {
      //   console.log("success!")
      // } else {
      //   console.log("error!")
      // }
    } catch (error) {
      console.log("error: ", error.response.data);
      const err = error.response.data.message;
      toast.error(err, toastOptions);
    }
  };

  return (
    <>
      <FormSubmit onSubmit={handleLogin}>
        <TextField
          style={{ marginBottom: "20px" }}
          className="email"
          label="Email"
          placeholder="Email"
          fullWidth
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControl
          variant="outlined"
          fullWidth
          style={{ marginBottom: "20px" }}>
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
                  onMouseDown={handleMouseDownPassword}
                  edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}>
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <Link
            to={"/forgot-password"}
            style={{
              padding: "10px",
              color: "#F5BD19",
              textDecoration: "none",
            }}>
            {FORGOT_PASSWORD}
          </Link>
        </div>

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
            {LOGIN}
          </Button>
        </Grid>

        <ToastContainer />

        <Grid className="btnLogin">
          <Link
            style={{
              backgroundColor: "#F5BD19",
              color: "black",
              textDecoration: "none",
            }}
            to="/choose-access"
            fullWidth>
            <Button
              style={{
                padding: "10px",

                color: "black",
                fontWeight: "bold",
                fontSize: "18px",
              }}
              fullWidth>
              Sign Up
            </Button>
          </Link>
        </Grid>
      </FormSubmit>
    </>
  );
}

export default FormLogin;
