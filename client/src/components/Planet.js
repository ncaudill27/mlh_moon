import React, { useState } from 'react';

function Planet({water, medicine, food, top, left, size, id}) {

	const planetStyle = {
		backgroundColor: `rgb(${medicine}, ${food}, ${water})`,
		width: `${size}px`,
		height: `${size}px`,
		position: 'absolute',
		top: `${top}px`,
		left: `${left}px`
	}
	
	return (
		<div className="Planet" id={id} style={planetStyle}>

		</div>
	);
}

export default Planet;