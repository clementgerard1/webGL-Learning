class ShaderBuilder{


	constructor(gl){
		this.gl = gl;
		this.vertexSrc = '';
		this.fragmentSrc = '';


		//Shader Variable 
		this.position = true;

		//Shader uniform

	}

	getShaderProgram(){

		this._buildShaders();

		const vShader = this._createShader(this.gl.VERTEX_SHADER, this.vertexSrc);
		const fShader = this._createShader(this.gl.FRAGMENT_SHADER, this.fragmentSrc);

		const shaderProgram = this.gl.createProgram();
 	 	this.gl.attachShader(shaderProgram, vShader);
  	this.gl.attachShader(shaderProgram, fShader);
  	this.gl.linkProgram(shaderProgram);

	  if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
	    console.log('Error lors de la liaison des shaders')
	    return null;
	  }

	  return shaderProgram;

	}

	_createShader(type, src){

		const shader = this.gl.createShader(type);
		this.gl.shaderSource(shader, src);
		this.gl.compileShader(shader, src);

		if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
	    console.log('Erreur lors de la compilation du shader ' + src + "\n" + this.gl.getShaderInfoLog(shader));
	    this.gl.deleteShader(shader);
	    return null;
	  }

	  return shader;

	}

	_buildShaders(){
		this._buildVertexShader();
		this._buildFragmentShader();
	}

	_buildVertexShader(){
		this.vertexSrc = `
		  attribute vec4 aVertexPosition;
		  attribute vec4 aVertexColor;

		  uniform mat4 uModelViewMatrix;
		  uniform mat4 uProjectionMatrix;

		  varying lowp vec4 vColor;

		  void main() {
		    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
		    vColor = aVertexColor;
		  }
		`
	}

	_buildFragmentShader(){
		this.fragmentSrc = `
				varying lowp vec4 vColor;

			  void main() {
			    gl_FragColor = vColor;
			  }
		`;
	}

}
module.exports = ShaderBuilder;