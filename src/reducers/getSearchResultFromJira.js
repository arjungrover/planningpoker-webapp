import { JIRA_SEARCH, JIRA_SEARCH_ERROR, CLEAR_JIRA_SEARCH_DETAILS } from "../constants";


const initialState = {
    jiraSearch: null,
    error : null
}

export const getSearchResultFromJira = (state=initialState, action)=>{
    switch(action.type){
        case JIRA_SEARCH:
            return{
                ...state,
                jiraSearch : action.payload,
                error : false
            }
        case JIRA_SEARCH_ERROR:
            return{
                ...state,
                error : action.payload
            }
        case CLEAR_JIRA_SEARCH_DETAILS:
            return{
                jiraSearch : null,
                error : null
            }
        default:
            return state;
    }
}