import { 
    LOGOUT,
    UPDATE_USER_INFO,
    UPDATE_ACCESS_TOKEN,
    UPDATE_ORDER_HISTORY,
 } from '../actions/user';

export const initialState = {
    email: '',
    name: '',

    orderHistory: [],

    token: null, // starts with bearer
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGOUT : {
            return initialState;
        }
        case UPDATE_USER_INFO : {
            return {...state, email: action.email, name: action.name};
        }
        case UPDATE_ACCESS_TOKEN : {
            return {...state, token: action.token};
        }
        case UPDATE_ORDER_HISTORY : {
            return {...state, orderHistory: action.orders};
        }
        default: 
            return state;   
    }
}