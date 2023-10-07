import {
  Paper, Grid,
  Typography,
  Button,
} from "@mui/material";
import styled from "styled-components";
import React, { useState, useRef } from "react";  
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { environment } from "../../";
import ButtonCustom from "../../Components/Common/Button/ButtonCustom";
import ApiCommon from "../../API/Common/ApiCommon";
import { NAME_LOGO } from "../../Assets/Constant/Common/constLogin";
import "../../Assets/CSS/Common/LayoutSign.css"
import jwtDecode from "jwt-decode";

const GridStyleLayout = styled(Grid)
`
  height: 100vh;
  // overflow: hidden;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const SignUp = () => {
  


  const navigate = useNavigate();
  const dataUser = jwtDecode(localStorage.getItem("userSignUp"));
  console.log(dataUser);

  const handleClickLogo = () => {
    if (dataUser.role === "client") {
      navigate("/homepageClient")
    } else {
      navigate("/homepageOrganizer")
    }
  }

  return (
    <>
      <GridStyleLayout container  >
          <Grid 
            className="loginGrid"
            style={{
              display:"flex",
              flexDirection:"column",
              padding:"20px",
              boxShadow: "rgb(223 193 34 / 51%) 0px 1px 15px 15px",
            }}
          >
            <Grid style={{width:"100%", display:"flex", justifyContent:"space-between", marginBottom:"20px"}}> 
              <Button
                onClick={() => handleClickLogo()}
              >
                <Typography variant="h3" className="logo" component="h4">
                  {NAME_LOGO}
                </Typography>
              </Button>
                <Typography
                  variant="h4"
                  component={"h6"}
                  style={{ marginTop: "20px", fontStyle: "italic" }}
                >
                  Profile
                </Typography>
              <div style={{ color: "#112211", marginTop: "20px", marginBottom:"20px"}}>
                Let’s get you all st up so you can access your personal account.
              </div>
                
            </Grid>
            <Grid>
              <Outlet/>
            </Grid>
            
          </Grid>
        </GridStyleLayout>      
    </>
  );
};

export default SignUp;
