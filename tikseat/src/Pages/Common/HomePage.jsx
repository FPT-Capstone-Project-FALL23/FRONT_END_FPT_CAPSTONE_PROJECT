import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Footer from "../../Components/Common/Footer/Footer";
import Header from "../../Components/Common/Header/Header";
import UpcomingEvents from "../../Components/Common/HomePage/UpcomingEvents";
import { checkToken } from "../Admin/Adminpage";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    checkToken(navigate);
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header></Header>
      <UpcomingEvents></UpcomingEvents>
      <Footer></Footer>
    </Box>
  );
}

export default HomePage;
