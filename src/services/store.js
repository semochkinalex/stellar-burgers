import thunk from 'redux-thunk';
import { rootReducer } from './reducers/index';
import { compose, createStore, applyMiddleware } from 'redux';
import { socketMiddleware } from './middlewares/socketMiddleware';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware()));

export const store = createStore(rootReducer, enhancer);
