import React, { Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';

/** CSS, UI */
import { Button, Divider, Input } from 'semantic-ui-react';

import { socket } from '../../services/socket';

interface Props {
  nick: string;
  setGameId: Dispatch<SetStateAction<string>>;
  setIsHost: Dispatch<SetStateAction<boolean>>;
  setNick: Dispatch<SetStateAction<string>>;
}

const HostGame: React.FC<Props> = ({
  nick,
  setGameId,
  setIsHost,
  setNick
}: Props) => {
  const history = useHistory();

  const initializeHostGame = (): void => {
    // eslint-disable-next-line
    socket.emit('host-game', (response: any) => {
      setGameId(response.gameId as string);
      setIsHost(true);
      setNick(nick);
      history.push('/game');
    });
  };

  return (
    <>
      <Input
        focus
        placeholder="Username"
        value={nick}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNick(e.target.value)
        }
      />

      <Divider />

      <Button
        className="button"
        content={'HOST'}
        color={'orange'}
        disabled={!nick}
        size={'massive'}
        onClick={initializeHostGame}
      />
    </>
  );
};

export default HostGame;
