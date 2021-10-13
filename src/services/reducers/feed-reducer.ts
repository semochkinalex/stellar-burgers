import { TFeedActions } from '../actions/feed';
import { 
    FEED_REQUEST_FAIL,
    FEED_REQUEST_PENDING,
    FEED_REQUEST_SUCCESS,
 } from '../constants/index';

import { TOrder } from '../types/data';


type TFeedState = {
    feed: ReadonlyArray<TOrder>
    total: number;
    totalToday: number;
    feedRequestSent: boolean;
    feedRequestFailed: boolean;
}

export const initialState: TFeedState = {
    feed: [],

    total: 0,
    totalToday: 0,

    feedRequestSent: false,
    feedRequestFailed: false,
}

export const feedReducer = (state = initialState, action: TFeedActions) => {
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