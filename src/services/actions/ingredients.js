import api from '../../utils/api';
export const INGREDIENT_REQUEST_FAIL = 'INGREDIENT_REQUEST_FAIL';
export const INGREDIENT_REQUEST_PENDING = 'INGREDIENT_REQUEST_PENDING';
export const INGREDIENT_REQUEST_SUCCESS = 'INGREDIENT_REQUEST_SUCCESS';

export const getIngredients = () => {
    return function (dispatch) {
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
    }
}