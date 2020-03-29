import { CHANGE_ISSUE, SET_ONLINE_PLAYERS, SET_CHOSEN_CARDS, START_TIMER, GAME_LOBBY_ERROR, CLEAR_GAME_ERROR, SET_ESTIMATES } from "../constants"

const initialState = {
    issue: null,
    players: [],
    cardList: [],
    currentTimer: 0,
    error: null,
    estimateError: null
}

export const gameLobby = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ISSUE:
            return {
                ...state,
                issue: action.payload
            }
        case SET_ONLINE_PLAYERS:
            return {
                ...state,
                players: action.payload
            }
        case SET_CHOSEN_CARDS:
            return {
                ...state,
                cardList: action.payload
            }
        case START_TIMER:
            return {
                ...state,
                currentTimer: action.payload
            }
        case GAME_LOBBY_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_GAME_ERROR:
            return {
                ...state,
                error: null
            }
        case SET_ESTIMATES:
            return {
                ...state,
                estimateError: action.payload
            }
        default:
            return state;
    }
}
