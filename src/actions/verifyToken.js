import { VERIFY_TOKEN, SIGNUP_BAD_REQUEST } from "../constants";
import { verifyTokenAPI } from '../services/verifyTokenAPI';

export const verifyToken = (token) => dispatch => {
    return verifyTokenAPI(token)
    .then(res => {
        dispatch({
            type: VERIFY_TOKEN,
            payload: res.data
        });
    })
    .catch(err => {
        if(err.response){
            dispatch({
                type: SIGNUP_BAD_REQUEST,
                payload: err.response.data
            });
        }
    })
}
