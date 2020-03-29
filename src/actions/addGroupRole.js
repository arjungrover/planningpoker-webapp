import {CHANGE_GROUP_ROLE, GROUP_ROLE_ERROR } from "../constants";
import { addGroupRolePost } from "../services/addGroupRolePost";

export const addGroupRole = (group) => dispatch => {
     return addGroupRolePost(group)
     .then(res => {
         dispatch ({
             type : CHANGE_GROUP_ROLE,
             payload : res.data
         })
     })
     .catch(err => {
         if(err.response){
            dispatch({
                type : GROUP_ROLE_ERROR,
                payload : err.response
            })
         }
     })
} 