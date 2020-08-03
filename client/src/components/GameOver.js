import React, { useState } from 'react';

function GameOver({score, isHighScore, submitHighScore}) {

  const [name, setName] = useState('');

  const handleChange = () => {
    const name = document.getElementById('name').value;
    setName(name);
  }

  const refreshPage = () => window.history.go(0);

  const message = isHighScore ? "HIGH SCORE!!!" : "GAME OVER"

  const highScoreForm = <form onSubmit={ e => submitHighScore(name, e) } autoComplete="off">
    <label>Name</label>
    <input id='name' type='text' name='name' value={name} onChange={handleChange} required></input>
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