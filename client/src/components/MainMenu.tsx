import React from 'react';

/** CSS, UI */
import { Button, Container, Divider, Input } from 'semantic-ui-react';
import '../styles/MainMenu.css';

const MainMenu: React.FC = () => {
  return (
    <Container textAlign="center" fluid={false} className="main-menu-content">
      <h2 className="header-text">MAIN MENU</h2>
      <h2 className="header-text">EASTER EGG</h2>
      <Button size="massive" className="answer-btn">
        HOST
      </Button>
      <Divider />
      <Button size="massive" className="answer-btn">
        JOIN
      </Button>
      <Divider />
      <Button size="massive" className="answer-btn2">
        CHOOSE NAME
      </Button>
      <Divider />
      <Input focus placeholder="Username" />
      <Divider />
      <h2 className="version-number">V.1.042</h2>
    </Container>
  );
};

export default MainMenu;
