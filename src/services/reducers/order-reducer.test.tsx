import { 
    OPEN_ORDER_POPUP,
    CLOSE_ORDER_POPUP,
    ORDER_POPUP_REQUEST_PENDING,
    ORDER_POPUP_REQUEST_FAIL,
 } from '../constants/index';
import { exampleOrder } from '../types/example-data';

import { orderReducer, initialState } from './order-reducer';

describe('Actions with making orders', () => {
    it("Fetch order pending", () => {
        expect(orderReducer(initialState, {type: ORDER_POPUP_REQUEST_PENDING})).toEqual({
            ...initialState,
            orderPopupOpen: true,
            orderRequestSent: true,
        })
    })

    it("Fetch order fail", () => {
        expect(orderReducer(initialState, {type: ORDER_POPUP_REQUEST_FAIL})).toEqual({
            ...initialState,
            orderRequestFailed: true,
            orderRequestSent: false,
        })
    })

    it("Close order popup", () => {
        expect(orderReducer(initialState, {type: CLOSE_ORDER_POPUP})).toEqual({
            ...initialState,
            orderPopupOpen: false,
        })
    })

    it("Fetch order success and open popup", () => {
        expect(orderReducer(initialState, {type: OPEN_ORDER_POPUP, order: exampleOrder})).toEqual({
            ...initialState,
            orderData: exampleOrder,
            orderPopupOpen: true,
        })
    })
})