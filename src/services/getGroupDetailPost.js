import { GET_GROUP_DETAIL_URL } from "../constants";
import axios from "axios";
import { getToken } from "./getToken";

let url = GET_GROUP_DETAIL_URL;
export const getGroupDetailPost = () => {
    const token = getToken();
    const tokenConfig = {
       headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Token ${token}`
        }
    }
    return axios.get(
        url,
        tokenConfig
    )
}
