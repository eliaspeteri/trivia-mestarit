import React, { Dispatch, SetStateAction, useState } from 'react';

/** Components */
import HostGame from './menu/HostGame';
import JoinGame from './menu/JoinGame';

/** CSS, UI */
import { Button, Container, Divider, Header } from 'semantic-ui-react';
import '../styles/MainMenu.css';

interface Props {
  gameId: string;
  nick: string;
  setIsHost: Dispatch<SetStateAction<boolean>>;
  setGameId: Dispatch<SetStateAction<string>>;
  setNick: Dispatch<SetStateAction<string>>;
}

const MainMenu: React.FC<Props> = ({
  gameId,
  nick,
  setIsHost,
  setGameId,
  setNick
}: Props) => {
  const [selectedHost, setSelectedHost] = useState<boolean>(false);
  const [selectedJoin, setSelectedJoin] = useState<boolean>(false);

  return (
    <Container className="main-menu-content" fluid={false} textAlign={'center'}>
      {!selectedHost && !selectedJoin && (
        <Header
          as={'h1'}
          content={'MAIN MENU'}
          color={'orange'}
          size={'huge'}
        />
      )}

      {!selectedJoin && (
        <Button
          className="button"
          content={selectedHost ? 'CANCEL' : 'HOST'}
          size={'massive'}
          onClick={() => setSelectedHost(!selectedHost)}
        />
      )}

      {selectedHost && (
        <>
          <Divider />
          <HostGame
            nick={nick}
            setGameId={setGameId}
            setIsHost={setIsHost}
            setNick={setNick}
          />
        </>
      )}

      {!selectedHost && (
        <Button
          className="button"
          content={selectedJoin ? 'CANCEL' : 'JOIN'}
          size={'massive'}
          onClick={() => setSelectedJoin(!selectedJoin)}
        />
      )}

      {selectedJoin && (
        <JoinGame
          gameId={gameId}
          nick={nick}
          setGameId={setGameId}
          setIsHost={setIsHost}
          setNick={setNick}
        />
      )}
    </Container>
  );
};

export default MainMenu;
