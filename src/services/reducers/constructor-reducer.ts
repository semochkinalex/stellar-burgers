import { TConstructorActions } from '../actions/constructor';
import {
    RESET_BURGER,
    SWAP_INGREDIENTS,
    CHANGE_BURGER_BUN,
    ADD_BURGER_INDREDIENT, 
    REMOVE_BURGER_INGREDIENT,
} from '../constants/index';
import { TIngredient } from '../types/data';

export type TConstructorState = {
    bun: TIngredient | null; // may be no bun
    ingredients: ReadonlyArray<TIngredient>
    index: number;
    priceSum: number;
    isValidBurger: boolean;
}

export const initialState: TConstructorState = {
    index: 0,
    bun: null,
    ingredients: [],
    isValidBurger: false,
    priceSum: 0,
}

const calculateSum = (bun: TIngredient, ingredients: ReadonlyArray<TIngredient>): number => {
    return ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0) + (Object.keys(bun).length ? bun.price * 2 : 0);
}

export const constructorReducer = (state = initialState, action: TConstructorActions): TConstructorState => {   
    switch (action.type) {
        case CHANGE_BURGER_BUN : {
            return {...state, bun: action.ingredient, priceSum: calculateSum(action.ingredient, state.ingredients), isValidBurger: true};
        }
        case ADD_BURGER_INDREDIENT : {
            const updatedIngredients = [...state.ingredients, {...action.ingredient, index: state.index}];
            return {...state, ingredients: updatedIngredients, priceSum: state.bun ? calculateSum(state.bun, updatedIngredients) : 0, index: state.index + 1};
        }
        case REMOVE_BURGER_INGREDIENT : {
            const updatedIngredients = state.ingredients.filter((_, index) => index !== action.index);
            return {...state, ingredients: updatedIngredients, priceSum: state.bun ? calculateSum(state.bun, updatedIngredients) : 0};
        }
        case SWAP_INGREDIENTS : {
            const newIngredients = [...state.ingredients];
            const [ dragIndex, hoverIndex ] = [action.from, action.to];
            newIngredients.splice(dragIndex, 1);
            newIngredients.splice(hoverIndex, 0, state.ingredients[dragIndex]);
            return { ...state, ingredients: newIngredients };
        }
        case RESET_BURGER : {
            return {...state, ingredients: [], bun: null};
        }
        default:
            return state;
    } 
}