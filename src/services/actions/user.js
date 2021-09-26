import api from "../../utils/api";
import { getCookie, setCookie } from "../../utils/cookie";

export const LOGOUT = 'LOGOUT';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN';

export function logout(accessToken) { 
    return function(dispatch) {
        api.logout(getCookie("token"), accessToken)
        .then(({success}) => {
            if (success) {
                setCookie("token", '');
                return dispatch({type: LOGOUT});
            }
            throw new Error("Unable to logout.");
        })
        .catch((message) => {
            console.log(message);
        });
    }
}

export function updateToken(refreshToken) { 
    return function(dispatch) {
        api.updateToken(refreshToken)
        .then(({success, accessToken, refreshToken}) => {
          if (success) {
            setCookie("token", refreshToken);
            dispatch(getUserInfo(accessToken));
            return dispatch(updateAccessToken(accessToken));
          }
          throw new Error("Couldn't refresh token");
        }).catch((message) => console.log(message));
    }
}

export function getUserInfo(token) { 
    // refresh token
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

export function changeUserInfo(name, email, password, token) {
    return function(dispatch) {
        api.changeUserInfo(name, email, password, token)
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