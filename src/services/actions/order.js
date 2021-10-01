import api from '../../utils/api';
import { RESET_BURGER } from './constructor';
export const OPEN_ORDER_POPUP = 'OPEN_ORDER_POPUP';
export const CLOSE_ORDER_POPUP = 'CLOSE_ORDER_POPUP';
export const ORDER_POPUP_REQUEST_PENDING = 'ORDER_POPUP_REQUEST_PENDING';
export const ORDER_POPUP_REQUEST_FAIL = 'ORDER_POPUP_REQUEST_FAIL';

export const ORDERS_REQUEST_SUCCESS = 'ORDERS_REQUEST_SUCCESS';
export const ORDERS_REQUEST_FAIL =  'ORDERS_REQUEST_FAIL';
export const ORDERS_REQUEST_PENDING = 'ORDERS_REQUEST_PENDING';

export function getInitialOrders() {
    return function(dispatch) {
        dispatch({type: ORDERS_REQUEST_PENDING});
        api.getInitialOrders()
        .then((res) => {
            if (res && res.success) {
                return dispatch(updateFeed(res.orders, res.total, res.totalToday));
            }
            throw new Error("Произошла ошибка при получении списка заказов.")
        })
        .catch((err) => {
          console.log(err);
          dispatch({type: ORDERS_REQUEST_FAIL});
        })
    };
}

export function updateFeed(orders, total, totalToday) {
    return function(dispatch) {
        dispatch({
            type: ORDERS_REQUEST_SUCCESS,
            orders: orders,
            total: total,
            totalToday: totalToday,
        });
    };
}

export function handleOrder(ingredients, bun) {
    return function(dispatch) {
        dispatch({type: ORDER_POPUP_REQUEST_PENDING});
        const data = ingredients.concat([bun, bun]).map((e) => e._id);
        api.handleOrder(data)
        .then((res) => {
            if (res && res.success) {
                const {name, order: {number}} = res;
                dispatch({
                    type: OPEN_ORDER_POPUP,
                    order: {name, number},
                })
                return dispatch({type: RESET_BURGER});
            }
            throw new Error("Произошла ошибка при создании заказа.")
        })
        .catch((err) => {
          console.log(err);
          dispatch({type: ORDER_POPUP_REQUEST_FAIL});
        })
    };
}