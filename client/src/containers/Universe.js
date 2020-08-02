import React, { Component } from 'react';
import { Howl, Howler } from 'howler';
import space_music from '../space_music.mp3';
import Ship from '../components/Ship';
import Planet from '../components/Planet';
import HUD from '../components/HUD';
import GameOver from '../components/GameOver';

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min); 
}

const music = new Howl({
	src: [space_music],
	autoplay: true,
	loop: true,
	volume: 0.4
});

class Universe extends Component {

	state={
		gameOver: false,
		planetsArray: [],
		shipBoundaries: {},
		planetBoundaries: [],
		medicine: 1000,
		food: 1000,
		water: 1000,
		score: 0,
		isHighScore: false
	}

	losingCondition = () => {
		const { medicine, food, water } = this.state;

		if (medicine <= 0) return true;
		if (food <= 0) return true;
		if (water <= 0) return true;

		return false;
	}

	gameOver = () => {
		console.log('GAME OVER');
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

		fetch('/api/v1/high_scores', {
			'method': 'POST',
			'headers': {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			'body': JSON.stringify({
				name,
				score: this.state.score
			})
		}).then( res => res.json() )
		.then( data => this.props.addHighScore(data));
	}

	decayResources = () => {
		if (this.losingCondition()) this.gameOver();

		this.setState( prevState => ({
			medicine: prevState.medicine - 25,
			food: prevState.medicine - 25,
			water: prevState.medicine - 25,
		}));
	}

	addPoint = () => this.setState( prevState => ({
		score: prevState.score + 1
	}));

	componentDidMount = async () => {
		await this.generatePlanets(this.createPlanet, 80);
		this.calcPlanetBoundaries();
		this.decayId = setInterval(this.decayResources, 100);
		this.scoreId = setInterval(this.addPoint, 10);
	}

	componentWillUnmount() {
		clearInterval(this.decayId);
		clearInterval(this.transferId);
		clearInterval(this.scoreId);
	}

	findShip = shipBoundaries => {
		this.calcPlanetBoundaries();
		this.state.planetBoundaries.map( planet => {
			this.findCollision(shipBoundaries, planet);
			this.stopTransfer(planet);
		});

		this.setState({
			shipBoundaries
		});
	}

	isDepleted = planet => planet.water < 10 && planet.food < 10 && planet.medicine < 10;
	
	beginTransfer = planet => {

		planet = this.state.planetsArray.find( p => p.id === planet.id );
		// exit function if planet lacks resources
		if ( this.isDepleted(planet) ) return;

		planet.transferId = setInterval(() => {
			this.transferResources(planet);
		}, 500);
	}

	stopTransfer = planet => {
		if (this.isDepleted(planet)) {
			console.log('Clear interval');
			clearInterval(planet.transferId);
			return; 
		};
	}

	transferResources = planet => {
		const waterTransferred = planet.water * 0.05 + 2
		const foodTransferred = planet.food * 0.05 + 2
		const medicineTransferred = planet.medicine * 0.05 + 2

		// lower planet's colors/resources
		planet.water -= planet.type === 'water' ? waterTransferred * 2 : waterTransferred;
		planet.food -= planet.type === 'food' ? foodTransferred * 2 : foodTransferred;
		planet.medicine -= planet.type === 'medicine' ? medicineTransferred * 2 : medicineTransferred;

		// stop transferResources from completing if planet isDepleted
		if (this.isDepleted(planet)) return;
		
		// raise user resources
		this.setState( prevState => ({
			water: prevState.water + waterTransferred,
			food: prevState.food + foodTransferred,
			medicine: prevState.medicine + medicineTransferred
		}));
	}

	findCollision = (ship, planet) => {
		if (ship.x < planet.x + planet.width &&
			ship.x + ship.width > planet.x &&
			ship.y < planet.y + planet.height &&
			ship.y + ship.height > planet.y) {
			if (planet.transferId === undefined) this.beginTransfer(planet);
		}
	}

	calcPlanetBoundaries = () => {
		const planetBoundaries = this.state.planetsArray.map( planet => {
			const planetDOM = document.getElementById(planet.id);
			const planetBounds = planetDOM.getBoundingClientRect();
			let boundaries = {}
			for (let key in planetBounds) {
				if(typeof planetBounds[key] !== 'function') {
					boundaries[key] = planetBounds[key]
				}
			}
			return Object.assign({}, {id: planet.id}, boundaries)
		});

		this.setState({planetBoundaries});
	}

	createPlanet = id => {
		let planet = {
				water: Math.floor(Math.random() * 255) + 1,
				medicine: Math.floor(Math.random() * 255) + 1,
				food: Math.floor(Math.random() * 255) + 1,
				top: randomNumber(700, 15000),
				left: randomNumber(700, 15000),
				size: randomNumber(300, 700),
				id
		}
		planet = this.planetType(planet);
		this.setState( prevState => ({
			planetsArray: [...prevState.planetsArray, planet]
		}));
	}

	generatePlanets = (func, times) => {
		if (times === 0) return;
		func(times);
		return this.generatePlanets(func, --times);
	}

	renderPlanets = () => {
		return this.state.planetsArray.map( p => {
			return <Planet {...p} />;
		} );
	}

	planetType = p => {
		const values = { water: p.water, medicine: p.medicine, food: p.food}
		let high = 0;
		let type = null;
		for (let key in values) {
			if (values[key] > high) {
				high = values[key];
				type = key;
			};
		}

		return { ...p, type };
	}

	render() {
		const { water, food, medicine } = this.state;

		return (
			<div className="Universe">
				<button id='mute' onClick={() => music.volume(0)}>MUTE</button>
				<Ship findShip={this.findShip} />
				{ this.state.planetsArray.length ? this.renderPlanets() : null }
				<HUD water={water} food={food} medicine={medicine} />
				{ this.state.gameOver ? <GameOver score={this.state.score} isHighScore={this.state.isHighScore} submitHighScore={this.submitHighScore} /> : null }
			</div>
		)
	}
}

export default Universe;