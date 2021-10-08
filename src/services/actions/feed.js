import api from '../../utils/api';

export const OPEN_FEED_POPUP = 'OPEN_FEED_POPUP';
export const CLOSE_FEED_POPUP = 'CLOSE_FEED_POPUP';

export const FEED_REQUEST_FAIL =  'FEED_REQUEST_FAIL';
export const FEED_REQUEST_SUCCESS = 'FEED_REQUEST_SUCCESS';
export const FEED_REQUEST_PENDING = 'FEED_REQUEST_PENDING';

export function getFeed() {
    return function(dispatch) {
        dispatch({type: FEED_REQUEST_PENDING});
        api.getFeed()
        .then((res) => {
            if (res && res.success) {
                return dispatch(updateFeed(res.orders, res.total, res.totalToday));
            }
            throw new Error("Произошла ошибка при получении списка заказов.")
        })
        .catch((err) => {
          console.log(err);
          dispatch({type: FEED_REQUEST_FAIL});
        })
    };
}

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