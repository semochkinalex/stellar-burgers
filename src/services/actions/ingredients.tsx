import api from '../../utils/api';

import {
  INGREDIENT_REQUEST_FAIL,
  INGREDIENT_REQUEST_PENDING,
  INGREDIENT_REQUEST_SUCCESS,
} from '../constants/index';

import { AppThunk, AppDispatch } from '../types';
import { TIngredient } from '../types/data';

interface IIngredientsPending {
  readonly type: typeof INGREDIENT_REQUEST_PENDING;
}

interface IIngredientsFail {
  readonly type: typeof INGREDIENT_REQUEST_FAIL;
}

interface IIngredientsSuccess {
  readonly type: typeof INGREDIENT_REQUEST_SUCCESS;
  readonly ingredients: ReadonlyArray<TIngredient>;
}

export type TIngredientsActions = IIngredientsPending | IIngredientsFail | IIngredientsSuccess;

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({type: INGREDIENT_REQUEST_PENDING});
    api.getIngredients()
    .then((res) => {
      if (res.data && res.success) return dispatch({type: INGREDIENT_REQUEST_SUCCESS, ingredients: res.data});
      throw new Error("Произошла ошибка при получении ингредиентов.");
    })
    .catch((err) => {
      console.log(err);
      dispatch({type: INGREDIENT_REQUEST_FAIL});
    })
};