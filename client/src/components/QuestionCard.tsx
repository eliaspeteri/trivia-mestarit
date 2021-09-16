import React from 'react';

interface Props {
  question: string;
}

const QuestionCard: React.FC<Props> = ({ question }: Props) => {
  return <div>{question}</div>;
};

export default QuestionCard;
