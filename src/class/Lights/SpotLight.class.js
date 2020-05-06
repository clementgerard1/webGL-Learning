const Light = require("../Interfaces/Light.class.js");
const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

const Translate = require("../Movements/Translate.class.js");
const Scale = require("../Movements/Scale.class.js");
const Rotate = require("../Movements/Rotate.class.js");
const LookAt = require("../Movements/LookAt.class.js");

const Utils = require("../Utils.class.js");

class SpotLight extends Light{

	constructor(){
		super();
		this.position = [0, 0, 0];
		this.movements = [];
		this.innerLimit = Utils.fromDegToDotSpace(10);
		this.outerLimit = Utils.fromDegToDotSpace(30);
		this.stepUpAnimation = true;

		this.dissipation = [1., 1., 1.]; // Disspation constante, linéaire, quadratique

		this.position = [0, 0, 0];
    this.positionTranslate = new Translate(this.position, 0, function(){});
    this.positionTranslate.setPosition(0, 0, 0);
    this.positionTranslate.setTranslationVec(0, 0, 0);
    this.addMovement("position", this.positionTranslate);
    this.positionTranslate.start();
	}

	setDissipation(cons, lin, quad){
		this.dissipation = [cons, lin, quad];
	}

	enableStepUpAnimation(){
		this.stepUpAnimation = true;
	}

	disableStepUpAnimation(){
		this.stepUpAnimation = false;
	}

	setPosition(x, y, z){
		this.position = [x, y, z];
		this.positionTranslate.setTranslationVec(x, y, z);
	}

	setLimits(inner, outer){
		this.innerLimit = Utils.fromDegToDotSpace(inner);
		this.outerLimit = Utils.fromDegToDotSpace(outer);
	}

	setDirection(x, y, z){
		this.vec = [x, y, z];
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

	render(webGLProgram, name){
		//Local transformation

    let processedMatrix = glmatrix.mat4.create();
    let stepUp = this.stepUpAnimation;

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

    const position = glmatrix.vec3.create();
    glmatrix.vec3.transformMat4(position, position, processedMatrix);

    const direction = glmatrix.vec3.create();
    const processedMatrixWithoutTranslate = glmatrix.mat3.create();
    glmatrix.mat3.fromMat4(processedMatrixWithoutTranslate, processedMatrix);
    glmatrix.vec3.transformMat3(direction, this.vec, processedMatrixWithoutTranslate);
		//Limits
		webGLProgram.getContext().uniform1f(webGLProgram.actualShaderBuilder.getPointer(name + "_iLimit"), this.innerLimit);
		webGLProgram.getContext().uniform1f(webGLProgram.actualShaderBuilder.getPointer(name + "_oLimit"), this.outerLimit);

		//Vectors
		webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_direction"), direction);
		webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_position"), position);

		const ambientRGB = [];
		for(let i = 0 ; i < this.ambient.length ; i++){
			ambientRGB[i] = this.ambient[i] * this.aPower;
		}
		webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_ambientColor"), ambientRGB);

		const diffuseRGB = [];
		for(let i = 0 ; i < this.diffuse.length ; i++){
			diffuseRGB[i] = this.diffuse[i] * this.dPower;
		}
		webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_diffuseColor"), diffuseRGB);

		const specularRGB = [];
		for(let i = 0 ; i < this.specular.length ; i++){
			specularRGB[i] = this.specular[i] * this.sPower;
		}

		webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_specularColor"), specularRGB);

		webGLProgram.getContext().uniform1f(webGLProgram.actualShaderBuilder.getPointer(name + "_constDissip"), this.dissipation[0]);
		webGLProgram.getContext().uniform1f(webGLProgram.actualShaderBuilder.getPointer(name + "_linDissip"), this.dissipation[1]);
		webGLProgram.getContext().uniform1f(webGLProgram.actualShaderBuilder.getPointer(name + "_quadDissip"), this.dissipation[2]);
	}

	getVertexShaderPreCode(infos){
		let str = 'varying mediump vec3 v' + infos.name + "_dir;";
		return str;
	}

	getVertexShaderMainCode(infos){
		let str = "v" + infos.name + "_dir = newVec( gl_Position, vec4(" + infos.position.name + ", 1)).xyz;"
		return str;
	}

	getFragmentShaderPreCode(infos){
		let str = 'varying mediump vec3 v' + infos.name + "_dir;";
		return str;
	}

	getFragmentShaderMainCode(infos){
		return "gl_FragColor.rgb += spotLight(" + infos.normal.varyingName + ".rgb, " + infos.iLimit.name + ", " + infos.oLimit.name + ", " + infos.direction.name + ", " + infos.constDissip.name + ", " + infos.linDissip.name + ", " + infos.quadDissip.name + ", v" +  infos.name + "_dir, viewVec, " + infos.ambient.name + ", materialAmbient.rgb," + infos.diffuse.name + ", materialDiffuse.rgb," + infos.specular.name + ", materialSpecular.rgb, materialShininess);";
	}

}

module.exports = SpotLight;