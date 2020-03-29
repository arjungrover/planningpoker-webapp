import axios from "axios";
import { getToken } from "./getToken";
import { ADD_USER_ROLE_URL } from "../constants";


export const addUserRolePost = (users) => {
    const url = ADD_USER_ROLE_URL;
    const token = getToken();
    const tokenConfig = {
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Token ${token}`
        }
    }
    return axios.patch(
        url,
        users,
        tokenConfig
    )
}