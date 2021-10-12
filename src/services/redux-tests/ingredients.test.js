import { INGREDIENT_REQUEST_FAIL, INGREDIENT_REQUEST_PENDING, INGREDIENT_REQUEST_SUCCESS } from '../actions/ingredients';
import { ingredientReducer, initialState } from '../reducers/ingredients-reducer';

const data = [
    {
        name: "Хлеб",
        type: "bun"
    },
    {
        name: "Стейк",
        type: "main"
    },
    {
        name: "Барбекю соус",
        type: "sauce"
    }
]

describe("Ingredients reducer", () => {
    it("Initial state", () => {
        expect(ingredientReducer(undefined, {})).toEqual(initialState);
    })

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
            sauces: [data[2]]
        })
    })
}) 