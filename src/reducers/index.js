import { combineReducers } from "redux";
import { signUp  } from "./signUp";
import { login } from "./login";
import { saveJiraIssues } from "./saveJiraIssues";
import { createPokerBoard } from "./createPokerBoard";
import { group } from "./group";
import { acceptRequest } from "./acceptRequest";
import { getUserDetails } from "./getUserDetails";
import { getAllPokerboards } from "./getAllPokerboards";
import { getPokerboard } from "./getPokerboard";
import { gameLobby } from "./gameLobby";
import { getSearchResultFromJira} from "./getSearchResultFromJira";
import { createIssues } from "./createIssues";
import { updatePoker } from "./updatePoker";
import { getAllUserDetail} from "./getAllUserDetail";
import { getGroupDetail } from "./getGroupDetail";
import { getEstimates } from "./getEstimates";
import { addUserRoles } from "./addUserRoles";
import { addGroupRoles } from "./addGroupRoles";

const AllReducers = combineReducers({
    auth: signUp , 
    login: login,
    issues: saveJiraIssues,
    createpb: createPokerBoard,
    group: group,
    accept: acceptRequest,
    user: getUserDetails,
    pokerboardList: getAllPokerboards,
    pokerboard: getPokerboard,
    gameLobby: gameLobby,
    jiraSearch : getSearchResultFromJira,
    createIssues : createIssues,
    update : updatePoker,
    getAllUser : getAllUserDetail,
    getGroupNames : getGroupDetail,
    getIssuesAndUserEstimate: getEstimates,
    roleUserCreated : addUserRoles,
    roleGroupCreated : addGroupRoles
});

export default AllReducers;
