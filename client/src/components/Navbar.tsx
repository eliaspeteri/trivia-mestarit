import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

/** CSS, UI */
import { Menu } from 'semantic-ui-react';

const Navbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('home');

  const history = useHistory();

  const handleTabClick = (tabName: string, url: string): void => {
    setActiveItem(tabName);
    history.push(url);
  };

  return (
    <Menu inverted fixed={'top'} size={'huge'}>
      <Menu.Item
        name={'home'}
        active={activeItem === 'home'}
        content={'Home'}
        onClick={() => handleTabClick('home', '/')}
      />
      <Menu.Item
        name={'add_question'}
        active={activeItem === 'add_question'}
        content={'Add Question'}
        onClick={() => handleTabClick('add_question', 'addquestion')}
      />
      <Menu.Item
        name={'browse_questions'}
        active={activeItem === 'browse_questions'}
        content={'Browse questions'}
        /* Grey color indicate disabled tab */
        style={{ color: '#484848' }}
      />
    </Menu>
  );
};

export default Navbar;
