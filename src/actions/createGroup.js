import { SAVE_GROUP, GROUP_BAD_REQUEST, CLEAR_GROUP_ERROR } from "../constants";
import { groupPost } from "../services/groupPost";


export const createGroup = (group) => dispatch =>{
    return groupPost(group)
    .then(res => {
        dispatch({
            type: SAVE_GROUP,
            payload: res.data
        });
    })
    .catch(err => {
        if(err.response){
            dispatch({
                type: GROUP_BAD_REQUEST,
                payload: err.response
            });
        }
    })
}

export const clearError = () => dispatch => {
    dispatch({
        type: CLEAR_GROUP_ERROR
    })
}
