import React from 'react';

/** CSS */
import { Progress } from 'semantic-ui-react';

interface Props {
  progress: number;
}

/** 50000 value correspond const on server/game-logic/config --> timeToAnswerQuestion */

const ProgressBar: React.FC<Props> = ({ progress }: Props) => {
  console.log(`progress`, progress);
  return (
    <Progress
      autoSuccess
      color={'orange'}
      size={'large'}
      value={progress === 0 ? 50000 : progress}
      total={50000}
      style={{ border: '2px white solid' }}
    ></Progress>
  );
};

export default ProgressBar;
