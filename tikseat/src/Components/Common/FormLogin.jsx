import React from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { FORGOT_PASSWORD, LOGIN } from "../../Assets/Constant/ConstLogin";

function FormLogin({
  handleClickShowPassword,
  handleMouseDownPassword,
  showPassword,
}) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  let navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(email);
    console.log(password);
    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:8080/api/auth/login", requestOptions)
      .then((response) => {
        return response.json(); // Trả về promise của JSON parsing
      })
      .then((data) => {
        const responseData = data.data.dataUser.role;
        console.log("Data:", responseData);
        if(responseData == "client"){
          navigate("/signup")
        }else if(responseData == "organizer"){
          navigate("/verify-code")
        }
        else{
          navigate("/add-payment")
        }
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <TextField
          style={{ marginBottom: "20px", marginTop: "20px" }}
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
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
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
          }}
        >
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <Link to={"/forgot-password"}
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
            fullWidth
          >
            {LOGIN}
          </Button>
        </Grid>
        
      </form>
    </>
  );
}

export default FormLogin;
