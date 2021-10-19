import React from 'react';

import { Progress } from 'semantic-ui-react';

interface Props {
  progress: number;
}

const ProgressBar: React.FC<Props> = ({ progress }: Props) => {
  return (
    <Progress
      color={'orange'}
      size={'large'}
      value={34}
      total={50}
      style={{ border: '2px white solid' }}
    ></Progress>
  );
};

export default ProgressBar;
