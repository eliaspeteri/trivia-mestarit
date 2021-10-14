import { Socket } from 'socket.io';
import { Server as SocketServer } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

// Näiden tilalle games: Game[], jossa tieto käynnissä olevista peleistä
const joinedNicknames: string[] = [];
const hosts: string[] = [];
const gameIds: string[] = [];

export const setListeners = (io: SocketServer): void => {
  io.on('connection', (socket: Socket) => {
    socket.on('host-game', (callback: CallableFunction) => {
      const roomId: string = uuidv4().toString();
      gameIds.push(roomId);
      callback({
        gameId: roomId
      });
    });

    socket.on('join-game', (nick: string, gameId: string, isHost = false) => {
      if (gameIds.includes(gameId)) {
        isHost && hosts.push(nick);
        joinedNicknames.push(nick);
      }
    });
  });
};
