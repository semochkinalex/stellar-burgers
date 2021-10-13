import api from '../../utils/api';
import { resetBurger } from './constructor';
import { getUsersOrderHistory } from './user';
import { AppThunk, AppDispatch } from '../types';

import { 
    OPEN_ORDER_POPUP,
    CLOSE_ORDER_POPUP,
    ORDER_POPUP_REQUEST_PENDING,
    ORDER_POPUP_REQUEST_FAIL,
 } from '../constants/index';
import { TIngredient } from '../types/data';

interface IOrderPending {
    readonly type: typeof ORDER_POPUP_REQUEST_PENDING;
}

interface IOrderFail {
    readonly type: typeof ORDER_POPUP_REQUEST_FAIL;
}

interface IOrderSuccess {
    readonly type: typeof OPEN_ORDER_POPUP;
    readonly order: {
        readonly name: string;
        readonly number: number;
    };
}

interface IOrderClosePopup {
    readonly type: typeof CLOSE_ORDER_POPUP;
}

export type TOrderActions = IOrderPending | IOrderFail | IOrderSuccess | IOrderClosePopup;

export const handleOrder: AppThunk = (ingredients: ReadonlyArray<TIngredient>, bun: TIngredient, token: string) => (dispatch: AppDispatch) => {
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
            dispatch(resetBurger());
            return dispatch(getUsersOrderHistory(token));
        }
        throw new Error("Произошла ошибка при создании заказа.")
    })
    .catch((err) => {
      console.log(err);
      dispatch({type: ORDER_POPUP_REQUEST_FAIL});
    })
};