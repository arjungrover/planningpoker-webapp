import { ACCEPT_REQUEST, ACCEPT_BAD_REQUEST } from "../constants"

const initialState = {
    error: null
}

export const acceptRequest = (state=initialState, action) => {
    switch(action.type){
        case ACCEPT_REQUEST:
            return {
                ...state,
                error: false,
            }
        case ACCEPT_BAD_REQUEST:
            return {
                ...state,
                error: action.payload.data.msg,
            }
        default:
            return state;
    }
}
