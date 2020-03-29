import Cookies from "universal-cookie";

export function isLoggedIn() {
    const cookie = new Cookies();
    if(cookie.get('token')){
        return true;
    }
    else return false;
}
