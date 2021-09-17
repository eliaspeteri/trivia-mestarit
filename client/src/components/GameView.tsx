import React from 'react';

/** Components */
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';

/** UI, Css */
import { Button } from 'semantic-ui-react';
import '../styles/GameView.css';

const GameView: React.FC = () => {
  const procent = 22;
  const question = '1 + 1 is three';

  return (
    <main className="gameview">
      <QuestionCard className={'question-card'} question={question} />
      <div className="answer-btn-row">
        <Button size="massive" className="answer-btn">
          answer1
        </Button>
        <Button size="massive" className="answer-btn">
          answer2
        </Button>
      </div>
      <div className="answer-btn-row">
        <Button size="massive" className="answer-btn">
          answer3
        </Button>
        <Button size="massive" className="answer-btn">
          answer4
        </Button>
      </div>
      <div>
      <ProgressBar progress={procent} />
      </div>
    </main>
  );
};

export default GameView;
