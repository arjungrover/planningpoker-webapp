import axios from "axios"
import { GET_USER_DETAILS_URL } from "../constants"

export const getUserService = (token) => {
    const url = GET_USER_DETAILS_URL;
    const tokenConfig = {
        headers :{
            'Content-Type' : 'application/json',
            'Authorization' : `Token ${token}`
        }
    }
    return axios.get(
        url,
        tokenConfig
    )
}
