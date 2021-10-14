import api from "../../utils/api";
import { getLocalStorageKey, setLocalStorageKey } from "../../utils/use-local-storage";

import { AppThunk, AppDispatch } from '../types';

import { 
    LOGOUT,
    UPDATE_USER_INFO,
    UPDATE_ACCESS_TOKEN,
    UPDATE_ORDER_HISTORY,
 } from '../constants/index';

import { TOrder } from "../types/data";

interface IUpdateOrderHistory {
    readonly type: typeof UPDATE_ORDER_HISTORY;
    readonly orders: ReadonlyArray<TOrder>
}

interface IUpdateUserData {
    readonly type: typeof UPDATE_USER_INFO;
    readonly name: string;
    readonly email: string;
}

interface IUpdateAccessToken {
    readonly type: typeof UPDATE_ACCESS_TOKEN;
    readonly token: string;
}

interface ILogout {
    readonly type: typeof LOGOUT;
}

export type TUserActions = IUpdateAccessToken | IUpdateOrderHistory | IUpdateUserData | ILogout;

export const getUsersOrderHistory: AppThunk = (accessToken: string) => (dispatch: AppDispatch) => {
    api.getUsersOrderHistory(accessToken)
    .then((res) => {
        if (res.success) {
            return dispatch({type: UPDATE_ORDER_HISTORY, orders: res.orders});
        }
        throw new Error("Couldn't get user's orders")
    })
    .catch((message) => {
        console.log(message);
    })
};

export const logout: AppThunk = (accessToken: string) => (dispatch: AppDispatch) => {
    const refreshToken = getLocalStorageKey("token");
    api.logout(refreshToken, accessToken)
    .then(({success}) => {
        if (success) {
            console.log("LOGOUT");
            setLocalStorageKey("token", "");
            return dispatch({type: LOGOUT});
        }
        throw new Error("Unable to logout.");
    })
    .catch((message) => {
        console.log(message);
    });
};

export const updateToken: AppThunk = (refreshToken: string) => (dispatch: AppDispatch) => {
    api.updateToken(refreshToken)
    .then(({success, accessToken, refreshToken}) => {
      if (success) {
        console.log("UPDATE TOKEN");
        setLocalStorageKey("token", refreshToken);
        dispatch(getUserInfo(accessToken));
        return dispatch(updateAccessToken(accessToken));
      }
      throw new Error("Couldn't refresh token");
    }).catch((message) => console.log(message));
};

export const getUserInfo: AppThunk = (token: string) => (dispatch: AppDispatch) => {
    api.getUserInfo(token)
    .then(({success, user : {name, email}}) => {
        if (success) return dispatch(updateUserInfo(name, email));
        throw new Error("Unable to get user info.");
    })
    .catch((message) => {
        console.log(message);
    });
};

export const changeUserInfo: AppThunk = (name: string, email: string, password: string, token: string) => (dispatch: AppDispatch) => {
    api.changeUserInfo(name, email, password, token)
    .then(() => {
        dispatch(email, name)
    })
    .catch((message) => {
        console.log(message);
    })
};

export function updateUserInfo(name: string, email: string): IUpdateUserData {
    return {
        type: UPDATE_USER_INFO,
        name,
        email,
    };
}

export function updateAccessToken(token: string): IUpdateAccessToken {
    return {
        type: UPDATE_ACCESS_TOKEN,
        token,
    };
}

export const signUp: AppThunk = (data: {name: string, email: string, password: string}, callback: () => void) => (dispatch: AppDispatch) => {
    api.createNewUser({
        name: data.name,
        email: data.email,
        password: data.password,
    })
    .then(({success, user : {name, email}, accessToken, refreshToken}) => {
        if (success) {
            setLocalStorageKey("token", refreshToken);
            dispatch(updateUserInfo(name, email));
            dispatch(updateAccessToken(accessToken));
            return callback();
        }
        throw new Error("Couldn't create new user");
    })
    .catch((message) => {
        console.log(message);
    })
};

export const signIn: AppThunk = (data: {email: string, password: string}, callback: () => void) => (dispatch: AppDispatch) => {
    api.attemptLogin({email: data.email, password: data.password})
    .then(({success, message, user : {name, email}, accessToken, refreshToken}) => {
        if (success) {
            setLocalStorageKey("token", refreshToken);
            dispatch(updateUserInfo(name, email));
            dispatch(updateAccessToken(accessToken));
            return callback();   
        }
        throw new Error("Error in attemt to login. " + message);
    })
    .catch((message) => console.log(message));
};

export function forgotPassword(data: {email: string}, callback: () => void) {
    api.forgotPassword(data.email)
    .then(({success}) => {
        if (success) callback();
    })
    .catch((message) => console.log(message));
}

export function resetPassword(data: {password: string, code: string}, callback: () => void) {
    api.resetPassword(data.password, data.code)
    .then(({success}) => {
        if (success) return callback();
    })
}
