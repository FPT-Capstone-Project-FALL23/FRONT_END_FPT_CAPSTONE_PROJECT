import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "../Footer/Footer";
const LayoutClient = () => {
  return (
    <div style={{ position: "relative" }}>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutClient;
