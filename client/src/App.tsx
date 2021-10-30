import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/** Components */
import MainMenu from './components/MainMenu';

/** CSS, UI */
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GameView from './components/GameView';

/** Socket */
import { socket } from './config';

const App: React.FC = () => {
  const [nick, setNick] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');
  const [isHost, setIsHost] = useState<boolean>(false);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div id="app">
      <Router>
        <Switch>
          <Route exact path="/">
            {
              <MainMenu
                nick={nick}
                setNick={setNick}
                setGameId={setGameId}
                setIsHost={setIsHost}
              />
            }
          </Route>
          <Route path="/game">
            {<GameView gameId={gameId} isHost={isHost} nick={nick} />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
