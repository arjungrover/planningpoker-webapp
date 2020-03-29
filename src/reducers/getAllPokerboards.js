import { GET_POKERBOARDS, GET_POKERBOARDS_ERROR, CLEAR_GET_POKERBOARDS_ERROR } from "../constants"

const initialState = {
    pokerboardList: null,
    error: null
}


export const getAllPokerboards = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKERBOARDS:
            return {
                ...state,
                pokerboardList: action.payload,
                error: false
            }
        case GET_POKERBOARDS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_GET_POKERBOARDS_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}
