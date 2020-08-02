import React, { Component } from 'react';
import './App.css';
import Universe from './containers/Universe';


class App extends Component {
	
	state = {
		highScores: []
	}
	
	componentDidMount() {
		this.fetchHighScores();
	}

	fetchHighScores = () => {
		fetch('/api/v1/high_scores')
		.then( res => res.json() )
		.then( data => this.setState({highScores: data}));
	}

	addHighScore = highScore => {
		const highScores = this.state.highScores.concat(highScore);
		highScores.sort( (a, b) => a.score > b.score );
		highScores.slice(0, 11);
		this.setState({highScores});
	}
	
	render() {
		console.log(this.state);
		return (
			<div className="App">
				<Universe highScores={this.state.highScores} addHighScore={this.addHighScore} />
			</div>
		);
	}
}

export default App;
