import { GET_GROUP_ERROR, GET_GROUP_NAMES} from "../constants";

const initialState = {
    names : null,
    error : null,
}

export const getGroupDetail = (state=initialState, action) => {
    switch(action.type){
        case GET_GROUP_NAMES:
            return({
             ...state,
             names : action.payload
            })
        case GET_GROUP_ERROR:
            return({
            ...state,
            error : true    
            })
        default :
            return state
    }
}