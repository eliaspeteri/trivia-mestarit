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
      <GameView /> 
    </div> 
  );
};
/*Vaihda GameView tilalle MainMenu, jos haluat nähdä MainMenun */
export default App;
