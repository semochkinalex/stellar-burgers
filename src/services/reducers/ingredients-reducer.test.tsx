import { INGREDIENT_REQUEST_FAIL, INGREDIENT_REQUEST_PENDING, INGREDIENT_REQUEST_SUCCESS } from '../constants/index';
import { bun, meat } from '../types/example-data';
import { ingredientReducer, initialState } from './ingredients-reducer';

const data = [
    bun,
    meat
]

describe("Ingredients reducer", () => {
    it("Fetch ingredients pending", () => {
        expect(ingredientReducer(initialState, {type: INGREDIENT_REQUEST_PENDING})).toEqual({
            ...initialState,
            ingredientsRequestSent: true,
        })
    })

    it("Fetch ingredients fail", () => {
        expect(ingredientReducer(initialState, {type: INGREDIENT_REQUEST_FAIL})).toEqual({
            ...initialState,
            ingredientsRequestFailed: true,
        })
    })

    it("Fetch ingredients success", () => {
        expect(ingredientReducer(initialState, {type: INGREDIENT_REQUEST_SUCCESS, ingredients: data})).toEqual({
            ...initialState,
            buns: [data[0]],
            mains: [data[1]],
        })
    })
}) 