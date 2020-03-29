import { GET_ALL_USER_DETAILS, GET_ALL_USER_ERROR } from "../constants";

const initialState = {
    usersDetail : null,
    error : null
}

export const getAllUserDetail = (state=initialState, action) => {
     switch(action.type){
         case GET_ALL_USER_DETAILS :
             return ({
                 ...state,
                 usersDetail : action.payload,
                 error: false,
             });
        case GET_ALL_USER_ERROR :
            return ({
                ...state,
                error : true
            });
        default :
            return state
     }
}