import React from "react";
import { Box } from "@mui/material";
import Footer from "../../Components/Common/Footer/Footer";
import Header from "../../Components/Common/Header/Header";
import UpcomingEvents from "../../Components/Common/HomePage/UpcomingEvents";

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header></Header>
      <UpcomingEvents></UpcomingEvents>
      <Footer></Footer>
    </Box>
  );
}

export default HomePage;
