import React, { useEffect, useState } from 'react';

/** Components */
import ProgressBar from './ProgressBar';

/** Css UI */
import { Container, Grid, Segment, Header } from 'semantic-ui-react';
import '../../styles/GameView.css';

/** Types, Config, Socket */
import { GameData } from '../../../../server/game-logic/gametypes';
import { socket } from '../../config';
import GameSegment from './GameSegment';

interface Props {
  gameId: string;
  nick: string;
  gameData: GameData;
}

const Game: React.FC<Props> = ({ gameId, nick, gameData }: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  useEffect(() => {
    socket.emit('selected-answer', selectedAnswer, gameId, nick);
  });

  const mapAnswerCards = (): JSX.Element[] => {
    return gameData?.currentQuestion?.answers.map(
      (answer: string, index: number) => (
        <Grid.Column stretched columns={1} key={index}>
          <GameSegment
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            text={answer}
            highlightCorrectAnswer={
              gameData.showCorrectAnswer &&
              answer === gameData.currentQuestion.correctAnswer
            }
          />
        </Grid.Column>
      )
    );
  };

  return (
    <Container>
      <Grid columns={1} className="game-view-content" container>
        <Grid.Column stretched={true}>
          <Segment className={'question-card'} size="massive">
            <Header as={'h1'}>
              {gameData?.currentQuestion?.question || ''}
            </Header>
          </Segment>
        </Grid.Column>

        <Grid.Column>{mapAnswerCards()}</Grid.Column>

        <ProgressBar progress={22} />
      </Grid>
    </Container>
  );
};

export default Game;
