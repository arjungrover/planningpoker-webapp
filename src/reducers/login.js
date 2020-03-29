import { BAD_REQUEST, FETCH_USER, CLEAR_LOGIN_ERROR } from "../constants"

const initialState = {
    user: null,
    error: null
}

export const login = (state=initialState, action) => {
    switch(action.type){
        case FETCH_USER:
            return {
                ...state,
                user: action.payload,
                error: false
            }
        case BAD_REQUEST:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_LOGIN_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}
