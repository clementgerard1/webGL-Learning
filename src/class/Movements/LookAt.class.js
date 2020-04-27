const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");
const Movement = require("../Interfaces/Movement.class.js");
const Utils = require("../Utils.class.js");

class LookAt extends Movement{

	constructor(center, up){
		super();
		this.center = center;
		this.up = up;
	}

	setCenter(center){
		this.center = center;
	}

	process(matrix, viewer){

		let centerP;
		if(typeof this.center == "array"){
			centerP = glmatrix.vec3.fromValues(this.center[0], this.center[1], this.center[2]);
		}else{
			centerP = this.center.getPosition();
			centerP = glmatrix.vec3.fromValues(centerP[0], centerP[1], centerP[2]);
		}

		const eyePosition = glmatrix.vec3.create();
		glmatrix.vec3.transformMat4(eyePosition, eyePosition, matrix);

		const lookAt = glmatrix.mat4.create();
		glmatrix.mat4.targetTo(matrix, eyePosition, centerP, this.up);

	}

	clone(){
		const neww = new this.constructor();
		neww.center = this.center;
		neww.up = this.up.slice();
		return neww;
	}
	
}
module.exports = LookAt;