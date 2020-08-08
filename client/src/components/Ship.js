import React, { Component } from 'react';
import ship from '../ship.png';
import { limitGameWindow } from '../utils/navigation';

const seedOrientation = () => {
	const rootOrientation = getComputedStyle(document.documentElement)
	.getPropertyValue('--orientation')
	.slice(1,3)
	return parseInt(rootOrientation, 10);
}

class Ship extends Component {

	state = {
		orientation: seedOrientation(),
		top: document.documentElement.clientTop,
		left: document.documentElement.clientLeft
	}

	componentDidMount() {
		document.getElementById('Ship').focus();
	}

	shipBoundaries = () => {
		const ship = document.getElementById('Ship');
		return ship.getBoundingClientRect();
	}
	
	rotateShip = (deg) => {
		document.documentElement.style.setProperty('--orientation', deg);
	}

	setShipPosition = (top, left) => {
		[top, left] = limitGameWindow(top, left);
		this.setState({top, left});
		this.props.findShip(this.shipBoundaries());
	}

	accelerateShip = orientation => {

		let {top, left} = this.state;
		switch (true) {

			case (0 <= orientation && orientation <= 90):
				window.scroll({top: top -= 90-orientation, left: left += orientation , behavior: 'smooth'});
				this.setShipPosition(top, left);
				break;

			case (90 < orientation && orientation <= 180):
				window.scroll({top: top += 90 - Math.abs(180 - orientation), left: left += 180-orientation , behavior: 'smooth'});
				this.setShipPosition(top, left);
				break;

			case (180 < orientation && orientation <= 270):
				window.scroll({top: top += 270 - orientation, left: left -= 90 - Math.abs(270 - orientation) , behavior: 'smooth'});
				this.setShipPosition(top, left);
				break;

			case ( 270 < orientation && orientation <= 359):
				window.scroll({top: top -= 90 - Math.abs(360-orientation), left: left -= 90 - Math.abs(270 - orientation) , behavior: 'smooth'});
				this.setShipPosition(top, left);
				break;

			default:
				break;
		}
	}

	handleMovement = e => {
		let orientation = this.state.orientation;
		const Akey = e.keyCode === 65;
		const Dkey = e.keyCode === 68;
		const Wkey = e.keyCode === 87;

		if (Akey) {
			orientation = this.maintainOrientation(orientation - 10);
			this.rotateShip( orientation + 'deg' );
			this.setState({orientation})
		} else if (Dkey) {
			orientation = this.maintainOrientation(orientation + 10);
			this.rotateShip( orientation + 'deg' );
			this.setState({orientation})
		} else if (Wkey) {
			this.accelerateShip(orientation);
		} else if (Wkey && Dkey) {
			orientation = this.maintainOrientation(orientation + 10);
			this.rotateShip( orientation + 'deg' );
			this.setState({orientation});
			this.accelerateShip(orientation);
		} else if (Wkey && Akey) {
			orientation = this.maintainOrientation(orientation - 10);
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
		return (
			<div onKeyDown={this.handleMovement}>
				<img
					tabIndex='1'
					src={ship}
					alt='Ship'
					id='Ship'
				/>
			</div>
		);
	}
}

export default Ship;