import { 
    ORDERS_REQUEST_PENDING,
    ORDERS_REQUEST_FAIL,
    ORDERS_REQUEST_SUCCESS,
 } from '../actions/orders';

const initialState = {
    orders: [],
    total: null,
    totalToday: null,
    ordersRequestSent: false,
    ordersRequestFailed: false,
}

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDERS_REQUEST_PENDING : {
            return {...state, ordersRequestSent: true, orderRequestFailed: false};
        }
        case ORDERS_REQUEST_FAIL : {
            return {...state, ordersRequestSent: false, orderRequestFailed: true};
        }
        case ORDERS_REQUEST_SUCCESS : {
            return {...state, orders: action.orders, total: action.total, totalToday: action.totalToday};
        }
        default: 
            return state;   
    }
}