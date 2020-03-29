import { getToken } from "../services/getToken"
import { getAllPokerboardsService } from "../services/getAllPokerboardsService";
import { GET_POKERBOARDS, GET_POKERBOARDS_ERROR, CLEAR_GET_POKERBOARDS_ERROR } from "../constants";


export const getAllPokerboards = () => dispatch => {
    const token = getToken();
    return getAllPokerboardsService(token)
    .then(res => {
        dispatch({
            type: GET_POKERBOARDS,
            payload: res.data
        })
    })
    .catch(err => {
        if(err.response){
            dispatch({
                type: GET_POKERBOARDS_ERROR,
                payload: err.response
            })
        }
    })
}

export const clearError = () => dispatch => {
    dispatch({
        type: CLEAR_GET_POKERBOARDS_ERROR
    })
}
