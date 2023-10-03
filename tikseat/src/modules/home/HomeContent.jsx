import { Box } from "@mui/material";
import Footer from "../../Components/footer/Footer";
import React from "react";
import Header from "./components/Header";
import UpcomingEvents from "./components/UpcomingEvents";

const HomeContent = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header></Header>
      <UpcomingEvents></UpcomingEvents>
      <Footer></Footer>
    </Box>
  );
};

export default HomeContent;
