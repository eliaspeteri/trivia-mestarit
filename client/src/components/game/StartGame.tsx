import React from 'react';

/** CSS, UI */
import { Button, Container } from 'semantic-ui-react';

interface Props {
  gameId: string;
  isHost: boolean;
  handleStartGame: React.MouseEventHandler<HTMLButtonElement>;
}

const StartGame: React.FC<Props> = ({
  gameId,
  isHost,
  handleStartGame
}: Props) => {
  const copyIdClicked = (): void => {
    navigator.clipboard.writeText(gameId);
    alert('Game id copied!');
  };

  return (
    <Container>
      <h1 style={{ color: 'white' }}>Waiting for the game to begin</h1>
      <h1 style={{ color: 'white' }}>{`Game ID: ${gameId}`}</h1>
      <Button content={'Copy ID'} onClick={copyIdClicked} />
      {isHost && <Button content={'START'} onClick={handleStartGame} />}
    </Container>
  );
};

export default StartGame;
