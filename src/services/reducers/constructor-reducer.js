import {
    CHANGE_BURGER_BUN,
    ADD_BURGER_INDREDIENT, 
    REMOVE_BURGER_INGREDIENT,
    UPDATE_BURGER_ORDER,
} from '../actions/constructor';

const initialState = {
    index: 0,
    bun: {},
    ingredients: [],
    isValidBurger: false,
    priceSum: 0,
}

const calculateSum = (bun, ingredients) => {
    return ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0) + (Object.keys(bun).length ? bun.price * 2 : 0);
}

function swap(list, x, y) {
	let z = list[y];
    list[y] = list[x];
    list[x] = z;
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
            const updatedIngredients = state.ingredients.filter((ingredient) => ingredient._id !== action.id);
            return {...state, ingredients: updatedIngredients, priceSum: calculateSum(state.bun, updatedIngredients)};
        }
        case UPDATE_BURGER_ORDER : {
            const arr = state.ingredients;
            const to = arr.findIndex(ingredient => ingredient.index == action.fromIndex);
            const from = arr.findIndex(card => card.index === action.toIndex);
            swap(arr, to, from);
            return {...state, ingredients: arr};
        }
        default:
            return state;
    } 
}