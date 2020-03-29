import Cookies from "universal-cookie"

export const getToken = () => {
    return new Cookies().get('token');
}
