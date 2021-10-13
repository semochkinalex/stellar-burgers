import { 
    FEED_REQUEST_FAIL,
    FEED_REQUEST_PENDING,
    FEED_REQUEST_SUCCESS,
 } from '../constants/index';

import { feed } from '../types/example-data';

import { feedReducer, initialState } from './feed-reducer';

describe("Feed reducer", () => {
    it("Fetch feed pending", () => {
        expect(feedReducer(initialState, {type: FEED_REQUEST_PENDING})).toEqual({
            ...initialState,
            feedRequestSent: true,
        })
    })

    it("Fetch feed fail", () => {
        expect(feedReducer(initialState, {type: FEED_REQUEST_FAIL})).toEqual({
            ...initialState,
            feedRequestFailed: true,
        })
    })

    it("Fetch feed success", () => {
        expect(feedReducer(initialState, {type: FEED_REQUEST_SUCCESS, feed: feed, total: 999, totalToday: 666})).toEqual({
            ...initialState,
            feed: feed,
            total: 999,
            totalToday: 666,
        })
    })
}) 