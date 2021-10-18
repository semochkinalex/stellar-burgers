import { updateFeed } from '../actions/feed';

import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
  } from '../constants/index';

import { AnyAction } from "redux";

export const middleware = () => {
    return (store: { dispatch: any; }) => {
      let socket: WebSocket | null = null;
  
      return (next: (a: AnyAction) => void) => (action: AnyAction) => {
        const { dispatch } = store;
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
              success && dispatch(updateFeed(orders, total, totalToday));
            };
        }   
  
        next(action);
      };
    };
  };
  