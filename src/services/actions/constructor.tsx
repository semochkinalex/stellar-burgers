import { TIngredient } from "../types/data";
import {
    RESET_BURGER,
    SWAP_INGREDIENTS,
    CHANGE_BURGER_BUN,
    ADD_BURGER_INDREDIENT, 
    REMOVE_BURGER_INGREDIENT,
} from '../constants/index';

interface IResetBurger {
    readonly type: typeof RESET_BURGER;
}

interface IAddIngredient {
    readonly type: typeof CHANGE_BURGER_BUN | typeof ADD_BURGER_INDREDIENT;
    readonly ingredient: TIngredient;
}

interface IRemoveIngredient {
    readonly type: typeof REMOVE_BURGER_INGREDIENT;
    readonly index: number;
}

interface ISwapIngredients {
    readonly type: typeof SWAP_INGREDIENTS;
    readonly from: number;
    readonly to: number;
}

export type TConstructorActions = IResetBurger | IAddIngredient | IRemoveIngredient | ISwapIngredients;

export const resetBurger = (): IResetBurger => {
    return {type: RESET_BURGER};
}

export const addIngredient = (ingredient: TIngredient): IAddIngredient => {
    return {
        type: ingredient.type === "bun" ? CHANGE_BURGER_BUN : ADD_BURGER_INDREDIENT,
        ingredient: ingredient,
    }
}

export const removeIngredient = (index: number): IRemoveIngredient => {
    return {
        type: REMOVE_BURGER_INGREDIENT,
        index: index,
    };
}

export const swapIngredients = (from: number, to: number): ISwapIngredients => {
    return {type: SWAP_INGREDIENTS, from, to};
}