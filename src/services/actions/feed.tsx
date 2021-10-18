import api from '../../utils/api';
import { AppThunk, AppDispatch } from '../types';

import { 
    FEED_REQUEST_FAIL,
    FEED_REQUEST_PENDING,
    FEED_REQUEST_SUCCESS,
} from '../constants/index';
import { TOrder } from '../types/data';

interface IFeedPending {
    readonly type: typeof FEED_REQUEST_PENDING;
}

interface IFeedFail {
    readonly type: typeof FEED_REQUEST_FAIL;
}

interface IFeedSuccess {
    readonly type: typeof FEED_REQUEST_SUCCESS;
    readonly feed: ReadonlyArray<TOrder>;
    readonly total: number;
    readonly totalToday: number;  
}

export const feedSuccess = (orders: ReadonlyArray<TOrder>, total: number, totalToday: number): IFeedSuccess => {
    return {
        type: FEED_REQUEST_SUCCESS,

        feed: orders,

        total: total,
        totalToday: totalToday,
    };
}

export type TFeedActions = IFeedPending | IFeedFail | IFeedSuccess;

export const updateFeed: AppThunk = (orders: ReadonlyArray<TOrder>, total: number, totalToday: number) => (dispatch: AppDispatch) => {
    dispatch(feedSuccess(orders, total, totalToday));
};

export const getInitialOrders: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({type: FEED_REQUEST_PENDING});
    api.getInitialOrders()
    .then((res) => {
        if (res && res.success) return dispatch({
            type: FEED_REQUEST_SUCCESS,
            
            feed: res.orders,
            
            total: res.total,
            totalToday: res.totalToday,
        });
        throw new Error("Произошла ошибка при получении списка заказов.")
    })
    .catch((err) => {
      console.log(err);
      dispatch({type: FEED_REQUEST_FAIL});
    })
};