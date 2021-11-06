/** Game Class */
import Game from '../game-logic/Game';

/** Utils */
import { v4 as uuidv4 } from 'uuid';

/** Service */
import QuestionService from '../services/questions';

/** Types and constants */
import { TOTAL_TIME_PER_QUESTION } from 'game-common';
import { Question } from 'game-common';

/** Model(s) */
let games: Game[] = [];

const createGame = async (): Promise<string> => {
  const roomId: string = uuidv4().toString();
  const gameQuestions: Question[] = await QuestionService.getRandomQuestions(3);
  games = games.concat(new Game(roomId, gameQuestions));
  return roomId;
};

const findGame = (roomId: string) =>
  games.find((game: Game) => game.roomId === roomId) as Game;

const gameExists = (roomId: string): boolean =>
  games.map((game: Game) => game.roomId).includes(roomId);

const getGames = (): Game[] => {
  return games;
};

const joinGame = (nick: string, roomId: string, isHost: boolean): boolean => {
  if (!gameExists(roomId)) return false;

  findGame(roomId).addPlayer(nick, isHost);
  return true;
};

const removeGame = (gameIdToRemove: string): Game[] =>
  (games = games.filter((game: Game) => game.roomId !== gameIdToRemove));

const setAnswer = (answer: string, roomId: string, nick: string): void => {
  if (!gameExists(roomId)) return;

  const game: Game = findGame(roomId);
  game.setPlayerAnswer(nick, answer);
  games = updateGames(game);
};

const startGame = (roomId: string): void =>
  findGame(roomId).startGame(TOTAL_TIME_PER_QUESTION);

const updateGames = (updatedGame: Game): Game[] =>
  games.map((game: Game) =>
    updatedGame.roomId === game.roomId ? updatedGame : game
  );

const SocketService = {
  createGame,
  getGames,
  joinGame,
  removeGame,
  setAnswer,
  startGame
};

export default SocketService;
