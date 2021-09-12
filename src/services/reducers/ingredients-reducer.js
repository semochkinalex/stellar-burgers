import {
    INGREDIENT_REQUEST_FAIL,
    INGREDIENT_REQUEST_PENDING,
    INGREDIENT_REQUEST_SUCCESS,
} from '../actions/ingredients';

const initialState = {
    buns: [],
    sauces: [],
    mains: [],

    ingredientsRequestSent: false,
    ingredientsRequestFailed: false,
}

export const ingredientReducer = (state = initialState, action) => {
    switch(action.type) {
        case INGREDIENT_REQUEST_PENDING : {
            return {
                ...state,
                ingredientsRequestSent: true,
                ingredientsRequestFailed: false,
            }
        }
        case INGREDIENT_REQUEST_FAIL : {
            return {
                ...state,
                ingredientsRequestSent: false,
                ingredientsRequestFailed: true,
            }
        }
        case INGREDIENT_REQUEST_SUCCESS : {
            return {
                ...state,
                ingredientsRequestSent: false,
                ingredientsRequestFailed: false,
                buns: action.ingredients.filter((item) => item.type === 'bun'),
                sauces: action.ingredients.filter((item) => item.type === 'sauce'),
                mains: action.ingredients.filter((item) => item.type === 'main'),
            }
        }
        default:
            return state;
    }
}