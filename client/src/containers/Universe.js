import React, { Component } from 'react';
import Ship from '../components/Ship';

function randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
}  

class Universe extends Component {
    
    // Creating the array elements for Planets

    state={
        planetsArray:[],
        shipBoundaries: {}
    }

    componentDidMount() {
      this.generatePlanets(this.createPlanet, 4);
    }

    findShip = shipBoundaries => {
      this.setState({
        shipBoundaries
      });
    }

    createPlanet=()=>{
        const planet={
            water: Math.floor(Math.random() * 255) + 1,
            medicine: Math.floor(Math.random() * 255) + 1,
            food: Math.floor(Math.random() * 255) + 1,
            fuel: Math.floor(Math.random() * 255) + 1,
            orbit: randomNumber(400, 1000),
            size: randomNumber(100, 400),
            id: this.state.planetsArray.length ? this.state.planetsArray.length - 1 : null
        }
        this.setState( prevState => ({
          planetsArray: [...prevState.planetsArray, planet]
        }))
    }

    generatePlanets = (func, times) => {
      console.log(times);
      if (times === 0) return;
      func();
      return this.generatePlanets(func, --times);
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
    console.log(this.state);
    return (
      <div className="Universe">
        <Ship findShip={this.findShip} />
      </div>
    )
  }
}

export default Universe;