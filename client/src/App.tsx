import React from 'react';

/** Components */
import GameView from './components/GameView';
import MainMenu from './components/MainMenu';

/** CSS */
import './App.css';
import 'semantic-ui-css/semantic.min.css';


const App: React.FC = () => {
  return (
 <div id="app">
      <MainMenu /> 
    </div> 
  );
};

export default App;
