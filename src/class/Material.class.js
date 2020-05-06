const Utils = require("./Utils.class");
const MirrorTexture = require("./Textures/MirrorTexture.class");
const ColorTexture = require("./Textures/ColorTexture.class");
const FrameTexture = require("./Textures/FrameTexture.class");
const CanvasTexture = require("./Textures/CanvasTexture.class");
const glmatrix = require("../../node_modules/gl-matrix/gl-matrix-min.js");

class Material{

	constructor(ambient, diffuse, specular, shininess){
		this.id = Utils.newMaterialID(this);
		this.ambientTextures = []; 

    this.diffuseTextures = [];

    this.specularTextures = [];

    this.shininessTextures = [];

    this.normalTextures = []; 
    this.normals = []; 
    this.normalMap = false;

    this.opacity = 1;

    //Mapping
    this.textures = [];

	}

	render(webGLProgram){


    const textIndexes = [];
    const gl = webGLProgram.getContext();

    //Renders textures units
    let i = 1;
    let countT = 0;
		for(let text in this.textures){
			if(!(this.textures[text] instanceof MirrorTexture) && !(this.textures[text] instanceof ColorTexture)){
		    gl.activeTexture(gl.TEXTURE0 + 0);
		    gl.bindTexture(gl.TEXTURE_2D, this.textures[text].getTexture());
		    gl.uniform1i(webGLProgram.getShaderBuilder().getPointer("texture" + countT), false, 0);
        textIndexes[text] = i;
        i *= 2;
        countT++;
		  }
	  }

    const colorIndexes = [];

    //Renders colors
    let j = 1;
    let countC = 0;
    for(let text in this.textures){
      if(this.textures[text] instanceof ColorTexture){
        gl.uniform4fv(webGLProgram.actualShaderBuilder.getPointer("color" + countC), this.textures[text].getRGBA());
        colorIndexes[text] = j;
        j *= 2;
        countC++;
      }
    }    

    //Renders nombres of informations pour chaque caractéristique

    //Ambient
    let count = 0;
    let count2 = 0;
    for(let text in this.ambientTextures){
      if(!(this.textures[this.ambientTextures[text]] instanceof MirrorTexture) && !(this.textures[this.ambientTextures[text]] instanceof ColorTexture)){
        count += textIndexes[this.ambientTextures[text]];
      }else if(this.textures[this.ambientTextures[text]] instanceof ColorTexture){
        count2 += colorIndexes[this.ambientTextures[text]];
      }
    }  
    gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("ambientTIndex"), count);
    gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("ambientCIndex"), count2);


    //Diffuse
    count = 0;
    count2 = 0;
    for(let text in this.diffuseTextures){
      if(!(this.textures[this.diffuseTextures[text]] instanceof MirrorTexture) && !(this.textures[this.diffuseTextures[text]] instanceof ColorTexture)){
        count += textIndexes[this.diffuseTextures[text]];
      }else if(this.textures[this.diffuseTextures[text]] instanceof ColorTexture){
        count2 += colorIndexes[this.diffuseTextures[text]];
      }
    }  
    gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("diffuseTIndex"), count);
    gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("diffuseCIndex"), count2);

    //Specular
    count = 0;
    count2 = 0;
    for(let text in this.specularTextures){
      if(!(this.textures[this.specularTextures[text]] instanceof MirrorTexture) && !(this.textures[this.specularTextures[text]] instanceof ColorTexture)){
        count += textIndexes[this.specularTextures[text]];
      }else if(this.textures[this.specularTextures[text]] instanceof ColorTexture){
        count2 += colorIndexes[this.specularTextures[text]];
      }
    }  
    gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("specularTIndex"), count);
    gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("specularCIndex"), count2);

    //Shininess
    count = 0;
    count2 = 0;
    for(let text in this.shininessTextures){
      if(!(this.textures[this.shininessTextures[text]] instanceof MirrorTexture) && !(this.textures[this.shininessTextures[text]] instanceof ColorTexture)){
        count += textIndexes[this.shininessTextures[text]];
      }else if(this.textures[this.shininessTextures[text]] instanceof ColorTexture){
        count2 += colorIndexes[this.shininessTextures[text]];
      }
    }  
    gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("shininessTIndex"), count);
    gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("shininessCIndex"), count2);

    //Normal
    count = 0;
    count2 = 0;
    for(let text in this.normalTextures){
      if(!(this.textures[this.normalTextures[text]] instanceof MirrorTexture) && !(this.textures[this.normalTextures[text]] instanceof ColorTexture)){
        count += textIndexes[this.normalTextures[text]];
      }else if(this.textures[this.normalTextures[text]] instanceof ColorTexture){
        count2 += colorIndexes[this.normalTextures[text]];
      }
    } 
    gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("normalTIndex"), count);
    gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("normalCIndex"), count2);
    if(this.normalMap){
      gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("normalVarying"), 0);
    }else{
      gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("normalVarying"), 1);
    }
	}

	getTextures(){
		return this.textures;
	}

	getInfos(){
    let nbTextures = 0;
    let nbColors = 0;
    for(let text in this.textures){
      if(!(this.textures[text] instanceof MirrorTexture) && !(this.textures[text] instanceof ColorTexture)){
        nbTextures++;
      }else if(this.textures[text] instanceof ColorTexture){
        nbColors++;
      }
    }  
		return {
      "textures" : nbTextures,
      "colors" : nbColors
    }
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
      texture = name;
      name = "texture" + Object.keys(this.textures).length;
    }
    this.textures[name] = texture;

    this.ambientTextures = [name]; 

    this.diffuseTextures = [name];

    this.specularTextures = [name];

    this.shininessTextures = [name];

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