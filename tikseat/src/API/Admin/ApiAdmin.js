import { URL_GET_ALL_CLIENTS, URL_GET_ALL_ORGANIZAER, URL_GET_DETAIL_CLIENT, URL_GET_DETAIL_ORGANIZAER } from "../ConstAPI";
import axiosDefault from "../Defaults/AxiosDefault";

const ApiAdmin = {
    getAllClients() {
        return axiosDefault.get(URL_GET_ALL_CLIENTS);
    },
    getDetailClient(data) {
        return axiosDefault.post(URL_GET_DETAIL_CLIENT, data)
    },
    getAllOrganizers() {
        return axiosDefault.get(URL_GET_ALL_ORGANIZAER);
    },
    getDetailOrganizer(data) {
        return axiosDefault.post(URL_GET_DETAIL_ORGANIZAER, data)
    }
}

export default ApiAdmin;
