export default function(num) {
	for (let count = 1; count <= num; count++) {
		new Planet(count);
	}

	return Planet.all;
}

function randomNumber(min, max) {
	return Math.floor(Math.random() * (max - min) + min); 
}

class Planet {

	static all = [];

	constructor(id) {
		this.id = id;
		this.water = Math.floor(Math.random() * 255) + 1;
		this.medicine = Math.floor(Math.random() * 255) + 1;
		this.food = Math.floor(Math.random() * 255) + 1;
		this.top = randomNumber(700, 15000);
		this.left = randomNumber(700, 15000);
		this.size = randomNumber(300, 700);
		this.planetType = this.determineType();
		Planet.all.push(this);
	}

	determineType = () => {
		const values = { water: this.water, medicine: this.medicine, food: this.food}
		let high = 0;
		let type = null;
		for (let key in values) {
			if (values[key] > high) {
				high = values[key];
				type = key;
			};
		}

		return type;
	}

	isDepleted = () => this.water < 10 && this.food < 10 && this.medicine < 10;

	transferResources = () => {
		const waterTransferred = this.water * 0.05 + 2;
		const foodTransferred = this.food * 0.05 + 2;
		const medicineTransferred = this.medicine * 0.05 + 2;

		// lower planet's colors/resources
		this.water -= this.type === 'water' ? waterTransferred * 2 : waterTransferred;
		this.food -= this.type === 'food' ? foodTransferred * 2 : foodTransferred;
		this.medicine -= this.type === 'medicine' ? medicineTransferred * 2 : medicineTransferred;

		console.log(this.water, this.food, this.medicine);
		if ( this.isDepleted() ) return false;

		return {
			water: waterTransferred,
			food: foodTransferred,
			medicine: medicineTransferred
		};
	}

	stopTransfer = () => clearInterval(this.transferId);

	setCollisionBoundaries = () => {
		this.DOMelement = document.getElementById(this.id);

		this.boundaries = this.stripBoundingClientFunctions(
			this.DOMelement.getBoundingClientRect()
		);
	}

	stripBoundingClientFunctions = boundingClientObject => {
		const boundaries = {};
		
		for (let key in boundingClientObject) {
			if (typeof boundingClientObject[key] !== 'function') boundaries[key] = boundingClientObject[key];
		};

		return boundaries;
	}

	findCollision = ship => {
		const { x, y, width, height } = this.boundaries;

		if (
			ship.x < x + width &&
			ship.x + ship.width > x &&
			ship.y < y + height &&
			ship.y + ship.height > y
		) {
			return true;
		};

		return false;
	}
}