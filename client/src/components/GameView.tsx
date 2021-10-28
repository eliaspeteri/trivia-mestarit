import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

/** Components */
import Game from './game/Game';

/** UI, CSS */
import { Container, Icon } from 'semantic-ui-react';
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
}

const GameView: React.FC<Props> = ({ gameId, isHost, nick }: Props) => {
  const [gameData, setGameData] = useState<GameData>();
  const [showGameOver, setShowGameOver] = useState<boolean>(false);

  const history = useHistory();

  socket.on('game-data', (gameData: GameData) => setGameData(gameData));
  socket.once('game-over', (gameData: GameData) => {
    setGameData(gameData);
    setShowGameOver(true);
  });

  /** Try to connect to game on initialize render */
  useEffect(() => {
    socket.connect();
    socket.emit('join-game', nick, gameId, isHost);
  }, [gameId, isHost, nick]);

  const leaveGameView = (): void => {
    socket.disconnect();
    // setShowGameView(false);
    history.push('/');
  };

  const handleExitIconClick = (): void => {
    window.confirm('Do you want to abort game?') && leaveGameView();
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
        </Container>
      ) : (
        <Game gameId={gameId} nick={nick} gameData={gameData} />
      )}
    </div>
  );
};

export default GameView;
