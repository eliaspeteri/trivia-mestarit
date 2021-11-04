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

/** QuestionService */
import QuestionService from '../services/questions';

/** MockUp Data */
//import { mockUpQuestions } from '../game-logic/mockupData';

/** Game config, types */
import { GameData, TOTAL_TIME_PER_QUESTION, Question } from 'game-common';

export const setListeners = (io: SocketServer): void => {
  let games: Game[] = [];

  /** Send every game's game data */
  setInterval(() => {
    games.forEach((game: Game) => {
      if (game.isLastQuestion()) {
        io.to(game.roomId).emit('game-over', game.getGameData());
        games = removeGame(games, game.roomId);
        return;
      }

      if (game.isGameActive()) {
        const gameData: GameData = game.getGameData();
        logger.info(gameData);
        io.to(game.roomId).emit('game-data', gameData);
      }
    });
  }, 1 * 1000);

  io.on('connection', (socket: Socket) => {
    logger.info(`Socket ID connected: ${socket.id}`);

    socket.on('host-game', async (callback: CallableFunction) => {
      const roomId: string = uuidv4().toString();
      const gameQuestions: Question[] =
        await QuestionService.getRandomQuestions(3);

      games = addGame(games, new Game(roomId, gameQuestions));
      /** Returns room ID to client */
      callback({
        gameId: roomId
      });
    });

    socket.on(
      'join-game',
      (nick: string, roomId: string, isHost, callback: CallableFunction) => {
        if (!gameIdExists(games, roomId)) {
          callback({ error: true, message: 'No Game with ID' });
          return;
        }

        const game: Game = findGameByRoomId(games, roomId);
        socket.join(game.roomId);
        game.addPlayer(nick, isHost);
      }
    );

    socket.on('start-game', (gameId: string) => {
      gameIdExists(games, gameId) &&
        findGameByRoomId(games, gameId).startGame(TOTAL_TIME_PER_QUESTION);
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
