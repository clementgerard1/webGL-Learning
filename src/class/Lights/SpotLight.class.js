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
		this.power = 1.
		this.rgb;
		this.position = [0, 0, 0];
		this.movements = [];
		this.innerLimit = Utils.fromDegToDotSpace(30);
		this.outerLimit = Utils.fromDegToDotSpace(50);
		this.stepUpAnimation = true;

		this.position = [0, 0, 0];
    this.positionTranslate = new Translate(this.position, 0, function(){});
    this.positionTranslate.setPosition(0, 0, 0);
    this.positionTranslate.setTranslationVec(0, 0, 0);
    this.addMovement("position", this.positionTranslate);
    this.positionTranslate.start();
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

	setPower(f){
		this.power = f;
	}

	setRGB(r, g, b){
		this.rgb = [r, g, b];
	}
	getRGB(){
		return this.rgb;
	}

	getPower(){
		return this.power;
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
    glmatrix.vec3.transformMat4(direction, this.vec, processedMatrix);


		const rgb = [];
		for(let i = 0 ; i < this.rgb.length ; i++){
			rgb[i] = this.rgb[i] * this.power;
		}

		//Limits
		webGLProgram.getContext().uniform1f(webGLProgram.actualShaderBuilder.getPointer(name + "_iLimit"), this.innerLimit);
		webGLProgram.getContext().uniform1f(webGLProgram.actualShaderBuilder.getPointer(name + "_oLimit"), this.outerLimit);

		//Vectors
		webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_direction"), direction);
		webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_position"), position);
		webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_color"), rgb);
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
		let str = "highp float " + infos.name + "var = dot(normalize(vec3(" + infos.normal.varyingName + ")), normalize(v" + infos.name + "_dir));";
		str += "if(" + infos.name + "var > " + infos.iLimit.name + "){ " + infos.name + "var = 1.0;}else ";
		str += "if(" + infos.name + "var < " + infos.oLimit.name + "){ " + infos.name + "var = 0.0;}else "; 
		str += "{" + infos.name + "var =(" + infos.name + "var - " + infos.oLimit.name + ") / (" + infos.iLimit.name + "-" + infos.oLimit.name + ");}"; 
		str += "gl_FragColor = vec4(" + infos.color.name + " * gl_FragColor.rgb *  pow(max(" + infos.name + "var, 0.0), 10.0), gl_FragColor.a);";
		return str;
	}

}

module.exports = SpotLight;