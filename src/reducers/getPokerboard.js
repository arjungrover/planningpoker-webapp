import { POKERBOARD_ERROR_CLEAR, POKERBOARD_GET, POKERBOARD_ERROR } from "../constants"

const initialState = {
    pokerboard: null,
    error: null,
}

export const getPokerboard = (state = initialState, action) => {
    switch (action.type) {
        case POKERBOARD_GET:
            return ({
                ...state,
                pokerboard: action.payload,
                error: false,
            });
        case POKERBOARD_ERROR:
            return ({
                ...state,
                error: action.payload,
            });
        case POKERBOARD_ERROR_CLEAR:
            return ({
                ...state,
                error: null,
            });
        default:
            return state;
    }
}
