import React, { Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';
/** CSS, UI */
import { Button, Container, Divider, Input } from 'semantic-ui-react';
import '../styles/MainMenu.css';

/** Config / Socket */
import { socket } from '../config';

interface Props {
  nick: string;
  setIsHost: Dispatch<SetStateAction<boolean>>;
  setGameId: Dispatch<SetStateAction<string>>;
  setNick: Dispatch<SetStateAction<string>>;
}

const MainMenu: React.FC<Props> = ({
  nick,
  setIsHost,
  setGameId,
  setNick
}: Props) => {
  const history = useHistory();
  const initializeHostGame = (): void => {
    if (!nick) {
      alert('Choose nickname');
      return;
    }
    history.push('/game');

    socket.connect();
    // eslint-disable-next-line
    socket.emit('host-game', (response: any) => {
      setGameId(response.gameId as string);
      setIsHost(true);
      setNick(nick);
    });
  };

  const joinHostedGame = (): void => {
    if (!nick) {
      alert('Choose nickname');
      return;
    }
    history.push('/game');
    setIsHost(false);
    setNick(nick);
  };

  return (
    <Container textAlign="center" fluid={false} className="main-menu-content">
      <h1 className="menu-header">MAIN MENU</h1>
      <Button
        className="button"
        content={'JOIN'}
        size={'massive'}
        onClick={joinHostedGame}
      />
      <Divider />

      <Input
        focus
        placeholder={'Game ID'}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setGameId(e.target.value)
        }
      />

      <Divider />

      <Button
        className="button"
        content={'HOST'}
        size={'massive'}
        onClick={initializeHostGame}
      />

      <Divider />

      <Input
        focus
        placeholder="Username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNick(e.target.value)
        }
        value={nick}
      />
    </Container>
  );
};

export default MainMenu;
