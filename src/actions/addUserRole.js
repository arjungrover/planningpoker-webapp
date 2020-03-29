import {CHANGE_USER_ROLE, USER_ROLE_ERROR } from "../constants";
import { addUserRolePost } from "../services/addUserRolePost";

export const addUserRole = (user) => dispatch => {
     return addUserRolePost(user)
     .then(res => {
         dispatch ({
             type : CHANGE_USER_ROLE,
             payload : res.data
         })
     })
     .catch(err => {
         if(err.response){
            dispatch({
                type : USER_ROLE_ERROR,
                payload : err.response
            })
         }
     })
} 