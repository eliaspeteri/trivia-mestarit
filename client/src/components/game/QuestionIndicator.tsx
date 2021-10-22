import React from 'react';

/** Css, UI */
import { Label } from 'semantic-ui-react';

interface Props {
  currentQuestion: number;
  questionTotal: number;
}

const QuestionIndicator: React.FC<Props> = ({
  currentQuestion,
  questionTotal
}: Props) => {
  return (
    <Label color={'orange'} size={'huge'}>
      {`Question ${currentQuestion + 1} of ${questionTotal}`}
    </Label>
  );
};

export default QuestionIndicator;
