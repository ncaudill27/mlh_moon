import React, { Component } from 'react';
import ship from '../ship.png';

const seedOrientation = () => getComputedStyle(document.documentElement)
                        .getPropertyValue('--orientation')
                        .slice(1,3);

class Ship extends Component {

  state = {
    orientation: seedOrientation()
  }
  
  rotateShip = (deg) => {
    document.documentElement.style.setProperty('--orientation', deg);
  }

  handleRotate = e => {
    let orientation = parseInt(this.state.orientation, 10);
    if (e.keyCode === 65) {
      orientation -= 2
      this.rotateShip( orientation + 'deg' );
      this.setState({orientation})
    } else if (e.keyCode === 68) {
      orientation += 2
      this.rotateShip( orientation + 'deg' );
      this.setState({orientation})
    };
  }

  render() {
    return (
      <div tabIndex='0' onKeyDown={ e => this.handleRotate(e) }>
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