import React from 'react';

function GameOver({score, isHighScore}) {

  const refreshPage = () => window.history.go(0);

  const message = isHighScore ? "HIGH SCORE!!!" : "GAME OVER"

  const highScoreForm = <form>
    <label>Name</label>
    <input type='text' name='name'></input>
    <input type='hidden' name='score' value={score} />
    <input type='submit' />
  </form>

  return(
    <div className="Game-over">
      <h1 style={{margin: '0 auto', padding: '10px 0'}}>{message}</h1>
      <h2 style={{margin: '0 auto', padding: '10px 0'}}>Score - {score}</h2>
      {
        isHighScore
        ? highScoreForm
        : <button onClick={refreshPage}>Try Again</button>
      }
    </div>
  );
}

export default GameOver;