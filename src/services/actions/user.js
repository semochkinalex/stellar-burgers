import api from "../../utils/api";
import { setCookie } from "../../utils/cookie";

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN';

export function login(name, email, accessToken, refreshToken) {
    return function(dispatch) {
        setCookie("token", refreshToken);
        dispatch({
            type: UPDATE_ACCESS_TOKEN,
            accessToken,
        });
        dispatch({
            type: UPDATE_USER_INFO,
            name,
            email,
        });
        console.log("SUCCESSFUL LOGIN: ", name, email);
    };
}