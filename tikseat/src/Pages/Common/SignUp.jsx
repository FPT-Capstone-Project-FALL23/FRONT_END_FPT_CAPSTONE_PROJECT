import { Grid, Typography, Button } from "@mui/material";
import styled from "styled-components";
import React, { useState, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { NAME_LOGO, ROLE } from "../../Assets/Constant/Common/constCommon";
import "../../Assets/CSS/Common/LayoutSign.css";
import { getLocalStorageUserData, getLocalStorageUserInfo } from "../../Store/userStore";
import { toastOptions } from "../../Assets/Constant/Common/dataCommon";

const GridStyleLayout = styled(Grid)`
  height: 100vh;
  // overflow: hidden;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUp = () => {
  const navigate = useNavigate();
  const dataUser = getLocalStorageUserData();
  const dataInfo = getLocalStorageUserInfo()

  const handleClickLogo = () => {
    if(dataInfo){
      if (dataUser?.role === ROLE[0]) {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    }else {
      toast.warning("You need to fill in all information",toastOptions)
    }
  };

  return (
    <>
      <GridStyleLayout container>
        <Grid
          className="loginGrid"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            boxShadow: "rgb(223 193 34 / 51%) 0px 1px 15px 15px",
          }}
        >
          <Grid style={{ width: "30%", position: "absolute" }}>
            <Button onClick={() => handleClickLogo()}>
              <Typography variant="h3" className="logo" component="h4">
                {NAME_LOGO}
              </Typography>
            </Button>
          </Grid>

          <Grid >
            <Outlet />
          </Grid>
        </Grid>
      </GridStyleLayout>
    </>
  );
};

export default SignUp;
