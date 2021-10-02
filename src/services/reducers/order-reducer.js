import { 
    OPEN_ORDER_POPUP,
    CLOSE_ORDER_POPUP,
    ORDER_POPUP_REQUEST_PENDING,
    ORDER_POPUP_REQUEST_FAIL,
    ORDERS_REQUEST_PENDING,
    ORDERS_REQUEST_FAIL,
    ORDERS_REQUEST_SUCCESS,
 } from '../actions/order';

const initialState = {
    inspectedIngredientPopupOpen: false,
    inspectedIngredient: {},

    orderData: {},
    orderPopupOpen: false,
    orderRequestSent: false,
    orderRequestFailed: false,
}

export const orderReducer = (state = initialState, action) => {
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