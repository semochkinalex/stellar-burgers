import { 
    OPEN_ORDER_POPUP,
    CLOSE_ORDER_POPUP,
    ORDER_POPUP_REQUEST_PENDING,
    ORDER_POPUP_REQUEST_FAIL,
 } from '../constants/index';

import { TOrderActions } from '../actions/order';

type TOrderState = {
    orderData: {name: string, number: number};
    orderPopupOpen: boolean;
    orderRequestSent: boolean;
    orderRequestFailed: boolean;
}

export const initialState: TOrderState = {
    orderData: {name: '', number: 0},
    orderPopupOpen: false,
    orderRequestSent: false,
    orderRequestFailed: false,
}

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    switch (action.type) {
        case OPEN_ORDER_POPUP : {
            return {...state, orderPopupOpen: true, orderData: action.order, orderRequestFailed: false, orderRequestSent: false};
        }
        case ORDER_POPUP_REQUEST_PENDING : {
            return {...state, orderRequestFailed: false, orderRequestSent: true, orderPopupOpen: true} // Will show skeleton ui when pending
        }
        case ORDER_POPUP_REQUEST_FAIL : {
            return {...state, orderRequestFailed: true, orderRequestSent: false}
        }
        case CLOSE_ORDER_POPUP : {
            return {...state, orderPopupOpen: false};
        }
        default: 
            return state;   
    }
}