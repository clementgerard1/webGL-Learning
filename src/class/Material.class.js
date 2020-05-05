const Utils = require("./Utils.class");
const MirrorTexture = require("./Textures/MirrorTexture.class");
const ColorTexture = require("./Textures/ColorTexture.class");
const FrameTexture = require("./Textures/FrameTexture.class");
const CanvasTexture = require("./Textures/CanvasTexture.class");
const glmatrix = require("../../node_modules/gl-matrix/gl-matrix-min.js");

class Material{

	constructor(ambient, diffuse, specular, shininess){
		this.id = Utils.newMaterialID(this);
		this.ambient = []; // Vec4 ou Texture
    this.diffuse = []; // Vec4 ou Texture
    this.specular = []; // Vec4 ou Texture
    this.shininess = []; // Float ou Texture
    this.normals = []; // Vec4 ou Texture
    this.opacity = 1;

    this.textures = [];
	}

	render(webGLProgram){
		for(let text in this.textures){
			if(!(this.textures[text] instanceof MirrorTexture)){
		    webGLProgram.getContext().activeTexture(webGLProgram.getContext().TEXTURE0);
		    webGLProgram.getContext().bindTexture(webGLProgram.getContext().TEXTURE_2D, this.textures[text].getTexture());
		    webGLProgram.getContext().uniform1i(webGLProgram.getShaderBuilder().getPointer("texture"), false, 0);
		  }
	  }
	}

	getTextures(){
		return this.textures;
	}

	getInfos(){
		//Nb de texture à rendre, etc...
	}

  setOpacity(value){
      this.opacity = value;
  }

  getOpacity(){
      return this.opacity;
  }

  generateNormalPositions(that){
    const positions = [];
    for(let i = 0 ; i < this.normals.length / 3; i++){
      positions[positions.length] = that.positions[i*3];
      positions[positions.length] = that.positions[i*3+1];
      positions[positions.length] = that.positions[i*3+2];
      positions[positions.length] = that.positions[i*3] + this.normals[i*3];
      positions[positions.length] = that.positions[i*3+1] + this.normals[i*3+1];
      positions[positions.length] = that.positions[i*3+2] + this.normals[i*3+2];
    }

    return positions;
  }

  generateNormals(that){
  	this.normals = [];
    for(let i = 0 ; i < that.indexes.length / 3 ; i++){
      const p1 = [ that.positions[that.indexes[i*3]*3] , that.positions[that.indexes[i*3]*3+1] , that.positions[that.indexes[i*3]*3+2] ];
      const p2 = [ that.positions[that.indexes[(i*3)+1]*3] , that.positions[that.indexes[(i*3)+1]*3+1] , that.positions[that.indexes[(i*3)+1]*3+2] ];
      const p3 = [ that.positions[that.indexes[(i*3)+2]*3] , that.positions[that.indexes[(i*3)+2]*3+1] , that.positions[that.indexes[(i*3)+2]*3+2] ];
      const vec1 = glmatrix.vec3.create();
      const vec2 = glmatrix.vec3.create();
      glmatrix.vec3.scale(p1, p1, -1);
      glmatrix.vec3.add(vec1, p2, p1);
      glmatrix.vec3.add(vec2, p3, p1);
      const norm = glmatrix.vec3.create();
      glmatrix.vec3.cross(norm, vec1, vec2);
      glmatrix.vec3.normalize(norm, norm);
      this.normals[that.indexes[i*3]*3] = norm[0];
      this.normals[that.indexes[i*3]*3+1] = norm[1];
      this.normals[that.indexes[i*3]*3+2] = norm[2];
      this.normals[that.indexes[(i*3)+1]*3] = norm[0];
      this.normals[that.indexes[(i*3)+1]*3+1] = norm[1];
      this.normals[that.indexes[(i*3)+1]*3+2] = norm[2];
      this.normals[that.indexes[(i*3)+2]*3] = norm[0];
      this.normals[that.indexes[(i*3)+2]*3+1] = norm[1];
      this.normals[that.indexes[(i*3)+2]*3+2] = norm[2];
    }
  }

  renderTextures(that){
    for(let n in this.textures){
        if(this.textures[n] instanceof CanvasTexture){
          this.textures[n].update();  
        }else if(this.textures[n] instanceof FrameTexture){
          this.textures[n].update(that);  
        }
    }
  }

  addTexture(name, texture){
    if(typeof name != "string"){
      movement = name;
      name = "texture" + Object.keys(this.textures).length;
    }
    this.textures[name] = texture;
  }

  removeTexture(name){
    delete this.textures[name];
  }

  assignTexture(name, type){

  }

  isTransparent(){
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
	  return this.transparency;
	}

	preDraw(that, processedMatrix){
		for(let text in this.textures){
			this.textures[text].preDraw(that, processedMatrix);
		}
	}

	postDraw(that, processedMatrix){
		for(let text in this.textures){
			this.textures[text].postDraw(that, processedMatrix);
		}
	}

}
module.exports = Material;