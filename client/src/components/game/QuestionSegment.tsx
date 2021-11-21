import React from 'react';

import { Header, Segment } from 'semantic-ui-react';

interface Props {
  question?: string;
}

const QuestionSegment: React.FC<Props> = ({ question }: Props) => (
  <Segment circular size={'large'}>
    <Header as={'h1'}>{question || ''}</Header>
  </Segment>
);

export default QuestionSegment;
