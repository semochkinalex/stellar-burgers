import { getFeed } from '../actions/feed';

import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
  } from '../actions/socket';

export const socketMiddleware = () => {
    return store => {
      let socket = null;
  
      return next => action => {
        const { dispatch, getState} = store;
        const { type, payload } = action;

        if (type === WS_CONNECTION_START) {
            socket = new WebSocket(payload);
        }

        if (socket) {
            socket.onopen = event => {
                dispatch({type: WS_CONNECTION_SUCCESS, payload: event});
            }
        
            socket.onclose = event => {
                dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
            };
        
            socket.onerror = event => {
                dispatch({ type: WS_CONNECTION_ERROR, payload: event });
            };
        
            socket.onmessage = event => {
                const {success, orders = [], total = 0, totalToday = 0} = JSON.parse(event.data);
                success && dispatch(getFeed(orders, total, totalToday));
            };
        }   
  
        next(action);
      };
    };
  };