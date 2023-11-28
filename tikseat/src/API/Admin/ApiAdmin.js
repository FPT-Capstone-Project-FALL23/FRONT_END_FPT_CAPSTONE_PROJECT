import { URL_GET_ALL_CLIENTS, URL_GET_ALL_EVENT_ISACTIVE_FALSE, URL_GET_ALL_ODRERS, URL_GET_ALL_ORGANIZAER, URL_GET_ALL_ORGANIZAER_ISACTIVE_FALSE, URL_GET_DETAIL_CLIENT, URL_GET_DETAIL_EVENT, URL_GET_DETAIL_ORGANIZAER, URL_GET_IS_REFUND, URL_GET_TOTAL_AMOUNT_AND_ADMIN_EARNING, URL_REFUND_MONEY, URL_SET_IS_ACTIVE_EVENT, URL_SET_IS_ACTIVE_ORGANIZAER } from "../ConstAPI";
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
    },
    getAllOrganizersIsActiveFalse() {
        return axiosDefault.get(URL_GET_ALL_ORGANIZAER_ISACTIVE_FALSE)
    },
    getAllEventIsActiveFalse() {
        return axiosDefault.get(URL_GET_ALL_EVENT_ISACTIVE_FALSE)
    },
    setAcceptOrganizer(data) {
        return axiosDefault.post(URL_SET_IS_ACTIVE_ORGANIZAER, data)
    },
    getDetailEvent(data) {
        return axiosDefault.post(URL_GET_DETAIL_EVENT, data)
    },
    setAcceptEvent(data) {
        return axiosDefault.post(URL_SET_IS_ACTIVE_EVENT, data)
    },
    setAcceptIsHot(data) {
        return axiosDefault.post(URL_SET_IS_ACTIVE_ORGANIZAER, data)
    },
    getAllOrders() {
        return axiosDefault.get(URL_GET_ALL_ODRERS)
    },
    getAllIsRefund() {
        return axiosDefault.get(URL_GET_IS_REFUND)
    },
    refundMoney(data) {
        return axiosDefault.post(URL_REFUND_MONEY, data)
    },
    getTotalAmountSoldAllEventAndAdminEarnings(data) {
        return axiosDefault.post(URL_GET_TOTAL_AMOUNT_AND_ADMIN_EARNING, data)
    },
}

export default ApiAdmin;
