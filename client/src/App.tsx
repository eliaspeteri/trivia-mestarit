import React, { useState } from 'react';

/** Components */
import MainMenu from './components/MainMenu';

/** CSS, UI */
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameView from './components/GameView';

const App: React.FC = () => {
  const [nick, setNick] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');
  const [showGameView, setShowGameView] = useState<boolean>(false);
  const [isHost, setIsHost] = useState<boolean>(false);

  return (
    <div id="app">
      {showGameView ? (
        <GameView
          gameId={gameId}
          isHost={isHost}
          nick={nick}
          setShowGameView={setShowGameView}
        />
      ) : (
        <MainMenu
          nick={nick}
          setNick={setNick}
          setShowGameView={setShowGameView}
          setGameId={setGameId}
          setIsHost={setIsHost}
        />
      )}
    </div>
  );
};

export default App;
