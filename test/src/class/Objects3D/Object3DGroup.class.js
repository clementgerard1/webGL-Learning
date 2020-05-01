const Object3D = require("../Interfaces/Object3D.class.js");
const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

class Object3DGroup extends Object3D{

	constructor(){
    super();
		this.objects = [];
		this.bufferFunctions = {
			"position" : this._sendVertexPosition,
			"color" : this._sendVertexColor,
		}
	}

	add3DObject(name, object){
		this.objects[name] = object;
	}

	remove3DObject(name){
		delete this.objects[name];
	}

/*  updatePosition(){
    let nb = 0;
    let posX = 0;
    let posY = 0;
    let posZ = 0;
    for(let obj in this.objects){
      const p = this.objects[obj].getPosition();
      posX += p[0];
      posY += p[1];
      posZ += p[2];
      nb++;
    }

    this.setPosition(posX / nb, posY / nb, posZ / nb);
  }

  getPosition(){
    this.updatePosition();
    return super.getPosition();
  }*/

  getAllObjects(r){
    for(let obj in this.objects){
      if(this.objects[obj] instanceof Object3DGroup){
        this.objects[obj].getAllObjects(r);
      }else{
        r[obj] = this.objects[obj];
      }
    }
  }

	render(transformsCollection, base){
      //this.updatePosition();
      
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
  }

}

module.exports = Object3DGroup;