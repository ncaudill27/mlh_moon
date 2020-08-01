import React, { Component } from 'react';
import Ship from '../components/Ship';
import Planet from '../components/Planet';
import StatusBar from '../components/StatusBar';

function randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
}  

class Universe extends Component {
    
    state={
      planetsArray:[],
      shipBoundaries: {},
      planetBoundaries: [],
      medicine: 1000,
      food: 1000,
      water: 1000
    }

    losingCondition = () => {
      const { medicine, food, water } = this.state;

      if (medicine === 0) return true;
      if (food === 0) return true;
      if (water === 0) return true;

      return false;
    }

    gameOver = () => {
      console.log('GAME OVER');
      clearInterval(this.decayId);
    }

    decayResources = () => {

      if (this.losingCondition()) this.gameOver();

      this.setState( prevState => ({
        medicine: prevState.medicine - 25,
        food: prevState.medicine - 25,
        water: prevState.medicine - 25,
      }), () => console.log(this.state));
    }

    componentDidMount = async () => {
      await this.generatePlanets(this.createPlanet, 80);
      this.calcPlanetBoundaries();
      this.decayId = setInterval(() => {
        this.decayResources()
      }, 1000);
    }

    componentWillUnmount() {
      clearInterval(this.decayId);
      clearInterval(this.transferId);
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

    isDepleted = planet => planet.water < 1 && planet.food < 1 && planet.medicine < 1;
    
    beginTransfer = planet => {
      planet = this.state.planetsArray.find( p => p.id === planet.id );
      planet.transferId = this.isDepleted(planet) ? null : setInterval(() => {
        this.transferResources(planet);
      }, 500);
      console.log(planet.transferId);
    }

    stopTransfer = planet => {
      if (this.isDepleted(planet)) {
        console.log('Clear interval');
        clearInterval(planet.transferId);
        return;
      }
    }
    transferResources = planet => {
      const waterTransferred = planet.water * 0.05 + 2
      const foodTransferred = planet.food * 0.05 + 2
      const medicineTransferred = planet.medicine * 0.05 + 2

      // lower planet's colors
      planet.water -= planet.type === 'water' ? waterTransferred * 2 : waterTransferred;
      planet.food -= planet.type === 'food' ? foodTransferred * 2 : foodTransferred;
      planet.medicine -= planet.type === 'medicine' ? medicineTransferred * 2 : medicineTransferred;
      // raise user resources
      this.setState( prevState => ({
        water: prevState.water + waterTransferred,
        food: prevState.food + foodTransferred,
        medicine: prevState.medicine + medicineTransferred
      }))
    }

    findCollision = (ship, planet) => {
      if (ship.x < planet.x + planet.width &&
        ship.x + ship.width > planet.x &&
        ship.y < planet.y + planet.height &&
        ship.y + ship.height > planet.y) {
        console.log(`Currently on plant ${planet.id}`);
        this.beginTransfer(planet);
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
        const planet={
            water: Math.floor(Math.random() * 255) + 1,
            medicine: Math.floor(Math.random() * 255) + 1,
            food: Math.floor(Math.random() * 255) + 1,
            top: randomNumber(700, 15000),
            left: randomNumber(700, 15000),
            size: randomNumber(300, 700),
            id
        }
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
        p = this.planetType(p);
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

      return {...p, type };
    }


    // Rendering Planet

    // 1) Create a circle 
    // css borderradius 50%

    // 2) With the circle, add color with CMYK
    // Cyan---C 255 is to 100% aka 255 for water
    // Magenta---M 255 etc 

    // 3) flex wrap inline wrap

    // 4) padding to the planets based on orbit number




    
  render() {
    return (
      <div className="Universe">
        <Ship findShip={this.findShip} />
        { this.state.planetsArray.length ? this.renderPlanets() : null }
      <div className="HUD">
        <StatusBar resource='medicine' amount={this.state.medicine} />
        <StatusBar resource='water' amount={this.state.water} />
        <StatusBar resource='food' amount={this.state.food} />
      </div>
      </div>
    )
  }
}

export default Universe;