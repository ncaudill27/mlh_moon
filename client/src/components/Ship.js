import React, { Component } from 'react';
import ship from '../ship.png';
import { navigateShip } from '../utils/navigation';

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

	handleMovement = e => {
		const {orientation, top, left} = navigateShip(e, this.state);
		console.log("handleMovement: ", orientation, top, left);
		this.setState({orientation, top, left});
		this.props.findShip(this.shipBoundaries());
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
		console.log();
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