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
        } 
        if (socket) {
            socket.onclose = event => {
                dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
            };
        }

        if (socket) {
            socket.onerror = event => {
                dispatch({ type: WS_CONNECTION_ERROR, payload: event });
            };
        }

        if (socket) {
            socket.onmessage = event => {
                const { data } = event;
                const parsedData = JSON.parse(data);
                console.log(parsedData);
                // const { success, ...restParsedData } = parsedData;
      
                // dispatch({ type: onMessage, payload: restParsedData });
            };
        }

        // console.log(url);
        // console.log(token);

        // if (type === wsInit && user) {
        //   socket = new WebSocket(`${wsUrl}?token=${token}`);
        // }
        // if (socket) {
        //   socket.onopen = event => {
        //     dispatch({ type: onOpen, payload: event });
        //   };
  
        //   socket.onerror = event => {
        //     dispatch({ type: onError, payload: event });
        //   };
  
        //   socket.onmessage = event => {
        //     const { data } = event;
        //     const parsedData = JSON.parse(data);
        //     const { success, ...restParsedData } = parsedData;
  
        //     dispatch({ type: onMessage, payload: restParsedData });
        //   };
  
        //   socket.onclose = event => {
        //     dispatch({ type: onClose, payload: event });
        //   };
  
        //   if (type === wsSendMessage) {
        //     const message = { ...payload, token: user.token };
        //     socket.send(JSON.stringify(message));
        //   }
        // }
  
        next(action);
      };
    };
  };
  