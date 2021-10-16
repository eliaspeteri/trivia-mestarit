import React, { useEffect, useState } from 'react';

/** Components */
import MainMenu from './components/MainMenu';

/** CSS, UI */
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import GameView from './components/GameView';

import socketClient, { Socket } from 'socket.io-client';

const App: React.FC = () => {
  const [nick, setNick] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');
  const [showGameView, setShowGameView] = useState<boolean>(false);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    setSocket(
      socketClient('localhost:8080', {
        /** Can't DDoS with F5  */
        transports: ['websocket'],
        upgrade: false,
        autoConnect: false,
        reconnection: false
      })
    );
  }, []);

  useEffect(() => {
    socket?.connect();
  }, [socket]);

  return (
    <div id="app">
      {showGameView ? (
        <GameView
          gameId={gameId}
          isHost={isHost}
          nick={nick}
          setShowGameView={setShowGameView}
          socket={socket as Socket}
        />
      ) : (
        <MainMenu
          nick={nick}
          setNick={setNick}
          setShowGameView={setShowGameView}
          setGameId={setGameId}
          setIsHost={setIsHost}
          socket={socket as Socket}
        />
      )}
    </div>
  );
};

export default App;
