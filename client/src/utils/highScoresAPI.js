export const postHighScore = payload => {
  return fetch('/api/v1/high_scores', {
    'method': 'POST',
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'body': JSON.stringify(payload)
  }).then( res => res.json() );
}

export const fetchHighScores = () => {
  return fetch('/api/v1/high_scores')
  .then( res => res.json() )
  .then( highScores => highScores );
}