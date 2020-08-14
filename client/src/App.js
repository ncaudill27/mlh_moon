import React, { Component } from 'react';
import './App.css';
import Universe from './containers/Universe';
import { fetchHighScores } from './utils/highScoresAPI';

class App extends Component {
	
	state = {
		highScores: [],
		view: "welcome"
	}

	componentDidMount() {
		fetchHighScores()
		.then( highScores => this.setState({highScores}) )
	}

	toIntro = () => this.setState({view: 'welcome'});
	startGame = () => this.setState({view: "universe"});
	

	renderWelcome = () => {
		return (
			<div className="Welcome">
				<div className='intro'>
					<h1>Welcome to Hack the Planet!</h1>
					<div className='copy'>
						<p>Greetings, hero! You are the last hope for humanity. Please, stay alive so we can reach for the stars.</p>
						<h5>Objectives</h5>
						<p>Maintain resources by flying over planets.</p>
						<h5>Controls</h5>
						<div className='controls'>
							<div><h6>W</h6><p>Propels your ship forward.</p><p>Hold down w at your own risk!</p></div>
							<div><h6>A</h6><p>Key rotates to the left.</p></div>
							<div><h6>D</h6><p>Key rotates to the right.</p></div>
						</div>
					</div>
					<button id="startbutton" onClick={this.startGame}>Start</button>
				</div>
				<div className="highscores">
					<h1>High Scores</h1>
					<div className='scores'>
						{ this.state.highScores.length ? this.renderHighScores() : null }
					</div>
				</div>
			</div>
		);
	}

	renderHighScores = () => {
		return this.state.highScores.map( ({name, score}, idx) => {
			return <div className="highscore">
				<h3>{idx +1}) {name} - {score}</h3>
			</div>
		})
	}

	switch = () => {
		switch (this.state.view) {
			case 'welcome':
				return this.renderWelcome();
			
			case 'universe':
				return <Universe highScores={this.state.highScores} addHighScore={this.addHighScore} />

			default:
				break;
		};
	}

	addHighScore = newScore => {
		this.toIntro();
		// add new score in proper rank
		const highScores = this.placeNewHighScore(newScore);
		// set updated highScores to trigger render
		this.setState({highScores});
	}

	placeNewHighScore = newScore => {
		const highScores = this.state.highScores.concat(newScore);
		// place new score it's place
		highScores.sort( (a, b) => a.score < b.score ? 1 : -1 );
		// remove 11th score
		return highScores.slice(0, 11);
	}

	render() {
		return (
			<div className="App">
				{ this.switch() }
			</div>
		);
	}
}

export default App;
