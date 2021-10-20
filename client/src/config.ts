import socketClient from 'socket.io-client'

/** In package.json proxy -> localhost:8080 */
export const LOCALHOST = '';
export const socket = socketClient(LOCALHOST, {
  /** Can't DDoS with F5  */
  transports: ['websocket'],
  upgrade: false,
  autoConnect: false,
  reconnection: false
});