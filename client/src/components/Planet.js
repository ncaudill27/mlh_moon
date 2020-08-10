import React from 'react';
import clouds from '../clouds.jpg';

function Planet({water, medicine, food, top, left, size, id}) {

	const planetStyle = {
		backgroundColor: 'black',
		width: `${size}px`,
		height: `${size}px`,
		position: 'absolute',
		top: `${top}px`,
		left: `${left}px`,
		background: `radial-gradient(circle at 100px 100px, rgb(${medicine}, ${food}, ${water}), #000)`,
		boxShadow: `
			 	inset 2px 2px 12px 2px rgba(${medicine + 50}, ${food + 50}, ${water + 50}, 0.678),
			1px 1px 10px 1px #222
		`
	}
	
	return (
		<div className="Planet" id={id} style={planetStyle}>

		</div>
	);
}

export default Planet;