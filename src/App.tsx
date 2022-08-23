import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const playSound = () => {
  const player = new Audio('./kick.wav');
  player.play();
}


const App = () => {
  const [boxChecked, setBoxChecked] = useState(false)

  useEffect(() => {
    /**@ts-ignore*/
    window.electronAPI.handleBoxToggled((event, value) => {
      setBoxChecked(value);
    })

  }, [])

  const [notificationClicked, setNotificationClicked] = useState(false)

  const showNotification = () => {
    new Notification("Notifica nativa!", {
      body: "Contenuto della notifica nativa. Notare la natività.",
    })
      .onclick = () => setNotificationClicked(true)
  }

  return <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Hello world!
      </p>
      <main>
        <button onClick={playSound}>1</button>
        <button onClick={showNotification}>{notificationClicked
          ? <>Cliccata!</>
          : <>Non cliccata :/</>}</button>
        <button>Box: {boxChecked ? "true" : "false"}</button>
      </main>
    </div>
  </div >
}

export default App;
