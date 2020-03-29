import { acceptPost } from "../services/acceptPost"
import { ACCEPT_REQUEST, ACCEPT_BAD_REQUEST } from "../constants"

export const createAcceptRequest = (accept) => dispatch =>{
    return acceptPost(accept)
        .then(res => {
            dispatch({
                type: ACCEPT_REQUEST,
                payload: res.data
            })
        })
        .catch(err => {
            if (err.response) {
                dispatch({
                    type: ACCEPT_BAD_REQUEST,
                    payload: err.response
                });
            }
        })
}
