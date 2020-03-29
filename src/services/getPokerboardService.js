import axios from "axios";
import { POKERBOARD_URL } from "../constants";

const url = POKERBOARD_URL;
export const getPokerboardService = (name, token) => {

    const tokenconfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        params : {
            name : name
        }
      };

    return axios.get(
        url,
        tokenconfig
    )
}
