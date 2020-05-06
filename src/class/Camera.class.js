const glmatrix = require("../../node_modules/gl-matrix/gl-matrix-min.js");
const Movable = require("./Interfaces/Movable.class.js")
const Object3D = require("./Interfaces/Object3D.class.js");
const Translate = require("./Movements/Translate.class.js");
const Scale = require("./Movements/Scale.class.js");
const Rotate = require("./Movements/Rotate.class.js");
const LookAt = require("./Movements/LookAt.class.js");


class Camera extends Movable{

	constructor(){
		super();

		this.movements = [];
		this.stepUpAnimation = true;

		//Position
		this.position = [0, 0, 0];
		this.positionTranslate = new Translate(this.position, 0, function(){});
    this.positionTranslate.setPosition(0, 0, 0);
    this.positionTranslate.setTranslationVec(0, 0, 0);
    this.addMovement("position", this.positionTranslate);
    this.positionTranslate.start();

		this.direction = [0, 0, 1];
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

	enableStepUpAnimation(){
		this.stepUpAnimation = true;
	}

	disableStepUpAnimation(){
		this.stepUpAnimation = false;
	}

	addMovement(name, movement){
			if(typeof name != "string"){
	      movement = name;
	      name = "movement" + Object.keys(this.movements).length;
	    }
      this.movements[name] = movement;
  }

  removeMovement(name){
      delete this.movements[name];
  }

  getNbMovements(){
      return Object.keys(this.movements).length;
  }

  getMovements(){
      return this.movements;
  }

	getPosition(){
		this.disableStepUpAnimation();
		const transform = this.render();
		this.enableStepUpAnimation();
		const position = glmatrix.vec3.create();
		glmatrix.vec3.transformMat4(position, this.position, transform);
		return position;
	}

	setPosition(x, y, z){
		this.position = [x, y, z];
		this.positionTranslate.setTranslationVec(x, y, z);
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

	render(){
        //Local transformation
        //base = matrice héritéé d'un groupe d'objet

        let processedMatrix = glmatrix.mat4.create();
        const stepUp = this.stepUpAnimation;

        //Translate
        for(let move in this.movements){
            if(this.movements[move] instanceof Translate){
                this.movements[move].process(processedMatrix, stepUp);
            }
        }
        //Rotate
        for(let move in this.movements){
            if(this.movements[move] instanceof Rotate){
                this.movements[move].process(processedMatrix, stepUp);
            }
        }

        //LookAt
        for(let move in this.movements){
            if(this.movements[move] instanceof LookAt){
                this.movements[move].process(processedMatrix, this);
            }
        }
        return processedMatrix;
	}

	getMatrix(ratio){
		const camera = glmatrix.mat4.create();
		if(this.type == "orthogonal"){
<<<<<<< HEAD
			glmatrix.mat4.ortho(result, -(this.orthoSettings["size"] / 2) * ratio, (this.orthoSettings["size"] / 2) * ratio, -(this.orthoSettings["size"] / 2) , (this.orthoSettings["size"] / 2), this.orthoSettings["near"], this.orthoSettings["far"]);
		}else if(this.type == "perspective"){
			glmatrix.mat4.perspective(result, this.perspSettings["focal"] * (Math.PI / 180), ratio, this.perspSettings["near"], this.perspSettings["far"]);
		}
		const move = glmatrix.mat4.create();
		glmatrix.mat4.translate(move, move, [-this.position[0], -this.position[1], -this.position[2]]);
=======
			glmatrix.mat4.ortho(camera, -(this.orthoSettings["size"] / 2) * ratio, (this.orthoSettings["size"] / 2) * ratio, -(this.orthoSettings["size"] / 2) , (this.orthoSettings["size"] / 2), this.orthoSettings["near"], this.orthoSettings["far"]);
		}else if(this.type == "perspective"){
			glmatrix.mat4.perspective(camera, this.perspSettings["focal"] * (Math.PI / 180), ratio, this.perspSettings["near"], this.perspSettings["far"]);
		}
>>>>>>> tmp

		const transform = this.render();
		glmatrix.mat4.invert(transform, transform);
		glmatrix.mat4.multiply(camera, camera, transform);
		return camera;

	}

}

module.exports = Camera;