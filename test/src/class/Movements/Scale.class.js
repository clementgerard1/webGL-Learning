const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");
const Movement = require("../Interfaces/Movement.class.js");

class Scale extends Movement{

	constructor(vec, nbFrame, callback){
		super();
		this.vec = vec;
		this.nbFrame = nbFrame;
    this.positions = [0, 0, 0];
		this.started = false;
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

	setScaleVec(x, y, z){
		this.vec = [x, y, z];
	}
	
	process(matrix, stepup){

		glmatrix.mat4.translate(matrix, matrix, [this.positions[0], this.positions[1], this.positions[2]]);
		if(this.animate){
			const vec = glmatrix.vec3.create();
			glmatrix.vec3.scale(vec, this.vec, super.getPourcent());
			glmatrix.mat4.translate(matrix, matrix, vec);
		}else{
			glmatrix.mat4.scale(matrix, matrix, this.vec);
		}
		
		glmatrix.mat4.translate(matrix, matrix, [-this.positions[0], -this.positions[1], -this.positions[2]]);


		if(stepup && this.animate){
			super.endFrame();
		}

	}
	
}
module.exports = Scale;