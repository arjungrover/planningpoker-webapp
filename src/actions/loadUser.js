import { getToken } from "../services/getToken";
import { AUTHENTICATE, AUTHENTICATE_ERROR } from "../constants";
import { getUserService } from "../services/getUserService";

export const loadUser = () => dispatch => {
    const token = getToken();
    return getUserService(token)
    .then(res => {
        dispatch({
            type: AUTHENTICATE,
            payload: res.data
        })
    })
    .catch(err => {
        if(err.response) {
            dispatch({
                type: AUTHENTICATE_ERROR,
                payload: err.response
            })
        }
    })
}   
