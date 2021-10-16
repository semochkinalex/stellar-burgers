import { combineReducers } from 'redux';
import { SWITCH_IS_MOBILE_VALUE, CLOSE_HEADER_POPUP, OPEN_HEADER_POPUP } from '../constants/index';

import { orderReducer } from './order-reducer';
import { ingredientReducer } from './ingredients-reducer';
import { constructorReducer } from './constructor-reducer';
import { userReducer } from './user-reducer';
import { feedReducer } from './feed-reducer';

import { TIndexActions } from '../actions';

type TIndexState = {
    headerPopupOpen: boolean;
    isMobileHeader: boolean;
    isMobileIngredients: boolean;
}

const initialState: TIndexState = {
    headerPopupOpen: false,
    isMobileHeader: false,
    isMobileIngredients: false,
}

const globalConfig = (state = initialState, action: TIndexActions): TIndexState => {
    switch (action.type) {
        case OPEN_HEADER_POPUP : {
            return {...state, headerPopupOpen: true};
        }
        case CLOSE_HEADER_POPUP : {
            return {...state, headerPopupOpen: false};
        }
        case SWITCH_IS_MOBILE_VALUE : {
            return {...state, isMobileIngredients: action.value <= 1250, isMobileHeader: Boolean(action.value <= 1240)};
        }
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    ingredients: ingredientReducer,
    config: globalConfig,
    burger: constructorReducer,
    order: orderReducer,
    feed: feedReducer,
    user: userReducer,
});