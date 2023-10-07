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
} from "../../../Assets/Constant/Common/constLogin";
import { useNavigate, Link } from "react-router-dom";
import ApiCommon from "../../../API/Common/ApiCommon";
import { toast } from "react-toastify";
import FormSubmit from "./FormSubmit";
import jwtDecode from 'jwt-decode';


function FormLogin({
  handleClickShowPassword,
  handleMouseDownPassword,
  showPassword,
}) {

  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const response  = await ApiCommon.login({
        email: email,
        password: password,
      });
      localStorage.setItem("userLogin", JSON.stringify(response.token))
      if (jwtDecode(JSON.stringify(response.token)).role === "client"){
        // console.log("client");
        navigate("/homepageClient");
      }else if (jwtDecode(JSON.stringify(response.token)).role === "organizer"){
        navigate("/homepageOrganizer")
        // console.log("homeOrganizer")
      } else{
        navigate("/homepageAdmin")
        // console.log("Admin")
      }
      // if (response.status === true) {
      //   console.log("success!")
      // } else {
      //   console.log("error!")
      // }
    }catch(error){
      console.log("error: ",error);
    }
  }

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
            }}
            >
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

        <Grid className="btnLogin">
            <Link
              style={{
                
                backgroundColor:"#F5BD19",
                color: "black",
                textDecoration: "none",
              }}
              to="/choose-access"
              fullWidth
            >
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
