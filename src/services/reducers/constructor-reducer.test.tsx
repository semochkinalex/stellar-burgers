import { RESET_BURGER, CHANGE_BURGER_BUN, REMOVE_BURGER_INGREDIENT, SWAP_INGREDIENTS, ADD_BURGER_INDREDIENT } from '../constants/index';
import {resetBurger, addIngredient, removeIngredient, swapIngredients} from '../actions/constructor';
import { bun, meat } from '../types/example-data';

describe('Actions with burger-constructor', () => {
  it('Reset burger', () => {
    expect(resetBurger()).toEqual({type: RESET_BURGER});
  })
  it('Add bun', () => {
    expect(addIngredient(bun)).toEqual({type: CHANGE_BURGER_BUN, ingredient: bun});
  })
  it('Add meat', () => {
    expect(addIngredient(meat)).toEqual({type: ADD_BURGER_INDREDIENT, ingredient: meat});
  })
  it('Remove ingredient', () => {
    expect(removeIngredient(999)).toEqual({type: REMOVE_BURGER_INGREDIENT, index: 999});
  })
  it('Swap ingredients', () => {
    expect(swapIngredients(999, 1)).toEqual({type: SWAP_INGREDIENTS, from: 999, to: 1});
  })
})