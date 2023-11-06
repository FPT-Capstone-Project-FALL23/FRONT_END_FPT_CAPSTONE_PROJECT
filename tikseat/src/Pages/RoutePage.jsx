import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Common/HomePage";

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
const UpdatePfrofileOrganizer = lazy(() => import("./Organizers/UpdatePfrofileOrganizer"));
const ProfileClient = lazy(() => import("./Client/ProfileClient"));
const BookTickets = lazy(() => import("./Common/BookTickets"));
// Trang tam thoi
const HomePageClient = lazy(() => import("../Pages/Client/HomePageClient"));
const HomePageAdmin = lazy(() => import("../Pages/Admin/HomePageAdmin"));
const HomePageOrganizer = lazy(() => import("../Pages/Organizers/HomePageOrganizer"));
const DefaultDashboard = lazy(() => import("../Pages/Organizers/DefaultDashboard"));
const ChangePassword = lazy(() => import("../Pages/Client/ChangePassword"));

const MyProfile = lazy(() => import("./Client/MyProfile"));
const EventHistory = lazy(() => import("../Pages/Organizers/EventHistory"));
const NewEvent = lazy(() => import("../Pages/Organizers/NewEvent"));
const CreateTicket = lazy(() => import("../Pages/Organizers/CreateTicket"));
const Notification = lazy(() => import("../Pages/Organizers/Notification"));

function RoutePage() {
  return (
    <Suspense fallback={<>loading</>}>
      <Routes>
        <Route path="/homepageOrganizer" element={<HomePageOrganizer />} />
        <Route path="/homepageAdmin" element={<HomePageAdmin />} />
        {/* <Route path="/my-profile" element={<MyProfile />}></Route> */}
        <Route path="/change-password" element={<ChangePassword />}></Route>
        <Route path="/homepageClient" element={<HomePageClient />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/notification" element={<Notification />}></Route>

        <Route element={<HomePageOrganizer />}>
          <Route path="//UpdateProfileOrganizers" element={<UpdatePfrofileOrganizer />} />
          <Route path="/add-payment" element={<AddPaymentMethod />}></Route>
          <Route path="/dashboard" element={<DefaultDashboard />}></Route>
          <Route path="/event-history" element={<EventHistory />}></Route>
          <Route path="/create-event" element={<NewEvent />}></Route>
          <Route path="/create-ticket" element={<CreateTicket />}></Route>
          
        </Route>
        <Route path="/book-tickets/:id" element={<BookTickets />}></Route>
        <Route element={<SignUp />}>
          <Route path="/createProfileOrganizers" element={<ProfileOrganizers />} />
          <Route path="/createProfileClient" element={<ProfileClient />} />
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
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </Suspense>
  );
}

export default RoutePage;
