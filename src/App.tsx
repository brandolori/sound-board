import React from 'react';
import logo from './logo.svg';
import './App.css';

const playSound = () => {
  const player = new Audio('./kick.wav');
  player.play();
}

const App = () =>

  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Hello world!
      </p>
      <main>
        <button onClick={playSound}>1</button>
        <button>2</button>
        <button>3</button>
      </main>
    </div>
  </div >

export default App;
