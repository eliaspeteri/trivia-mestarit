import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

/** CSS, UI */
import { Menu } from 'semantic-ui-react';

const Navbar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('home');

  const history = useHistory();

  return (
    <Menu inverted fixed={'top'} size={'huge'}>
      <Menu.Item
        name={'home'}
        active={activeItem === 'home'}
        content={'Home'}
        onClick={() => {
          setActiveItem('home');
          history.push('/');
        }}
      />
      <Menu.Item
        name={'add_question'}
        active={activeItem === 'add_question'}
        content={'Add Question'}
        onClick={() => {
          setActiveItem('add_question');
          history.push('addquestion');
        }}
      />
      <Menu.Item
        name={'browse_questions'}
        active={activeItem === 'browse_questions'}
        content={'Browse questions'}
        /* onClick={() => setActiveItem('browse_questions')} */
        style={{ color: 'grey' }}
      />
    </Menu>
  );
};

export default Navbar;
