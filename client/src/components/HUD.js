import React from 'react';
import StatusBar from './StatusBar';

function HUD({water, medicine, food}) {

	const messageCondition = () => {
		if (water < 300) return true;
		if (medicine < 300) return true;
		if (food < 300) return true;

		return false;
	}

	return (
		<div className='HUD'>
			{ messageCondition() ? <h2 id='warning'>HURRY!! YOU'RE RUNNING LOW ON SUPPLIES!</h2> : null }
			<StatusBar resource='water' amount={water} />
			<StatusBar resource='food' amount={food} />
			<StatusBar resource='medicine' amount={medicine} />
		</div>
	);
}

export default HUD;