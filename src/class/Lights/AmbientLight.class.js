const Light = require("../Interfaces/Light.class.js");

class AmbientLight extends Light{

	constructor(){
		super();
		this.power = 1.
	}

	setPower(f){
		this.power = f;
	}

	getPower(){
		return this.power;
	}

}

module.exports = AmbientLight;