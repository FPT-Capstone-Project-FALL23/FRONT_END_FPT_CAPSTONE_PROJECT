import {
  Box, Paper, Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Avatar,
} from "@mui/material";
import styled from "styled-components";
import React, { useState, useRef } from "react";  
import IconGG from "../Components/Icons/IconGG";
import { Link, Outlet } from "react-router-dom";
import InputCustom from "../Components/input/InputCustom";
import axios from "axios";
import { toast } from "react-toastify";
import { environment } from "../environment/environment";
import ButtonCustom from "../Components/button/ButtonCustom";
import ApiCommon from "../API/ApiCommon";
import { NAME_LOGO } from "../Assets/Constant/ConstLogin";
import "../Assets/CSS/Common/LayoutSign.css"
import ClientAvt from "../Assets/images/Client.png";
import MonochromePhotosIcon from '@mui/icons-material/MonochromePhotos';

import ProfileClient from "./ProfileClient";

const anotherChoice = [
  { logo: <IconGG /> },
];

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
  
  // const [fullName, setFullName] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState();
  // const [gender, setGender] = useState("F");
  // const [birthDay, setBirthDay] = useState("");
  const [avatar, setAvatar] = useState(ClientAvt);

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    // Kích hoạt sự kiện click trên thẻ input
    fileInputRef.current.click();
  };
  
  const handleFileInputChange = (e) => {
    // Xử lý việc chọn tệp ở đây và cập nhật giá trị của 'avatar'
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setAvatar(objectUrl);
    }
  };

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
  //     if (response.statusCode === 200) {
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
      <GridStyleLayout container >
          <Paper 
            className="loginGrid"
            style={{
              boxShadow: "rgb(223 193 34 / 51%) 0px 1px 15px 15px",
            }}
          >
            <Grid className="left"> 
              <Link to={"/#"}>
                <Typography variant="h3" className="logoStyle" component="h4">
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
              <div style={{ color: "#112211", marginTop: "20px" }}>
                Let’s get you all st up so you can access your personal account.
              </div>
              <ProfileClient/>
                {/* <div>
                <Stack direction={"column"} style={{ marginTop: "40px" }}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "1px",
                      background: "gray",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 2,
                        background: "white",
                        padding: "0 10px",
                        color: "#112211",
                        fontSize: "14px",
                      }}
                    >
                      Or Sign up with
                    </span>
                  </div>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    style={{ marginTop: "50px" }}
                    spacing={2}
                  >
                    {anotherChoice.length > 0 &&
                      anotherChoice.map((item, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              padding: "15px 20px",
                              borderRadius: "10px",
                              border: "1px solid #8DD3BB",
                              textAlign: "center",
                              flex: "1",
                            }}
                          >
                            {item.logo}
                          </div>
                        );
                      })}
                  </Stack>
                </Stack> 
              </div> */}
            </Grid>

            <Grid className="right" style={{padding:"80px"}}>
              <Stack style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                  <Avatar style={{height:"350px", width:"350px", marginBottom:"40px"}} alt="Remy Sharp" src={avatar}/>              
                  <MonochromePhotosIcon fontSize="large" onClick={handleIconClick} />
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                  />
                </Stack>
              </Grid>

          </Paper>
        </GridStyleLayout>      
    </>
  );
};

export default SignUp;
