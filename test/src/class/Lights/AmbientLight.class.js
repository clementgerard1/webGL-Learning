const Light = require("../Interfaces/Light.class.js");

class AmbientLight extends Light{

	constructor(){
		super();
		this.power = 1.
		this.rgb;
	}

	setPower(f){
		this.power = f;
	}

	setRGB(r, g, b){
		this.rgb = [r, g, b];
	}
	getRGB(){
		return this.rgb;
	}

	getPower(){
		return this.power;
	}

	render(webGLProgram, name){
		const rgb = [];
		for(let i = 0 ; i < this.rgb.length ; i++){
			rgb[i] = this.rgb[i] * this.power;
		}

		webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name), rgb);
	}

	getFragmentShaderMainCode(infos){
		return "gl_FragColor = vec4(" + infos.name + " * vec3(gl_FragColor), gl_FragColor.a);";
	}

}

module.exports = AmbientLight;