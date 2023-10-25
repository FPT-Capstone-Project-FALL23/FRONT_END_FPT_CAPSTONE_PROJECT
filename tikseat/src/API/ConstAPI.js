export const BASE_URL = "http://localhost:8080/api";
export const URL_API_CITY = "https://provinces.open-api.vn/api/";

//-------------------AUTH----------------------------
export const URL_LOGIN = "/auth/login";
export const URL_REGISTERUSER = "auth/resigterUser";
export const URL_PROFILEOTGANIZER = "/auth/createOrganizer";
export const URL_PROFILECLIENT = "/auth/createClient";
export const URL_UPDATE_PROFILE = "/auth/updateClient";
export const URL_CHANGEPASSWORD = "/auth/changePassword";

//-------------------SENDMAIL----------------------------
export const URL_SENOTP = "/sendMail/sendOTPResign";
export const URL_VERIFYOTP = "/sendMail/verifleOTPResign";
export const URL_VERIFYCODE = "/sendMail/verifleOTPResign";
export const URL_VERIFYEMAIL = "/sendMail/sendOTPResign";
export const URL_RESENDOTP = "/sendMail/resendOTPForMail";

//-------------------EVENT----------------------------
export const URL_GETEVENTBYTYPE = "/event/getEventByType";
export const URL_GETALLEVENTS = "/event/getAllEvent";
export const URL_GETEVENTBYID = "/event/getEventById";
export const URL_SEARCHEVENT = "/event/searchEvent";
export const URL_CREATEEVENT = "/event/createEvent";
export const URL_UPDATEEVENT = "/event/updateEvent";

//-------------------CITY----------------------------
export const URL_CITY = "?depth=1";
export const URL_DISTRICT = "?depth=2";

export const URL_SIGNUP = "/resigterUser";
export const URL_ADDPAYMENT = "";
export const URL_FORGOTPASSWORD = "";
export const URL_SETPASSWORD = "";
