import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/** Components */
import GameView from './GameView';
import MainMenu from './MainMenu';
import Navbar from './Navbar';
import QuestionForm from './QuestionForm';
import Toast from './Toast';

/** CSS, UI */
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';

/** Socket */
import { socket } from '../services/socket';

/** Contexts */
import { useToast } from '../contexts/ToastContext';

const App: React.FC = () => {
  const [nick, setNick] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');
  const [isHost, setIsHost] = useState<boolean>(false);

  const toastMsg: string = useToast();

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div id="app">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <MainMenu
              gameId={gameId}
              nick={nick}
              setNick={setNick}
              setGameId={setGameId}
              setIsHost={setIsHost}
            />
          </Route>
          <Route path="/game">
            <GameView gameId={gameId} isHost={isHost} nick={nick} />
          </Route>
          <Route path="/addquestion">
            <QuestionForm />
          </Route>
        </Switch>
      </Router>
      <Toast msg={toastMsg} />
    </div>
  );
};

export default App;
