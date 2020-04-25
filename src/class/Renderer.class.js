class Renderer{

	constructor(scene){

		this.scene = scene;
		this.transforms = [];
		this.init = true;

	}

	render(webGLProgram){

		if(this.init){
			this._init(webGLProgram);
		}

		this.transforms = [];
		const activeAttributs = webGLProgram.getShaderBuilder().getActiveAttributes();
		for(let i in this.scene.objects){
			this.scene.objects[i].render(this.transforms);
		}
		for(let i = 0 ; i < this.transforms.length ; i++){
			this.transforms[i][0].draw(webGLProgram, activeAttributs, this.transforms[i][1]);
		}



		//Tri des objets
		const opaques = [];
		const transparents = [];
		for(let i in this.scene.objects){
			if(this.scene.objects[i].getTransparency() == 1){
				opaques[opaques.length] = this.scene.objects[i];
			}else{
				transparents[transparents.length] = this.scene.objects[i];
			}
		}

		//Configuration (si transparent non vide)
		if(transparents.length != 0){
			webGLProgram.getContext().enable(webGLProgram.getContext().BLEND);
			webGLProgram.getContext().blendFunc(webGLProgram.getContext().SRC_ALPHA, webGLProgram.getContext().ONE_MINUS_SRC_ALPHA);  
		}else{
			webGLProgram.getContext().disable(webGLProgram.getContext().BLEND);
		}

		//Tri des objets transparents

		//Affichage des objets
		
	}

	setInitialisation(bool){
		this.init = bool;
	}

	_init(webGLProgram){
		const gl = webGLProgram.getContext();
		//Initialisation
		const colors = this.scene.getClearColor();
		gl.clearColor(colors[0], colors[1], colors[2], colors[3]);

		gl.enable(gl.DEPTH_TEST); 
		gl.depthFunc(gl.LEQUAL); 

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.useProgram(webGLProgram.shaderProgram);

		const attributs = webGLProgram.actualShaderBuilder.getActiveAttributes();
		for(let i = 0 ; i < attributs.length ; i++){
			gl.enableVertexAttribArray(webGLProgram.actualShaderBuilder.getPointer(attributs[i]));
		}

		//Shader uniforms
		gl.uniformMatrix4fv(webGLProgram.actualShaderBuilder.getPointer("projection"), false, this.scene.getCamera().getMatrix(gl.canvas.clientWidth / gl.canvas.clientHeight));
		
	}

}
module.exports = Renderer;