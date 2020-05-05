const MirrorTexture = require("../Textures/MirrorTexture.class");
const ColorTexture = require("../Textures/ColorTexture.class");
const FrameTexture = require("../Textures/FrameTexture.class");
const CanvasTexture = require("../Textures/CanvasTexture.class");
const Translate = require("../Movements/Translate.class.js");
const Scale = require("../Movements/Scale.class.js");
const Rotate = require("../Movements/Rotate.class.js");
const LookAt = require("../Movements/LookAt.class.js");
const Utils = require("../Utils.class");
const Material = require("../Material.class.js");
const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

class Object3D{

	constructor(material){
		this.id = Utils.newID(this);
		this.transparency = false;
		this.mirror = false;
		this.mirrored = 0;
    this.stepUpAnimation = true;
    this.direction = [0, 0, 1];

    if(typeof material != "undefined"){
      this.material = material;
    }else{
      this.material = new Material();
    }

		this.movements = [];

    //Position
    this.position = [0, 0, 0];
    this.positionTranslate = new Translate(this.position, 0, function(){});
    this.positionTranslate.setPosition(0, 0, 0);
    this.positionTranslate.setTranslationVec(0, 0, 0);
    this.addMovement("position", this.positionTranslate);
    this.positionTranslate.start();
   
    this.textureCoordonnees = [];

    this.positions = [];

	}

  renderTextures(){
    this.material.renderTextures(this);
  }

  getMaterial(){
    return this.material;
  }

  setMaterial(material){
    this.material = material;
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

  _checkTransparency(){
      this.transparency = this.material.isTransparent();
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
    const temp = [];
    this.disableStepUpAnimation();
    this.render(temp);
    this.enableStepUpAnimation();
    const position = glmatrix.vec3.fromValues(0, 0, 0);
    glmatrix.vec3.transformMat4(position, position, temp[this.id][1]);
    return position;
	}

	isTransparent(){
    this._checkTransparency();
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
    neww.material = this.material;
    neww.direction = this.direction.slice();
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
        const stepUp = this.stepUpAnimation;
        

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
        //LookAt
        for(let move in this.movements){
            if(this.movements[move] instanceof LookAt){
                this.movements[move].process(processedMatrix, this);
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

  setOpacity(value){
    this.material.setOpacity(value);
    this._checkTransparency();
  }

  getOpacity(){
    return this.material.getOpacity();
  }

	draw(webGLProgram){
    if(webGLProgram.getShaderBuilder().getMode() == "event"){
      webGLProgram.getContext().uniform4fv(webGLProgram.getShaderBuilder().getPointer("IDasColor"), Utils.idAsColor(this.id));
    }

		if(this.transparency){
			webGLProgram.getContext().depthMask(false);
		}else{
			webGLProgram.getContext().depthMask(true);
		}
		webGLProgram.getContext().uniform1f(webGLProgram.getShaderBuilder().getPointer("opacity"), this.material.getOpacity());
	}

  addTexture(name, texture){
    this.material.addTexture(name, texture);
    this._checkTransparency();
  }

  removeTexture(name){
    this.material.removeTexture(name);
    this._checkTransparency();
  }

  toLines(indexes){
    const result = [];
    for(let i = 0 ; i < indexes.length / 3 ; i++){
      //Line 1
      result[result.length] = indexes[i*3];
      result[result.length] = indexes[i*3 + 1];

      //Line 2
      result[result.length] = indexes[i*3 + 1];
      result[result.length] = indexes[i*3 + 2];

      //Line 3
      result[result.length] = indexes[i*3 + 2];
      result[result.length] = indexes[i*3];
    }
    return result;
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