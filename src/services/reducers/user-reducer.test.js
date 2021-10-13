import { 
    LOGOUT,
    UPDATE_USER_INFO,
    UPDATE_ACCESS_TOKEN,
    UPDATE_ORDER_HISTORY,
 } from '../actions/user';

import { userReducer, initialState } from './user-reducer';

const data = {
    name: "Alex",
    email: "alex@gmail.com",
    orderHistory: [1,2,3],
    token: "wqdqwpjoqwfq[hfqofhowqfqoiwfqhw",
}

describe('Actions with user', () => {
    it("Initial state", () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    })

    it("Logout user", () => {
        expect(userReducer(data, {type: LOGOUT})).toEqual(initialState)
    })

    it("Update user info", () => {
        expect(userReducer(data, {type: UPDATE_USER_INFO, email: "oleg@gmail.com", name: "oleg"})).toEqual({
            ...data,
            name: "oleg",
            email: "oleg@gmail.com"
        })
    })

    it("Update user info", () => {
        expect(userReducer(data, {type: UPDATE_USER_INFO, email: "oleg@gmail.com", name: "oleg"})).toEqual({
            ...data,
            name: "oleg",
            email: "oleg@gmail.com"
        })
    })

    it ("Update access token", () => {
        expect(userReducer(data, {type: UPDATE_ACCESS_TOKEN, token: "oleg-token"})).toEqual({
            ...data,
            token: "oleg-token",
        })
    })

    it ("Update order history", () => {
        expect(userReducer(data, {type: UPDATE_ORDER_HISTORY, orders: [1,2,3,4]})).toEqual({
            ...data,
            orderHistory: [...data.orderHistory, 4] 
        })
    })
})