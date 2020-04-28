class Renderer{

	constructor(scene, initFunc, endFunc){
		this.scissor = null;
		this.scene = scene;
		this.transforms = [];
		this.init = true;
		this.resetConfigAtEnd = false;
		this.memory = [];

		if(typeof initFunc == "undefined"){
			this.initUser = function(program){};
		}else{
			this.initUser = initFunc;
		}

		if(typeof endFunc == "undefined"){
			this.endUser = function(program){};
		}else{
			this.endUser = endFunc;
		}
	}

	render(webGLProgram){
		
		this.initUser(webGLProgram);

		this.memory = [];

		if(this.resetConfigAtEnd){
			this._stateMemory(webGLProgram);
		}

		if(this.init){
			this._init(webGLProgram);
		}

		//Tri des objets
		const opaques = [];
		const transparents = [];
		const mirrors = [];
		const sceneObjects = this.scene.getAllObjects();
		for(let i in sceneObjects){
			if(sceneObjects[i].isMirror()){
				mirrors[mirrors.length] = sceneObjects[i];
			}else if(sceneObjects[i].isTransparent()){
				transparents[transparents.length] = sceneObjects[i];
			}else{
				opaques[opaques.length] = sceneObjects[i];
			}
		}

		//Configuration (si transparent non vide)
		if(transparents.length != 0 || mirrors.length != 0){
			webGLProgram.getContext().enable(webGLProgram.getContext().BLEND);
			webGLProgram.getContext().blendFunc(webGLProgram.getContext().SRC_ALPHA, webGLProgram.getContext().ONE_MINUS_SRC_ALPHA);  
		}else{
			webGLProgram.getContext().disable(webGLProgram.getContext().BLEND);
		}

		//RENDERING
		this.transforms = [];
		const activeAttributs = webGLProgram.getShaderBuilder().getActiveAttributes();
		for(let obj in this.scene.objects){
			this.scene.objects[obj].render(this.transforms);
		}

		//Affichage des objets opaques
		for(let i = 0 ; i < opaques.length ; i++){
			this.transforms[opaques[i].id][0].draw(webGLProgram, activeAttributs, this.transforms[opaques[i].id][1], false);
		}

		//Affichage des mirroirs

		webGLProgram.getContext().disable(webGLProgram.getContext().CULL_FACE);
		
		for(let i = 0 ; i < mirrors.length ; i++){
			this.transforms[mirrors[i].id][0].draw(webGLProgram, activeAttributs, this.transforms[mirrors[i].id][1], false);
		}

		//Tri des objets transparent (CHANGER LA FORMULE DE TRI VOIR TEST2 QUAND VALIDE)
		const that = this;
		const cameraPosition = that.scene.getCamera().getPosition();
		transparents.sort(function(elem1, elem2){
			const distance1 = elem1.getDistance(cameraPosition[0], cameraPosition[1], cameraPosition[2], that.transforms[elem1.id][1]);
			const distance2 = elem2.getDistance(cameraPosition[0], cameraPosition[1], cameraPosition[2], that.transforms[elem2.id][1]);
			if(distance1 > distance2){
				return -1;
			}else{
				return 1;
			}
		});

		//Affichage des objets transparents
		for(let i = 0 ; i < transparents.length ; i++){
			this.transforms[transparents[i].id][0].draw(webGLProgram, activeAttributs, this.transforms[transparents[i].id][1], true);
		}

		webGLProgram.getContext().enable(webGLProgram.getContext().CULL_FACE);



		if(this.resetConfigAtEnd){
			this._resetConfigEnd(webGLProgram);
		}

		this.endUser(webGLProgram);

	}

	setInitFunction(func){
		this.initUser = func;
	}

	setInitialisation(bool){
		this.init = bool;
	}

	setResetConfigAtEnd(bool){
		this.resetConfigAtEnd = bool;
	}

	setScissor(x, y, width, height){
		const tab = [x, y, width, height];
		if(tab == null){
			this.scissor = null;
		}else{
			this.scissor = tab;
		}
	}

	getScissor(){
		return this.scissor;
	}

	_init(webGLProgram){
		const gl = webGLProgram.getContext();

		const scissor = this.getScissor();
		if( scissor != null){
			gl.enable(gl.SCISSOR_TEST);
			gl.scissor(scissor[0], scissor[1], scissor[2], scissor[3]);
			gl.getParameter(gl.SCISSOR_BOX);
		}else{
			gl.disable(gl.SCISSOR_TEST);
		}

		//Initialisation
		const colors = this.scene.getClearColor();
		gl.clearColor(colors[0], colors[1], colors[2], colors[3]);

		gl.enable(gl.DEPTH_TEST); 
		gl.depthFunc(gl.LEQUAL); 

		webGLProgram.getContext().enable(webGLProgram.getContext().CULL_FACE);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.useProgram(webGLProgram.shaderProgram);

		const attributs = webGLProgram.actualShaderBuilder.getActiveAttributes();
		for(let i = 0 ; i < attributs.length ; i++){
			gl.enableVertexAttribArray(webGLProgram.actualShaderBuilder.getPointer(attributs[i]));
		}

		//Shader uniforms
		gl.uniformMatrix4fv(webGLProgram.actualShaderBuilder.getPointer("projection"), false, this.scene.getCamera().getMatrix(gl.canvas.clientWidth / gl.canvas.clientHeight));
		
	}

	_stateMemory(webGLProgram){
		this.memory["clearColor"] = webGLProgram.getContext().getParameter(webGLProgram.getContext().COLOR_CLEAR_VALUE);
		this.memory["blend"] = webGLProgram.getContext().isEnabled(webGLProgram.getContext().BLEND);
		this.memory["blendFuncSrc"] = webGLProgram.getContext().getParameter(webGLProgram.getContext().BLEND_SRC_RGB);
		this.memory["blendFuncDst"] = webGLProgram.getContext().getParameter(webGLProgram.getContext().BLEND_DST_RGB);
		this.memory["depthTest"] = webGLProgram.getContext().isEnabled(webGLProgram.getContext().DEPTH_TEST);
		this.memory["depthFunc"] = webGLProgram.getContext().getParameter(webGLProgram.getContext().DEPTH_FUNC);
		this.memory["cullFace"] = webGLProgram.getContext().isEnabled(webGLProgram.getContext().CULL_FACE);
		this.memory["scissor"] = webGLProgram.getContext().getParameter(webGLProgram.getContext().SCISSOR_BOX);
	}

	_resetConfigEnd(webGLProgram){
		webGLProgram.getContext().clearColor(this.memory["clearColor"][0], this.memory["clearColor"][1], this.memory["clearColor"][2], this.memory["clearColor"][3]);
		webGLProgram.getContext().scissor(this.memory["scissor"][0], this.memory["scissor"][1], this.memory["scissor"][2], this.memory["scissor"][3]);
		if(this.memory["blend"]){
			webGLProgram.getContext().enable(webGLProgram.getContext().BLEND);
		}else{
			webGLProgram.getContext().disable(webGLProgram.getContext().BLEND);
		}
		webGLProgram.getContext().blendFunc(this.memory["blendFuncSrc"], this.memory["blendFuncDst"]);
		if(this.memory["depthTest"]){
			webGLProgram.getContext().enable(webGLProgram.getContext().DEPTH_TEST);
		}else{
			webGLProgram.getContext().disable(webGLProgram.getContext().DEPTH_TEST);
		}
		webGLProgram.getContext().depthFunc(this.memory["depthFunc"]); 
		if(this.memory["cullFace"]){
			webGLProgram.getContext().enable(webGLProgram.getContext().CULL_FACE);
		}else{
			webGLProgram.getContext().disable(webGLProgram.getContext().CULL_FACE);
		}


	}

}
module.exports = Renderer;