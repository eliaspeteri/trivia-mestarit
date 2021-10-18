import React, { useEffect, useState } from 'react';

/** Components */
import ProgressBar from './ProgressBar';
import TextCard from './TextCard';

/** Css UI */
import { Container, Grid } from 'semantic-ui-react';
import '../../styles/GameView.css';

/** Types, Confg, Socket */
import { GameData } from '../../../../server/game-logic/gametypes';
import { socket } from '../../config';

interface Props {
  gameId: string;
  nick: string;
  gameData: GameData;
  showCorrectAnswer: boolean;
}

const Game: React.FC<Props> = ({
  gameId,
  nick,
  gameData,
  /** Flag from backend when show correct answer */
  showCorrectAnswer
}: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  useEffect(() => {
    socket.emit('selected-answer', selectedAnswer, gameId, nick);
  });

  const mapAnswerCards = (): JSX.Element[] => {
    return gameData?.currentQuestion?.answers.map(
      (answer: string, index: number) => (
        <Grid.Column stretched columns={1} key={index}>
          <TextCard
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            text={answer}
            showCorrectAnswer={
              showCorrectAnswer &&
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
        <Grid.Column>
          <TextCard
            className={'question-card'}
            text={gameData?.currentQuestion?.question || ''}
          />
        </Grid.Column>

        {mapAnswerCards()}

        <ProgressBar progress={22} />
      </Grid>
    </Container>
  );
};

export default Game;
