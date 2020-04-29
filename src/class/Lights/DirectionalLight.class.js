const Light = require("../Interfaces/Light.class.js");
const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

class DirectionalLight extends Light{

	constructor(){
		super();
		this.power = 1.
		this.rgb;
		this.vector = glmatrix.vec3.fromValues(0, 0, -1);
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
		webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_vector"), this.vector);
		webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_color"), rgb);
	}

	getFragmentShaderMainCode(infos){
		let str = "highp float " + infos.name + "power = dot(normalize(vec3(" + infos.normal.varyingName + ")), " + infos.vector.name + ");";
		str += "gl_FragColor = vec4(" + infos.color.name + " * gl_FragColor.rgb * " + infos.name + "power, gl_FragColor.a);";
		return str;
	}

	setDirection(x, y, z){
		glmatrix.vec3.normalize(this.vector, [-x, -y, -z]);
	}

}

module.exports = DirectionalLight;