import { TSocketActions } from '../actions/socket';

import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
  } from '../constants/index';

type TSocketState = {
  socketConnected: boolean;
}
  
const initialState: TSocketState = {
  socketConnected: false,
};
  
export const socketReducer = (state = initialState, action: TSocketActions) => {
    switch (action.type) {
      case WS_CONNECTION_START : { 
        return {
            ...state, 
            socketConnected: false,
        }
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
  