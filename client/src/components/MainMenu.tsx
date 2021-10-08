import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

/** CSS, UI */
import { Button, Container, Divider, Input } from 'semantic-ui-react';
import '../styles/MainMenu.css';

/** Sockets */
import socketClient, { Socket } from 'socket.io-client';

const LOCALHOST = 'localhost:8080';
const socket = socketClient(LOCALHOST, {
  /** Can't DDoS with F5  */
  transports: ['websocket'],
  upgrade: false,
  autoConnect: false,
  reconnection: false
});

interface Props {
  nick: string;
  setIsHoster: Dispatch<SetStateAction<boolean>>;
  setGameId: Dispatch<SetStateAction<string>>;
  setNick: Dispatch<SetStateAction<string>>;
  setShowGameView: Dispatch<SetStateAction<boolean>>;
}

const MainMenu: React.FC<Props> = ({
  nick,
  setIsHoster,
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

    socket.emit('host-game', (response: any) => {
      setGameId(response.gameId as string);
      setIsHoster(true);
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
      <Button
        size="massive"
        className="button"
        onClick={() => socket?.connect()}
      >
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
