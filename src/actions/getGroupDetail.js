import { GET_GROUP_NAMES, GET_GROUP_ERROR } from "../constants";
import { getGroupDetailPost } from "../services/getGroupDetailPost";

export const getGroupDetail = () => dispatch => {
    return getGroupDetailPost()
    .then(res=> {
        dispatch({
            type : GET_GROUP_NAMES,
            payload : res.data  
        })
    })
    .catch(err => {
        if(err.response){
            dispatch({
                type : GET_GROUP_ERROR,
                payload : err.response
            })
        }
    })
}
