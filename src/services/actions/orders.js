import api from '../../utils/api';

export const OPEN_ORDER_SUMMARY_POPUP = 'OPEN_ORDER_SUMMARY_POPUP';
export const CLOSE_ORDER_SUMMARY_POPUP = 'CLOSE_ORDER_SUMMARY_POPUP';

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