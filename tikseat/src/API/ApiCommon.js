import axios from "axios";
import {
  URL_ADDPAYMENT,
  URL_CREATEEVENT,
  URL_CREATEOTGANIZER,
  URL_CREATEUSER,
  URL_FORGOTPASSWORD,
  URL_GETALLEVENTS,
  URL_GETEVENTBYID,
  URL_GETEVENTBYTYPE,
  URL_SEARCHEVENT,
  URL_SENOTP,
  URL_SETPASSWORD,
  URL_SIGNUP,
  URL_UPDATEEVENT,
  URL_VERIFYCODE,
  URL_VERIFYEMAIL,
  URL_VERIFYOTP,
} from "./ConstAPI";
import axiosDefault from "./Defaults/AxiosDefault";

const ApiCommon = {
  signUp(data) {
    return axiosDefault.post(URL_SIGNUP, { name: data.name });
  },

  createUser(data) {
    return axiosDefault.post(URL_CREATEUSER, data);
  },

  sendOtp(data) {
    return axiosDefault.post(URL_SENOTP, data);
  },

  verifyOtp(data) {
    return axiosDefault.post(URL_VERIFYOTP, data);
  },

  createOrganizer(data) {
    return axiosDefault.post(URL_CREATEOTGANIZER, data);
  },

  addPayment(data) {
    return axiosDefault.post(URL_ADDPAYMENT, data);
  },

  forgotPassword(data) {
    return axiosDefault.post(URL_FORGOTPASSWORD, data);
  },

  setPassword(data) {
    return axiosDefault.post(URL_SETPASSWORD, data);
  },

  verifyCode(data) {
    return axiosDefault.post(URL_VERIFYCODE, data);
  },

  verifyEmail(data) {
    return axiosDefault.post(URL_VERIFYEMAIL, data);
  },

  getEventByTyoe() {
    return axiosDefault.get(URL_GETEVENTBYTYPE);
  },

  getAllEvents(page) {
    return axiosDefault.get(URL_GETALLEVENTS, { page });
  },

  getEventById(id) {
    return axiosDefault.get(URL_GETEVENTBYID, { idOrganizer: id });
  },

  searchEvent() {
    return axiosDefault.get(URL_SEARCHEVENT);
  },

  createEvent(data) {
    return axiosDefault.post(URL_CREATEEVENT, data);
  },

  updateEvent(data) {
    return axiosDefault.post(URL_UPDATEEVENT, data);
  },
};

export default ApiCommon;
