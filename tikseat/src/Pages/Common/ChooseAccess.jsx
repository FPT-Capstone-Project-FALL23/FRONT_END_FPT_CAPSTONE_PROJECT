import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Box, Stack, Typography, Button } from "@mui/material";
import ClientAvt from "../../Assets/Images/Client.png";
import OrganizersAvt from "../../Assets/Images/Organizers.png";


const ChooseAccess = () => {
  
  const navigate = useNavigate();
  
  const handleClientClick = (clientType) => {
    // Truyền state và chuyển hướng qua useHistory
    navigate("/verify-email", { state: { clientType } });
  };

  return (
    <>
      <Link to={"/login"}
        style={{
          marginTop: "20px",
          fontStyle: "italic",
          display: "flex",
          alignItems: "center",
        }}
      >
        <KeyboardArrowLeftIcon /> <span>Back to login</span>
      </Link>
      <Typography
        variant="h4"
        component={"h5"}
        style={{ marginTop: "20px", fontStyle: "italic" }}
      >
        Choose Access
      </Typography>
      <p style={{ color: "#112211", marginTop: "20px" }}>
        To access tiksea, it is necessary to select the type of access
        permission
      </p>
      <Stack
        justifyContent={"space-evenly"}
        alignItems={"center"}
        direction={"row"}
        style={{ marginTop: "100px" }}
      >
        <Box
          style={{
            width: "150px",
            height: "175px",
            boxShadow:"rgb(245 210 23 / 68%) 0px 1px 15px 15px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <Button 
             onClick={() => handleClientClick("client")}
            style={{
              display:'flex', 
              flexDirection:'column', 
              marginTop:"-6px",
              color:"black"
            }} 
            type='submit' 
            fullWidth
          >
            <img 
              style={{
                height: "150px", 
                width: "150px", 
                borderRadius: "20px 20px 0px 0px"
              }} 
              src={ClientAvt} 
              alt=''
            /> 
            <span>Client</span>
          </Button>
        </Box>
        <Box
          style={{
            width: "150px",
            height: "175px",
            boxShadow:"rgb(245 210 23 / 68%) 0px 1px 15px 15px",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          <Button 
            onClick={() => handleClientClick("organizer")}
            style={{
              display:'flex', 
              flexDirection:'column', 
              marginTop:"-6px",
              color:"black"
            }} 
            type='submit' 
            fullWidth
          >
            <img 
              style={{
                height: "150px", 
                width: "150px", 
                borderRadius: "20px 20px 0px 0px"
              }} 
              src={OrganizersAvt}
              alt=''
            /> 
            <span>Organizers</span>
          </Button>
        </Box>
      </Stack>
    </>
  );
};

export default ChooseAccess;
