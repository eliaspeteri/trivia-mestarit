import React, { useState } from 'react';

/** CSS, UI */
import { Button, Container, Popup } from 'semantic-ui-react';
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
        <Popup
          content={'Game ID copied'}
          hoverable
          size={'large'}
          on={'click'}
          trigger={
            <Button
              content={'Copy ID'}
              size={'big'}
              onClick={() => navigator.clipboard.writeText(gameId)}
            />
          }
        />
      </div>
    </Container>
  );
};

export default StartGame;
