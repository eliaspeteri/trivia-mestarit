import React, { Dispatch, useEffect, SetStateAction } from 'react';
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

    // eslint-disable-next-line
    socket.emit('host-game', (response: any) => {
      setGameId(response.gameId as string);
      setIsHost(true);
      setNick(nick);
      history.push('/game');
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
    <Container className="main-menu-content" fluid={false} textAlign="center">
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
        value={nick}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNick(e.target.value)
        }
      />
    </Container>
  );
};

export default MainMenu;
