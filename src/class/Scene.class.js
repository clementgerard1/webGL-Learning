const ShaderBuilder = require("./ShaderBuilder.class.js");

class Scene{

	constructor(){
		this.clearColor = [0.0, 0.0, 0.0, 1.0];
		this.shaderBuilder = null;
		this.shaderActif = false;
		this.shaderBuilder = new ShaderBuilder();
		this.activeCamera = null;
		this.cameras = [];
		this.objects = [];
		this.lights = [];
	}

	getCamera(){
		return this.activeCamera;
	}

	setCamera(name){
		this.activeCamera = this.cameras[name];
	}

	addCamera(name, camera){
		this.cameras[name] = camera;
	}

	removeCamera(name){
		delete this.cameras[name];
	}

	addLight(name, light){
		this.lights[name] = light;
	}

	removeLight(name){
		delete this.lights[name];
	}

	add3DObject(name, object){
		this.objects[name] = object;
	}

	remove3DObject(name){
		delete this.objects[name];
	}

	get3DObjects(){
		return this.objects;
	}

	setClearColor(r, g, b, a){
		this.clearColor = [r, g, b, a];
	}

	getClearColor(){
		return this.clearColor;
	}

	getShader(){
		if(this.shaderActif){
			return this.shaderBuilder;
		}else{
			return null;
		}
	}

	enableShader(bool){
		this.shaderActif = bool;
	}

	render(webGLProgram){
		const activeAttributs = webGLProgram.getShaderBuilder().getActiveAttributes();
		for(let i in this.objects){
			this.objects[i].render(webGLProgram, activeAttributs);
		}
	}

}

module.exports = Scene;