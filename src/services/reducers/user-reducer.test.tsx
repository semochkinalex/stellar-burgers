import { 
    LOGOUT,
    UPDATE_USER_INFO,
    UPDATE_ACCESS_TOKEN,
    UPDATE_ORDER_HISTORY,
 } from '../constants/index';
import { exampleUserOrder } from '../types/example-data';

import { userReducer, initialState } from './user-reducer';

const data = {
    name: "Alex",
    email: "alex@gmail.com",
    orderHistory: [exampleUserOrder, exampleUserOrder, exampleUserOrder],
    token: "wqdqwpjoqwfq[hfqofhowqfqoiwfqhw",
}

describe('Actions with user', () => {
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
        expect(userReducer(data, {type: UPDATE_ORDER_HISTORY, orders: [...data.orderHistory, exampleUserOrder]})).toEqual({
            ...data,
            orderHistory: [...data.orderHistory, exampleUserOrder] 
        })
    })
})