import {
    CHANGE_BURGER_BUN,
    ADD_BURGER_INDREDIENT, 
    REMOVE_BURGER_INGREDIENT
} from '../actions/constructor';

const initialState = {
    bun: {},
    ingredients: [],
    isValidBurger: false,
    priceSum: 0,
}

const calculateSum = (bun, ingredients) => {
    return ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0) + bun.price * 2;
}

export const constructorReducer = (state = initialState, action) => {   
    switch (action.type) {
        case CHANGE_BURGER_BUN : {
            console.log(state.bun);
            return {...state, bun: action.ingredient, priceSum: calculateSum(action.ingredient, state.ingredients), isValidBurger: true};
        }
        case ADD_BURGER_INDREDIENT : {
            const updatedIngredients = [...state.ingredients, action.ingredient];
            return {...state, ingredients: updatedIngredients, priceSum: calculateSum(state.bun, updatedIngredients)};
        }
        case REMOVE_BURGER_INGREDIENT : {
            const updatedIngredients = state.ingredients.filter((ingredient) => ingredient._id !== action.ingredient._id);
            return {...state, ingredients: updatedIngredients, priceSum: calculateSum(state.bun, updatedIngredients)};
        }
        default:
            return state;
    } 
}