import { io } from 'socket.io-client';

/** In package.json proxy -> localhost:8080 */
export const LOCALHOST = '';
export const socket = io(LOCALHOST, {
  /** Can't DDoS with F5  */
  transports: ['websockets', 'polling'],
  upgrade: false,
  autoConnect: false,
  reconnection: false
});
