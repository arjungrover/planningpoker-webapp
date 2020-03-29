import { SAVE_POKERBOARD, POKERBOARD_BAD_REQUEST, CLEAR_POKERBOARD_ERROR } from "../constants";
import { createPokerBoardPost } from "../services/createPokerBoardPost";


export const createPokerBoard = (pokerboard) => dispatch =>{
    return createPokerBoardPost(pokerboard)
    .then(res => {
        dispatch({
            type: SAVE_POKERBOARD,
            payload: res.data
        });
    })
    .catch(err => {
        if(err.response){
            dispatch({
                type: POKERBOARD_BAD_REQUEST,
                payload: err.response.data.name
            });
        }
    })
}

export const clearError = () => dispatch => {
    dispatch({
        type: CLEAR_POKERBOARD_ERROR
    })
}
