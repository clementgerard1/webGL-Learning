const MirrorTexture = require("../Textures/MirrorTexture.class");
const ColorTexture = require("../Textures/ColorTexture.class");
const Translate = require("../Movements/Translate.class.js");
const Scale = require("../Movements/Scale.class.js");
const Rotate = require("../Movements/Rotate.class.js");
const Utils = require("../Utils.class");
const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

class Object3D{

	constructor(){
		this.id = Utils.newID();
		this.transparency = false;
		this.opacity = 1;
		this.mirror = false;
		this.mirrored = 0;

		this.movements = [];

    //Position
    this.position = [0, 0, 0];
    this.positionTranslate = new Translate(this.position, 1, function(){});
    this.positionTranslate.setPosition(0, 0, 0);
    this.positionTranslate.setTranslationVec(0, 0, 0);
    this.addMovement("position", this.positionTranslate);
    this.positionTranslate.start();
   
    this.textures = [];
    this.textureCoordonnees = [];

	}

	addMovement(name, movement){
      this.movements[name] = movement;
  }

  removeMovement(name){
      delete this.movements[name];
  }

  addTexture(name, texture){
      this.textures[name] = texture;
      this._checkTransparency();
  }

  removeTexture(name){
      delete this.textures[name];
      this._checkTransparency();
  }

  _checkTransparency(){
      this.transparency = false;
      for(let text in this.textures){
          if(this.textures[text] instanceof MirrorTexture){
              this.transparency = true;
              this.mirror = true;
          }else if(this.textures[text] instanceof ColorTexture && this.textures[text].getRGBA()[3] < 1){
              this.transparency = true;
          }else if(this.opacity < 1){
              this.transparency = true;
          }
          //Gérer le cas des ImageTexture Transparentes
      }
  }


  setOpacity(value){
      this.opacity = value;
      this._checkTransparency();
  }

  getOpacity(){
      return this.opacity;
  }

  getNbMovements(){
      return Object.keys(this.movements).length;
  }

  getMovements(){
      return this.movements;
  }

	setPosition(x, y, z){
		this.position = [x, y, z];
		this.positionTranslate.setTranslationVec(x, y, z);
	}

	getPosition(){
		return this.position;
	}

	isTransparent(){
		return this.transparency;
	}

	isMirror(){
		return this.mirror;
	}

	setTransparency(value){
		this.transparency = value;
	}

	setMirror(value){
		this.mirror = value;
	}

	clone(neww){
		neww.mirrored = this.mirrored;
		neww.transparency = this.transparency;
		neww.opacity = this.opacity;
	}

	incMirrorValue(){
		this.mirrored++;
	}

	getMirrorValue(){
		return this.mirrored;
	}

	render(transformsCollection, base){
        //Local transformation
        //base = matrice héritéé d'un groupe d'objet

        let processedMatrix;
        const stepUp = (this.mirrored == 0);
        
        if(base == null || typeof base == "undefined"){
            processedMatrix = glmatrix.mat4.create();
        }else{
            processedMatrix = base;
        }

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
        //Scale
        for(let move in this.movements){
            if(this.movements[move] instanceof Scale){
                this.movements[move].process(processedMatrix, stepUp);
            }
        }
        transformsCollection[this.id] = [this, processedMatrix];
	}

	draw(webGLProgram){
		if(this.transparency){
			webGLProgram.getContext().depthMask(false);
		}else{
			webGLProgram.getContext().depthMask(true);
		}
		webGLProgram.getContext().uniform1f(webGLProgram.getShaderBuilder().getPointer("opacity"), this.opacity);
	}

  _orderPositionsByDistance(cameraPosition, transform){
    //On calcul le centre de chaque triangle
    const centers = [];
    for(let i = 0 ; i < (this.indexes.length / 3) ; i++){
      centers[centers.length] = [];
      const vec1 = [ this.positions[this.indexes[i*3]*3] , this.positions[this.indexes[i*3]*3+1] , this.positions[this.indexes[i*3]*3+2] ];
      const vec2 = [ this.positions[this.indexes[(i*3)+1]*3] , this.positions[this.indexes[(i*3)+1]*3+1] , this.positions[this.indexes[(i*3)+1]*3+2] ];
      const vec3 = [ this.positions[this.indexes[(i*3)+2]*3] , this.positions[this.indexes[(i*3)+2]*3+1] , this.positions[this.indexes[(i*3)+2]*3+2] ];
      glmatrix.vec3.transformMat4(vec1, vec1, transform);
      glmatrix.vec3.transformMat4(vec2, vec2, transform);
      glmatrix.vec3.transformMat4(vec3, vec3, transform);
      centers[centers.length - 1][0]= Utils.getCentroid(vec1, vec2, vec3);
      centers[centers.length - 1][1]= i*3;
    }

    centers.sort(function(elem1, elem2){
      const distance1 = glmatrix.vec3.distance(cameraPosition, elem1[0]);
      const distance2 = glmatrix.vec3.distance(cameraPosition, elem2[0]);
      elem1[2] = distance1;
      elem2[2] = distance2;
      if(distance1 > distance2){
        return -1;
      }else{
        return 1;
      }
    });
    const indexClone = this.indexes.slice();
    for(let i = 0 ; i < (this.indexes.length / 3) ; i++){
      this.indexes[i*3] = indexClone[centers[i][1]];
      this.indexes[i*3+1] = indexClone[centers[i][1] + 1];
      this.indexes[i*3+2] = indexClone[centers[i][1] + 2];
    }
  }

}

module.exports = Object3D;