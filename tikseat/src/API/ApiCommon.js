import { URL_SIGNUP } from "./ConstAPI"
import axiosDefault from "./Defaults/AxiosDefault"


const ApiCommon = {
    signUp(data) {
        return axiosDefault.post(URL_SIGNUP, { name: data.name })
    }
}

export default ApiCommon