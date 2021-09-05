import { 
    OPEN_INSPECTED_INGREDIENT, 
    CLOSE_INSPECTED_INGREDIENT,
    OPEN_ORDER_POPUP,
    CLOSE_ORDER_POPUP,
    ORDER_REQUEST_PENDING,
    ORDER_REQUEST_FAIL,
    OPEN_HEADER_POPUP,
    CLOSE_HEADER_POPUP 
 } from '../actions/popups-info';

const initialState = {
    inspectedIngredientPopupOpen: false,
    inspectedIngredient: {},

    orderData: {},
    orderPopupOpen: false,
    orderRequestSent: false,
    orderRequestFailed: false,

    headerPopupOpen: false
}

export const popupsReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_HEADER_POPUP : {
            return {...state, headerPopupOpen: true};
        }
        case CLOSE_HEADER_POPUP : {
            return {...state, headerPopupOpen: false};
        }
        case OPEN_INSPECTED_INGREDIENT : {
            return {...state, inspectedIngredientPopupOpen: true, inspectedIngredient: action.ingredient};
        }
        case CLOSE_INSPECTED_INGREDIENT : {
            return {...state, inspectedIngredientPopupOpen: false, inspectedIngredient: {}};
        }
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