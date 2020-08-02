import React from 'react';

function GameOver({score}) {

  const refreshPage = () => window.history.go(0);

  return(
    <div className="Game-over">
      <h1 style={{margin: '0 auto', padding: '10px 0'}}>GAME OVER</h1>
      <h2 style={{margin: '0 auto', padding: '10px 0'}}>Score - {score}</h2>
      <button onClick={refreshPage}>Try Again</button>
    </div>
  );
}

export default GameOver;