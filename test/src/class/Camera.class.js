const glmatrix = require("../../node_modules/gl-matrix/gl-matrix-min.js");
const Movable = require("./Interfaces/Movable.class.js")
const Object3D = require("./Interfaces/Object3D.class.js");


class Camera extends Movable{

	constructor(){
		super();
		this.position = glmatrix.vec4.fromValues(0, 0, 0, 1);
		this.direction = glmatrix.vec4.fromValues(0, 0, 1, 1);
		this.fixed = false;
		this.type = "perspective";
	}

	//val = false || val = 3DObject || val = [x, y, z]
	setFixation(val){
		if(val == false){
			this.fixed = false;
		}else if(val.prototype instanceof Object3D){
			const positions = val.getPosition();
			this.fixed = [positions[0], positions[1], positions[2]];
		}else if(typeof val == "array"){
			this.fixed = [val[0], val[1], val[2]];
		}
	}

	getPosition(){
		return [this.position[0], this.position[1], this.position[2], this.position[3]];
	}

	setPosition(x, y, z){
		this.position = glmatrix.vec4.fromValues(x, y, z, 1);
	}

	setType(name, args){
		if(name == "orthogonal"){
			this.type = "orthogonal";
		}else{
			this.type = "perspective";
		}
	}

	getMatrix(ratio){
		const result = glmatrix.mat4.create();
		if(this.type == "orthogonal"){
			glmatrix.mat4.ortho(result, -2, 2 , -2, 2, 0, 100);
		}else if(this.type == "perspective"){
			glmatrix.mat4.perspective(result, 45 * (Math.PI / 180), ratio, 0.1, 100);
		}
		const move = glmatrix.mat4.create();
		glmatrix.mat4.translate(move, move, [this.position[0], this.position[1], -this.position[2]]);

		glmatrix.mat4.multiply(result, result, move);
		return result;

	}

}

module.exports = Camera;