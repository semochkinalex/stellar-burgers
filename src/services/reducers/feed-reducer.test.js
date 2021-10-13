import { 
    FEED_REQUEST_FAIL,
    FEED_REQUEST_PENDING,
    FEED_REQUEST_SUCCESS,
 } from '../actions/feed';

import { feedReducer, initialState } from './feed-reducer';

describe("Feed reducer", () => {
    it("Initial state", () => {
        expect(feedReducer(undefined, {})).toEqual(initialState);
    })

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
        expect(feedReducer(initialState, {type: FEED_REQUEST_SUCCESS, feed: ["a", "b", "c"], total: 999, totalToday: 666})).toEqual({
            ...initialState,
            feed: ["a", "b", "c"],
            total: 999,
            totalToday: 666,
        })
    })
}) 