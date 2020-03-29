import axios from "axios"
import { GET_POKERBOARDS_URL } from "../constants"

export const getAllPokerboardsService = (token) => {
    const url = GET_POKERBOARDS_URL;
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
