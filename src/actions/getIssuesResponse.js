import { getIssueResponseService } from "../services/getIssueResponseService"
import { GET_ISSUE_ERROR, GET_ISSUE_RESPONSE } from '../constants'

export const getIssuesResponse = () => dispatch => {
    return getIssueResponseService()
        .then(res => {
            dispatch({
                type: GET_ISSUE_RESPONSE,
                payload: res.data
            })
        })
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: GET_ISSUE_ERROR,
                    payload: err.response
                })
            }
        })
}
