import React from 'react';

interface Props {
  progress: number;
}

const ProgressBar: React.FC<Props> = ({ progress }: Props) => {
  return (
    <div>
      <h1 style={{ color: 'white' }}>
        Very cool and funny progressbar br... {`${progress} `} %
      </h1>
    </div>
  );
};

export default ProgressBar;
