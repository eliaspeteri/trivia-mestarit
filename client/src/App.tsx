import React from 'react';

/** CSS */
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import GameView from './components/GameView';

const App: React.FC = () => {
  return (
    <div id="app">
      <GameView />
    </div>
  );
};

export default App;
