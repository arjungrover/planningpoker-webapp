import { getPokerboardService } from "../services/getPokerboardService"
import { POKERBOARD_ERROR, POKERBOARD_GET } from "../constants"
import { getToken } from "../services/getToken"

export const getPokerboard = (name) => dispatch => {
    const token = getToken();
    dispatch({type: 'Loading'});
    return getPokerboardService(name, token)
        .then(res => {
            dispatch({
                type: POKERBOARD_GET,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: POKERBOARD_ERROR,
                payload: err.response
            })
        })
}
