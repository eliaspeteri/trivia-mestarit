import React, { Dispatch, SetStateAction, useEffect } from 'react';

/** CSS, UI */
import { Button, Container, Divider, Input } from 'semantic-ui-react';
import '../styles/MainMenu.css';

/** Config / Socket */
import { Socket } from 'socket.io-client';

interface Props {
  nick: string;
  setIsHost: Dispatch<SetStateAction<boolean>>;
  setGameId: Dispatch<SetStateAction<string>>;
  setNick: Dispatch<SetStateAction<string>>;
  setShowGameView: Dispatch<SetStateAction<boolean>>;
  socket: Socket;
}

const MainMenu: React.FC<Props> = ({
  nick,
  setIsHost,
  setGameId,
  setNick,
  setShowGameView,
  socket
}: Props) => {
  const initializeHostGame = (): void => {
    if (!nick) {
      alert('Choose nickname');
      return;
    }

    socket && socket.connect();
    // eslint-disable-next-line
    socket &&
      socket.emit('host-game', (response: any) => {
        setGameId(response.gameId as string);
        setIsHost(true);
        setNick(nick);
        setShowGameView(true);
      });
  };

  return (
    <Container textAlign="center" fluid={false} className="main-menu-content">
      <p style={{ color: 'whitesmoke' }}>{nick}</p>
      <h1 className="menu-header">MAIN MENU</h1>
      <Button size="massive" className="button" onClick={initializeHostGame}>
        HOST
      </Button>
      <Divider />
      <Button size="massive" className="button">
        JOIN
      </Button>
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
