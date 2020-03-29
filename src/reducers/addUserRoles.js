import { CHANGE_USER_ROLE, USER_ROLE_ERROR} from "../constants";

const initialState = {
     error : null
}

export const addUserRoles = (state=initialState, action) => {
        switch(action.type){
            case CHANGE_USER_ROLE:
                return{
                  ...state,
                  error : false
            }
            case USER_ROLE_ERROR:
                return{
                    ...state,
                    error : true
                }
            default:
                return state
        }
}
