import React from 'react';

function StatusBar({resource, amount}) {

	const setColor = resource => {
		switch (resource) {
			case 'medicine':
				return 'red';

			case 'water':
				return 'cyan';
			
			case 'food':
				return 'yellow';
		
			default:
				break;
		};
	}

	const setSize = amount => {
		// return amount + 'px'
		return amount / 10 + '%'
	}
	
	const statusStyle = {
		backgroundColor: setColor(resource),
		width: setSize(amount),
		height: '20px'
	}

	const labelStyle = {
		padding:'0 5px',
		margin:'0',
		color: 'black',
	}


	// create function to display message when < certain size;
	// give bar a measurement

	return (
		<div className="Status-container">
			<div className="Status-bar" style={statusStyle}>
				<p style={labelStyle}>{resource.charAt(0).toUpperCase() + resource.slice(1)}</p>
			</div>
		</div>
	);
}

export default StatusBar;