import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Common/HomePage";

const LoginPage = lazy(() => import("./Common/LoginPage"));
const SignUp = lazy(() => import("./Common/SignUp"));
const LayoutSign = lazy(() => import("../Components/Common/Layout/LayoutSign"));
const AddPaymentMethod = lazy(() => import("./Common/AddPaymentMethod"));
const HistoryPayment = lazy(() => import("./Client/HistoryPayment"));
const ChooseAccess = lazy(() => import("./Common/ChooseAccess"));
const VerifyCode = lazy(() => import("./Common/VerifyCode"));
const ForgetPassword = lazy(() => import("./Common/ForgotPassword"));
const SetPassword = lazy(() => import("./Common/SetPassword"));
const VerifyEmail = lazy(() => import("./Common/VerifyEmail"));
const SendEmail = lazy(() => import("./Common/SendEmail"));
const ProfileOrganizers = lazy(() => import("./Organizers/ProfileOrganizers"));
const ProfileClient = lazy(() => import("./Client/ProfileClient"));
const BookTickets = lazy(() => import("./Client/BookTickets"));
// Trang tam thoi
const HomePageClient = lazy(() => import("../Pages/Client/HomePageClient"));
const ChangePassword = lazy(() => import("../Pages/Client/ChangePassword"));
const Sidebar = lazy(() => import("../Pages/Organizers/Sidebar"));

const HomePageAdmin = lazy(() => import("../Pages/Admin/HomePageAdmin"));
const ClientPageAdmin = lazy(() => import("../Pages/Admin/ClientPageAdmin"));
const OrganizerPageAdmin = lazy(() =>
  import("../Pages/Admin/OrganizerPageAdmin")
);

function RoutePage() {
  return (
    <Suspense fallback={<>loading</>}>
      <Routes>
        <Route path="/homePageAdmin" element={<HomePageAdmin />} />
        <Route path="/clientPageAdmin" element={<ClientPageAdmin />} />
        <Route path="/organizerPageAdmin" element={<OrganizerPageAdmin />} />
        {/* <Route path="/my-profile" element={<MyProfile />}></Route> */}
        <Route path="/change-password" element={<ChangePassword />}></Route>
        <Route path="/homepageClient" element={<HomePageClient />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<Sidebar />}></Route>

        <Route path="/book-tickets/:id" element={<BookTickets />}></Route>
        <Route path="my_history_payment" element={<HistoryPayment />}></Route>
        <Route element={<SignUp />}>
          <Route
            path="/createProfileOrganizers"
            element={<ProfileOrganizers />}
          />
          <Route path="/createProfileClient" element={<ProfileClient />} />
        </Route>
        <Route
          element={
            <LayoutSign itemLeft={6} itemRight={6} direction="row-reverse" />
          }>
          <Route path="/choose-access" element={<ChooseAccess />}></Route>
          <Route path="/verify-code" element={<VerifyCode />}></Route>
          <Route path="/forgot-password" element={<ForgetPassword />}></Route>
          <Route path="/set-password" element={<SetPassword />}></Route>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>
          <Route path="/send-email" element={<SendEmail />}></Route>
        </Route>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </Suspense>
  );
}

export default RoutePage;
