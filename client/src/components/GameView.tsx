import React, { useState } from 'react';

/** React components */
import QuestionCard from './QuestionCard';

/** UI, Css */
import {
  Container,
  Divider,
  Header,
  Grid,
  GridColumn
} from 'semantic-ui-react';
import '../styles/GameView.css';

/*
interface Props {
    
}
*/
const GameView: React.FC = () => {
  const [question, setQuestion] = useState<string>('vaikea kysymys');
  const [points, setPoints] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);

  return (
    <Grid className="gameview-grid">
      <Grid.Row className="points-row">
        {' '}
        asfhdsjkfhdsjkfdsjkfhdskfd asd{' '}
      </Grid.Row>
      <Grid.Row className="question-row">
        <QuestionCard question={question} />
      </Grid.Row>

      <Grid.Row columns={3}>
        <Grid.Column>3</Grid.Column>
        <Grid.Column>4</Grid.Column>
        <Grid.Column>5</Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default GameView;
