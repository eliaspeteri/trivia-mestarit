import React from 'react';

/** CSS, UI */
import { Button, Container } from 'semantic-ui-react';
import '../../styles/StartGame.css';

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
    <Container className={'start-game-container'}>
      <div className={'text-container'}>
        <p className={'waiting-text'}>Waiting for the game to begin</p>
        <p className={'game-id-text'}>{gameId}</p>
      </div>

      <div className={'buttons-row'}>
        {isHost && (
          <Button content={'START'} size={'big'} onClick={handleStartGame} />
        )}
        <Button content={'Copy ID'} size={'big'} onClick={copyIdClicked} />
      </div>
    </Container>
  );
};

export default StartGame;
