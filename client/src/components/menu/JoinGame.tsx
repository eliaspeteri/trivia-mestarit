import React, { Dispatch, SetStateAction } from 'react';
import { useHistory } from 'react-router-dom';

/** CSS, UI */
import { Button, Divider, Input } from 'semantic-ui-react';

interface Props {
  gameId: string;
  nick: string;
  setGameId: Dispatch<SetStateAction<string>>;
  setIsHost: Dispatch<SetStateAction<boolean>>;
  setNick: Dispatch<SetStateAction<string>>;
}

const JoinGame: React.FC<Props> = ({
  gameId,
  nick,
  setGameId,
  setIsHost,
  setNick
}: Props) => {
  const history = useHistory();

  const joinHostedGame = (): void => {
    history.push('/game');
    setIsHost(false);
    setNick(nick);
  };

  return (
    <>
      <Divider />

      <Input
        focus
        placeholder="Username"
        value={nick}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNick(e.target.value)
        }
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
        color={'orange'}
        content={'JOIN'}
        disabled={!gameId || !nick}
        size={'massive'}
        onClick={joinHostedGame}
      />
    </>
  );
};

export default JoinGame;
