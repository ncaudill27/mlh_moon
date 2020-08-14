import React, { Component } from 'react';
import { Howl, Howler } from 'howler';
import space_music from '../space_music.mp3';
import Ship from '../components/Ship';
import Planet from '../components/Planet';
import Score from '../components/Score';
import HUD from '../components/HUD';
import GameOver from '../components/GameOver';
import generatePlanets from '../utils/generatePlanets';
import { postHighScore } from '../utils/highScoresAPI';

const music = new Howl({
	src: [space_music],
	loop: true,
	volume: 0.4
});

class Universe extends Component { 

	state = {
		gameOver: false,
		planetsArray: [],
		shipBoundaries: {},
		medicine: 1000,
		food: 1000,
		water: 1000,
		score: 0,
		isHighScore: false
	}

	componentDidMount = () => {
		music.play();
		this.generatePlanets();
		this.decayId = setInterval(this.decayResources, 750);
		this.scoreId = setInterval(this.addPoint, 10);
	}

	componentWillUnmount() {
		clearInterval(this.decayId);
		clearInterval(this.scoreId);
		this.state.planetsArray.map( planet => clearInterval(planet.transferId) );
		music.stop();
	}

	losingCondition = () => {
		const { medicine, food, water } = this.state;

		if (medicine <= 0) return true;
		else if (food <= 0) return true;
		else if (water <= 0) return true;

		return false;
	}

	gameOver = () => {
		clearInterval(this.decayId);
		clearInterval(this.scoreId);
		this.setState({gameOver: true});
		music.stop();
		if (this.isHighScore) this.setState({isHighScore: true});
	}

	isHighScore = () => {
		return this.props.highScores.length ? this.props.highScores.some( s => this.state.score > s.score ) : true;
	}

	submitHighScore = (name, e) => {
		e.preventDefault();

		const payload = {
			name,
			score: this.state.score
		}

		postHighScore(payload)
		.then( data => this.props.addHighScore(data) );
	}

	decayResources = () => {
		if ( this.losingCondition() ) this.gameOver();

		this.setState( prevState => ({
			medicine: prevState.medicine - 25,
			food: prevState.food - 25,
			water: prevState.water - 25,
		}));
	}

	stopDecay = () => clearInterval(this.decayId);

	addPoint = () => this.setState( prevState => ({
		score: prevState.score + 1
	}));

	findShip = shipBoundaries => {
		this.state.planetsArray.map( planet => {
			const collision = planet.findCollision(shipBoundaries);
			if ( collision && !planet.transferId && !!planet.transferResources() ) {
				planet.transferId = setInterval( () => this.beginTransfer(planet), 250);
			} else if ( planet.isDepleted() ) {
				planet.stopTransfer();
			}
		});

		this.setState({
			shipBoundaries
		});
	}

	beginTransfer = planet => {
		let {
			water,
			food,
			medicine 
		} = planet.transferResources();

		
		if ( water && food && medicine ) {
			// cap resources at 1000
			water = this.state.water + water >= 1000 ? 1000 : this.state.water + water
			food = this.state.food + food >= 1000 ? 1000 : this.state.food + food
			medicine = this.state.medicine + medicine >= 1000 ? 1000 : this.state.medicine + medicine

			this.setState({
				water,
				food,
				medicine
			});
		};
	}

	generatePlanets = () => {
		const planetsArray = generatePlanets(80);
		this.setState({planetsArray});
	}

	renderPlanets = () => {
		return this.state.planetsArray.map( planet => {
			return <Planet key={planet.id} {...planet} />;
		});
	}

	render() {
		const { water, food, medicine, score, isHighScore, gameOver, planetsArray } = this.state;

		return (
			<div className="Universe">
				{ gameOver || <Score score={score} /> }
				<button id='mute' onClick={() => music.volume(0)}>MUTE</button>
				{ gameOver || <Ship findShip={this.findShip} /> }
				{ planetsArray.length ? this.renderPlanets() : null }
				{ gameOver || <HUD water={water} food={food} medicine={medicine} /> }
				{ !gameOver || <GameOver score={score} isHighScore={isHighScore} submitHighScore={this.submitHighScore} /> }
			</div>
		)
	}
}

export default Universe;