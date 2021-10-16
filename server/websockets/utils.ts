import Game from '../game-logic/Game';

/**
 * WILL CRASH IF NO GAME WITH ROOMID !!!
 * Check first for example with gameIdExists()
 * @param games Games array
 * @param roomId game id to search
 * @returns Game corresponding id
 */
export const findGameByRoomId = (games: Game[], roomId: string): Game =>
  games.find((game: Game) => game.roomId === roomId) as Game;

/**
 * @param games Games array
 * @param roomId game id to check
 * @returns true if game with id exists
 */
export const gameIdExists = (games: Game[], roomId: string): boolean =>
  games.map((game: Game) => game.roomId).includes(roomId);

/**
 * Replaces games array with updated game
 * @param games Games array
 * @param updatedGame updated game, which is replaced in games array
 * @returns All games with updated game
 */
export const updateGameArray = (games: Game[], updatedGame: Game): Game[] =>
  games.map((game: Game) =>
    updatedGame.roomId === game.roomId ? updatedGame : game
  );