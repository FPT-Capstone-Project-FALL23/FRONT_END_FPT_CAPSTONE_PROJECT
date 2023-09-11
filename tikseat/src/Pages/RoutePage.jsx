import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Common/LoginPage";

function RoutePage() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default RoutePage;
