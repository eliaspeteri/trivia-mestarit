import React from 'react';

/** Components */
import GameView from './components/GameView';

/** CSS */
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App: React.FC = () => {
  return (
    <div id="app">
      app
      <GameView />
    </div>
  );
};

export default App;
