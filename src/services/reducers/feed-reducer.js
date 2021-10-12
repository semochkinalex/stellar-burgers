import { 
    FEED_REQUEST_FAIL,
    FEED_REQUEST_PENDING,
    FEED_REQUEST_SUCCESS,
 } from '../actions/feed';

export const initialState = {
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
            return {...state, feedRequestSent: false, feedRequestFailed: true};
        }
        case FEED_REQUEST_PENDING : {
            return {...state, feedRequestSent: true, feedRequestFailed: false};
        }
        default: 
            return state;   
    }
}