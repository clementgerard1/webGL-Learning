const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");
const Movement = require("../Interfaces/Movement.class.js");

class Scale extends Movement{

<<<<<<< HEAD
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
=======
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

>>>>>>> tmp
	}

	setPosition(x, y, z){
		this.positions = [x, y, z];
	}

<<<<<<< HEAD
	process(matrix){

		if(this.started && this.step < this.nbFrame){
			this.step++;
		}

		glmatrix.mat4.translate(matrix, matrix, [this.positions[0], this.positions[1], this.positions[2]]);
		glmatrix.mat4.rotate(matrix, matrix, this.angle * (this.step / this.nbFrame), this.axe);
		glmatrix.mat4.translate(matrix, matrix, [-this.positions[0], -this.positions[1], -this.positions[2]]);

		//MOVEMENT COMPLETED
		if(!this.finished && this.step == this.nbFrame){
			this.finished = true;
			this.callback();
=======
	setScaleVec(x, y, z){
		this.vec = [x, y, z];
	}
	
	process(matrix, stepup){

		glmatrix.mat4.translate(matrix, matrix, [this.positions[0], this.positions[1], this.positions[2]]);
		if(this.animate){
			const vec = glmatrix.vec3.create();
			const pourcent = super.getPourcent();
			glmatrix.vec3.scale(vec, this.vec, pourcent);
			glmatrix.mat4.scale(matrix, matrix, vec);
		}else{
			glmatrix.mat4.scale(matrix, matrix, this.vec);
		}
		
		glmatrix.mat4.translate(matrix, matrix, [-this.positions[0], -this.positions[1], -this.positions[2]]);


		if(stepup && this.animate){
			super.endFrame();
>>>>>>> tmp
		}

	}
	
}
module.exports = Scale;