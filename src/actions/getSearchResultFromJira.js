import { JIRA_SEARCH, JIRA_SEARCH_ERROR, CLEAR_JIRA_SEARCH_DETAILS} from '../constants'
import {getSearchResultJiraService} from '../services/getSearchResultJiraService'


export const getSearchResultFromJira = (search) => (dispatch) =>{
            return getSearchResultJiraService(search)
            .then(res=>{
                dispatch({
                    type : JIRA_SEARCH,
                    payload: res.data
                })
            })
            .catch(err =>{
                dispatch({
                    type: JIRA_SEARCH_ERROR,
                    payload: err.response
                })
            })
}

export const clearJiraSearch = () => dispatch => {
    dispatch({
        type: CLEAR_JIRA_SEARCH_DETAILS
    })
}