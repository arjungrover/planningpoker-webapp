import axios from "axios";
import { getToken } from "../services/getToken";
import { UPDATE_POKER_URL } from "../constants";

export const updatePokerPost = (poker) => {
    const token = getToken();
    const url =UPDATE_POKER_URL;
    const tokenConfig = {
        headers: {
            'Content-Type' : "application/json",
            'Authorization' : `Token ${token}`
        }
    }
    return axios.post(
        url,
        tokenConfig
    )
}


