import { SAVE_POKERBOARD, POKERBOARD_BAD_REQUEST, CLEAR_POKERBOARD_ERROR } from "../constants"

const initialState = {
    error: null
}

export const createPokerBoard = (state=initialState, action) => {
    switch(action.type){
        case SAVE_POKERBOARD:
            return {
                ...state,
                error: false,
            }
        case POKERBOARD_BAD_REQUEST:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_POKERBOARD_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
