import { SAVE_GROUP, GROUP_BAD_REQUEST, CLEAR_GROUP_ERROR } from "../constants"

const initialState = {
    error: null
}

export const group = (state=initialState, action) => {
    switch(action.type){
        case SAVE_GROUP:
            return {
                ...state,
                error: false,
            }
        case GROUP_BAD_REQUEST:
            return {
                ...state,
                error: true,
            }
        case CLEAR_GROUP_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state;
    }
}
