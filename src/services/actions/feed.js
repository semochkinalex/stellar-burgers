import api from '../../utils/api';

export const FEED_REQUEST_FAIL =  'FEED_REQUEST_FAIL';
export const FEED_REQUEST_SUCCESS = 'FEED_REQUEST_SUCCESS';
export const FEED_REQUEST_PENDING = 'FEED_REQUEST_PENDING';

export function updateFeed(orders, total, totalToday) {
    return function(dispatch) {
        dispatch({
            type: FEED_REQUEST_SUCCESS,

            feed: orders,

            total: total,
            totalToday: totalToday,
        });
    };
}

export function getInitialOrders() {
    return function(dispatch) {
        dispatch({type: FEED_REQUEST_PENDING});
        api.getInitialOrders()
        .then((res) => {
            if (res && res.success) return dispatch(updateFeed(res.orders, res.total, res.totalToday));
            throw new Error("Произошла ошибка при получении списка заказов.")
        })
        .catch((err) => {
          console.log(err);
          dispatch({type: FEED_REQUEST_FAIL});
        })
    };
}
