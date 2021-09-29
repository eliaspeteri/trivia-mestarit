import React, { useState } from 'react';

/** Components */
import GameView from './components/GameView';
import MainMenu from './components/MainMenu';

/** CSS */
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App: React.FC = () => {
  const [test, setTest] = useState<boolean>(false);
  return (
    <div id="app">
      <button onClick={() => setTest(!test)}>
        change component visibility
      </button>
      {test ? <GameView /> : <MainMenu />}
    </div>
  );
};

export default App;
