/** Sockets */
import { Server as SocketServer } from 'socket.io';
import { Socket } from 'socket.io';

/** Components */
import Game from '../game-logic/Game';

/** Utils */
import {
  addGame,
  findGameByRoomId,
  gameIdExists,
  updateGame,
  removeGame
} from './utils';
import logger from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

/** MockUp Data */
import { mockUpQuestions } from '../game-logic/mockupData';

/** Game config */
import { totalTimeEachQuestion } from '../game-common/index';

export const setListeners = (io: SocketServer): void => {
  let games: Game[] = [];

  /** Send every game's game data */
  setInterval(() => {
    games.forEach((game: Game) => {
      if (game.isGameActive()) {
        logger.info(game.getGameData());
      }

      if (game.isLastQuestion()) {
        io.to(game.roomId).emit('game-over', game.getGameData());
        games = removeGame(games, game.roomId);
        return;
      }

      game.isGameActive() &&
        io.to(game.roomId).emit('game-data', game.getGameData());
    });
  }, 1 * 1000);

  io.on('connection', (socket: Socket) => {
    socket.on('host-game', (callback: CallableFunction) => {
      const roomId: string = uuidv4().toString();
      games = addGame(games, new Game(roomId, mockUpQuestions));
      /** Returns room ID to client */
      callback({
        gameId: roomId
      });
    });

    socket.on('join-game', (nick: string, roomId: string, isHost = false) => {
      if (!gameIdExists(games, roomId)) return;

      const game: Game = findGameByRoomId(games, roomId);
      socket.join(game.roomId);
      game.addPlayer(nick, isHost);
      game.startGame(totalTimeEachQuestion);
    });

    socket.on(
      'selected-answer',
      (answer: string, roomId: string, nick: string) => {
        if (!gameIdExists(games, roomId)) return;

        const game = findGameByRoomId(games, roomId);
        game.setPlayerAnswer(nick, answer);
        games = updateGame(games, game);
      }
    );
  });
};
