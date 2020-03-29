import { GET_ALL_USER_DETAILS, GET_ALL_USER_ERROR } from "../constants";
import { getAllUserDetailService } from "../services/getAllUserDetailService";

export const getAllUserDetails = () => dispatch => {
    return getAllUserDetailService()
    .then(res => {
     dispatch({
        type : GET_ALL_USER_DETAILS,
        payload : res.data
     })
    })
    .catch(err => {
        if(err.response){
            dispatch({
                type : GET_ALL_USER_ERROR,
                payload : err.response
            })
        }
    })   
}