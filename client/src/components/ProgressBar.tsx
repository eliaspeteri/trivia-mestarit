import React from 'react';

interface Props {
  progress: number;
}

const ProgressBar: React.FC<Props> = ({ progress }: Props) => {
  return <div>Very cool and funny progressbar br... {`${progress}`} %</div>; 
};

export default ProgressBar; 
