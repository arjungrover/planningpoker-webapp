import { LOGIN_URL } from "../constants";
import axios from 'axios';

var url = LOGIN_URL;

export const loginPost = (user) => {
    return axios.post(
        url,
        user,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}
