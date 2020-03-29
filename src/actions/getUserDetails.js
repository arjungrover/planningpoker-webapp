import { getToken } from "../services/getToken"
import { GET_USER_DETAILS, GET_USER_DETAILS_ERROR, CLEAR_USER_DETAILS_ERROR } from "../constants";
import { getUserService } from "../services/getUserService";


export const getUserDetails = () => dispatch => {
    const token = getToken();
    return getUserService(token)
    .then(res => {
        dispatch({
            type: GET_USER_DETAILS,
            payload: res.data
        })
    })
    .catch(err => {
        if(err.response) {
            dispatch({
                type: GET_USER_DETAILS_ERROR,
                payload: err.response
            })
        }
    })
}

export const clearError = () => dispatch => {
    dispatch({
        type: CLEAR_USER_DETAILS_ERROR
    })
}
