import { URL_PAYTICKET_OF_EVENT } from "../ConstAPI";
import axiosDefault from "../Defaults/AxiosDefault";

const ApiClient = {
    paymentTicket(data){
        return axiosDefault.post(URL_PAYTICKET_OF_EVENT, data)
    },
}

export default ApiClient;