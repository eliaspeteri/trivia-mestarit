import { Socket } from 'socket.io';
import { Server as SocketServer } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

export const setListeners = (io: SocketServer): void => {
  io.on('connection', (socket: Socket) => {
    socket.on('host-game', (callback: CallableFunction) => {
      const roomId: string = uuidv4().toString();
      socket.join(roomId);
      callback({
        gameId: roomId
      });
    });
  });
};
