const Light = require("../Interfaces/Light.class.js");

class AmbientLight extends Light{

	constructor(ambient, diffuse, specular){
		super(ambient, diffuse, specular); // Only ambient is usefull for this light
	}

	render(webGLProgram, name){
		const ambientRGB = [];
		for(let i = 0 ; i < this.ambient.length ; i++){
			ambientRGB[i] = this.ambient[i] * this.aPower;
		}
		webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name), ambientRGB);
	}

	getFragmentShaderMainCode(infos){
		return "gl_FragColor.rgb += ambientLight(" + infos.name + ", materialAmbient.rgb);";
	}

}

module.exports = AmbientLight;