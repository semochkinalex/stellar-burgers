import thunk from 'redux-thunk';
import { rootReducer } from './reducers/index';
import { compose, createStore, applyMiddleware } from 'redux';
import { middleware } from './middlewares/middleware';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, middleware()));

export const store = createStore(rootReducer, enhancer);