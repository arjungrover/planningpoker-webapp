import { CREATE_ISSUE_URL } from "../constants";
import axios from "axios";
import { getToken } from "./getToken";

const url = CREATE_ISSUE_URL
export  const createIssuesPost = (issues) => {
    const token = getToken()
    const tokenConfig = {
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Token ${token}`
        }
    }
     return axios.post(
         url,
         issues,
         tokenConfig
     )
}