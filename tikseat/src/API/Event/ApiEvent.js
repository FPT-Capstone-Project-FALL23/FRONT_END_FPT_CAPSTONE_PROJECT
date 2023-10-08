import axiosDefault from "../Defaults/AxiosDefault";

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
};

export default ApiEvent;