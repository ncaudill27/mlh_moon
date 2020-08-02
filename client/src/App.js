import React, { Component } from 'react';
import './App.css';
import Universe from './containers/Universe';

class App extends Component {
	
	state = {
		highScores: [],
		view:"intro"
	}
	
	componentDidMount() {
		this.fetchHighScores();
	}

	startGame = () => {
		this.setState({view: "universe"});
	}

	renderIntro = () => {
		return (
			<div className="intro">
				<h1>Welcome to Hack the Planet!</h1>
				<p>Greetings, hero! You are the last hope for humanity. Please, stay alive so we can reach for the stars.</p>
				<p>Objectives: maintain resources by flying over planets.</p>
				<p>Controls:</p>
				<p>'A' key turns your ship 10 degrees to the left.</p>
				<p>'D' key turns your ship 10 degrees to the right.</p>
				<p>'W' key propels your ship forward. Hold down w at your own risk!</p>
				<button className="startbutton" onClick={this.startGame}>Start</button>
			</div>
		);
	}

	switch = () => {
		switch (this.state.view) {
			case 'intro':
				return this.renderIntro()
			
			case 'universe':
				return <Universe highScores={this.state.highScores} addHighScore={this.addHighScore} />

			default:
				break;
		};
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
				{ this.switch() }
			</div>
		);
	}
}

export default App;
