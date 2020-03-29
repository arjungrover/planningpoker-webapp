import { getJiraIssuesService } from '../services/getJiraIssuesService';
import { SAVE_JIRA_ISSUES, GET_JIRA_BAD_REQUEST } from '../constants';


export const getJiraIssues = () => dispatch =>{
    return getJiraIssuesService()
    .then(res => {
        dispatch({
            type: SAVE_JIRA_ISSUES,
            payload: res.data
        });
    })
    .catch(err => {
        if(err.response){
            dispatch({
                type: GET_JIRA_BAD_REQUEST,
                payload: err.response
            });
        }
    })
}
