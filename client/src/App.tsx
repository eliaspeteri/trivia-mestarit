import React, { useState } from 'react';

/** Components */
import MainMenu from './components/MainMenu';

/** CSS, UI */
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import GameView from './components/GameView';

const App: React.FC = () => {
  const [nick, setNick] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');
  const [showGameView, setShowGameView] = useState<boolean>(false);
  const [isHoster, setIsHoster] = useState<boolean>(false);

  return (
    <div id="app">
      {showGameView ? (
        <GameView nick={nick} gameId={gameId} isHoster={isHoster} />
      ) : (
        <MainMenu
          nick={nick}
          setNick={setNick}
          setShowGameView={setShowGameView}
          setGameId={setGameId}
          setIsHoster={setIsHoster}
        />
      )}
    </div>
  );
};

export default App;
