import React, { Component } from 'react';
import './App.css';
import Universe from './containers/Universe';

class App extends Component {
	
	state = {
		highScores: [],
		view: "intro"
	}
	
	componentDidMount() {
		this.fetchHighScores();
	}

	toIntro = () => this.setState({view: 'intro'});
	startGame = () => this.setState({view: "universe"});
	

	renderIntro = () => {
		return (
			<div className="intro">
				<div className='copy'>
					<h1>Welcome to Hack the Planet!</h1>
					<p>Greetings, hero! You are the last hope for humanity. Please, stay alive so we can reach for the stars.</p>
					<p>Objectives: maintain resources by flying over planets.</p>
					<p>Controls:</p>
					<p>'W' key propels your ship forward. Hold down w at your own risk!</p>
					<p>'A' key rotates to the left.</p>
					<p>'D' key rotates to the right.</p>
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
			case 'intro':
				return this.renderIntro();
			
			case 'universe':
				return <Universe highScores={this.state.highScores} addHighScore={this.addHighScore} toIntro={this.toIntro} />

			default:
				break;
		};
	}

	fetchHighScores = () => {
		fetch('/api/v1/high_scores')
		.then( res => res.json() )
		.then( highScores => this.setState({highScores}) );
	}

	addHighScore = newScore => {
		// add new score
		const highScores = this.state.highScores.concat(newScore);
		// place new score it's place
		highScores.sort( (a, b) => a.score < b.score ? 1 : -1 );
		// remove 11th score
		highScores.slice(0, 11);
		// set updated highScores to trigger render
		this.setState({highScores});
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
