import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("./Common/LoginPage"));
const SignUp = lazy(() => import("./SignUp"));
const LayoutSign = lazy(() => import("../layout/LayoutSign"));
const AddPaymentMethod = lazy(() => import("./AddPaymentMethod"));
const ChooseAccess = lazy(() => import("./ChooseAccess"));
const VerifyCode = lazy(() => import("./VerifyCode"));
const ForgetPassword = lazy(() => import("./ForgotPassword"));
const SetPassword = lazy(() => import("./SetPassword"));
const VerifyEmail = lazy(() => import("./VerifyEmail"));

function RoutePage() {
  return (
    <Suspense fallback={<>loading</>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<LayoutSign />}>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/add-payment" element={<AddPaymentMethod />}></Route>
        </Route>
        <Route
          element={
            <LayoutSign itemLeft={6} itemRight={6} direction="row-reverse" />
          }
        >
          <Route path="/choose-access" element={<ChooseAccess />}></Route>
          <Route path="/verify-code" element={<VerifyCode />}></Route>
        </Route>
        <Route
          element={
            <LayoutSign itemLeft={6} itemRight={6} direction="row-reverse" />
          }
        >
          <Route path="/forgot-password" element={<ForgetPassword />}></Route>
          <Route path="/set-password" element={<SetPassword />}></Route>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default RoutePage;
