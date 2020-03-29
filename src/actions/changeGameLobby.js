import { CHANGE_ISSUE, SET_ONLINE_PLAYERS, SET_CHOSEN_CARDS, START_TIMER, GAME_LOBBY_ERROR, CLEAR_GAME_ERROR, SET_ESTIMATES } from "../constants";
import { setEstimateService } from "../services/setEstimateService";

export const changeIssue = (issue) => dispatch => {
    dispatch({
        type: CHANGE_ISSUE,
        payload: issue
    })
}

export const changeOnlinePlayers = (players) => dispatch => {
    if (players) {
        dispatch({
            type: SET_ONLINE_PLAYERS,
            payload: players
        })
    }
}

export const cardChosenAction = (details) => dispatch => {
    dispatch({
        type: SET_CHOSEN_CARDS,
        payload: details
    })
}

export const setTimerSecond = (seconds) => dispatch => {
    dispatch({
        type: START_TIMER,
        payload: seconds,
    })
}

export const setGameError = (error) => dispatch => {
    dispatch({
        type: GAME_LOBBY_ERROR,
        payload: error
    })
}

export const clearGameError = () => dispatch => {
    dispatch({
        type: CLEAR_GAME_ERROR
    })
}

export const setEstimates = (data, id) => dispatch => {
    return setEstimateService(data, id)
    .then(res => {
        dispatch({
            type: SET_ESTIMATES,
            payload: data
        })
    })
    .catch(err => {
        dispatch({
            type: SET_ESTIMATES,
            payload: err.response
        })
    })
}
