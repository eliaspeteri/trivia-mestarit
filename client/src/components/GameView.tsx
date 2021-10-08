import React, { Dispatch, SetStateAction, useState } from 'react';

/** Components */
import ProgressBar from './ProgressBar';
import TextCard from './TextCard';

/** UI, CSS */
import { Container, Grid, Icon } from 'semantic-ui-react';
import '../styles/GameView.css';

interface Props {
  gameId: string;
  isHost: boolean;
  nick: string;
  setShowGameView: Dispatch<SetStateAction<boolean>>;
}

const GameView: React.FC<Props> = ({
  gameId,
  isHost,
  nick,
  setShowGameView
}: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');

  const percent = 22;
  const question =
    'Minkä niminen suuri suunnistuskipailu kilpaillaan Suomessa kesäisin?';

  /** Implement socket disconnect logic in the future */
  const leaveGameView = (): void => {
    console.log('LEAVE GAME');
    setShowGameView(false);
  };

  const handleExitIconClick = (): void => {
    window.confirm('Do you want to abort game?') && leaveGameView();
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
        
        <p style={{ color: 'green' }}>gameId: {gameId}</p>
        <p style={{ color: 'green' }}>nick: {nick}</p>
        <p style={{ color: 'green' }}>isHost : {isHost && 'true'}</p>

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
              text={'puukko_ juoksu'}
            />
          </Grid.Column>

          <Grid.Column>
            <TextCard
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              text={'eri vastaus en muista'}
            />
          </Grid.Column>

          <Grid.Column columns={1}></Grid.Column>

          <ProgressBar progress={percent} />
        </Grid>
        
      </Container>
    </React.Fragment>
  );
};

export default GameView;
