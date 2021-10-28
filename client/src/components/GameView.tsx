import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

/** Components */
import Game from './game/Game';

/** UI, CSS */
import { Button, Container, Icon } from 'semantic-ui-react';
import '../styles/GameView.css';

/** Socket */
import { socket } from '../config';

/** Types */
import { GameData } from 'game-common';
import GameOver from './game/GameOver';

interface Props {
  gameId: string;
  isHost: boolean;
  nick: string;
  setShowGameView: Dispatch<SetStateAction<boolean>>;
}

const GameView: React.FC<Props> = ({
  gameId,
  isHost,
  nick,
  setShowGameView
}: Props) => {
  const [gameData, setGameData] = useState<GameData>();
  const [showGameOver, setShowGameOver] = useState<boolean>(false);

  /** Try to connect to game on initialize render */
  useEffect(() => {
    socket.connect();
    // eslint-disable-next-line
    socket.emit('join-game', nick, gameId, isHost, (response: any) => {
      /** Alert if no game found with ID */
      response.error && alert(response.message);
    });
  }, [gameId, isHost, nick]);

  socket.on('game-data', (gameData: GameData) => setGameData(gameData));
  socket.once('game-over', (gameData: GameData) => {
    setGameData(gameData);
    setShowGameOver(true);
  });

  const handleStartGame = (): void => {
    socket.emit('start-game', gameId);
  };

  const handleExitIconClick = (): void => {
    if (window.confirm('Do you want to abort game?')) {
      socket.disconnect();
      setShowGameView(false);
    }
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Icon
        color={'orange'}
        onClick={handleExitIconClick}
        className="sign-out-icon"
        name="sign out"
        size="huge"
      />

      {showGameOver ? (
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        <GameOver players={gameData!.players} />
      ) : !gameData ? (
        <Container>
          <h1 style={{ color: 'white' }}>Game not started</h1>
          <h1 style={{ color: 'white' }}>{`Game ID: ${gameId}`}</h1>
          {isHost && <Button content={'START'} onClick={handleStartGame} />}
        </Container>
      ) : (
        <Game gameId={gameId} nick={nick} gameData={gameData} />
      )}
    </div>
  );
};

export default GameView;
