const ShaderBuilder = require("./ShaderBuilder.class.js");
const Renderer = require("./Renderer.class.js");
const Object3DGroup = require("./Objects3D/Object3DGroup.class.js");

class Scene{

	constructor(){
		this.clearColor = [0.0, 0.0, 0.0, 1.0];
		this.shaderActif = false;
		this.shaderBuilder = new ShaderBuilder();
		this.renderer = new Renderer(this);
		this.activeCamera = null;
		this.cameras = [];
		this.objects = [];
		this.lights = [];
	}

	getCamera(){
		return this.activeCamera;
	}

	setRenderer(renderer){
		this.renderer = renderer;
	}

	getRenderer(){
		return this.renderer;
	}

	setCamera(name){
		this.activeCamera = this.cameras[name];
	}

	addCamera(name, camera){
		this.cameras[name] = camera;
		if(this.activeCamera == null){
			this.activeCamera = this.cameras[name];
		}
	}

	getAllObjects(){
		const r = [];
		for(let obj in this.objects){
			if(this.objects[obj] instanceof Object3DGroup){
				this.objects[obj].getAllObjects(r);
			}else{
				r[obj] = this.objects[obj];
			}
		}
		return r;
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

		this.renderer.render(webGLProgram);

	}

  clone(objectsToRemove){
      const neww = new this.constructor();
      neww.clearColor = this.clearColor.slice();
      neww.shaderBuilder = this.shaderBuilder;
      neww.shaderActif = false;
      neww.renderer = this.renderer;
      neww.activeCamera = this.activeCamera;
      Object.assign(neww.cameras, this.cameras);
      for(let obj in this.objects){
      	if(!objectsToRemove.includes(this.objects[obj])){
      		neww.objects[obj] = this.objects[obj].clone();
      	}
      }
      Object.assign(neww.lights, this.lights);
      return neww;
  }

	remove3DObjectByValue(object){
		for(let obj in this.objects){
			if(this.objects[obj] != object){
				delete this.objects[obj];
			}
		}
	}

	incMirrorValue(){
		for(let obj in this.objects){
			this.objects[obj].incMirrorValue();
		}
	}

}

module.exports = Scene;