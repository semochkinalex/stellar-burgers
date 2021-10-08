import { 
    OPEN_FEED_POPUP,
    CLOSE_FEED_POPUP,
    FEED_REQUEST_FAIL,
    FEED_REQUEST_PENDING,
    FEED_REQUEST_SUCCESS,
 } from '../actions/orders';

const initialState = {
    feed: [],
    
    total: null,
    totalToday: null,

    feedRequestSent: false,
    feedRequestFailed: false,

    feedPopupOpen: false,
}

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_FEED_POPUP : {
            return {...state, orderPopupOpen: true};
        }
        case CLOSE_FEED_POPUP : {
            return {...state, orderPopupOpen: false};
        }
        case FEED_REQUEST_PENDING : {
            return {...state, ordersRequestSent: true, orderRequestFailed: false};
        }
        case FEED_REQUEST_FAIL : {
            return {...state, ordersRequestSent: false, orderRequestFailed: true};
        }
        case FEED_REQUEST_SUCCESS : {
            return {...state, orders: action.orders, total: action.total, totalToday: action.totalToday};
        }
        default: 
            return state;   
    }
}