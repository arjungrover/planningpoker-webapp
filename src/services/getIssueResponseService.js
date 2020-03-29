import { getToken } from "./getToken";
import axios from "axios";
import { GET_ESTIMATE_URL } from "../constants";

const url = GET_ESTIMATE_URL;
export const getIssueResponseService = () => {
        const token = getToken();
        const tokenConfig = {
            headers: {
                'Content-Type' : 'appplication/json',
                'Authorization' : `Token ${token}`
            }
        }
        return axios.get(
        url,
        tokenConfig
        )
} 
