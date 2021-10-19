import React from 'react';
import { Dispatch, SetStateAction } from 'react';

/** Types */
import CSS from 'csstype';

/** UI, CSS */
import { Card } from 'semantic-ui-react';
import '../../styles/TextCard.css';

interface Props {
  className?: string;
  selectedAnswer?: string;
  setSelectedAnswer?: Dispatch<SetStateAction<string>>;
  highlightCorrectAnswer?: boolean;
  text: string;
}

const selectedStyles: CSS.Properties = {
  backgroundColor: 'orange',
  border: 'solid 2px white'
};

const correctStyles: CSS.Properties = {
  backgroundColor: 'green',
  border: 'solid 2px green'
};

const TextCard: React.FC<Props> = ({
  className = 'text-card',
  selectedAnswer,
  setSelectedAnswer,
  highlightCorrectAnswer,
  text
}: Props) => {
  const cardStyle = (): CSS.Properties => {
    if (highlightCorrectAnswer) return correctStyles;
    else return text === selectedAnswer ? selectedStyles : {};
  };

  return (
    <Card
      className={className}
      fluid
      style={cardStyle()}
      onClick={() => setSelectedAnswer && setSelectedAnswer(text)}
    >
      <Card.Content>
        <p className="card-text">{text}</p>
      </Card.Content>
    </Card>
  );
};

export default TextCard;
