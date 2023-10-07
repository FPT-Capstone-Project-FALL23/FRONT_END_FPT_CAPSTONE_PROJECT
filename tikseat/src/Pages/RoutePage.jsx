import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("./Common/LoginPage"));
const SignUp = lazy(() => import("./Common/SignUp"));
const LayoutSign = lazy(() => import("../Components/Common/Layout/LayoutSign"));
const AddPaymentMethod = lazy(() => import("./Common/AddPaymentMethod"));
const ChooseAccess = lazy(() => import("./Common/ChooseAccess"));
const VerifyCode = lazy(() => import("./Common/VerifyCode"));
const ForgetPassword = lazy(() => import("./Common/ForgotPassword"));
const SetPassword = lazy(() => import("./Common/SetPassword"));
const VerifyEmail = lazy(() => import("./Common/VerifyEmail"));
const SendEmail = lazy(() => import("./Common/SendEmail"));
const ProfileOrganizers = lazy(() => import("./Organizers/ProfileOrganizers"));
const ProfileClient = lazy(() => import("./Client/ProfileClient") );

function RoutePage() {
  return (
    
    <Suspense fallback={<>loading</>}>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route element={<SignUp/>}>
          <Route path="/profileOrganizers" element={<ProfileOrganizers/>}/>
          <Route path="/ProfileClient" element={<ProfileClient/>}/>
        </Route>
        
        <Route element={<LayoutSign/>}>
          <Route path="/add-payment" element={<AddPaymentMethod />}></Route>
        </Route>
        
        <Route
          element={
            <LayoutSign itemLeft={6} itemRight={6} direction="row-reverse" />
          }
        >
          <Route path="/choose-access" element={<ChooseAccess />}></Route>
          <Route path="/verify-code" element={<VerifyCode />}></Route>
          <Route path="/forgot-password" element={<ForgetPassword />}></Route>
          <Route path="/set-password" element={<SetPassword />}></Route>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>
          <Route path="/send-email" element={<SendEmail />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default RoutePage;
