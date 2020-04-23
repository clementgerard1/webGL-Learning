const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");
const Movement = require("../Interfaces/Movement.class.js");

class Translate extends Movement{

	constructor(vec, nbFrame, callback){
		super();
		this.vec = vec;
		this.nbFrame = nbFrame;
		this.step = 0;
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

	process(matrix){

		if(this.started && this.step < this.nbFrame){
			this.step++;
		}
		const tempVec = glmatrix.vec3.create();
		glmatrix.vec3.scale(tempVec, this.vec, this.step / this.nbFrame);
		glmatrix.mat4.translate(matrix, matrix, tempVec);
		//MOVEMENT COMPLETED
		if(!this.finished && this.step == this.nbFrame){
			this.finished = true;
			this.callback();
		}

	}
	
}
module.exports = Translate;