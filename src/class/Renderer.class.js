class Renderer{

	constructor(scene, initFunc, endFunc){
		this.scissor = null;
		this.scene = scene;
		this.transforms = [];
		this.init = true;
		this.resetConfigAtEnd = false;
		this.memory = [];
		this.viewport = [0, 0, 1, 1];

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

	setInitUserFunction(func){
		this.initUser = func;
	}

	setEndUserFunction(func){
		this.endUser = func;
	}

	render(webGLProgram){

		this.initUser(webGLProgram);

		if(this.scene.getShaderBuilder() != webGLProgram.actualShaderBuilder){
			webGLProgram.actualShaderBuilder = this.scene.getShaderBuilder();
		}

		if(!webGLProgram.actualShaderBuilder.checkLights(this.scene.getNbAmbientLights(), this.scene.getNbDirectionalLights(), this.scene.getNbPointLights(), this.scene.getNbSpotLights())){
			webGLProgram.actualShaderBuilder.buildShaderProgram(webGLProgram.getContext(), this.scene);
		} else if(webGLProgram.actualShaderBuilder.needRebuild()){
			webGLProgram.actualShaderBuilder.buildShaderProgram(webGLProgram.getContext(), this.scene);
		}

		webGLProgram.getContext().useProgram(webGLProgram.actualShaderBuilder.getShaderProgram());

		//Création des buffers
		webGLProgram.buffers = [];
		webGLProgram.buffers["index"] = webGLProgram.getContext().createBuffer();
		const attributs = webGLProgram.actualShaderBuilder.getActiveAttributes();
		for(let a in attributs){
			webGLProgram.buffers[attributs[a]] = webGLProgram.getContext().createBuffer();
		}

		webGLProgram.getContext().viewport(this.viewport[0] * webGLProgram.canvas.width, this.viewport[1] * webGLProgram.canvas.height, this.viewport[2] * webGLProgram.canvas.width, this.viewport[3] * webGLProgram.canvas.height);
		//Shader uniforms
		//gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("depthTexture"), false, 0);
		webGLProgram.getContext().uniformMatrix4fv(webGLProgram.actualShaderBuilder.getPointer("projection"), false, this.scene.getCamera().getMatrix((webGLProgram.getContext().canvas.clientWidth * this.viewport[2]) / (webGLProgram.getContext().canvas.clientHeight * this.viewport[3]) ));

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

		//Lumieres
		for(let n in this.scene.ambientLights) this.scene.ambientLights[n].render(webGLProgram, n);
		for(let n in this.scene.directionalLights) this.scene.directionalLights[n].render(webGLProgram, n);
		for(let n in this.scene.pointLights) this.scene.pointLights[n].render(webGLProgram, n);
		for(let n in this.scene.spotLights) this.scene.spotLights[n].render(webGLProgram, n);


		if(this.resetConfigAtEnd){
			this._resetConfigEnd(webGLProgram);
		}

		this.endUser(webGLProgram);

	}

	setViewPort(x, y, width, height){
		this.viewport = [x, y, width, height];
	}

	getViewPort(){
		return this.viewport;
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
		const tab = [x, 1-y, width, height];
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

		if( this.scissor != null){
			gl.enable(gl.SCISSOR_TEST);
			gl.scissor(this.scissor[0]  * webGLProgram.canvas.width, this.scissor[1] * webGLProgram.canvas.height - this.scissor[3] * webGLProgram.canvas.height, this.scissor[2]  * webGLProgram.canvas.width, this.scissor[3] * webGLProgram.canvas.height);
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

		const attributs = webGLProgram.actualShaderBuilder.getActiveAttributes();
		for(let i = 0 ; i < attributs.length ; i++){
			gl.enableVertexAttribArray(webGLProgram.actualShaderBuilder.getPointer(attributs[i]));
		}
		
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

	enableEvents(){

	}

	disableEvents(){
		
	}

	clone(){
		const neww = new this.constructor();
		if(this.scissor == null){
			neww.scissor = null;
		}else{
			neww.scissor = this.scissor.slice();
		}
		neww.scene = this.scene;
		Object.assign(neww.transforms, this.transforms);
		neww.init = this.init;
		neww.resetConfigAtEnd = this.resetConfigAtEnd;
		neww.memory = [];
		neww.viewport = this.viewport.slice();
		neww.initUser = this.initUser;
		neww.endUser = this.endUser;
    return neww;
	}

}
module.exports = Renderer;