import api from "../../utils/api";
import { getCookie, setCookie } from "../../utils/cookie";

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN';

export function getUserInfo(token) { // refresh token
    return function(dispatch) {
        api.getUserInfo(token)
        .then(({success, user : {name, email}}) => {
            if (success) return dispatch(updateUserInfo(name, email));
            throw new Error("Unable to get user info.");
        })
        .catch((message) => {
            console.log(message);
        });
    }
}

export function changeUserInfo(name, email, token) {
    return function(dispatch) {
        api.changeUserInfo(name, email, token)
        .then(() => {
            dispatch({
                type: UPDATE_USER_INFO,
                name, email
            })
        })
        .catch((message) => {
            console.log(message);
        })
    }
}

export function updateUserInfo(name, email) {
    return function(dispatch) {
        dispatch({
            type: UPDATE_USER_INFO,
            name,
            email,
        });
    }
}

export function updateAccessToken(token) {
    return function(dispatch) {
        dispatch({
            type: UPDATE_ACCESS_TOKEN,
            token,
        });
    }
}