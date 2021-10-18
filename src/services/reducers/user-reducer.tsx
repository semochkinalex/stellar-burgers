import { TUserActions } from '../actions/user';
import { 
    LOGOUT,
    UPDATE_USER_INFO,
    UPDATE_ACCESS_TOKEN,
    UPDATE_ORDER_HISTORY,
} from '../constants/index';
import { TOrder } from '../types/data';

type TUserState = {
    email: string;
    name: string;
    orderHistory: ReadonlyArray<TOrder>;
    token: string | null;
}

export const initialState: TUserState = {
    email: '',
    name: '',

    orderHistory: [],

    token: null, // starts with bearer
}

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
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