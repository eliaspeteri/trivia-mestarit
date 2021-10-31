import React from 'react';

/** CSS, UI */
import BootStrapProgress from 'react-bootstrap/ProgressBar';

/** Const(s) */
import { TIME_TO_ANSWER_QUESTION } from 'game-common';

interface Props {
  /** Time left to answer in ms */
  progress: number;
}

const ProgressBar: React.FC<Props> = ({ progress }: Props) => {
  return (
    <BootStrapProgress
      animated
      /** Looks smoother when correct answer
       *  doesn't pop immediately after progress
       *  reach zero
       */
      max={TIME_TO_ANSWER_QUESTION}
      min={1 * 1000}
      now={progress}
    />
  );
};

export default ProgressBar;
