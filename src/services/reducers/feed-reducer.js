import { 
    FEED_REQUEST_FAIL,
    FEED_REQUEST_PENDING,
    FEED_REQUEST_SUCCESS,
 } from '../actions/feed';

const initialState = {
    feed: [],

    total: null,
    totalToday: null,

    feedRequestSent: false,
    feedRequestFailed: false,
}

export const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case FEED_REQUEST_SUCCESS : {
            return {...state, feed: action.feed, total: action.total, totalToday: action.totalToday};
        }
        case FEED_REQUEST_FAIL : {
            return {...state, ordersRequestSent: false, orderRequestFailed: true};
        }
        case FEED_REQUEST_PENDING : {
            return {...state, ordersRequestSent: true, orderRequestFailed: false};
        }
        default: 
            return state;   
    }
}