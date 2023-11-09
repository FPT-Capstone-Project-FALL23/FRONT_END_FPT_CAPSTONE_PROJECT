import {
  URL_GETALLEVENTS,
  URL_GETDETAILEVENT,
  URL_PAYTICKET_OF_EVENT,
} from "../ConstAPI";
import axiosDefault from "../Defaults/AxiosDefault";

const ApiClient = {
  paymentTicket(data) {
    return axiosDefault.post(URL_PAYTICKET_OF_EVENT, data);
  },

  getAllEvents(data) {
    return axiosDefault.post(URL_GETALLEVENTS, data);
  },

  geDetailEvent(data) {
    return axiosDefault.post(URL_GETDETAILEVENT, data);
  },
};

export default ApiClient;
