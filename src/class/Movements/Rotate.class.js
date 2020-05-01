const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");
const Movement = require("../Interfaces/Movement.class.js");
const Utils = require("../Utils.class.js");

class Rotate extends Movement{

	constructor(angle, axe, nbFrame, callback){
		super();
		this.angle = Math.PI * (angle / 180);
		this.axe = axe;
		this.nbFrame = nbFrame;
		this.step = 0;
    this.positions = [0, 0, 0];
		this.started = false;
		this.callback = callback;
		this.finished = false;
		this.animate = nbFrame > 0;

		if(typeof callback != "undefined"){
			this.callback = callback;
		}else{
			this.callback = null;
		}

	}

	setPosition(x, y, z){
		this.positions = [x, y, z];
	}

	process(matrix, stepup){
		glmatrix.mat4.translate(matrix, matrix, [this.positions[0], this.positions[1], this.positions[2]]);
		
		if(this.animate){
			glmatrix.mat4.rotate(matrix, matrix, this.angle * super.getPourcent(), this.axe);
		}else{
			glmatrix.mat4.rotate(matrix, matrix, this.angle, this.axe);
		}

		glmatrix.mat4.translate(matrix, matrix, [-this.positions[0], -this.positions[1], -this.positions[2]]);

		if(this.animate){
			glmatrix.mat4.rotate(matrix, matrix, -this.angle * super.getPourcent(), this.axe);
		}else{
			glmatrix.mat4.rotate(matrix, matrix, -this.angle, this.axe);
		}
		
		if(stepup && this.animate){
			super.endFrame();
		}

	}

	clone(){
		const neww = new this.constructor();
		neww.angle = this.angle;
		neww.axe = this.axe;
		neww.nbFrame = this.nbFrame;
		neww.step = this.step;
		neww.positions = this.positions.slice();
		neww.started = this.started;
		neww.classback = this.callback;
		neww.finished = this.finished;
		return neww;
	}
	
}
module.exports = Rotate;