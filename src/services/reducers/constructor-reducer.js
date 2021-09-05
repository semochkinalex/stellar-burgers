import {
    CHANGE_BURGER_BUN,
    ADD_BURGER_INDREDIENT, 
    REMOVE_BURGER_INGREDIENT,
    UPDATE_BURGER_ORDER
} from '../actions/constructor';

const initialState = {
    id: 0,
    bun: {},
    ingredients: [],
    isValidBurger: false,
    priceSum: 0,
}

const calculateSum = (bun, ingredients) => {
    return ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0) + (Object.keys(bun).length ? bun.price * 2 : 0);
}

export const constructorReducer = (state = initialState, action) => {   
    switch (action.type) {
        case CHANGE_BURGER_BUN : {
            return {...state, bun: action.ingredient, priceSum: calculateSum(action.ingredient, state.ingredients), isValidBurger: true};
        }
        case ADD_BURGER_INDREDIENT : {
            const updatedIngredients = [...state.ingredients, {...action.ingredient, id: state.id}];
            return {...state, ingredients: updatedIngredients, priceSum: calculateSum(state.bun, updatedIngredients), id: state.id + 1};
        }
        case REMOVE_BURGER_INGREDIENT : {
            const updatedIngredients = state.ingredients.filter((ingredient) => ingredient._id !== action.ingredient._id);
            return {...state, ingredients: updatedIngredients, priceSum: calculateSum(state.bun, updatedIngredients)};
        }
        case UPDATE_BURGER_ORDER : {
            return {...state, ingredient: action.data};
        }
        default:
            return state;
    } 
}