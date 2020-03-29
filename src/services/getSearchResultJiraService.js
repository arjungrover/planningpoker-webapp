import axios from "axios";
import { JIRA_SEARCH_URL } from '../constants';

export const getSearchResultJiraService = (search) => {
    const url = JIRA_SEARCH_URL;
    
    return axios.get(
        url,
        {
            params: {
              search : search
            }
        }
    )
}