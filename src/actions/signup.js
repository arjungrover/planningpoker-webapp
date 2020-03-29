import { SIGNUP_BAD_REQUEST, SAVE_USER, CLEAR_SIGNUP_ERROR } from "../constants";
import { signupPost } from "../services/signupPost";


export const signup = (user) => dispatch =>{
    return signupPost(user)
    .then(res => {
        dispatch({
            type: SAVE_USER
        });
    })
    .catch(err => {
        if(err.response){
            dispatch({
                type: SIGNUP_BAD_REQUEST,
                payload: err.response.data.email
            });
        }
    })
}

export const clearError = () => dispatch => {
    dispatch({
        type: CLEAR_SIGNUP_ERROR
    })
}
