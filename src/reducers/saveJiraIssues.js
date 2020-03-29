import { SAVE_JIRA_ISSUES, GET_JIRA_BAD_REQUEST } from "../constants"

const initialState = {
    issues: null,
    error: null
}

export const saveJiraIssues = (state=initialState, action) => {
    switch(action.type) {
        case SAVE_JIRA_ISSUES:
            return {
                ...state,
                issues: action.payload,
                error: false
            }
        case GET_JIRA_BAD_REQUEST:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}
