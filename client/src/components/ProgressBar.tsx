import React from 'react'




interface Props {
  progress: number;
  timeleft: number;
}

const ProgressBar: React.FC<Props> = ({ progress, timeleft }: Props) => {
  return (
        <div className='ui progress'>
            <div className='bar' style={{width: `${progress}%`}}>
           <div className='progress progress-text'>{timeleft} Seconds Left</div>
          </div>
          </div>
  );
}; 

export default ProgressBar; 
 