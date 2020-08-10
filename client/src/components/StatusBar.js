import React from 'react';

function StatusBar({resource, amount}) {

	const setColor = resource => {
		switch (resource) {
			case 'medicine':
				return '#af111c';

			case 'water':
				return '#3987c9';
			
			case 'food':
				return '#ccff15';
		
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
		padding: '1px 7px',
		margin:'0',
		color: 'black',
	}

	return (
		<div className="Status-container">
			<div className="Status-bar" style={statusStyle}>
				<p style={labelStyle}>{resource.charAt(0).toUpperCase() + resource.slice(1)}</p>
			</div>
		</div>
	);
}

export default StatusBar;