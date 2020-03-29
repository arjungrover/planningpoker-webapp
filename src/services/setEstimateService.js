import { SET_ESTIMATES_URL } from "../constants";
import axios from 'axios';
import { getToken} from "./getToken";

export const setEstimateService = (data, id) => {
    const url = SET_ESTIMATES_URL + id + "/";
    const token = getToken();
    return axios.patch(
        url,
        data,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        }
    )

}
