import React from 'react';

function Score({score}) {
  
  return (
    <div className='score-clock'>
      <h1>Score: {score}</h1>
    </div>
  )
}

export default Score;