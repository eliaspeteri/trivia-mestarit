import React, { useState } from 'react';

/** Components */
import ProgressBar from './ProgressBar';
import TextCard from './TextCard';

/** UI, CSS */
import { Container, Grid, Icon } from 'semantic-ui-react';
import '../styles/GameView.css';

const GameView: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const progress = 50; 
  const timeleft = 50;
  const question =
    'Minkä niminen suuri suunnistuskipailu kilpaillaan Suomessa kesäisin?';

  const handleExitIconClick = (): void => {
    window.confirm('Do you want to abort game?')
      ? console.log('yes pls')
      : console.log('no pls');
  };

  return (
    <React.Fragment>
      <Icon
        onClick={handleExitIconClick}
        bordered
        className="sign-out-icon"
        name="sign out"
        size="huge"
      />
      <Container>
        {selectedAnswer + ' salainen vastaus'}
        <Grid columns={1} className="game-view-content" container>
          <Grid.Column>
            <TextCard className={'question-card'} text={question} />
          </Grid.Column>

          <Grid.Column stretched columns={1}>
            <TextCard
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              text={'oh canada'}
            />
          </Grid.Column>

          <Grid.Column stretched columns={1}>
            <TextCard
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              text={'en muista en muista en muista'}
            />
          </Grid.Column>

          <Grid.Column>
            <TextCard
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              text={
                'puukko  dsadasd dsdasdasdsasds asdas ds asd asdasd asd juoksu'
              }
            />
          </Grid.Column>

          <Grid.Column>
            <TextCard
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              text={'eri vastaus en muista'}
            />
          </Grid.Column>


         <Grid.Row centered columns={1}>
           <Grid.Column>
             <ProgressBar progress={progress}
               timeleft={timeleft} />
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default GameView;
