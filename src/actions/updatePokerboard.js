import { UPDATE_POKER, UPDATE_POKER_ERROR } from "../constants";
import { updatePokerPost } from "../services/updatePokerPost";

export const updatePokerboard = (poker) => dispatch => {
         return updatePokerPost(poker)
        .then(res => {
            dispatch({
                type : UPDATE_POKER,
                payload : res.data
            })
        })
        .catch(err => {
            if(err.response){
                dispatch({
                type : UPDATE_POKER_ERROR,
                payload : err.response
                });
            }
        });
}