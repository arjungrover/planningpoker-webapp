import { CREATE_GROUP_URL } from "../constants";
import axios from 'axios';
import { getToken } from './getToken';

var url = CREATE_GROUP_URL;

export const groupPost = (user) => {
    const token = getToken();
    return axios.post(
        url,
        user,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }
    )
}