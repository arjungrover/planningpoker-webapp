import Cookies from "universal-cookie"

export const logoutService = () => {
    return new Cookies().remove('token');
}
