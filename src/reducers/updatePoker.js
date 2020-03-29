import { UPDATE_POKER, UPDATE_POKER_ERROR } from "../constants"

const initialState = {
    error : null
}
export const updatePoker = (state=initialState, action ) => {
    switch(action.type){
        case UPDATE_POKER:
            return{
                ...state,
                error : false
            }
        case UPDATE_POKER_ERROR :
            return {
                ...state,
                error : action.payload
            }
        default :{
            return state;
        }
    }
}