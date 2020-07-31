import React, { Component } from 'react';
import ship from '../ship.png';

const seedOrientation = () => getComputedStyle(document.documentElement)
                              .getPropertyValue('--orientation')
                              .slice(1,3);

// establish 
class Ship extends Component {

  state = {
    orientation: seedOrientation(),
    top: document.documentElement.clientTop,
    left: document.documentElement.clientLeft
  }
  
  rotateShip = (deg) => {
    document.documentElement.style.setProperty('--orientation', deg);
  }

  accelerateShip = () => {
    let {top, left} = this.state;
    window.scroll({top: top += 90, left: left += 90, behavior: 'smooth'});
    this.setState({top, left});
  }

  handleMovement = e => {
    let orientation = parseInt(this.state.orientation, 10);
    if (e.keyCode === 65) {
      orientation = this.maintainOrientation(orientation - 2);
      this.rotateShip( orientation + 'deg' );
      this.setState({orientation})
    } else if (e.keyCode === 68) {
      orientation = this.maintainOrientation(orientation + 2);
      this.rotateShip( orientation + 'deg' );
      this.setState({orientation})
    } else if (e.keyCode === 87) {
      this.accelerateShip();
    }
  }

  maintainOrientation = orientation => {
    if (orientation > 359) {
      orientation = 0;
    } else if (orientation < 0) {
      orientation = 358;
    }
    return orientation;
  }

  render() {
    console.log(this.state);
    return (
      <div tabIndex='0' onKeyDown={this.handleMovement}>
        <img
          className='Ship'
          src={ship}
          alt='Ship'
          onClick={ e => console.log(e) }
        />
      </div>
    );
  }
}

export default Ship;