export const RESET_BURGER = 'RESET_BURGER';
export const SWAP_INGREDIENTS = 'SWAP_INGREDIENTS';
export const CHANGE_BURGER_BUN = 'CHANGE_BURGER_BUN';
export const UPDATE_BURGER_ORDER = 'UPDATE_BURGER_ORDER';
export const ADD_BURGER_INDREDIENT = 'ADD_BURGER_INDREDIENT'; 
export const REMOVE_BURGER_INGREDIENT = 'REMOVE_BURGER_INGREDIENT';

export const resetBurger = () => {
    return {type: RESET_BURGER};
}

export const addIngredient = (ingredient) => {
    return {
        type: ingredient.type === 'bun' ? CHANGE_BURGER_BUN : ADD_BURGER_INDREDIENT,
        ingredient: ingredient,
    }
}

export const removeIngredient = (index) => {
    return {
        type: REMOVE_BURGER_INGREDIENT,
        index: index,
    };
}

export const swapIngredients = (from, to) => {
    return {type: SWAP_INGREDIENTS, from, to};
}