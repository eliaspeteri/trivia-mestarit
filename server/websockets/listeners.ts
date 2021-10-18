/** Sockets */
import { Socket } from 'socket.io';
import { Server as SocketServer } from 'socket.io';
/** Components */
import Game from '../game-logic/Game';

/** Utils */
import { gameIdExists, findGameByRoomId, updateGameArray } from './utils';
import logger from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

/** MockUp Data */
import { mockUpQuestions } from '../game-logic/mockupData';

/** Game config */
import { totalTimeEachQuestion } from '../game-logic/gameConfig';

let games: Game[] = [];

export const setListeners = (io: SocketServer): void => {
  /** Send every game's game data */
  setInterval(() => {
    games.forEach((game: Game) => {
      if (game.isGameActive()) {
        logger.info(game.getGameData());
      }

      if (game.isLastQuestion()) {
        io.to(game.roomId).emit('game-over', game.getGameData());
        games.splice(games.indexOf(game));
        return;
      }

      game.isGameActive() &&
        io.to(game.roomId).emit('game-data', game.getGameData());
    });
  }, 1 * 1000);

  io.on('connection', (socket: Socket) => {
    socket.on('host-game', (callback: CallableFunction) => {
      const roomId: string = uuidv4().toString();
      games.push(new Game(roomId, mockUpQuestions));

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
        games = updateGameArray(games, game);
      }
    );
  });
};
