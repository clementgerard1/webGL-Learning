const ShaderBuilder = require("./ShaderBuilder.class.js");
const ColorTexture = require("./Textures/ColorTexture.class.js");
const ImageTexture = require("./Textures/ImageTexture.class.js");
const MirrorTexture = require("./Textures/MirrorTexture.class.js");
const FrameTexture = require("./Textures/FrameTexture.class.js");

class WebGLProgram{

	constructor(){
		this.container = null;
		this.parentBlock = null;
		this.refreshId = null;

		this.scenes = [];

		this.started = false;
		this.updateOnResize = true;

		//FPS Counter
		this.fpsTime = 0;
		this.fpsCount = 0;
		this.fpsCallback;
		this.fpsLast;
		this.fpsDisplay = 1000;
		
		this._handleResize = this._handleResize.bind(this);
		this.updateFrame = this.updateFrame.bind(this);

		//Initialisation de l'environnement
		this.canvas = document.createElement('canvas');
		this.gl = this.canvas.getContext("webgl", {
			stencil:true,
			//alpha: false 
		});

		//Default Shader
		this.defaultShaderBuilder = new ShaderBuilder();
		this.actualShaderBuilder = this.defaultShaderBuilder;

		//Variables
		this.buffers = [];

		this.updateProgram();

	}

	setTextureRenderer(bool){
		this.actualShaderBuilder.setTextureRenderer(bool);
		this.updateProgram();
	}

	createFrameTexture(){

	}

	setFPSDisplayTime(fpsDisplayTime){
		this.fpsDisplay = fpsDisplayTime;
	}

	enableFPSCounter(callback, fpsDisplayTime){
		if(typeof fpsDisplayTime != "undefined"){
			this.fpsDisplay = fpsDisplayTime;
		}
		this.fpsCallback = callback;
		this.fpsTime = 0;
		this.fpsCount = 0;
	}

	disableFPSCounter(){
		this.fpsCallback = null;
		this.fpsLast = null;
	}

	createImageTexture(src){
		const texture = new ImageTexture(this, src);
		return texture;
	}

	createMirrorTexture(){
		const texture = new MirrorTexture(this);
		return texture;
	}

	createColorTexture(r, g, b, a){
		const texture = new ColorTexture(this, r, g, b, a);
		return texture;
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

	getShaderBuilder(){
		return this.actualShaderBuilder;
	}

	addScene(scene, i){
		if(typeof i == "undefined"){
			this.scenes[this.scenes.length] = scene;
		}else{
			this.scenes.splice(i, 0, scene);
		}
	}

	removeScene(i){
		if(typeof i == "undefined"){
			i = 0;
		}
		this.scenes.splice(i, 1);
	}

	setScene(scene, i){

		if(typeof i == "undefined"){
			i = 0;
		}
		this.scenes[i] = scene;
		/*const previous = this.actualShader;
		if(this.scene.getShader() != null){
			this.actualShader = this.scene.getShader();
		}else{
			this.actualShader = this.defaultShaderBuilder;
		}

		if(previous != this.actualShader){
			this.updateProgram();
		}*/

	}

	getScene(i){
		if(typeof i == "undefined"){
			i = 0;
		}
		return this.scenes[i];
	}

	insertInBlock(block){
		this.parentBlock = block;
		this._handleResize();
		this.parentBlock.appendChild(this.canvas);
		if(this._updateOnResize){
			window.addEventListener("resize", this._handleResize);
		}
	}

	updateProgram(){
		//Création du programme
		this.shaderProgram = this.actualShaderBuilder.getShaderProgram(this.gl);

		//Création des buffers
		this.buffers = [];
		this.buffers["index"] = this.gl.createBuffer();
		const attributs = this.actualShaderBuilder.getActiveAttributes();
		for(let a in attributs){
			this.buffers[attributs[a]] = this.gl.createBuffer();
		}
	}

	getBuffer(name){
		return this.buffers[name];
	}

	_handleResize(){
		this.canvas.width = this.parentBlock.clientWidth;
		this.canvas.height = this.parentBlock.clientHeight;
		this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
	}

	updateFrame(){

		
		if(this.fpsCallback != null){
			const now = new Date().getTime();
			if(this.fpsLast != null){
				this.fpsTime += (now - this.fpsLast);
				this.fpsCount++;
				if(this.fpsTime > this.fpsDisplay){
					this.fpsCallback((this.fpsCount * (1000 / this.fpsTime)).toFixed(2));
					this.fpsTime = 0;
					this.fpsCount = 0;
				}
			}

			this.fpsLast = now;

		}

		//Render
		for(let i = 0 ; i < this.scenes.length ; i++){
			this.scenes[i].render(this);
		}

		//Next Frame
		if(this.started){
			this.refreshId = window.requestAnimationFrame(this.updateFrame);
		}
	}

	start(){
		if(!this.started){
			this.started = true;
			this.refreshId = window.requestAnimationFrame(this.updateFrame);
		}
	}

	stop(){
		if(this.start){
			this.started = false;
			window.cancelAnimationFrame(this.refreshId);
		}
	}

}

module.exports = WebGLProgram;