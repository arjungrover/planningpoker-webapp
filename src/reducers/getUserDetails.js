import { GET_USER_DETAILS, GET_USER_DETAILS_ERROR, CLEAR_USER_DETAILS_ERROR, AUTHENTICATE, UNAUTHENTICATE, AUTHENTICATE_ERROR } from "../constants"

const initialState = {
    user: null,
    error: null,
    userAuth: null
}

export const getUserDetails = (state=initialState, action) => {
    switch(action.type) {
        case GET_USER_DETAILS:
            return {
                ...state,
                user: action.payload,
                error: false
            }
        case AUTHENTICATE:
            return {
                ...state,
                userAuth: true,
                user: action.payload
            }
        case AUTHENTICATE_ERROR:
            return {
                ...state,
                userAuth: false,
                user: null
            }
        case UNAUTHENTICATE:
            return {
                ...state,
                user: null,
                userAuth: null
            }
        case GET_USER_DETAILS_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_USER_DETAILS_ERROR:
            return {
                ...state,
                error: null
            }
        default: 
            return state
    }
}
