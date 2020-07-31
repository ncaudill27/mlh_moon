import React, { Component } from 'react';
import Ship from '../components/Ship';

function randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
}  

class Universe extends Component {
    
    // Creating the array elements for Planets

    state={
        // planetsArray:[],
        shipBoundaries: {}
    }

    findShip = shipBoundaries => {
      this.setState({
        shipBoundaries
      });
    }

    // createPlanet=()=>{
    //     const planet={
    //         water: Math.floor(Math.random() * 255) + 1,
    //         medicine: Math.floor(Math.random() * 255) + 1,
    //         food: Math.floor(Math.random() * 255) + 1,
    //         fuel: Math.floor(Math.random() * 255) + 1,
    //         orbit: randomNumber(100, 400),
    //         id: this.state.planetsArray.length - 1 
    //     }
    //     this.setState({planetsArray: [...this.state.planetsArray, planet] })
    // }

    // generatePlanets(func, times) {
    //     func();
    //     times && --times && repeat(func, times);
    // }


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