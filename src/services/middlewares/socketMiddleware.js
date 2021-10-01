import { updateFeed } from '../actions/order';
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

        const user = getState().user; // token is with bearer  

        if (user.token && type === WS_CONNECTION_START) {
            socket = new WebSocket(payload);
            // socket = new WebSocket(`${payload}?token=${user?.token.split(" ")[1]}`); // payload = url
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
                console.log("ONMESSAGE");
                const {success, orders = [], total = 0, totalToday = 0} = JSON.parse(event.data);
                success && dispatch(updateFeed(orders, total, totalToday));
            };
        }   
  
        next(action);
      };
    };
  };
  