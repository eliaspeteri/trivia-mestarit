import React from 'react';

/** CSS */
import { Progress } from 'semantic-ui-react';

/** Const */
import { timeToAnswerQuestion } from 'game-common';

interface Props {
  progress: number;
}

/** 50000 value correspond const on server/game-logic/config --> timeToAnswerQuestion */

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
