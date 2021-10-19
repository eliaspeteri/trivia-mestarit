import socketClient from 'socket.io-client'

export const LOCALHOST = 'localhost:8080';
export const socket = socketClient(LOCALHOST, {
  /** Can't DDoS with F5  */
  transports: ['websocket'],
  upgrade: false,
  autoConnect: false,
  reconnection: false
});