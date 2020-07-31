import React, { Component } from 'react';
import ship from '../ship.png';

class Ship extends Component {

  state = {
    orientation: getComputedStyle(document.documentElement).getPropertyValue('--orientation')
  }
  
  rotateShip = (deg) => {
    document.documentElement.style.setProperty('--orientation', deg);
  }

  handleRotate = e => {
    let orientation = this.state.orientation;
    console.log(e);
    if (e.keyCode === 65) {
      orientation -= 2
      this.rotateShip( orientation + 'deg' );
    } else if (e.keyCode === 68) {
      console.log('right');
      orientation += 2
      this.rotateShip( orientation + 'deg' );
      this.setState({orientation})
    };
  }

  render() {
    console.log(this.state);    
    return (
      <div onKeyDown={ e => this.handleRotate(e) }>
        <img
          className='Ship'
          src={ship}
          alt='Ship'
          tabIndex='0'
          onClick={ e => console.log(e) }
        />
      </div>
    );
  }
}

export default Ship;