/** Sockets */
import { Server as SocketServer } from 'socket.io';
import { Socket } from 'socket.io';

/** Components */
import Game from '../game-logic/Game';
import logger from '../utils/logger';

/** QuestionService */
import SocketService from '../services/sockets';

/** Game config, types */
import { GameData } from 'game-common';

export const setListeners = (io: SocketServer): void => {
  /** Send every game's game data */
  setInterval(() => {
    SocketService.getGames().forEach((game: Game) => {
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
      const roomId: string = await SocketService.createGame();

      callback({
        gameId: roomId
      });
    });

    socket.on(
      'join-game',
      (nick: string, roomId: string, isHost, callback: CallableFunction) => {
        SocketService.joinGame(nick, roomId, isHost)
          ? socket.join(roomId)
          : callback({ error: true, message: 'No Game with ID' });
      }
    );

    socket.on('start-game', (gameId: string) => {
      SocketService.startGame(gameId);
    });

    socket.on(
      'selected-answer',
      (answer: string, roomId: string, nick: string) => {
        SocketService.setAnswer(answer, roomId, nick);
      }
    );
  });
};
