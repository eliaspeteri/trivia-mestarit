import React from 'react';

/** Css, UI */
import { Icon } from 'semantic-ui-react';

interface Props {
  currentQuestion: number;
  questionTotal: number;
}

const QuestionIndicator: React.FC<Props> = ({
  currentQuestion,
  questionTotal
}: Props) => {
  return (
    <>
      {/** Create array of numbers [0, 1, 2, 3, ...questionTotal] */}
      {Array.from(Array(questionTotal).keys()).map(
        (renderedQuestion: number) => (
          <Icon
            key={renderedQuestion}
            color={'orange'}
            disabled={renderedQuestion > currentQuestion}
            name={'question'}
            size={'big'}
          />
        )
      )}
    </>
  );
};

export default QuestionIndicator;
