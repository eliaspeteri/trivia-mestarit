import React from 'react';

/** CSS, UI */
import { Container, Table } from 'semantic-ui-react';

/** Types */
import { Player } from 'game-common';

interface Props {
  players: Player[];
}

const GameOver: React.FC<Props> = ({ players }: Props) => {
  const sortPlayersByScore = (): Player[] => {
    return [...players].sort((a, b) =>
      a.points > b.points ? -1 : b.points > a.points ? 1 : 0
    );
  };

  const mapPlayerScores = (): JSX.Element[] =>
    sortPlayersByScore().map((player: Player, index: number) => (
      <Table.Row key={index}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>{player.nick}</Table.Cell>
        <Table.Cell>{player.points}</Table.Cell>
      </Table.Row>
    ));

  return (
    <Container>
      <Table inverted padded size={'large'}>
        <Table.Header style={{ backgroundColor: '#f2711c' }}>
          <Table.Row>
            <Table.HeaderCell>Position</Table.HeaderCell>
            <Table.HeaderCell>Player</Table.HeaderCell>
            <Table.HeaderCell>Points</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{mapPlayerScores()}</Table.Body>
      </Table>
    </Container>
  );
};

export default GameOver;
