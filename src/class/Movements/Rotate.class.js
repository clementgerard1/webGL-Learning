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
	
}
module.exports = Rotate;