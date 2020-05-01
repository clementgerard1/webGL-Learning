const ShaderBuilder = require("./ShaderBuilder.class.js");
const Renderer = require("./Renderer.class.js");
const Object3DGroup = require("./Objects3D/Object3DGroup.class.js");
const AmbientLight = require("./Lights/AmbientLight.class.js");
const DirectionalLight = require("./Lights/DirectionalLight.class.js");
const PointLight = require("./Lights/PointLight.class.js");
const SpotLight = require("./Lights/SpotLight.class.js");

class Scene{

	constructor(){
		this.clearColor = [0.0, 0.0, 0.0, 1.0];
		this.shaderBuilder = new ShaderBuilder();

		this.renderers = [];
		this.renderers[0] = new Renderer(this);

		this.activeCamera = null;
		this.cameras = [];
		this.objects = [];
		this.ambientLights = [];
		this.directionalLights = [];
		this.pointLights = [];
		this.spotLights = [];
	}

	getCamera(){
		return this.activeCamera;
	}

	addRenderer(renderer, i){

		if(typeof i == "undefined"){
			this.renderers[this.renderers.length] = renderer;
		}else{
			this.renderers.splice(i, 0, renderer);
		}
		
	}

	removeRenderer(i){
		if(typeof i == "undefined"){
			i = 0;
		}
		this.renderers.splice(i, 1);
	}

	setRenderer(renderer, i){
		if(typeof i == "undefined"){
			i = 0;
		}
		this.renderers[i] = renderer;
	}

	getRenderer(i){
		if(typeof i == "undefined"){
			i = 0;
		}
		return this.renderers[i];
	}

	setCamera(name){
		this.activeCamera = this.cameras[name];
	}

	addCamera(name, camera){

		if(typeof name != "string"){
      movement = name;
      name = "movement" + this.id;
    }

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

		if(typeof name != "string"){
      movement = name;
      name = "movement" + this.id;
    }

		if(light instanceof AmbientLight){
			this.ambientLights[name] = light;
		}else if(light instanceof DirectionalLight){
			this.directionalLights[name] = light;
		}else if(light instanceof PointLight){
			this.pointLights[name] = light;
		}else if(light instanceof SpotLight){
			this.spotLights[name] = light;
		}
	}

	removeLight(name){
		if(this.ambientLights.includes(name)){
			delete this.ambientLights[name];
		}
		if(this.directionalLights.includes(name)){
			delete this.directionalLights[name];
		}
		if(this.pointLights.includes(name)){
			delete this.pointLights[name];
		}
		if(this.spotLights.includes(name)){
			delete this.spotLights[name];
		}
		
	}

	getNbAmbientLights(){
		return Object.keys(this.ambientLights).length;
	}

	getNbDirectionalLights(){
		return Object.keys(this.directionalLights).length;
	}

	getNbPointLights(){
		return Object.keys(this.pointLights).length;
	}

	getNbSpotLights(){
		return Object.keys(this.spotLights).length;
	}

	getAmbientLights(){
		return this.ambientLights;
	}

	getDirectionalLights(){
		return this.directionalLights;
	}

	getPointLights(){
		return this.pointLights;
	}

	getSpotLights(){
		return this.spotLights;
	}

	add3DObject(name, object){

		if(typeof name != "string"){
      movement = name;
      name = "movement" + this.id;
    }

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

	getShaderBuilder(){
			return this.shaderBuilder;
	}

	setShaderBuilder(sb){
		this.shaderBuilder = sb;
	}

	render(webGLProgram){
		for(let i = 0 ; i < this.renderers.length ; i++){
			this.renderers[i].render(webGLProgram);
		}

	}

  clone(objectsToRemove){
      const neww = new this.constructor();
      neww.clearColor = this.clearColor.slice();
      neww.shaderBuilder = this.shaderBuilder;
      neww.renderers = this.renderers.slice();
      neww.activeCamera = this.activeCamera;
      Object.assign(neww.cameras, this.cameras);
      Object.assign(neww.ambientLights, this.ambientLights);
      Object.assign(neww.directionalLights, this.directionalLights);
      Object.assign(neww.pointLights, this.pointLights);
      Object.assign(neww.spotLights, this.spotLights);
      for(let obj in this.objects){
      	if(!objectsToRemove.includes(this.objects[obj])){
      		neww.objects[obj] = this.objects[obj].clone();
      	}
      }
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