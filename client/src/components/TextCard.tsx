import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import CSS from 'csstype';

/** UI, Css */
import { Card } from 'semantic-ui-react';
import '../styles/TextCard.css';

interface Props {
  className?: string;
  selectedAnswer?: string;
  setSelectedAnswer?: Dispatch<SetStateAction<string>>;
  text: string;
}

const selectedStyles: CSS.Properties = {
  backgroundColor: 'orange !important',
  border: 'solid 2px orange'
};

const TextCard: React.FC<Props> = ({
  className = 'text-card',
  selectedAnswer,
  setSelectedAnswer,
  text
}: Props) => {
  return (
    <Card
      className={className}
      fluid
      style={text === selectedAnswer ? selectedStyles : {}}
      onClick={() => setSelectedAnswer && setSelectedAnswer(text)}
    >
      <Card.Content>
        <p className="card-text">{text}</p>
      </Card.Content>
    </Card>
  );
};

export default TextCard;
