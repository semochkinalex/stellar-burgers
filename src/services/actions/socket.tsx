import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
  } from '../constants/index';


interface IAddSocket {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload?: string;
}

interface IConfirmSocket {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface ISocketError {
    readonly type: typeof WS_CONNECTION_ERROR;
}

interface ICloseSocket {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IRemoveSocket {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export type TSocketActions = IAddSocket | IRemoveSocket | IConfirmSocket | ISocketError | ICloseSocket; // for future maybe 

export function addSocketConnection(url: string) {
    return {type: WS_CONNECTION_START, payload: url};
}

export function removeSocketConnection() {
    return {type: WS_CONNECTION_CLOSED}
}