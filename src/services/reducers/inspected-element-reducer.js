import { 
    OPEN_INSPECTED_INGREDIENT, 
    CLOSE_INSPECTED_INGREDIENT,
 } from '../actions/inspected-element';

const initialState = {
    inspectedIngredientPopupOpen: false,
    inspectedIngredient: {},

    orderData: {},
    orderPopupOpen: false,
    orderRequestSent: false,
    orderRequestFailed: false,

}

export const inspectedElementReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_INSPECTED_INGREDIENT : {
            return {...state, inspectedIngredientPopupOpen: true, inspectedIngredient: action.ingredient};
        }
        case CLOSE_INSPECTED_INGREDIENT : {
            return {...state, inspectedIngredientPopupOpen: false, inspectedIngredient: {}};
        }
        default: 
            return state;   
    }
}