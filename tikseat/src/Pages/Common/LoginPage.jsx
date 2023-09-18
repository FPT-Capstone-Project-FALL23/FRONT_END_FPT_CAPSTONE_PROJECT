import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import "Assets/CSS/Common/LoginPage.css";
import { NAME_LOGO, TITLE_LOGIN, LOGIN } from "Assets/Constant/ConstLogin";
import FormLogin from "Components/Common/FormLogin";

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
          }}
        >
          <Paper className="left" fullWidth>
            <Grid className="logoGrid">
              <Button>
                <h1 className="logo">{NAME_LOGO}</h1>
              </Button>
            </Grid>
            <Grid fullWidth>
              <p style={{ textAlign: "start" }}>{TITLE_LOGIN}</p>
            </Grid>
            <Grid>
              <h2 style={{ textAlign: "start", fontFamily: "Bree Serif" }}>
                {LOGIN}
              </h2>
            </Grid>
            <FormLogin
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
            />
            {/* <SwiperLogin /> */}
          </Paper>
        </Paper>
      </Grid>
    </>
  );
}

export default LoginPage;
