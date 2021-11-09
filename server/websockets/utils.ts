import Game from '../game-logic/Game';

/**
 * Adds new game to games array
 * @param games Games array
 * @param gameToAdd Game to add
 * @returns Games array with added game
 */
export const addGame = (games: Game[], gameToAdd: Game): Game[] =>
  games.concat(...games, gameToAdd);

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
 * @returns Games array with updated game
 */
export const updateGame = (games: Game[], updatedGame: Game): Game[] =>
  games.map((game: Game) =>
    updatedGame.roomId === game.roomId ? updatedGame : game
  );

/**
 * Remove game from games array. Doesn't check does games array include game id to remove
 * @param games Games Array
 * @param gameIdToRemove Game ID to remove
 * @returns Games array without parameter game
 */
export const removeGame = (games: Game[], gameIdToRemove: string): Game[] =>
  games.filter((game: Game) => game.roomId !== gameIdToRemove);
