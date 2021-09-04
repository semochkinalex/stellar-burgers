import { combineReducers } from 'redux';
import { SWITCH_IS_MOBILE_VALUE } from '../actions/index';

import { popupsReducer } from './popups-info';
import { ingredientReducer } from './ingredients-reducer';

const initialState = {
    isMobileHeader: false,
    isMobileIngredients: false,
}

const globalConfig = (state = initialState, action) => {
    switch (action.type) {
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
    popups: popupsReducer,
});