import { GET_ISSUE_ERROR, GET_ISSUE_RESPONSE} from "../constants";

const initialState = {
        list : null,
        error : null,   
}

export const getEstimates = (state=initialState, action) => {
        switch(action.type){
            case GET_ISSUE_RESPONSE :
                return({
                    ...state,
                    list : action.payload,
                    error : false
                });
            case GET_ISSUE_ERROR :
                return({
                    ...state,
                    error : true
                });
            default:
                return state
        }
}
