import { combineReducers } from 'redux';
import { SWITCH_IS_MOBILE_VALUE, CLOSE_HEADER_POPUP, OPEN_HEADER_POPUP } from '../actions/index';

import { orderReducer } from './order-reducer';
import { ingredientReducer } from './ingredients-reducer';
import { constructorReducer } from './constructor-reducer';
import { inspectedElementReducer } from './inspected-element-reducer';

const initialState = {
    headerPopupOpen: false,
    isMobileHeader: false,
    isMobileIngredients: false,
}

const globalConfig = (state = initialState, action) => {
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
    inspectedElement: inspectedElementReducer,
    order: orderReducer,
});