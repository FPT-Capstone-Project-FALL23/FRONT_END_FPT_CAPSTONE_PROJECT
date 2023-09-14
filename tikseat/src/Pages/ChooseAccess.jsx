import React from "react";
import { Link } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Box, Stack, Typography } from "@mui/material";
import medico from "../Assets/images/medico.png";
const ChooseAccess = () => {
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
          component={"div"}
          style={{
            boxShadow: "2px 4px 12px 8px #8FBFFC",
            padding: "20px",
            borderRadius: "50px",
            textAlign: "center",
          }}
        >
          <div>
            <img src={medico} alt="" />
          </div>
          <span>User</span>
        </Box>
        <Box
          component={"div"}
          style={{
            boxShadow: "2px 4px 12px 8px #8FBFFC",
            padding: "20px",
            borderRadius: "50px",
            textAlign: "center",
          }}
        >
          <div>
            <img src={medico} alt="" />
          </div>
          <span>Organizers</span>
        </Box>
      </Stack>
    </>
  );
};

export default ChooseAccess;
