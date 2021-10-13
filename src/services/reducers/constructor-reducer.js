import {
    RESET_BURGER,
    SWAP_INGREDIENTS,
    CHANGE_BURGER_BUN,
    ADD_BURGER_INDREDIENT, 
    REMOVE_BURGER_INGREDIENT,
    UPDATE_BURGER_ORDER,
} from '../actions/constructor';

export const initialState = {
    index: 0,
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
            const updatedIngredients = [...state.ingredients, {...action.ingredient, index: state.index}];
            return {...state, ingredients: updatedIngredients, priceSum: calculateSum(state.bun, updatedIngredients), index: state.index + 1};
        }
        case REMOVE_BURGER_INGREDIENT : {
            const updatedIngredients = state.ingredients.filter((_, index) => index !== action.index);
            return {...state, ingredients: updatedIngredients, priceSum: calculateSum(state.bun, updatedIngredients)};
        }
        case SWAP_INGREDIENTS : {
            const newIngredients = [...state.ingredients];
            const [ dragIndex, hoverIndex ] = [action.from, action.to];
            newIngredients.splice(dragIndex, 1);
            newIngredients.splice(hoverIndex, 0, state.ingredients[dragIndex]);
            return { ...state, ingredients: newIngredients };
        }
        case RESET_BURGER : {
            return {...state, ingredients: [], bun: {}};
        }
        case UPDATE_BURGER_ORDER : {
            return {...state, ingredients: action.data};
        }
        default:
            return state;
    } 
}