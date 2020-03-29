import { CHANGE_GROUP_ROLE, GROUP_ROLE_ERROR} from "../constants";

const initialState = {
     error : null
}

export const addGroupRoles = (state=initialState, action) => {
        switch(action.type){
            case CHANGE_GROUP_ROLE:
                return{
                  ...state,
                  error : false
            }
            case GROUP_ROLE_ERROR:
                return{
                    ...state,
                    error : true
                }
            default:
                return state
        }
}
