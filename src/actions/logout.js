import { logoutService } from "../services/logoutService"
import { UNAUTHENTICATE } from "../constants";

export const logout = () => dispatch => {
    logoutService();
    dispatch({
        type: UNAUTHENTICATE
    })
}
