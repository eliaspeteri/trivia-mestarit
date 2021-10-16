import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

/** Components */
import Game from './game/Game';

/** UI, CSS */
import { Container, Icon } from 'semantic-ui-react';
import '../styles/GameView.css';

/** Socket */
import { socket } from '../config';

/** Types */
import { GameData, Player } from '../../../server/game-logic/gametypes';

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

  socket.on('game-data', (gameData: GameData) => setGameData(gameData));

  socket.once('game-over', (playersPoints: Player[]) => {
    console.log('game ended socket', playersPoints);
  });

  /** Try to connect to game on initialize render */
  useEffect(() => {
    socket.connect();
    socket.emit('join-game', nick, gameId, isHost);
  }, [gameId, isHost, nick]);

  /** Implement socket disconnect logic in the future ( TM-71 ) */
  const leaveGameView = (): void => {
    setShowGameView(false);
  };

  const handleExitIconClick = (): void => {
    window.confirm('Do you want to abort game?') && leaveGameView();
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Icon
        onClick={handleExitIconClick}
        bordered
        className="sign-out-icon"
        name="sign out"
        size="huge"
      />
      {!gameData ? (
        <Container>
          <h1 style={{ color: 'white' }}>Game not started</h1>
        </Container>
      ) : (
        <Game
          gameId={gameId}
          nick={nick}
          gameData={gameData}
          showCorrectAnswer={gameData.showCorrectAnswer}
        />
      )}
    </div>
  );
};

export default GameView;
