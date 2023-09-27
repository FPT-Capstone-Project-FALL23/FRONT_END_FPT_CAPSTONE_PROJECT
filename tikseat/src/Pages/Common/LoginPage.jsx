import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import {
  LOGIN,
  NAME_LOGO,
  TITLE_LOGIN,
} from "../../Assets/Constant/ConstLogin";
import FormLogin from "../../Components/Common/FormLogin";
import SwiperLogin from "../../Components/Common/SwiperLogin";
import "../../Assets/CSS/Common/LayoutSign.css";

function LoginPage() {

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid className="login">
        <Paper
          className="loginGrid"
          style={{
            boxShadow: "rgb(223 193 34 / 51%) 0px 1px 15px 15px",
          }}>
          <Grid className="left">
            <Grid className="logoGrid">
              <Button>
                <h1 className="logo">{NAME_LOGO}</h1>
              </Button>
            </Grid>
            <Grid 
              fullWidth
              style={{marginTop:"20px"}} 
            >
              <p style={{ textAlign: "start" }}>{TITLE_LOGIN}</p>
            </Grid>
            <Grid style={{marginTop:"20px"}} >
              <h2 style={{ textAlign: "start", fontFamily: "Bree Serif" }}>
                {LOGIN}
              </h2>
            </Grid>
            <FormLogin
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
            />
          </Grid>
          <Grid className="right">
                <SwiperLogin />
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default LoginPage;
