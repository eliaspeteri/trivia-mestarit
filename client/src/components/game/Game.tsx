import React, { useEffect, useState } from 'react';

/** Components */
import GameSegment from './GameSegment';
import ProgressBar from './ProgressBar';
import ScoreBoard from './ScoreBoard';
import QuestionIndicator from './QuestionIndicator';
import QuestionSegment from './QuestionSegment';

/** Css UI */
import { Container, Grid, Header } from 'semantic-ui-react';
import '../../styles/GameView.css';

/** Types, Config, Socket */
import { GameData } from 'game-common';
import { socket } from '../../services/socket';

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
              /** Highlight correct answer */
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
      <Header as={'h1'} content={gameId} inverted />
      <Grid columns={1} className="game-view-content" container>
        <Grid.Column>
          <QuestionIndicator
            currentQuestion={gameData.currentQuestionIndex}
            questionTotal={gameData.questionsTotal}
          />
        </Grid.Column>

        <Grid.Column stretched={true}>
          <QuestionSegment
            question={gameData.currentQuestion?.question || ''}
          />
        </Grid.Column>

        <Grid.Column>{mapAnswerCards()}</Grid.Column>
        <Grid.Column>
          <ProgressBar progress={gameData.timeLeftToAnswer} />
        </Grid.Column>
      </Grid>

      <ScoreBoard players={gameData.players} showTopThree />
    </Container>
  );
};

export default Game;
