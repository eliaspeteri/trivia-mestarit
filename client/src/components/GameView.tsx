import React from 'react';

/** Components */
import ProgressBar from './ProgressBar';
import TextCard from './TextCard';

/** UI, Css */
import { Container, Grid, GridRow } from 'semantic-ui-react';

const GameView: React.FC = () => {
  const procent = 22;
  const question =
    'Minkä niminen suuri suunnistuskipailu kilpaillaan Suomessa kesäisin?';

  const handleAnswerClick = (e: React.MouseEvent<HTMLElement>): void => {
    /** Vastaus klikatusta kortista, tää täytyy tehdä vähemmän likaisemmin */
    console.log((e.target as any).textContent);
  };

  return (
    <Container>
      <Grid centered padded columns={1}>
        <Grid.Column>
          <TextCard text={question} className={'question-card card'} />
        </Grid.Column>
        <Grid.Row centered columns={2}>
          <Grid.Column onClick={handleAnswerClick}>
            <TextCard text={'oh canada'} />
          </Grid.Column>
          <Grid.Column onClick={handleAnswerClick}>
            <TextCard text={'en muista en muista en muista'} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered columns={2}>
          <Grid.Column onClick={handleAnswerClick}>
            <TextCard text={'puukko juoksu'} />
          </Grid.Column>
          <Grid.Column onClick={handleAnswerClick}>
            <TextCard text={'en muista en muista en muista'} />
          </Grid.Column>
        </Grid.Row>
        <GridRow centered columns={1}>
          <Grid.Column>
            <ProgressBar progress={procent} />
          </Grid.Column>
        </GridRow>
      </Grid>
    </Container>
  );
};

export default GameView;
