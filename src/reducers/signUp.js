import { SIGNUP_BAD_REQUEST, SAVE_USER, VERIFY_TOKEN, CLEAR_POKERBOARD_ERROR } from "../constants";

const initialState = {
    user: null, 
    error: null
}

export const signUp = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER:
            return {
                ...state,
                error: false
            }
        case VERIFY_TOKEN:
            return {
                ...state,
                user: action.payload,
                error: false
            }
        case SIGNUP_BAD_REQUEST:
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
