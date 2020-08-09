class Planet {
	constructor(id) {
		this.id = id;
		this.water = Math.floor(Math.random() * 255) + 1;
		this.medicine = Math.floor(Math.random() * 255) + 1;
		this.food = Math.floor(Math.random() * 255) + 1;
		this.top = randomNumber(700, 15000);
		this.left = randomNumber(700, 15000);
		this.size = randomNumber(300, 700);
		this.planetType = this.determineType();
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

		// if ( this.isDepleted() ) return;

		return {
			water: waterTransferred,
			food: foodTransferred,
			medicine: medicineTransferred
		};
	}

	stopTransfer = () => clearInterval(this.transferId);

	collisionBoundaries = () => {
		this.DOMelement = document.getElementById(this.id);
		const planetBounds = this.DOMelement.getBoundingClientRect();

		return this.stripBoundingClientFunctions(planetBounds);
	}

	stripBoundingClientFunctions = boundingClientObject => {
		const boundaries = {};
		
		for (let key in planetBounds) {
			if (typeof planetBounds[key] !== 'function') boundaries[key] = planetBounds[key];
		};

		return boundaries;
	}
}