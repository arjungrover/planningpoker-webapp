import axios from "axios";
import { SIGNUP_URL } from "../constants";

const url = SIGNUP_URL;
export const getAllUserDetailService = () => {
    return axios.get(
        url
    )
};
