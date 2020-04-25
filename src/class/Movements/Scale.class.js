const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");
const Movement = require("../Interfaces/Movement.class.js");

class Scale extends Movement{

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
	}

	start(){
		this.started = true;
	}

	stop(){
		this.started = false;
	}

	reset(){
		this.step = 0;
		this.finished = false;
	}

	setPosition(x, y, z){
		this.positions = [x, y, z];
	}

	process(matrix, stepup){

		if(stepup && this.started && this.step < this.nbFrame){
			this.step++;
		}

		glmatrix.mat4.translate(matrix, matrix, [this.positions[0], this.positions[1], this.positions[2]]);
		glmatrix.mat4.rotate(matrix, matrix, this.angle * (this.step / this.nbFrame), this.axe);
		glmatrix.mat4.translate(matrix, matrix, [-this.positions[0], -this.positions[1], -this.positions[2]]);

		//MOVEMENT COMPLETED
		if(!this.finished && this.step == this.nbFrame){
			this.finished = true;
			this.callback();
		}

	}
	
}
module.exports = Scale;