import {
  URL_CREATEREFUND,
  URL_GETALLEVENTS,
  URL_GETDETAILEVENT,
  URL_ORDER_BY_CLIENT,
  URL_ORDER_DETAIL,
  URL_PAYTICKET_OF_EVENT,
  URL_CREATETICKET,
} from "../ConstAPI";
import axiosDefault from "../Defaults/AxiosDefault";

const ApiClient = {
  orderByClient(data) {
    return axiosDefault.post(URL_ORDER_BY_CLIENT, data);
  },

  getOrderDetail(data) {
    return axiosDefault.post(URL_ORDER_DETAIL, data);
  },

  paymentTicket(data) {
    return axiosDefault.post(URL_PAYTICKET_OF_EVENT, data);
  },

  getAllEvents(data) {
    return axiosDefault.post(URL_GETALLEVENTS, data);
  },

  geDetailEvent(data) {
    return axiosDefault.post(URL_GETDETAILEVENT, data);
  },
  getCreateTicket(data){
    return axiosDefault.post(URL_CREATETICKET, data);
  },
  createRefund(data) {
    return axiosDefault.post(URL_CREATEREFUND, data);
  },
};

export default ApiClient;
