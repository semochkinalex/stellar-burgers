import { 
    OPEN_ORDER_POPUP,
    CLOSE_ORDER_POPUP,
    ORDER_REQUEST_PENDING,
    ORDER_REQUEST_FAIL,
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
        case ORDER_REQUEST_PENDING : {
            return {...state, orderRequestFailed: false, orderRequestSent: true}
        }
        case ORDER_REQUEST_FAIL : {
            return {...state, orderRequestFailed: true, orderRequestSent: false}
        }
        case CLOSE_ORDER_POPUP : {
            return {...state, orderPopupOpen: false};
        }
        default: 
            return state;   
    }
}