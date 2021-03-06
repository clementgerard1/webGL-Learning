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

	add3DObject(name, object){
		this.objects[name] = object;
	}

	remove3DObject(name){
		delete this.objects[name];
	}

	render(webGLProgram, attributs, base){

      //Local transformation
      //base = matrice héritéé d'un groupe d'objet
      let processedMatrix;
      if(base == null || typeof base == "undefined"){
          processedMatrix = glmatrix.mat4.create();
          for(let move in this.movements){
              this.movements[move].process(processedMatrix);
          }
          webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
      }else{
          processedMatrix = base;
          for(let move in this.movements){

            this.movements[move].process(processedMatrix);
          }
          webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
      }
      
      for(let object in this.objects){
        let copy = glmatrix.mat4.clone(processedMatrix);
      	this.objects[object].render(webGLProgram, attributs, copy);
      }

	}

  renderMirrored(webGLProgram, attributs, mirror, base){

      //Local transformation
      //base = matrice héritéé d'un groupe d'objet
      let processedMatrix;
      if(base == null || typeof base == "undefined"){
          processedMatrix = glmatrix.mat4.create();
          for(let move in this.movements){
              //this.movements[move].processMirrored(processedMatrix);
          }
          webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
      }else{
          processedMatrix = base;
          for(let move in this.movements){
            //this.movements[move].processMirrored(processedMatrix);
          }
          webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
      }
      
      for(let object in this.objects){
        let copy = glmatrix.mat4.clone(processedMatrix);
        this.objects[object].renderMirrored(webGLProgram, attributs, mirror, copy);
      }

  }


}

module.exports = Object3DGroup;