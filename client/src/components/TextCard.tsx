import React from 'react';

/** UI, Css */
import { Card } from 'semantic-ui-react';
import '../styles/TextCard.css';

interface Props {
  className?: string;
  text: string;
}

const TextCard: React.FC<Props> = ({
  className = 'text-card',
  text
}: Props) => {
  return (
    <Card fluid className={className}>
      <Card.Content>
        <p className="card-text">{text}</p>
      </Card.Content>
    </Card>
  );
};

export default TextCard;
