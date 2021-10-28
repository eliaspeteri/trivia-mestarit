import React, { Dispatch, SetStateAction } from 'react';
import { Link, useHistory } from 'react-router-dom';
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

    socket.connect();
    // eslint-disable-next-line
    socket.emit('host-game', (response: any) => {
      setGameId(response.gameId as string);
      setIsHost(true);
      setNick(nick);
      history.push('/game');
    });
  };

  return (
    <Container textAlign="center" fluid={false} className="main-menu-content">
      <h1 className="menu-header">MAIN MENU</h1>
      <Button
        className="button"
        content={'HOST'}
        size={'massive'}
        onClick={initializeHostGame}
      />
      <Divider />

      <Link to="/">
        <Button className="button" content={'JOIN'} disabled size={'massive'} />
      </Link>
      <Divider />

      <Input
        focus
        placeholder="Username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNick(e.target.value)
        }
      />
    </Container>
  );
};

export default MainMenu;
