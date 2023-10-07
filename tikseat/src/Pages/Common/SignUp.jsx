import {
  Paper, Grid,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import React, { useState, useRef } from "react";  
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { environment } from "../../";
import ButtonCustom from "../../Components/Common/Button/ButtonCustom";
import ApiCommon from "../../API/Common/ApiCommon";
import { NAME_LOGO } from "../../Assets/Constant/Common/constLogin";
import "../../Assets/CSS/Common/LayoutSign.css"

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
  
  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const newData = await {
  //       email,
  //       password,
  //       role: "client",
  //     };

  //     // const response = await axios.post(environment.apiUrl, newData);
  //     const response = await ApiCommon.signUp(newData);
  //     console.log("data: ", response);
  //     if (response.statusCode === true) {
  //       toast.success("Register Success");
  //     } else {
  //       toast.error("error");
  //     }
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // };

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
              <Link to={"/#"} style={{textDecoration:"none"}}>
                <Typography variant="h3" className="logo" component="h4">
                  {NAME_LOGO}
                </Typography>
              </Link>
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
