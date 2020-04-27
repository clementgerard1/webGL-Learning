const glmatrix = require("../../node_modules/gl-matrix/gl-matrix-min.js");
const Movable = require("./Interfaces/Movable.class.js")
const Object3D = require("./Interfaces/Object3D.class.js");


class Camera extends Movable{

	constructor(){
		super();
		this.position = [0, 0, 0];
		this.direction = [0, 0, 1];
		this.fixed = false;
		this.type = "perspective";
		this.orthoSettings = {
			"size" : 6,
			"far" : 100,
			"near" : 0,
		};
		this.perspSettings = {
			"focal" : 45,
			"far" : 100,
			"near" : 0.1,
		};
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
		return this.position;
	}

	setPosition(x, y, z){
		this.position = [x, y , z];
	}

	setType(name, args){
		if(name == "orthogonal"){
			this.type = "orthogonal";
			for(let arg in args){
				this.orthoSettings[arg] = args[arg];
			}
		}else{
			this.type = "perspective";
			for(let arg in args){
				this.perspSettings[arg] = args[arg];
			}
		}
	}

	getMatrix(ratio){
		const result = glmatrix.mat4.create();
		if(this.type == "orthogonal"){
			glmatrix.mat4.ortho(result, -(this.orthoSettings["size"] / 2) * ratio, (this.orthoSettings["size"] / 2) * ratio, -(this.orthoSettings["size"] / 2) , (this.orthoSettings["size"] / 2), this.orthoSettings["near"], this.orthoSettings["far"]);
		}else if(this.type == "perspective"){
			glmatrix.mat4.perspective(result, this.perspSettings["focal"] * (Math.PI / 180), ratio, this.perspSettings["near"], this.perspSettings["far"]);
		}
		const move = glmatrix.mat4.create();
		glmatrix.mat4.translate(move, move, [-this.position[0], -this.position[1], -this.position[2]]);

		glmatrix.mat4.multiply(result, result, move);
		return result;

	}

}

module.exports = Camera;