import { BAD_REQUEST, COOKIE_MAX_AGE, CLEAR_LOGIN_ERROR, AUTHENTICATE } from "../constants";
import { loginPost } from "../services/loginPost";
import Cookies from "universal-cookie";


export const login = (user) => dispatch =>{
    return loginPost(user)
    .then(res => {
        let cookie = new Cookies();
        cookie.set('token', res.data.token, {
            path: "/",
            maxAge: COOKIE_MAX_AGE
        })
        dispatch({
            type: AUTHENTICATE,
            payload: res.data
        });
    })
    .catch(err => {
        if(err.response){
            if(err.response.data.email){
                dispatch({
                    type: BAD_REQUEST,
                    payload: err.response.data.email
                });
            }
            if(err.response.data.non_field_errors){
                dispatch({
                    type: BAD_REQUEST,
                    payload: err.response.data.non_field_errors
                });
            }
        }
    })
}

export const clearError = () => dispatch => {
    dispatch({
        type: CLEAR_LOGIN_ERROR
    })
}