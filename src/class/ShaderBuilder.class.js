class ShaderBuilder{

	constructor(){
		this.vertexSrc = null;
		this.fragmentSrc = null;
		this.lastShaderProgram = null;
		
		this.triangleMode = true;
		this.normalDisplay = false;
		this.normalColor = [1, 1, 1, 1];

		this.mode = "triangle";

		//Lights configuration
		this.ambientLights = [];
		this.directionalLights = [];
		this.pointLights = [];
		this.spotLights = [];

		this.needReBuild = true;


		//Vertex Shader Attributes
		this.vertexAttributes = {
			"position" : true,
		};

		//Fragment Shader Attributes
		this.fragmentAttributes = {
			"color" : false, // ALWAYS FALSE
			"textureCoordonnees" : true, // ALWAYS TRUE
			"normal" : true,
		};

		//Vertex Shader Uniform
		this.vertexUniforms = {
			"projection" : true,
			"localTransformation" : true,
			"localTransformationTransposeInvert" : true,
			"mirrorActive" : true,
			"mirrorPoint" : true,
			"mirrorVec1" : true,
			"mirrorVec2" : true,

		}

		//Fragment Shader Uniform
		this.fragmentUniforms = {
			"texture" : true,// ALWAYS TRUE
			"opacity" : true,
			"normalColor" : false
			//"depthTexture" : true,
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
			"normal" : {
				"nbDatas" : 3,
				"type" : "attribute vec4",
				"name" : "aVertexNormal",
				"varyingType" : "varying mediump vec4",
				"varyingName" : "vNormal",
			},
			"projection" : {
				"type" : "uniform mat4",
				"name" : "uProjectionMatrix",
			},
			"localTransformation" : {
				"type" : "uniform mat4",
				"name" : "uLocalTransformationMatrix",
			},
			"localTransformationTransposeInvert" : {
				"type" : "uniform mat4",
				"name" : "uLocalTransformationTIMatrix",
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
			},
			"normalColor" : {
				"type" : "uniform lowp vec4",
				"name" : "uNormalColor",
			} 
			// "depthTexture" : {
			// 	"type" : "uniform bool",
			// 	"name" : "uDepthTextureActive",
			// }
		}

		this.pointers = {
			"position" : null,
			"color" : null,
			"normal" : null,
			"projection" : null,
			"localTransformation" : null,
			"localTransformationTransposeInvert" : null,
			"textureCoordonnees" : null,
			"mirrorActive" : null,
			"mirrorVec1" : null,
			"mirrorVec2" : null,
			"mirrorPoint" : null,
			"opacity" : null,
			"normalColor" : null,
			//"depthTexture" : null,
			
		}

	}

	needRebuild(){
		return this.needReBuild;
	}

	getMode(){
		return this.mode;
	}

	setMode(mode){
		if(mode != this.mode){
			this.needReBuild = true;
			this.mode = mode;
			if(mode == "line"){
				this.triangleMode = false;
				this.normalDisplay = false;
				this.fragmentAttributes["normal"] = true;
				this.fragmentAttributes["textureCoordonnees"] = true;
				this.fragmentAttributes["color"] = false;
				this.fragmentUniforms["normalColor"] = false;
				this.fragmentUniforms["texture"] = true;
				this.fragmentUniforms["opacity"] = true;
			}else if(mode == "normal"){
				this.triangleMode = false;
				this.normalDisplay = true;
				this.fragmentAttributes["color"] = false;
				this.fragmentAttributes["normal"] = false;
				this.fragmentAttributes["textureCoordonnees"] = false;
				this.fragmentUniforms["normalColor"] = true;
				this.fragmentUniforms["texture"] = false;
				this.fragmentUniforms["opacity"] = false;
				
			}else{
				this.triangleMode = true;
				this.normalDisplay = false;
				this.fragmentAttributes["color"] = false;
				this.fragmentAttributes["normal"] = true;
				this.fragmentAttributes["textureCoordonnees"] = true;
				this.fragmentUniforms["normalColor"] = false;
				this.fragmentUniforms["texture"] = true;
				this.fragmentUniforms["opacity"] = true;
			}
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

	checkLights(ambient, directionals, points, spots){
		if(ambient != Object.keys(this.ambientLights).length || directionals != Object.keys(this.directionalLights).length || points != Object.keys(this.pointLights).length || spots != Object.keys(this.spotLights).length){
			return false;
		}
		for(let n in this.ambientLights){
			if(this.ambientLights[n].needShaderRebuild()) return false;
		}
		for(let n in this.directionalLights){
			if(this.directionalLights[n].needShaderRebuild()) return false;
		}
		for(let n in this.pointLights){
			if(this.pointLights[n].needShaderRebuild()) return false;
		}
		for(let n in this.spotLights){
			if(this.spotLights[n].needShaderRebuild()) return false;
		}
		return true;

	}

	getNormalColor(){
		return this.normalColor;
	}

	setNormalColor(r, g, b, a){
		this.normalColor = [r, g, b, a];
	}

	getShaderProgram(){
	  return this.lastShaderProgram;
	}

	buildShaderProgram(gl, scene){

		//LIGTHS
		this.ambientLights = scene.getAmbientLights();
		this.directionalLights = scene.getDirectionalLights();
		this.pointLights = scene.getPointLights();
		this.spotLights = scene.getSpotLights();
		//add uniforms and attributes
		for(let name in this.ambientLights){
			this.fragmentUniforms[name] = true;
			this.pointers[name] = null;
			this.infos[name] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "ual_" + name
			}
		}
		for(let name in this.directionalLights){
			this.fragmentUniforms[name + "_color"] = true;
			this.fragmentUniforms[name + "_vector"] = true;
			this.pointers[name + "_color"] = null;
			this.pointers[name + "_vector"] = null;
			this.infos[name + "_color"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "udl_color_" + name,
			}
			this.infos[name + "_vector"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "udl_vector_" + name,
			}
		}
		for(let name in this.pointLights){
			this.fragmentUniforms[name + "_color"] = true;
			this.vertexUniforms[name + "_position"] = true;
			this.pointers[name + "_color"] = null;
			this.pointers[name + "_position"] = null;
			this.infos[name + "_color"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "upl_color_" + name,
			}
			this.infos[name + "_position"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "upl_position_" + name,
			}
		}
		for(let name in this.spotLights){
			this.fragmentUniforms[name + "_direction"] = true;
			this.fragmentUniforms[name + "_iLimit"] = true;
			this.fragmentUniforms[name + "_oLimit"] = true;
			this.vertexUniforms[name + "_position"] = true;
			this.fragmentUniforms[name + "_color"] = true;
			this.pointers[name + "_direction"] = null;
			this.pointers[name + "_iLimit"] = null;
			this.pointers[name + "_oLimit"] = null;
			this.pointers[name + "_color"] = null;
			this.pointers[name + "_position"] = null;
			this.infos[name + "_color"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "usl_color_" + name,
			}
			this.infos[name + "_position"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "usl_position_" + name,
			}
			this.infos[name + "_direction"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "usl_direction_" + name,
			}
			this.infos[name + "_iLimit"] = {
				"nbDatas" : 1,
				"type" : "uniform mediump float",
				"name" : "usl_ilimit_" + name,
			}
			this.infos[name + "_oLimit"] = {
				"nbDatas" : 1,
				"type" : "uniform mediump float",
				"name" : "usl_olimit_" + name,
			}
		}

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

		this.lastShaderProgram = shaderProgram;

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
		this.needReBuild = false;
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

		if(this.mode != "normal"){
			//Point Light
			for(let n in this.pointLights){
		  	this.vertexSrc += this.pointLights[n].getVertexShaderPreCode({
		  		"name" : n
		  	});
			}
			//Spot Light
			for(let n in this.spotLights){
		  	this.vertexSrc += this.spotLights[n].getVertexShaderPreCode({
		  		"name" : n
		  	});
			}
		}



		this.vertexSrc += "void main() {";

			//Fragment Atributes
			for(let a in this.fragmentAttributes){
				if(this.fragmentAttributes[a]){
					this.vertexSrc += this.infos[a].varyingName + " = " + this.infos[a].name + ";";
				}
			}

			//Normal transformation
			if(this.fragmentAttributes["normal"]){
				this.vertexSrc += this.infos["normal"].varyingName + " = "  + this.infos["localTransformationTransposeInvert"].name + " * " + this.infos["normal"].name + ";";
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

			if(this.mode != "normal"){
				//Point Light
				for(let n in this.pointLights){
			  	this.vertexSrc += this.pointLights[n].getVertexShaderMainCode({
			  		"position" : this.infos[n + "_position"],
			  		"name" : n
			  	});
				}
				//Spot Light
				for(let n in this.spotLights){
			  	this.vertexSrc += this.spotLights[n].getVertexShaderMainCode({
			  		"position" : this.infos[n + "_position"],
			  		"name" : n
			  	});
				}
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

		if(this.mode != "normal"){
			//Point Light
			for(let n in this.pointLights){
		  	this.fragmentSrc += this.pointLights[n].getFragmentShaderPreCode({
		  		"name" : n
		  	});
			}
			//Spot Light
			for(let n in this.spotLights){
		  	this.fragmentSrc += this.spotLights[n].getFragmentShaderPreCode({
		  		"name" : n
		  	});
			}
		}

		//Light functions
		//this.fragmentSrc += 

		this.fragmentSrc += "void main() {";
			//Color
			//this.fragmentSrc += "if(" + this.infos["depthTexture"].name + " == false){"
			if(this.fragmentAttributes["color"]){
				this.fragmentSrc += "gl_FragColor = " + this.infos["color"].varyingName + ";";
			}else if(this.fragmentAttributes["textureCoordonnees"]){
				this.fragmentSrc += "gl_FragColor = texture2D(" + this.infos["texture"].name + ", " + this.infos["textureCoordonnees"].varyingName + ");";
			}
			//this.fragmentSrc += "}"

			if(this.mode != "normal"){
				//LIGHTS
				for(let n in this.ambientLights){
			  	this.fragmentSrc += this.ambientLights[n].getFragmentShaderMainCode({
			  		"name" : this.infos[n].name
			  	});
				}
				for(let n in this.directionalLights){
			  	this.fragmentSrc += this.directionalLights[n].getFragmentShaderMainCode({
			  		"normal" : this.infos["normal"],
			  		"color" : this.infos[n + "_color"],
			  		"vector" : this.infos[n + "_vector"],
			  		"name" : n
			  	});
				}
				for(let n in this.pointLights){
			  	this.fragmentSrc += this.pointLights[n].getFragmentShaderMainCode({
			  		"normal" : this.infos["normal"],
			  		"color" : this.infos[n + "_color"],
			  		"position" : this.infos[n + "_position"],
			  		"name" : n
			  	});
				}
				for(let n in this.spotLights){
			  	this.fragmentSrc += this.spotLights[n].getFragmentShaderMainCode({
			  		"normal" : this.infos["normal"],
			  		"color" : this.infos[n + "_color"],
			  		"position" : this.infos[n + "_position"],
			  		"direction" : this.infos[n + "_direction"],
			  		"iLimit" : this.infos[n + "_iLimit"],
			  		"oLimit" : this.infos[n + "_oLimit"],
			  		"name" : n
			  	});
				}
			}else{
				this.fragmentSrc += "gl_FragColor = " + this.infos["normalColor"].name + ";";
			}


			//Transparency
			if(this.fragmentUniforms["opacity"]){
				this.fragmentSrc += "gl_FragColor.a = gl_FragColor.a * " + this.infos["opacity"].name + ";";
			}

			// this.fragmentSrc += "if(" + this.infos["depthTexture"].name + " == true){";
			// this.fragmentSrc += "gl_FragColor = vec4(gl_FragCoord.z, gl_FragCoord.z, gl_FragCoord.z, 1);";
			// this.fragmentSrc += "}";

		this.fragmentSrc += "}";

		console.log(this.fragmentSrc);

	}

	clone(){
		const neww = new this.constructor();

		neww.vertexSrc = this.vertexSrc;
		neww.fragmentSrc = this.fragmentSrc;
		neww.lastShaderProgram = this.lastShaderProgram;
		
		neww.triangleMode = this.triangleMode;
		neww.normalDisplay = this.normalDisplay;
		neww.normalColor = this.normalColor.slice();
		neww.mode = this.mode;

		//Lights configuration
		Object.assign(neww.ambientLights, this.ambientLights);
		Object.assign(neww.directionalLights, this.directionalLights);
		Object.assign(neww.pointLights, this.pointLights);
		Object.assign(neww.spotLights, this.spotLights);
		neww.needReBuild = this.needReBuild;
		Object.assign(neww.vertexAttributes, this.vertexAttributes);
		Object.assign(neww.fragmentAttributes, this.fragmentAttributes);
		Object.assign(neww.vertexUniforms, this.vertexUniforms);
		Object.assign(neww.fragmentUniforms, this.fragmentUniforms);
		Object.assign(neww.infos, this.infos);
		Object.assign(neww.pointers, this.pointers);

		return neww;
	}

}
module.exports = ShaderBuilder;