const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");
const Movement = require("../Interfaces/Movement.class.js");

class Translate extends Movement{

	constructor(vec, nbFrame, callback){
		super();
		this.vec = vec;
		this.nbFrame = nbFrame;
		this.step = 0;
<<<<<<< HEAD
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
=======
		this.positions = [0, 0, 0];
		this.callback = callback;
		this.animate = nbFrame > 0;

		if(typeof callback != "undefined"){
			this.callback = callback;
		}else{
			this.callback = null;
		}
		
	}

	setTranslationVec(x, y, z){
		this.vec = [x, y, z];
	}

	setPosition(x, y, z){
		this.positions = [x, y, z];
	}

	process(matrix, stepup){

		glmatrix.mat4.translate(matrix, matrix, [this.positions[0], this.positions[1], this.positions[2]]);
		if(this.animate){
			const vec = glmatrix.vec3.create();
			const pourcent = super.getPourcent();
			glmatrix.vec3.scale(vec, this.vec, [pourcent, pourcent, pourcent]);
			glmatrix.mat4.translate(matrix, matrix, vec);
		}else{
			glmatrix.mat4.translate(matrix, matrix, this.vec);
		}
		glmatrix.mat4.translate(matrix, matrix, [-this.positions[0], -this.positions[1], -this.positions[2]]);

		if(stepup && this.animate){
			super.endFrame();
>>>>>>> tmp
		}

	}
	
}
<<<<<<< HEAD
=======

>>>>>>> tmp
module.exports = Translate;