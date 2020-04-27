const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");
const Movement = require("../Interfaces/Movement.class.js");

class Scale extends Movement{

	constructor(vec, nbFrame, callback){
		super();
		this.vec = vec;
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

	setScaleVec(x, y, z){
		this.vec = [x, y, z];
	}
	
	process(matrix, stepup){

		if(stepup && this.started && this.step < this.nbFrame){
			this.step++;
		}

		glmatrix.mat4.translate(matrix, matrix, [this.positions[0], this.positions[1], this.positions[2]]);
		glmatrix.mat4.scale(matrix, matrix, this.vec);
		glmatrix.mat4.translate(matrix, matrix, [-this.positions[0], -this.positions[1], -this.positions[2]]);

		//MOVEMENT COMPLETED
		if(!this.finished && this.step == this.nbFrame){
			this.finished = true;
			this.callback();
		}

	}
	
}
module.exports = Scale;