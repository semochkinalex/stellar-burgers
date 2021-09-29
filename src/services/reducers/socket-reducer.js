import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
  } from '../actions/socket';
  
  const initialState = {
    socketConnected: false,
    orders: []
  };
  
export const socketReducer = (state = initialState, action) => {
    switch (action.type) {
      case WS_CONNECTION_START : 
        return {
            ...state, 
            socketConnected: false,
        }
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          socketConnected: true
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          socketConnected: false
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          socketConnected: false
        };
      default:
        return state;
    }
  };
  