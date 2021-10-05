import api from '../../utils/api';
import { RESET_BURGER } from './constructor';
import { getUsersOrderHistory } from './user';
export const OPEN_ORDER_POPUP = 'OPEN_ORDER_POPUP';
export const CLOSE_ORDER_POPUP = 'CLOSE_ORDER_POPUP';
export const ORDER_POPUP_REQUEST_PENDING = 'ORDER_POPUP_REQUEST_PENDING';
export const ORDER_POPUP_REQUEST_FAIL = 'ORDER_POPUP_REQUEST_FAIL';

export function handleOrder(ingredients, bun, token) {
    return function(dispatch) {
        dispatch({type: ORDER_POPUP_REQUEST_PENDING});
        const data = ingredients.concat([bun, bun]).map((e) => e._id);
        api.handleOrder(data, token)
        .then((res) => {
            if (res && res.success) {
                const {name, order: {number}} = res;
                dispatch({
                    type: OPEN_ORDER_POPUP,
                    order: {name, number},
                });
                dispatch({type: RESET_BURGER});
                return dispatch(getUsersOrderHistory(token));
            }
            throw new Error("Произошла ошибка при создании заказа.")
        })
        .catch((err) => {
          console.log(err);
          dispatch({type: ORDER_POPUP_REQUEST_FAIL});
        })
    };
}