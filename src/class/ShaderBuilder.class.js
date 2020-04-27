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
			"color" : false, // ALWAYS FALSE
			"textureCoordonnees" : true, // ALWAYS TRUE
		};

		//Vertex Shader Uniform
		this.vertexUniforms = {
			"projection" : true,
			"localTransformation" : true,
			"mirrorActive" : true,
			"mirrorPoint" : true,
			"mirrorVec1" : true,
			"mirrorVec2" : true
		}

		//Fragment Shader Uniform
		this.fragmentUniforms = {
			"texture" : true,// ALWAYS TRUE
			"opacity" : true,
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
			"opacity" : {
				"type" : "uniform highp float",
				"name" : "uOpacity",
			},
			"textureCoordonnees" : {
				"nbDatas" : 2,
				"type" : "attribute vec2",
				"name" : "aTextureCoord",
				"varyingType" : "varying highp vec2",
				"varyingName" : "vTextureCoord",
			},
			"mirrorActive" : {
				"type" : "uniform bool",
				"name" : "uMirrorActive",
			},
			"mirrorVec1" : {
				"type" : "uniform vec4",
				"name" : "uMirrorVec1",
			},
			"mirrorVec2" : {
				"type" : "uniform vec4",
				"name" : "uMirrorVec2",
			},
			"mirrorPoint" : {
				"type" : "uniform vec4",
				"name" : "uMirrorPoint",
			}
		}

		this.pointers = {
			"position" : null,
			"color" : null,
			"projection" : null,
			"localTransformation" : null,
			"textureCoordonnees" : null,
			"mirrorActive" : null,
			"mirrorVec1" : null,
			"mirrorVec2" : null,
			"mirrorPoint" : null,
			"opacity" : null,
			
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

		//Projeté orthogonal
		this.vertexSrc += `
			vec4 projOrth(vec4 point, vec4 mirrorPoint, vec4 mVec1, vec4 mVec2){
				vec3 norm = cross(mVec1.xyz, mVec2.xyz);
				float d = (-norm.x * mirrorPoint.x) + (-norm.y * mirrorPoint.y) + (-norm.z * mirrorPoint.z);
				float beta = (-(point.x * norm.x) - (point.y * norm.y) - (point.z * norm.z) - d) / (norm.x * norm.x  + norm.y * norm.y + norm.z * norm.z);
				return vec4(point.x + norm.x * beta, point.y + norm.y * beta, point.z + norm.z * beta , 1);
			}
		`;

		//new vec from two point
		this.vertexSrc += `
			vec4 newVec(vec4 point1, vec4 point2){
				return vec4(((point2 - point1).xyz), 1);
			}
		`;

		//Scale
		this.vertexSrc += `
			vec4 scale(vec4 v, float scal){
				return vec4( v.x * scal, v.y * scal, v.z * scal, 1);
			}
		`;

		//Translate 
		this.vertexSrc += `
			vec4 translate(vec4 v, vec4 transVec){
				return (mat4(
						1.0, 0.0, 0.0, 0.0, 
					  0.0, 1.0, 0.0, 0.0, 
					  0.0, 0.0, 1.0, 0.0,  
					  transVec.x, transVec.y, transVec.z, transVec.w) * v);
			}
		`;		


		this.vertexSrc += "void main() {";

			//Fragment Atributes
			for(let a in this.fragmentAttributes){
				if(this.fragmentAttributes[a]){
					this.vertexSrc += this.infos[a].varyingName + " = " + this.infos[a].name + ";";
				}
			}

			//Transformation
			if(this.vertexUniforms["localTransformation"] && this.vertexAttributes["position"]){
				this.vertexSrc += "gl_Position = " + this.infos["localTransformation"].name + " * " + this.infos["position"].name + ";";
			}

			//Mirror
			if(this.vertexUniforms["mirrorActive"] && this.vertexUniforms["localTransformation"]){
				this.vertexSrc += 'if(' + this.infos["mirrorActive"].name + '){'
					//vec4 mirrorTransp = projOrth(gl_Position, uMirrorPoint, uMirrorVec1, uMirrorVec2);
					this.vertexSrc += "vec4 mirrorTransp = projOrth(gl_Position, " + this.infos["mirrorPoint"].name + ", " + this.infos["mirrorVec1"].name + ", " + this.infos["mirrorVec2"].name + ");"
					this.vertexSrc += "gl_Position = translate(gl_Position, scale(newVec(gl_Position, mirrorTransp), 2.));";
					//this.vertexSrc += "gl_Position = translate(gl_Position, scale(uMirrorVec1, 2.0));";

				this.vertexSrc += '}';
			}

			//Projection
			if(this.vertexUniforms["projection"] && this.vertexUniforms["localTransformation"] && this.vertexAttributes["position"]){
				this.vertexSrc += "gl_Position = " + this.infos["projection"].name + " * gl_Position;";
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
			}else if(this.fragmentAttributes["textureCoordonnees"]){
				this.fragmentSrc += "gl_FragColor = texture2D(" + this.infos["texture"].name + ", " + this.infos["textureCoordonnees"].varyingName + ");";
			}
			if(this.fragmentUniforms["opacity"]){
				this.fragmentSrc += "gl_FragColor.a = gl_FragColor.a * " + this.infos["opacity"].name + ";";
			}

		this.fragmentSrc += "}";

		console.log(this.fragmentSrc);


	}

}
module.exports = ShaderBuilder;