/** Sockets */
import { Server as SocketServer } from 'socket.io';
import { Socket } from 'socket.io';

/** Components */
import Game from '../game-logic/Game';

/** Utils */
import logger from '../utils/logger';

/** Services */
import SocketService from '../services/sockets';

/** Game config, types */
import { GameData, TOTAL_TIME_PER_QUESTION } from 'game-common';

export const setListeners = (io: SocketServer): void => {
  /** Send every game's game data */
  setInterval(() => {
    SocketService.getAllGames().forEach((game: Game) => {
      if (game.isLastQuestion()) {
        io.to(game.roomId).emit('game-over', game.getGameData());
        SocketService.removeGame(game.roomId);
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
      const questionCount = 3;
      const roomId: string = await SocketService.addGame(questionCount);
      /** Return room ID to client */
      callback({
        gameId: roomId
      });
    });

    socket.on(
      'join-game',
      async (
        nick: string,
        roomId: string,
        isHost,
        callback: CallableFunction
      ) => {
        const isSuccess: boolean = SocketService.joinGame(nick, roomId, isHost);

        isSuccess
          ? socket.join(roomId)
          : callback({ error: true, message: 'No Game with ID' });
      }
    );

    socket.on('start-game', (gameId: string) => {
      SocketService.findGameById(gameId).startGame(TOTAL_TIME_PER_QUESTION);
    });

    socket.on(
      'selected-answer',
      (answer: string, roomId: string, nick: string) => {
        SocketService.setAnswer(answer, roomId, nick);
      }
    );
  });
};
