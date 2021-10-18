import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../constants/index';
import { addSocketConnection, removeSocketConnection } from '../actions/socket';

describe('Actions with sockets', () => {
  it('Start connection', () => {
    expect(addSocketConnection('example.org')).toEqual({type: WS_CONNECTION_START, payload: 'example.org'});
  })
  it('End connection', () => {
      expect(removeSocketConnection()).toEqual({type: WS_CONNECTION_CLOSED});
  })
})