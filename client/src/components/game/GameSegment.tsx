import React, { Dispatch, SetStateAction } from 'react';

/** Types */
import CSS from 'csstype';

/** UI, CSS */
import { Header, Segment } from 'semantic-ui-react';

const correctStyles: CSS.Properties = {
  backgroundColor: 'green',
  border: 'solid 2px black'
};

const normalStyles: CSS.Properties = {
  border: 'solid 2px black'
};

const selectedStyles: CSS.Properties = {
  backgroundColor: '#f2711c',
  border: 'solid 2px black'
};

interface Props {
  selectedAnswer?: string;
  setSelectedAnswer?: Dispatch<SetStateAction<string>>;
  highlightCorrectAnswer?: boolean;
  text: string;
}

const GameSegment: React.FC<Props> = ({
  selectedAnswer,
  setSelectedAnswer,
  highlightCorrectAnswer,
  text
}: Props) => {
  const cardStyle = (): CSS.Properties => {
    if (highlightCorrectAnswer) return correctStyles;
    else return text === selectedAnswer ? selectedStyles : normalStyles;
  };

  return (
    <Segment
      className={'text-card'}
      textAlign={'center'}
      size={'large'}
      style={cardStyle()}
      onClick={() => setSelectedAnswer && setSelectedAnswer(text)}
    >
      <Header as={'h3'}>
        <p>{text}</p>
      </Header>
    </Segment>
  );
};

export default GameSegment;
