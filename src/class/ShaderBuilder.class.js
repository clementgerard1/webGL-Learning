class ShaderBuilder{

	constructor(){
		this.vertexSrc = null;
		this.fragmentSrc = null;


		//Vertex Shader Attributes
		this.vertexAttributes = {
			"position" : true,
		};

		//Fragment Shader Attributes
		this.fragmentAttributes = {
			"color" : true,
			"textureCoordonnees" : false,
		};

		//Vertex Shader Uniform
		this.vertexUniforms = {
			"projection" : true,
			"localTransformation" : true,
		}

		//Fragment Shader Uniform
		this.fragmentUniforms = {
			"texture" : false,
		}

		this.infos = {
			"position" : {
				"nbDatas" : 3,
				"type" : "attribute vec4",
				"name" : "aVertexPosition",
			},
			"color" : {
				"nbDatas" : 4,
				"type" : "attribute vec4",
				"name" : "aVertexColor",
				"varyingType" : "varying lowp vec4",
				"varyingName" : "vColor",
			},
			"projection" : {
				"type" : "uniform mat4",
				"name" : "uProjectionMatrix",
			},
			"localTransformation" : {
				"type" : "uniform mat4",
				"name" : "uLocalTransformationMatrix",
			},
			"texture" : {
				"type" : "uniform sampler2D",
				"name" : "uSampler",
			},
			"textureCoordonnees" : {
				"nbDatas" : 2,
				"type" : "attribute vec2",
				"name" : "aTextureCoord",
				"varyingType" : "varying highp vec2",
				"varyingName" : "vTextureCoord",
			},
		}

		this.pointers = {
			"position" : null,
			"color" : null,
			"projection" : null,
			"localTransformation" : null
		}

	}

	getPointer(value){
		return this.pointers[value];
	}

	getActiveAttributes(){
		let result = [];
		for(let a in this.vertexAttributes){
			if(this.vertexAttributes[a]){
				result[result.length] = a;
			}
		}
		for(let a in this.fragmentAttributes){
			if(this.fragmentAttributes[a]){
				result[result.length] = a;
			}
		}
		return result;
	}

	setTextureRenderer(bool){
		if(bool){
			this.fragmentAttributes["color"] = false;
			this.fragmentAttributes["textureCoordonnees"] = true;
			this.fragmentUniforms["texture"] = true;
		}else{
			this.fragmentAttributes["color"] = true;
			this.fragmentAttributes["textureCoordonnees"] = false;
			this.fragmentUniforms["texture"] = false;
		}
	}

	getShaderProgram(gl){

		this._buildShaders();

		const vShader = this._createShader(gl.VERTEX_SHADER, this.vertexSrc, gl);
		const fShader = this._createShader(gl.FRAGMENT_SHADER, this.fragmentSrc, gl);

		const shaderProgram = gl.createProgram();
 	 	gl.attachShader(shaderProgram, vShader);
  	gl.attachShader(shaderProgram, fShader);
  	gl.linkProgram(shaderProgram);

	  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
	    console.log('Error lors de la liaison des shaders')
	    return null;
	  }

	  /* POINTERS */

	  this.pointers = [];

	  for(let a in this.vertexAttributes){
			if(this.vertexAttributes[a]){
				this.pointers[a] = gl.getAttribLocation(shaderProgram, this.infos[a].name);
			}
		}
		for(let a in this.fragmentAttributes){
			if(this.fragmentAttributes[a]){
				this.pointers[a] = gl.getAttribLocation(shaderProgram, this.infos[a].name);
			}
		}
		for(let u in this.vertexUniforms){
			if(this.vertexUniforms[u]){
				this.pointers[u] = gl.getUniformLocation(shaderProgram, this.infos[u].name);
			}
		}
		for(let u in this.fragmentUniforms){
			if(this.fragmentUniforms[u]){
				this.pointers[u] = gl.getUniformLocation(shaderProgram, this.infos[u].name);
			}
		}

	  return shaderProgram;

	}

	_createShader(type, src, gl){

		const shader = gl.createShader(type);
		gl.shaderSource(shader, src);
		gl.compileShader(shader, src);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
	    console.log('Erreur lors de la compilation du shader ' + src + "\n" + gl.getShaderInfoLog(shader));
	    gl.deleteShader(shader);
	    return null;
	  }

	  return shader;

	}

	_buildShaders(){
		this._buildVertexShader();
		this._buildFragmentShader();
	}

	_buildVertexShader(){

		this.vertexSrc ='';

		//
		for(let a in this.vertexAttributes){
			if(this.vertexAttributes[a]){
				this.vertexSrc += this.infos[a].type + " " + this.infos[a].name + ";";
			}
		}
		for(let a in this.fragmentAttributes){
			if(this.fragmentAttributes[a]){
				this.vertexSrc += this.infos[a].type + " " + this.infos[a].name + ";";
				this.vertexSrc += this.infos[a].varyingType + " " + this.infos[a].varyingName + ";";
			}
		}
		for(let u in this.vertexUniforms){
			if(this.vertexUniforms[u]){
				this.vertexSrc += this.infos[u].type + " " + this.infos[u].name + ";";
			}
		}
		this.vertexSrc += "void main() {";

			//Fragment Atributes
			for(let a in this.fragmentAttributes){
				if(this.fragmentAttributes[a]){
					this.vertexSrc += this.infos[a].varyingName + " = " + this.infos[a].name + ";";
				}
			}

			//Projection
			if(this.vertexUniforms["projection"] && this.vertexUniforms["localTransformation"] && this.vertexAttributes["position"]){
				this.vertexSrc += "gl_Position = " + this.infos["projection"].name + " * " + this.infos["localTransformation"].name + " * " + this.infos["position"].name + ";";
			}

		this.vertexSrc += "}";

		console.log(this.vertexSrc);

	}

	_buildFragmentShader(){

		this.fragmentSrc = '';
		for(let a in this.fragmentAttributes){
			if(this.fragmentAttributes[a]){
				this.fragmentSrc += this.infos[a].varyingType + " " + this.infos[a].varyingName + ";";
			}
		}
		for(let u in this.fragmentUniforms){
			if(this.fragmentUniforms[u]){
				this.fragmentSrc += this.infos[u].type + " " + this.infos[u].name + ";";
			}

		}
		this.fragmentSrc += "void main() {";
			//Color
			if(this.fragmentAttributes["color"]){
				this.fragmentSrc += "gl_FragColor = " + this.infos["color"].varyingName + ";";
			}else if(this.fragmentAttributes["texture"]){
				this.fragmentSrc += "gl_FragColor = texture2D(" + this.infos["texture"].name + ", " + this.infos["textureCoordonnees"].varyingName + ");";
			}

		this.fragmentSrc += "}";

		console.log(this.fragmentSrc);


	}

}
module.exports = ShaderBuilder;