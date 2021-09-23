import React from 'react';

interface Props {
  progress: number;
}

const ProgressBar: React.FC<Props> = ({ progress }: Props) => {

  return (
    <div>
      <h1 style={{ color: 'white' }}>
  return <div>Very cool and funny progressbar br... {`${progress}`} %</div>; 
  </h1>
</div>

);
};

export default ProgressBar; 
