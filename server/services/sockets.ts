/** Class, Types */
import Game from '../game-logic/Game';
import { Question } from 'game-common';

/** ID generator */

/** Service */
import QuestionService from './questions';

let games: Game[] = [];

const addGame = async (
  questionsCount: number,
  roomId: string
): Promise<void> => {
  const gameQuestions: Question[] = await QuestionService.getRandomQuestions(
    questionsCount
  );

  const newGame = new Game(roomId, gameQuestions);
  games = games.concat(...games, newGame);

  console.log(`games`, games);
};

const findGameById = (roomId: string): Game =>
  games.find((game: Game) => game.roomId === roomId) as Game;

const gameIdExists = (roomId: string): boolean =>
  games.map((game: Game) => game.roomId).includes(roomId);

const getAllGames = (): Game[] => games;

const joinGame = (nick: string, roomId: string, isHost: boolean): boolean => {
  console.log(`games`, games);
  if (!gameIdExists(roomId)) return false;

  const game: Game = findGameById(roomId);
  game.addPlayer(nick, isHost);
  return true;
};

const setAnswer = (answer: string, roomId: string, nick: string): void => {
  const game: Game = findGameById(roomId);
  game.setPlayerAnswer(nick, answer);
  games = updateGame(game);
};

const removeGame = (gameId: string): Game[] =>
  games.filter((game: Game) => game.roomId !== gameId);

const updateGame = (updatedGame: Game): Game[] =>
  games.map((game: Game) =>
    updatedGame.roomId === game.roomId ? updatedGame : game
  );

const SocketService = {
  addGame,
  findGameById,
  getAllGames,
  joinGame,
  removeGame,
  setAnswer
};

export default SocketService;
