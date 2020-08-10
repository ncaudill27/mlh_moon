import React from 'react';
import StatusBar from './StatusBar';

function HUD({water, medicine, food}) {

	const missionCritical = () => water < 300 || medicine < 300 || food < 300;
	const danger = () => !missionCritical() || "danger"

	return (
		<div className={`HUD ${danger()}`}>
			<div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
				{ !missionCritical() || <h2 id='warning'>HURRY!! YOU'RE RUNNING LOW ON SUPPLIES!</h2> }
			</div>
			<StatusBar resource='water' amount={water} />
			<StatusBar resource='food' amount={food} />
			<StatusBar resource='medicine' amount={medicine} />
		</div>
	);
}

export default HUD;