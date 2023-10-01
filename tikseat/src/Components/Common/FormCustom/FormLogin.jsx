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
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FORGOT_PASSWORD,
  LOGIN,
} from "../../../Assets/Constant/Common/constLogin";

function FormLogin({
  handleClickShowPassword,
  handleMouseDownPassword,
  showPassword,
}) {
  return (
    <>
      <form>
        <TextField
          style={{ marginBottom: "20px" }}
          className="email"
          label="Email"
          placeholder="Email"
          fullWidth
          required
          type="email"
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
            style={{
              padding: "10px",
              color: "#F5BD19",
              textDecoration: "none",
            }}
            href="#">
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
      </form>
    </>
  );
}

export default FormLogin;
