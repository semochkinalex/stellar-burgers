import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';

import { TFeedActions } from '../actions/feed';
import { TConstructorActions } from '../actions/constructor';
import { TUserActions } from '../actions/user';
import { TSocketActions } from '../actions/socket';
import { TIngredientsActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { TIndexActions } from '../actions';


export type TApplicationActions = TConstructorActions | TFeedActions | TUserActions | TSocketActions | TIngredientsActions | TOrderActions | TIndexActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ActionCreator<
ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;
export type AppDispatch = typeof store.dispatch | AppThunk;