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
		this.setState(navigateShip(e, this.state));
		this.props.findShip(this.shipBoundaries());
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