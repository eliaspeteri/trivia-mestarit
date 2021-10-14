/** Sockets */
import { Socket } from 'socket.io';
import { Server as SocketServer } from 'socket.io';

/** Components */
import Game from '../game-logic/Game';

/** Utils */
import { v4 as uuidv4 } from 'uuid';
import { gameIdExists, findGameByRoomId } from './utilts';

const games: Game[] = [];

export const setListeners = (io: SocketServer): void => {
  /** Send every game's game data */
  setInterval(() => {
    games.forEach((game: Game) => {
      io.to(game.roomId).emit('game-data', game.getGameData());
    });
  }, 3000);

  io.on('connection', (socket: Socket) => {
    socket.on('host-game', (callback: CallableFunction) => {
      const roomId: string = uuidv4().toString();
      games.push(new Game(roomId));

      /** Returns room ID to client */
      callback({
        gameId: roomId
      });
    });

    socket.on('join-game', (nick: string, roomId: string, isHost = false) => {
      if (!gameIdExists(games, roomId)) return;

      const game: Game = findGameByRoomId(games, roomId);
      game.addPlayer(nick, isHost);
    });
  });
};
