import axios from 'axios';
import { GET_JIRA_ISSUES } from '../constants';

let url = GET_JIRA_ISSUES;

export const getJiraIssuesService = () => {
    return axios.get(
        url
    )
};
