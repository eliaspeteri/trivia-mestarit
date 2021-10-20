import React from 'react';

/** CSS, UI */
import { Progress } from 'semantic-ui-react';

/** Const(s) */
import { timeToAnswerQuestion } from 'game-common';

interface Props {
  progress: number;
}

const ProgressBar: React.FC<Props> = ({ progress }: Props) => {
  return (
    <Progress
      autoSuccess
      color={'orange'}
      size={'large'}
      value={progress === 0 ? timeToAnswerQuestion : progress}
      total={timeToAnswerQuestion}
      style={{ border: '2px white solid' }}
    ></Progress>
  );
};

export default ProgressBar;
