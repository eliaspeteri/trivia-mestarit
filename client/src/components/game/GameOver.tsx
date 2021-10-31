import React from 'react';

/** CSS, UI */
import { Container, Grid, List } from 'semantic-ui-react';

/** Types */
import { Player } from 'game-common';
import CSS from 'csstype';

interface Props {
  players: Player[];
}

const containerStyles: CSS.Properties = {
  backgroundColor: 'black',
  position: 'relative',
  border: '3px solid white',
  top: '5em',
  margin: '5em'
};

const GameOver: React.FC<Props> = ({ players }: Props) => {
  return (
    <Container>
      <h1 style={{ color: 'white' }}>Players and their score:</h1>

      <Grid container style={containerStyles}>
        <List
          divided
          inverted
          ordered
          size={'huge'}
          style={{ padding: '1em', marginLeft: '1em' }}
        >
          {players.map((player: Player, index: number) => (
            <List.Item
              key={index}
              value={player.points.toString()}
              style={{ color: '#f2711c' }}
            >
              <List.Header>{player.nick}</List.Header>
              {player.points}
            </List.Item>
          ))}
        </List>
      </Grid>
    </Container>
  );
};

export default GameOver;
