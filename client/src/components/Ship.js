import React, { Component } from 'react';
import ship from '../ship.png';

const seedOrientation = () => {
  const rootOrientation = getComputedStyle(document.documentElement)
  .getPropertyValue('--orientation')
  .slice(1,3)
  return parseInt(rootOrientation, 10);
}

// establish 
class Ship extends Component {

  state = {
    orientation: seedOrientation(),
    top: document.documentElement.clientTop,
    left: document.documentElement.clientLeft
  }

  shipBoundaries = () => {
    const ship = document.querySelector('.Ship');
    const leftBound = ship.getBoundingClientRect().left;
    const topBound = ship.getBoundingClientRect().top;
    const rightBound = ship.getBoundingClientRect().right;
    const bottomBound = ship.getBoundingClientRect().bottom;
    return { leftBound, topBound, rightBound, bottomBound};
  }
  
  rotateShip = (deg) => {
    document.documentElement.style.setProperty('--orientation', deg);
  }

  setShipPosition = (top, left) => {
    if (left < 0) left = 0;
    if (top < 0) top = 0;
    this.setState({top, left});
    this.props.findShip(this.shipBoundaries());
  }

  accelerateShip = orientation => {

    let {top, left} = this.state;
    console.log('Moving', this.state);
    switch (true) {

      case (0 <= orientation && orientation <= 90):
        console.log('at 90');
        window.scroll({top: top -= 90-orientation, left: left += orientation , behavior: 'smooth'});
        this.setShipPosition(top, left);
        break;

      case (90 < orientation && orientation <= 180):
        window.scroll({top: top += 180-orientation, left: left += 180-orientation , behavior: 'smooth'});
        this.setShipPosition(top, left);
        break;

      case (180 < orientation && orientation <= 270):
        window.scroll({top: top -= orientation-270, left: left += orientation-270 , behavior: 'smooth'});
        this.setShipPosition(top, left);
        break;

      case ( 270 < orientation && orientation <= 359):
        window.scroll({top: top -= 360-orientation, left: left += orientation-360 , behavior: 'smooth'});
        this.setShipPosition(top, left);
        break;

      default:
        break;
    }
  }

  handleMovement = e => {
    let orientation = this.state.orientation;
    console.log('Handle movt', this.state);
    const Akey = e.keyCode === 65;
    const Dkey = e.keyCode === 68;
    const Wkey = e.keyCode === 87;

    if (Akey) {
      orientation = this.maintainOrientation(orientation - 2);
      this.rotateShip( orientation + 'deg' );
      this.setState({orientation})
    } else if (Dkey) {
      orientation = this.maintainOrientation(orientation + 2);
      this.rotateShip( orientation + 'deg' );
      this.setState({orientation})
    } else if (Wkey) {
      this.accelerateShip(orientation);
    } else if (Wkey && Dkey) {
      orientation = this.maintainOrientation(orientation + 2);
      this.rotateShip( orientation + 'deg' );
      this.setState({orientation});
      this.accelerateShip(orientation);
    } else if (Wkey && Akey) {
      orientation = this.maintainOrientation(orientation - 2);
      this.rotateShip( orientation + 'deg' );
      this.setState({orientation})
      this.accelerateShip(orientation);
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