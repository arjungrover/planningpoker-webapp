import { CREATE_ISSUE, CREATE_ISSUE_ERROR } from "../constants";
import {createIssuesPost} from '../services/createIssuesPost';


export const createIssues = (issues) => dispatch => {
  return createIssuesPost(issues)
    .then(res => {
      dispatch({
        type: CREATE_ISSUE,
        payload: res.data
      });
    })
    .catch(err => {
      if (err.response) {
        dispatch({
          type: CREATE_ISSUE_ERROR,
          payload: err.response
        });
      }
    });
};
