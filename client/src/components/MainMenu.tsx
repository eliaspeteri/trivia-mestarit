import React, { Dispatch, SetStateAction } from 'react';

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
  setShowGameView: Dispatch<SetStateAction<boolean>>;
}

const MainMenu: React.FC<Props> = ({
  nick,
  setIsHost,
  setGameId,
  setNick,
  setShowGameView
}: Props) => {
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
      setShowGameView(true);
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

      <Button className="button" content={'JOIN'} disabled size={'massive'} />

      <Divider />
      <Input
        focus
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNick(e.target.value)
        }
        placeholder="Username"
      />
    </Container>
  );
};

export default MainMenu;
