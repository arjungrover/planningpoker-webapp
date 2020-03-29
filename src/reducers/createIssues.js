import { CREATE_ISSUE, CREATE_ISSUE_ERROR } from "../constants";

const initialState ={
    error : null
}

export const createIssues = (state=initialState, action) => {
     switch(action.type){
        case CREATE_ISSUE :
            return{
                ...state,
                error: false
            }      
        case CREATE_ISSUE_ERROR :
            return{
                ...state,
                error : true
            }
        default:
            return state
     }
}
