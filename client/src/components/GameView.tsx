import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

/** Components */
import Game from './game/Game';
import ScoreBoard from './game/ScoreBoard';
import StartGame from './game/StartGame';

/** UI, CSS */
import '../styles/GameView.css';

/** Socket */
import { socket } from '../services/socket';

/** Types */
import { GameData } from 'game-common';

interface Props {
  gameId: string;
  isHost: boolean;
  nick: string;
}

const GameView: React.FC<Props> = ({ gameId, isHost, nick }: Props) => {
  const [gameData, setGameData] = useState<GameData>();
  const [showGameOver, setShowGameOver] = useState<boolean>(false);

  const history = useHistory();

  /** Try to connect to game on initialize render */
  useEffect(() => {
    // eslint-disable-next-line
    socket.emit('join-game', nick, gameId, isHost, (response: any) => {
      if (response.error) {
        alert(response.message);
        history.replace('/');
      }
      return () => {
        setShowGameOver(false);
        setGameData(undefined);
      };
    });
  }, [gameId, history, isHost, nick]);

  socket.on('game-data', (gameData: GameData) => setGameData(gameData));
  socket.once('game-over', (gameData: GameData) => {
    setGameData(gameData);
    setShowGameOver(true);
  });

  const handleStartGame = (): void => {
    socket.emit('start-game', gameId);
  };

  return (
    <div>
      {showGameOver ? (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        <ScoreBoard players={gameData!.players} />
      ) : !gameData ? (
        <StartGame
          gameId={gameId}
          isHost={isHost}
          handleStartGame={handleStartGame}
        />
      ) : (
        <Game gameId={gameId} nick={nick} gameData={gameData} />
      )}
    </div>
  );
};

export default GameView;
