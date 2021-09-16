import React from 'react';
/** UI, Css */
import { Card } from 'semantic-ui-react';
import '../styles/QuestionCard.css';

interface Props {
  question: string;
  className: string;
}

const QuestionCard: React.FC<Props> = ({ question, className }: Props) => {
  return (
    <Card className={className}>
      <Card.Content>
        <Card.Header>Question 1 of 10</Card.Header>
        <Card.Description>{question}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default QuestionCard;
