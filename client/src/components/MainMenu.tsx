import React from 'react';

import { Button } from 'semantic-ui-react';
import { Divider } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import '../styles/MainMenu.css';

const MainMenu: React.FC = () => {
  
    return (
      <main className="mainmenu">
          <div className="HEADER">
          <h2>MAIN MENU</h2>
              </div>
          <div className="container">
              <div className="center">
              <h2>EASTER EGG</h2>
             <Button size="massive" className="answer-btn">
               HOST
               </Button>
               <div className="ui divider"></div>
               <Button size="massive" className="answer-btn">
               JOIN
               </Button>
               <div className="ui divider"></div>
               <Button size="massive" className="answer-btn2">
               CHOOSE NAME
               </Button>
               <div className="ui divider"></div>
               <div className="ui input focus">
                <input type="text" placeholder="Username"/>
                </div>
                <div className="ui divider"></div>
                <div className="Name">
                 <h2>Current name:</h2>
              </div> 
          </div>
          </div>
          <div className="VERSION">
                <h1>V.1.042</h1>
                 </div>
      </main>
    );
  };
  
  export default MainMenu;