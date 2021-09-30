import React, { useState } from 'react';

/** Components */
import ProgressBar from './ProgressBar';
import TextCard from './TextCard';

/** UI, CSS */
import { Container, Grid, GridRow } from 'semantic-ui-react';
import '../styles/GameView.css';

const GameView: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const percent = 22;
  const question =
    'Minkä niminen suuri suunnistuskipailu kilpaillaan Suomessa kesäisin?';

  return (
    <Container>
      {selectedAnswer + ' salainen vastaus'}
      <Grid columns={1} className="game-view-content" stackable container>
        <Grid.Column>
          <TextCard className={'question-card'} text={question} />
        </Grid.Column>

        <Grid.Row centered columns={2}>
          <Grid.Column>
            <TextCard
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              text={'oh canada'}
            />
          </Grid.Column>
          <Grid.Column>
            <TextCard
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              text={'en muista en muista en muista'}
            />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered columns={2}>
          <Grid.Column>
            <TextCard
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              text={'puukko juoksu'}
            />
          </Grid.Column>
          <Grid.Column>
            <TextCard
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              text={'eri vastaus en muista'}
            />
          </Grid.Column>
        </Grid.Row>

        <GridRow centered columns={1}>
          <ProgressBar progress={percent} />
        </GridRow>
      </Grid>
    </Container>
  );
};

export default GameView;
