const ShaderBuilder = require("./ShaderBuilder.class.js");

class WebGLProgram{

	constructor(){
		this.container = null;
		this.parentBlock = null;
		this.refreshId = null;
		this.scene = null;
		this.started = false;
		this.updateOnResize = true;
		
		this._handleResize = this._handleResize.bind(this);
		this.updateFrame = this.updateFrame.bind(this);

		//Initialisation de l'environnement
		this.canvas = document.createElement('canvas');
		this.gl = this.canvas.getContext("webgl");

		//Default Shader
		this.defaultShaderBuilder = new ShaderBuilder();
		this.actualShaderBuilder = this.defaultShaderBuilder;

		//Variables
		this.buffers = [];

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

	setScene(scene){
		this.scene = scene;
		const previous = this.actualShader;
		if(this.scene.getShader() != null){
			this.actualShader = this.scene.getShader();
		}else{
			this.actualShader = this.defaultShaderBuilder;
		}

		if(previous != this.actualShader){
			this.updateProgram();
		}

	}

	getScene(){
		return this.scene;
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
		this.shaderProgram = this.actualShader.getShaderProgram(this.gl);

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

		//Initialisation
		const colors = this.scene.getClearColor();
		this.gl.clearColor(colors[0], colors[1], colors[2], colors[3]);

		this.gl.enable(this.gl.DEPTH_TEST); 
		this.gl.depthFunc(this.gl.LEQUAL); 

		this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT);
		this.gl.useProgram(this.shaderProgram);

		const attributs = this.actualShaderBuilder.getActiveAttributes();
		for(let i = 0 ; i < attributs.length ; i++){
			this.gl.enableVertexAttribArray(this.actualShaderBuilder.getPointer(attributs[i]));
		}

		//Shader uniforms
		this.gl.uniformMatrix4fv(this.actualShaderBuilder.getPointer("projection"), false, this.scene.getCamera().getMatrix(this.gl.canvas.clientWidth / this.gl.canvas.clientHeight));
		
		//Render
		this.scene.render(this);

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