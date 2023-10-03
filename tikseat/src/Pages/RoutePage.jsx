import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Common/LoginPage";
import HomePage from "./Common/HomePage";

function RoutePage() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />}></Route>
    </Routes>
  );
}

export default RoutePage;
