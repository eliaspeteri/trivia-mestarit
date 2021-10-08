import React, { useEffect, useState } from 'react';

/** Components */
import ProgressBar from './ProgressBar';
import TextCard from './TextCard';

/** UI, CSS */
import { Container, Grid, Icon } from 'semantic-ui-react';
import '../styles/GameView.css';

/** Sockets */
import socketClient, { Socket } from 'socket.io-client';

const LOCALHOST = 'localhost:8080';
const socket = socketClient(LOCALHOST, {
  /** Can't DDoS with F5  */
  transports: ['websocket'],
  upgrade: false
});

interface Props {
  nickname?: string;
  gameIdToJoin?: string;
}

const GameView: React.FC<Props> = (props: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');

  const percent = 22;
  const question =
    'Minkä niminen suuri suunnistuskipailu kilpaillaan Suomessa kesäisin?';

  useEffect(() => {
    props.gameIdToJoin
      ? socket.emit('join-game', props.gameIdToJoin)
      : socket.emit('host-game', (response: any) => {
          setGameId(response.gameId as string);
        });
  }, []);

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
        <p style={{ color: 'green' }}>{gameId}</p>
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

          <Grid.Column columns={1}></Grid.Column>
          <ProgressBar progress={percent} />
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default GameView;
