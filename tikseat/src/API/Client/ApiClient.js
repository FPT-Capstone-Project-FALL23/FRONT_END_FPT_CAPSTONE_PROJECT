import {
  URL_CREATEREFUND,
  URL_GETALLEVENTS,
  URL_GETDETAILEVENT,
  URL_ORDER_BY_CLIENT,
  URL_ORDER_DETAIL,
  URL_PAYTICKET_OF_EVENT,
  URL_CREATETICKET,
  URL_RATING,
  URL_GET_MY_TICKET,
} from "../ConstAPI";
import axiosDefault from "../Defaults/AxiosDefault";

const ApiClient = {
  orderByClient(data) {
    return axiosDefault.post(URL_ORDER_BY_CLIENT, data);
  },

  getMyTicket(data) {
    return axiosDefault.post(URL_GET_MY_TICKET, data);
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
  getCreateTicket(data) {
    return axiosDefault.post(URL_CREATETICKET, data);
  },
  createRefund(data) {
    return axiosDefault.post(URL_CREATEREFUND, data);
  },
  rating(data) {
    return axiosDefault.post(URL_RATING, data);
  },
};

export default ApiClient;
