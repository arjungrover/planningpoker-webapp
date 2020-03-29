import axios from "axios";
import { getToken } from "./getToken";
import { ADD_GROUP_ROLE_URL } from "../constants";


export const addGroupRolePost = (groups) => {
    const url = ADD_GROUP_ROLE_URL;
    const token = getToken();
    const tokenConfig = {
        headers : {
          'Content-Type' : 'application/json',
          'Authorization' : `Token ${token}`
        }
    }
    return axios.patch(
        url,
        groups,
        tokenConfig
    )
}