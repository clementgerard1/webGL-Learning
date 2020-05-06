const Light = require("../Interfaces/Light.class.js");
const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

class DirectionalLight extends Light{

	constructor(){
		super();
		this.rgb;
		this.vector = glmatrix.vec3.fromValues(0, 0, -1);
	}


	render(webGLProgram, name){
		const ambientRGB = [];
		for(let i = 0 ; i < this.ambient.length ; i++){
			ambientRGB[i] = this.ambient[i] * this.aPower;
		}
		webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_ambientColor"), ambientRGB);

		const diffuseRGB = [];
		for(let i = 0 ; i < this.diffuse.length ; i++){
			diffuseRGB[i] = this.diffuse[i] * this.dPower;
		}
		webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_diffuseColor"), diffuseRGB);

		const specularRGB = [];
		for(let i = 0 ; i < this.specular.length ; i++){
			specularRGB[i] = this.specular[i] * this.sPower;
		}

		webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_specularColor"), specularRGB);

		webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_vector"), this.vector);
	}

	getFragmentShaderMainCode(infos){
		return "gl_FragColor.rgb += directionalLight(" + infos.normal.varyingName + ".rgb, " +  infos.vector.name + ", viewVec, " + infos.ambient.name + ", materialAmbient.rgb," + infos.diffuse.name + ", materialDiffuse.rgb," + infos.specular.name + ", materialSpecular.rgb, materialShininess);";
	}

	setDirection(x, y, z){
		glmatrix.vec3.normalize(this.vector, [-x, -y, -z]);
	}

}

module.exports = DirectionalLight;