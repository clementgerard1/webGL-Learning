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

		//glmatrix.vec3.transformQuat(axe, this.axe, quat);

		//const quat = glmatrix.quat.create();
		//glmatrix.mat4.getRotation(quat, matrix);
		//glmatrix.quat.invert(quat, quat);
		const positions = this.positions;//glmatrix.vec3.create();
		//const axe = glmatrix.vec3.create();

		glmatrix.mat4.translate(matrix, matrix, [this.positions[0], this.positions[1], this.positions[2]]);
		
		if(this.animate){
			glmatrix.mat4.rotate(matrix, matrix, this.angle * super.getPourcent(), this.axe/*axe*/);
		}else{
			glmatrix.mat4.rotate(matrix, matrix, this.angle, this.axe/*axe*/);
		}

		//glmatrix.vec3.transformQuat(positions, this.positions, quat);


		glmatrix.mat4.translate(matrix, matrix, [-this.positions[0], -this.positions[1], -this.positions[2]]);

<<<<<<< HEAD


		//MOVEMENT COMPLETED
		if(!this.finished && this.step == this.nbFrame){
			this.finished = true;
			this.callback();
		}

	}

	processMirror(matrix){

		if(this.started && this.step < this.nbFrame){
			this.step++;
		}
		glmatrix.mat4.rotate(matrix, matrix, this.angle * (this.step / this.nbFrame), this.axe);

		//MOVEMENT COMPLETED
		if(!this.finished && this.step == this.nbFrame){
			this.finished = true;
			this.callback();
=======
		
		if(stepup && this.animate){
			super.endFrame();
>>>>>>> tmp
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
<<<<<<< HEAD

	mirrorClone(mirror){
		const neww = new this.constructor();
		neww.angle = -this.angle;
		const p1 = Utils.symPlane(glmatrix.vec3.fromValues(0, 0, 0), mirror.mirrorPos, mirror.mirrorVec1, mirror.mirrorVec2);
		const p2 = Utils.symPlane(glmatrix.vec3.fromValues(this.axe[0], this.axe[1], this.axe[2]), mirror.mirrorPos, mirror.mirrorVec1, mirror.mirrorVec2);

		neww.axe = Utils.newVec(p1, p2);

		neww.nbFrame = this.nbFrame;
		neww.step = this.step;

		const point = glmatrix.vec3.fromValues(this.positions[0], this.positions[1], this.positions[2]);
    const newP = Utils.symPlane(point, mirror.mirrorPos, mirror.mirrorVec1, mirror.mirrorVec2);
    neww.positions = [newP[0], newP[1], newP[2]];

		neww.started = this.started;
		neww.callback = this.callback;
		neww.finished = this.finished;
		return neww;
	}
=======
>>>>>>> tmp
	
}
module.exports = Rotate;