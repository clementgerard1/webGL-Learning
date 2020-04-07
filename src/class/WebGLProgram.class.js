const ShaderBuilder = require("./ShaderBuilder.class.js");

class WebGLProgram{

	constructor(){
		this.container = null;
		this.parentBlock = null;
		this.refreshId = null;
		this.updateOnResize = true;
		this.cameras = [];
		this.objects = [];
		this._handleResize = this._handleResize.bind(this);
		this.updateFrame = this.updateFrame.bind(this);

		//Initialisation de la classe
		this.canvas = document.createElement('canvas');
		this.gl = this.canvas.getContext("webgl");
		this.shaderBuilder = new ShaderBuilder(this.gl);

	}

	setUpdateOnResize(bool){
		this.updateOnResize = bool;
		if(bool){
			window.addEventListener("resize", this._handleResize);
		}else{
			window.removeEventListener("resize", this._handleResize);
		}
	}

	getContext(){
		return this.gl;
	}

	insertInBlock(block){
		this.parentBlock = block;
		this.canvas.width = this.parentBlock.clientWidth;
		this.canvas.height = this.parentBlock.clientHeight;
		this.parentBlock.appendChild(this.canvas);
		if(this._updateOnResize){
			window.addEventListener("resize", this._handleResize);
		}
	}

	updateProgram(){
		//Création du programme
		this.shaderProgram = this.shaderBuilder.getShaderProgram();
	}

	_handleResize(){
		this.canvas.width = this.parentBlock.clientWidth;
		this.canvas.height = this.parentBlock.clientHeight;
	}

	updateFrame(){
		
	}

	start(){
		this.refreshId = window.requestAnimationFrame(this.updateFrame);
	}

	stop(){
		window.cancelAnimationFrame(this.refreshId);
	}

	addCamera(name, camera){
		this.cameras[name] = camera;
	}

	removeCamera(name){
		delete this.cameras[name];
	}

	add3DObject(name, object){
		this.objects[name] = object;
	}

	remove3DObject(name){
		delete this.objects[name];
	}

}

module.exports = WebGLProgram;