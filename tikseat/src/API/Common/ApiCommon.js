import {
    URL_ADDPAYMENT,
    URL_CREATEOTGANIZER,
    URL_CREATEUSER,
    URL_FORGOTPASSWORD,
    URL_SENOTP,
    URL_SETPASSWORD,
    URL_SIGNUP,
    URL_VERIFYCODE,
    URL_VERIFYEMAIL,
    URL_VERIFYOTP,
} from "../ConstAPI";
import axiosDefault from "../Defaults/AxiosDefault";


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
};

export default ApiCommon;
