import axiosDefault from "../Defaults/AxiosDefault";
import {
  URL_GETEVENTBYTYPE,
  URL_GETALLEVENTS,
  URL_GETEVENTBYID,
  URL_SEARCHEVENT,
  URL_CREATEEVENT,
  URL_UPDATEEVENT,
  URL_EVENTHISTORY,
} from "../ConstAPI";

const ApiEvent = {
  getEventByType() {
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

  eventHistory(data){
    return axiosDefault.post(URL_EVENTHISTORY, data);
  }
};

export default ApiEvent;
