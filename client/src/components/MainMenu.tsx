import React from 'react';

/** CSS, UI */
import { Button, Container, Divider, Input } from 'semantic-ui-react';
import '../styles/MainMenu.css';

const MainMenu: React.FC = () => {
  return (
    <Container textAlign="center" fluid={false} className="main-menu-content">
      <h1 className="menu-header">MAIN MENU</h1>
      <Button size="massive" className="button">
        HOST
      </Button>
      <Divider />
      <Button size="massive" className="button">
        JOIN
      </Button>
      <Divider />
      <Button size="massive" className="button" id="choose-name-button">
        CHOOSE NAME
      </Button>
      <Divider />
      <Input focus placeholder="Username" />
    </Container>
  );
};

export default MainMenu;
