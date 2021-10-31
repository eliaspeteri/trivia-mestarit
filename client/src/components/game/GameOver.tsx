import React from 'react';

/** CSS, UI */
import { Container, Icon, Table } from 'semantic-ui-react';

/** Types */
import { Player } from 'game-common';

interface Props {
  players: Player[];
}

const GameOver: React.FC<Props> = ({ players }: Props) => {
  const correspondingTrophyIcon = (index: number): JSX.Element | null => {
    const trophyIcon = 'trophy';

    switch (index) {
      case 0:
        return <Icon color={'yellow'} name={trophyIcon} />;

      case 1:
        return <Icon color={'grey'} name={trophyIcon} />;

      case 2:
        return <Icon color={'brown'} name={trophyIcon} />;

      default:
        return null;
    }
  };

  const mapPlayerScores = (): JSX.Element[] =>
    sortPlayersByScore().map((player: Player, index: number) => (
      <Table.Row key={index} style={{ backgroundColor: 'black' }}>
        <Table.Cell>
          {`${index + 1}.`} {correspondingTrophyIcon(index)}
        </Table.Cell>
        <Table.Cell>{player.nick}</Table.Cell>
        <Table.Cell>{player.points}</Table.Cell>
      </Table.Row>
    ));

  const sortPlayersByScore = (): Player[] => {
    /** Descending order */
    return [...players].sort((a, b) =>
      a.points > b.points ? -1 : b.points > a.points ? 1 : 0
    );
  };

  return (
    <Container>
      <Table
        inverted
        padded
        size={'large'}
        style={{ border: '1px solid whitesmoke' }}
      >
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
