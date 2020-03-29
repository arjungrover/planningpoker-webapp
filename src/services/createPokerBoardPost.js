import { CREATE_POKERBOARD_URL } from "../constants";
import axios from 'axios';
import { getToken } from "./getToken";

var url = CREATE_POKERBOARD_URL;


export const createPokerBoardPost = (user) => {
    const token = getToken()
    const tokenConfig = {
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Token ${token}`
        }
    }
    return axios.post(
        url,
        user,
        tokenConfig
    )
}

