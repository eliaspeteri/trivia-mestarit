import { Socket } from 'socket.io';
import { Server as SocketServer } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

export const setListeners = async (io: SocketServer): Promise<void> => {
  await io.on('connection', (socket: Socket) => {
    console.log(`client joined: ${socket.id}`);

    socket.on('host-game', (callback: CallableFunction) => {
      const roomId: string = uuidv4().toString();
      socket.join(roomId);
      callback({
        gameId: roomId
      });
    });
  });
};
