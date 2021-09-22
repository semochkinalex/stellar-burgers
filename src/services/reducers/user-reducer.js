import { 
    UPDATE_USER_INFO,
    UPDATE_ACCESS_TOKEN
 } from '../actions/user';

const initialState = {
    email: '',
    name: '',

    token: null, // starts with bearer
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_INFO : {
            return {...state, email: action.email, name: action.name};
        }
        case UPDATE_ACCESS_TOKEN : {
            return {...state, token: action.token};
        }
        default: 
            return state;   
    }
}