const Object3D = require("../Interfaces/Object3D.class.js");
const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

class Object3DGroup extends Object3D{

	constructor(){
		super();
		this.centerPosition = [0, 0, 0];
		this.movements = [];
		this.objects = [];
		this.bufferFunctions = {
			"position" : this._sendVertexPosition,
			"color" : this._sendVertexColor,
		}
	}

	addMovement(name, movement){
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

	setPosition(x, y, z){
		this.centerPosition = [x, y, z];
	}

  getPosition(){
    return this.centerPosition;
  }

	add3DObject(name, object){
		this.objects[name] = object;
	}

	remove3DObject(name){
		delete this.objects[name];
	}

	render(transformsCollection, base){

      //Local transformation
      //base = matrice héritéé d'un groupe d'objet
      let processedMatrix;
      const stepUp = this.mirrored == 0;
      if(base == null || typeof base == "undefined"){
          processedMatrix = glmatrix.mat4.create();
          if(this.mirrored == 0){
            for(let move in this.movements){
                this.movements[move].process(processedMatrix, stepUp);
            }
          }
      }else{
          processedMatrix = base;
          if(this.mirrored == 0){
            for(let move in this.movements){
              this.movements[move].process(processedMatrix, stepUp);
            }
          }
      }

      for(let object in this.objects){
        let copy = glmatrix.mat4.clone(processedMatrix);
      	this.objects[object].render(transformsCollection, copy);
      }

	}

  draw(){
    
  }

  clone(){
    super.clone();
    console.log(this);
  }

}

module.exports = Object3DGroup;