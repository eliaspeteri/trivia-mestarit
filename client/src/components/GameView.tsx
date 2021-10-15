import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

/** Components */
import ProgressBar from './ProgressBar';
import TextCard from './TextCard';

/** UI, CSS */
import { Container, Grid, Icon } from 'semantic-ui-react';
import '../styles/GameView.css';

/** Config / Socket */
import { socket } from '../config';

/** Types */
import { GameData } from '../../../server/game-logic/Game';

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
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [gameData, setGameData] = useState<GameData>();

  useEffect(() => {
    socket.connect();
    socket.emit('join-game', nick, gameId, isHost);
  }, [gameId, isHost, nick]);

  socket.on('game-data', (gameData: GameData) => setGameData(gameData));

  socket.on('game-over', (gameData: GameData) => {
    /** Implement login when game ends ( TM-71 ) */
    setGameData(undefined);
  });

  /** Implement socket disconnect logic in the future */
  const leaveGameView = (): void => {
    setShowGameView(false);
  };

  const handleExitIconClick = (): void => {
    window.confirm('Do you want to abort game?') && leaveGameView();
  };

  return (
    <>
      <Icon
        onClick={handleExitIconClick}
        bordered
        className="sign-out-icon"
        name="sign out"
        size="huge"
      />
      {!gameData ? (
        <Container textAlign="center">
          <h1 style={{ color: 'white' }}>Game not started</h1>
        </Container>
      ) : (
        <Container>
          <Grid columns={1} className="game-view-content" container>
            <Grid.Column>
              <TextCard
                className={'question-card'}
                text={gameData?.question.question}
              />
            </Grid.Column>

            <Grid.Column stretched columns={1}>
              <TextCard
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
                text={gameData.question.answers[0]}
              />
            </Grid.Column>

            <Grid.Column stretched columns={1}>
              <TextCard
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
                text={gameData.question.answers[1]}
              />
            </Grid.Column>

            <Grid.Column>
              <TextCard
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
                text={gameData.question.answers[2]}
              />
            </Grid.Column>

            <Grid.Column>
              <TextCard
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
                text={gameData.question.answers[3]}
              />
            </Grid.Column>

            <Grid.Column columns={1}></Grid.Column>

            <ProgressBar progress={22} />
          </Grid>
        </Container>
      )}
    </>
  );
};

export default GameView;
