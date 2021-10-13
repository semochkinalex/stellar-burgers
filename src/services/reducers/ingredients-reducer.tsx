import { TIngredientsActions } from '../actions/ingredients';
import {
    INGREDIENT_REQUEST_FAIL,
    INGREDIENT_REQUEST_PENDING,
    INGREDIENT_REQUEST_SUCCESS,
} from '../constants/index';
import { TIngredient } from '../types/data';

export type TIngredientsState = {
    buns: ReadonlyArray<TIngredient>;
    sauces: ReadonlyArray<TIngredient>;
    mains: ReadonlyArray<TIngredient>;

    ingredientsRequestSent: boolean;
    ingredientsRequestFailed: boolean;
}

export const initialState: TIngredientsState = {
    buns: [],
    sauces: [],
    mains: [],

    ingredientsRequestSent: false,
    ingredientsRequestFailed: false,
}

export const ingredientReducer = (state = initialState, action: TIngredientsActions) => {
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
            console.log(action.ingredients);
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