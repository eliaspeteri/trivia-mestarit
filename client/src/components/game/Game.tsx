import React, { useEffect, useState } from 'react';

/** Components */
import ProgressBar from './ProgressBar';
import QuestionIndicator from './QuestionIndicator';

/** Css UI */
import { Container, Grid, Header, Segment } from 'semantic-ui-react';
import '../../styles/GameView.css';

/** Types, Config, Socket */
import { GameData } from 'game-common';
import { socket } from '../../services/socket';
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
      <h1 style={{ color: 'white' }}>{gameId}</h1>
      <Grid columns={1} className="game-view-content" container>
        <Grid.Column>
          <QuestionIndicator
            currentQuestion={gameData.currentQuestionIndex}
            questionTotal={gameData.questionsTotal}
          />
        </Grid.Column>

        <Grid.Column stretched={true}>
          {/** Question Segment */}
          <Segment className={'question-card'} size="massive" circular>
            <Header as={'h1'}>
              {gameData?.currentQuestion?.question || ''}
            </Header>
          </Segment>
        </Grid.Column>

        <Grid.Column>{mapAnswerCards()}</Grid.Column>
        <Grid.Column>
          <ProgressBar progress={gameData.timeLeftToAnswer} />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Game;
