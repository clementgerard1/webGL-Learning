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

		this.nbTextures = null;
		this.nbColors = null;

		//Vertex Shader Attributes
		this.vertexAttributes = {
			"position" : true,
		};

		//Fragment Shader Attributes
		this.fragmentAttributes = {
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
			"cameraPosition" : false,
		}

		//Fragment Shader Uniform
		this.fragmentUniforms = {
			"opacity" : true,
			"normalColor" : false,
			"IDasColor" : false,
			"ambientTIndex" : true,
			"ambientCIndex" : true,
			"diffuseTIndex" : true,
			"diffuseCIndex" : true,
			"specularTIndex" : true,
			"specularCIndex" : true,
			"shininessTIndex" : true,
			"shininessCIndex" : true,
			"normalTIndex" : true,
			"normalCIndex" : true,
			"normalVarying" : true,
			//Material

			//"depthTexture" : true,
		}

		this.infos = {
			"position" : {
				"nbDatas" : 3,
				"type" : "attribute vec4",
				"name" : "aVertexPosition",
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
			},
			"IDasColor" : {
				"type" : "uniform highp vec4",
				"name" : "uIdColor",
			},
			"cameraPosition" : {
				"type" : "uniform lowp vec3",
				"name" : "uCamPosition",
			},

			//Material
			"ambientTIndex" : {
				"type" : "uniform lowp int",
				"name" : "uAmbientTIndex"
			},
			"ambientCIndex" : {
				"type" : "uniform lowp int",
				"name" : "uAmbientCIndex"
			},
			"diffuseTIndex" : {
				"type" : "uniform lowp int",
				"name" : "uDiffuseTIndex"
			},
			"diffuseCIndex" : {
				"type" : "uniform lowp int",
				"name" : "uDiffuseCIndex"
			},
			"specularTIndex" : {
				"type" : "uniform lowp int",
				"name" : "uSpecularTIndex"
			},
			"specularCIndex" : {
				"type" : "uniform lowp int",
				"name" : "uSpecularCIndex"
			},
			"shininessTIndex" : {
				"type" : "uniform lowp int",
				"name" : "uShininessTIndex"
			},
			"shininessCIndex" : {
				"type" : "uniform lowp int",
				"name" : "uShininessCIndex"
			},
			"normalTIndex" : {
				"type" : "uniform lowp int",
				"name" : "uNormalTIndex"
			},
			"normalCIndex" : {
				"type" : "uniform lowp int",
				"name" : "uNormalCIndex"
			},
			"normalVarying" : {
				"type" : "uniform bool",
				"name" : "uNormalVarying"
			},
		}

		this.pointers = {
			"position" : null,
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
			"IDasColor" : null,
			"cameraPosition" : null,
			"ambientTIndex" : null,
			"ambientCIndex" : null,
			"diffuseTIndex" : null,
			"diffuseCIndex" : null,
			"specularTIndex" : null,
			"specularCIndex" : null,
			"shininessTIndex" : null,
			"shininessCIndex" : null,
			"normalTIndex" : null,
			"normalCIndex" : null,
			"normalVarying" : null,
			
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
				this.fragmentUniforms["normalColor"] = false;
				this.fragmentUniforms["opacity"] = true;
				this.fragmentUniforms["IDasColor"] = false;
			}else if(mode == "normal"){
				this.triangleMode = false;
				this.normalDisplay = true;
				this.fragmentAttributes["normal"] = false;
				this.fragmentAttributes["textureCoordonnees"] = false;
				this.fragmentUniforms["normalColor"] = true;
				this.fragmentUniforms["opacity"] = false;
				this.fragmentUniforms["IDasColor"] = false;
				
			}else if(mode == "event"){
				this.triangleMode = true;
				this.normalDisplay = false;
				this.fragmentAttributes["normal"] = false;
				this.fragmentAttributes["textureCoordonnees"] = false;
				this.fragmentUniforms["normalColor"] = false;
				this.fragmentUniforms["opacity"] = false;
				this.fragmentUniforms["IDasColor"] = true;
				
			}else{
				this.triangleMode = true;
				this.normalDisplay = false;
				this.fragmentAttributes["normal"] = true;
				this.fragmentAttributes["textureCoordonnees"] = true;
				this.fragmentUniforms["normalColor"] = false;
				this.fragmentUniforms["opacity"] = true;
				this.fragmentUniforms["IDasColor"] = false;
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

	checkTextures(infos){
		return (this.nbTextures == infos.textures) && (this.nbColors == infos.colors);
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

		const texturesInfos = scene.getInfos();
		this.nbTextures = texturesInfos.textures;
		this.nbColors = texturesInfos.colors;

		if(Object.keys(this.directionalLights).length != 0 || Object.keys(this.pointLights).length != 0 || Object.keys(this.spotLights).length != 0){
			this.vertexUniforms["cameraPosition"] = true;
		}

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
			this.fragmentUniforms[name + "_ambientColor"] = true;
			this.fragmentUniforms[name + "_diffuseColor"] = true;
			this.fragmentUniforms[name + "_specularColor"] = true;
			this.fragmentUniforms[name + "_vector"] = true;
			this.pointers[name + "_ambientColor"] = null;
			this.pointers[name + "_diffuseColor"] = null;
			this.pointers[name + "_specularColor"] = null;
			this.pointers[name + "_vector"] = null;
			this.infos[name + "_ambientColor"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "udl_ambientColor_" + name,
			}
			this.infos[name + "_diffuseColor"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "udl_diffuseColor_" + name,
			}
			this.infos[name + "_specularColor"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "udl_specularColor_" + name,
			}
			this.infos[name + "_vector"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "udl_vector_" + name,
			}
		}
		for(let name in this.pointLights){
			this.fragmentUniforms[name + "_ambientColor"] = true;
			this.fragmentUniforms[name + "_diffuseColor"] = true;
			this.fragmentUniforms[name + "_specularColor"] = true;
			this.fragmentUniforms[name + "_constDissip"] = true;
			this.fragmentUniforms[name + "_linDissip"] = true;
			this.fragmentUniforms[name + "_quadDissip"] = true;
			this.vertexUniforms[name + "_position"] = true;

			this.pointers[name + "_ambientColor"] = null;
			this.pointers[name + "_diffuseColor"] = null;
			this.pointers[name + "_specularColor"] = null;
			this.pointers[name + "_constDissip"] = null;
			this.pointers[name + "_linDissip"] = null;
			this.pointers[name + "_quadDissip"] = null;

			this.pointers[name + "_position"] = null;
			this.infos[name + "_ambientColor"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "udl_ambientColor_" + name,
			}
			this.infos[name + "_diffuseColor"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "udl_diffuseColor_" + name,
			}
			this.infos[name + "_specularColor"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "udl_specularColor_" + name,
			}
			this.infos[name + "_constDissip"] = {
				"nbDatas" : 1,
				"type" : "uniform mediump float",
				"name" : "udl_constDissip_" + name,
			}
			this.infos[name + "_linDissip"] = {
				"nbDatas" : 1,
				"type" : "uniform mediump float",
				"name" : "udl_linDissip_" + name,
			}
			this.infos[name + "_quadDissip"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump float",
				"name" : "udl_quadDissip_" + name,
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
			this.fragmentUniforms[name + "_ambientColor"] = true;
			this.fragmentUniforms[name + "_diffuseColor"] = true;
			this.fragmentUniforms[name + "_specularColor"] = true;
			this.fragmentUniforms[name + "_constDissip"] = true;
			this.fragmentUniforms[name + "_linDissip"] = true;
			this.fragmentUniforms[name + "_quadDissip"] = true;

			this.pointers[name + "_direction"] = null;
			this.pointers[name + "_iLimit"] = null;
			this.pointers[name + "_oLimit"] = null;
			
			this.pointers[name + "_ambientColor"] = null;
			this.pointers[name + "_diffuseColor"] = null;
			this.pointers[name + "_specularColor"] = null;
			this.pointers[name + "_constDissip"] = null;
			this.pointers[name + "_linDissip"] = null;
			this.pointers[name + "_quadDissip"] = null;

			this.pointers[name + "_position"] = null;
			this.infos[name + "_ambientColor"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "udl_ambientColor_" + name,
			}
			this.infos[name + "_diffuseColor"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "udl_diffuseColor_" + name,
			}
			this.infos[name + "_specularColor"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump vec3",
				"name" : "udl_specularColor_" + name,
			}
			this.infos[name + "_constDissip"] = {
				"nbDatas" : 1,
				"type" : "uniform mediump float",
				"name" : "udl_constDissip_" + name,
			}
			this.infos[name + "_linDissip"] = {
				"nbDatas" : 1,
				"type" : "uniform mediump float",
				"name" : "udl_linDissip_" + name,
			}
			this.infos[name + "_quadDissip"] = {
				"nbDatas" : 3,
				"type" : "uniform mediump float",
				"name" : "udl_quadDissip_" + name,
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

		//Textures Mapping
		for(let i = 0 ; i < this.nbTextures ; i++){
			this.fragmentUniforms["texture"+ i] = true;
			this.pointers["texture"+ i] = null;
			this.infos["texture" + i] = {
				"type" : "uniform sampler2D",
				"name" : "uSampler" + i,
			}
		}
		//Colors Mapping
		for(let i = 0 ; i < this.nbColors ; i++){
			this.fragmentUniforms["color"+ i] = true;
			this.pointers["color"+ i] = null;
			this.infos["color" + i] = {
				"type" : "uniform mediump vec4",
				"name" : "uColor" + i,
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

		if(Object.keys(this.directionalLights).length != 0 || Object.keys(this.pointLights).length != 0 || Object.keys(this.spotLights).length != 0){
			this.vertexSrc += "varying highp vec3 viewVec;";
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

		if(this.mode != "normal" && this.mode != "event"){
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

			if(this.mode != "normal" && this.mode != "event"){
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
			if(Object.keys(this.directionalLights).length != 0 || Object.keys(this.pointLights).length != 0 || Object.keys(this.spotLights).length != 0){
				this.vertexSrc += "viewVec = normalize(newVec(vec4(" + this.infos["cameraPosition"].name + ", 1), gl_Position).xyz);";
			}

			//Projection
			if(this.vertexUniforms["projection"] && this.vertexUniforms["localTransformation"] && this.vertexAttributes["position"]){
				this.vertexSrc += "gl_Position = " + this.infos["projection"].name + " * gl_Position;";
			}

		this.vertexSrc += "}";

		console.log(this.vertexSrc);

	}

	_buildFragmentShader(){

		this.fragmentSrc = ` precision mediump float; `;
		for(let a in this.fragmentAttributes){
			if(this.fragmentAttributes[a]){
				this.fragmentSrc += this.infos[a].varyingType + " " + this.infos[a].varyingName + ";";
			}
		}
		if(Object.keys(this.directionalLights).length != 0 || Object.keys(this.pointLights).length != 0 || Object.keys(this.spotLights).length != 0){
			this.fragmentSrc += "varying highp vec3 viewVec;";
		}
		for(let u in this.fragmentUniforms){
			if(this.fragmentUniforms[u]){
				this.fragmentSrc += this.infos[u].type + " " + this.infos[u].name + ";";
			}
		}

		if(this.mode != "normal" && this.mode != "event"){

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
		this.fragmentSrc += `
			lowp vec3 ambientLight(vec3 ambientLight, vec3 ambientObject){
				lowp vec3 ambient  = ambientLight  * ambientObject;
				return ambient;
			}
			lowp vec3 directionalLight(vec3 normal, vec3 lightVec, vec3 viewVec, vec3 ambientLight, vec3 ambientObject, vec3 diffuseLight, vec3 diffuseObject, vec3 specularLight, vec3 specularObject, float shininess){
				highp float diff = max(dot(normalize(normal), lightVec), 0.0);
				lowp vec3 reflectDir = reflect(lightVec, normalize(normal));
    		mediump float spec = pow(max(dot(viewVec, reflectDir), 0.0), shininess);
				lowp vec3 ambient  = ambientLight  * ambientObject;
    		lowp vec3 diffuse  = diffuseLight  * diff * diffuseObject;
    		lowp vec3 specular = specularLight * spec * specularObject;
				return ambient + diffuse + specular;
			}
			lowp vec3 pointLight(vec3 normal, float constDissip, float linDissip, float quadDissip, vec3 lightVec, vec3 viewVec, vec3 ambientLight, vec3 ambientObject, vec3 diffuseLight, vec3 diffuseObject, vec3 specularLight, vec3 specularObject, float shininess){
				highp float diff = max(dot(normalize(normal), normalize(lightVec)), 0.0);
				lowp vec3 reflectDir = reflect(normalize(lightVec), normalize(normal));
    		mediump float spec = pow(max(dot(viewVec, reflectDir), 0.0), shininess);

    		mediump float distance    = length(lightVec);
    		mediump float sum = (constDissip + linDissip * distance + quadDissip * (distance * distance));
    		mediump float attenuation = 1.0;
    		if(sum != 0.0){
    			attenuation = clamp(1.0 / sum, 0.0, 1.0);  
    		}

				lowp vec3 ambient  = ambientLight  * ambientObject * attenuation;
    		lowp vec3 diffuse  = diffuseLight  * diff * diffuseObject * attenuation;
    		lowp vec3 specular = specularLight * spec * specularObject * attenuation;
				return ambient + diffuse + specular;
			}
			lowp vec3 spotLight(vec3 normal, float iLimit, float oLimit, vec3 direction, float constDissip, float linDissip, float quadDissip, vec3 lightVec, vec3 viewVec, vec3 ambientLight, vec3 ambientObject, vec3 diffuseLight, vec3 diffuseObject, vec3 specularLight, vec3 specularObject, float shininess){
				mediump float isIn = max(dot(normalize(-direction), normalize(lightVec)), 0.0);
				mediump float diff = 0.0;
				mediump float spec = 0.0;
				lowp vec3 reflectDir;
				if(isIn > iLimit){ 
					diff = max(dot(normalize(normal), normalize(lightVec)), 0.0);
					reflectDir = reflect(normalize(lightVec), normalize(normal));
					spec = pow(max(dot(viewVec, reflectDir), 0.0), shininess);
				}else if(isIn < oLimit){ 
					diff = 0.0;
					spec = 0.0;
				}else{
					lowp float deg = clamp(( isIn - oLimit) / (iLimit - oLimit), 0.0, 1.0);
					reflectDir = reflect(normalize(lightVec), normalize(normal));
					diff = deg * max(dot(normalize(normal), normalize(lightVec)), 0.0);
					spec = deg * pow(max(dot(viewVec, reflectDir), 0.0), shininess);
				} 

    		mediump float distance = length(lightVec);
    		mediump float sum = (constDissip + linDissip * distance + quadDissip * (distance * distance));
    		mediump float attenuation = 1.0;
    		if(sum != 0.0){
    			attenuation = clamp(1.0 / sum, 0.0, 1.0);  
    		}

				lowp vec3 ambient  = ambientLight  * ambientObject * attenuation;
    		lowp vec3 diffuse  = diffuseLight  * diff * diffuseObject * attenuation;
    		lowp vec3 specular = specularLight * spec * specularObject * attenuation;
				return ambient + diffuse + specular;
			}
			`;

			this.fragmentSrc += "lowp vec4 determineColor(int textIndex, int colorIndex){";
				this.fragmentSrc += "lowp vec4 result = vec4(1, 1, 1, 1);";

				//Textures
				this.fragmentSrc += "lowp int temp = textIndex;";
				for(let i = this.nbTextures - 1 ; i >= 0 ; i--){
					this.fragmentSrc += "if(temp >= " + Math.pow(2, i) + "){";
						if(this.fragmentAttributes["textureCoordonnees"]){
							this.fragmentSrc += "result = result * texture2D(" + this.infos["texture" + i].name + ", " + this.infos["textureCoordonnees"].varyingName + ");";
							this.fragmentSrc += "temp = temp - " + Math.pow(2, i) + ";";
						}
					this.fragmentSrc += "}";
				}
				//Colors
				this.fragmentSrc += "temp = colorIndex;";
				for(let i = this.nbColors - 1 ; i >= 0 ; i--){
					this.fragmentSrc += "if(temp >= " + Math.pow(2, i) + "){";
						this.fragmentSrc += "result = result * " + this.infos["color" + i].name + ";";
						this.fragmentSrc += "temp = temp - " + Math.pow(2, i) + ";";
					this.fragmentSrc += "}";
				}

				this.fragmentSrc += "return result;";
			this.fragmentSrc += "}";
				
			this.fragmentSrc += `highp float determineShininess(int textIndex, int colorIndex){
				lowp vec4 result = determineColor(textIndex, colorIndex);
				return (result.r * 1000.0 + result.g * 100.0 + result.b * 10.0 + result.a);
			}`;
		;

		this.fragmentSrc += "void main() {";

			//Material
			this.fragmentSrc += "lowp vec4 materialAmbient = determineColor(" + this.infos["ambientTIndex"].name + "," + this.infos["ambientCIndex"].name + ");";
			this.fragmentSrc += "lowp vec4 materialDiffuse = determineColor(" + this.infos["diffuseTIndex"].name + "," + this.infos["diffuseCIndex"].name + ");";
			this.fragmentSrc += "lowp vec4 materialSpecular = determineColor(" + this.infos["specularTIndex"].name + "," + this.infos["specularCIndex"].name + ");";
			this.fragmentSrc += "highp float materialShininess = determineShininess(" + this.infos["shininessTIndex"].name + "," + this.infos["shininessCIndex"].name + ");";

			if(this.mode != "normal" && this.mode != "event"){

				if(Object.keys(this.ambientLights).length != 0 || Object.keys(this.directionalLights).length != 0 || Object.keys(this.pointLights).length != 0 || Object.keys(this.spotLights).length != 0){
					this.fragmentSrc += "gl_FragColor = vec4(0, 0, 0, materialAmbient.a);"
				}

				//LIGHTS
				for(let n in this.ambientLights){
			  	this.fragmentSrc += this.ambientLights[n].getFragmentShaderMainCode({
			  		"name" : this.infos[n].name
			  	});
				}
				for(let n in this.directionalLights){
			  	this.fragmentSrc += this.directionalLights[n].getFragmentShaderMainCode({
			  		"normal" : this.infos["normal"],
			  		"ambient" : this.infos[n + "_ambientColor"],
			  		"diffuse" : this.infos[n + "_diffuseColor"],
			  		"specular" : this.infos[n + "_specularColor"],
			  		"vector" : this.infos[n + "_vector"],
			  		"name" : n
			  	});
				}
				for(let n in this.pointLights){
			  	this.fragmentSrc += this.pointLights[n].getFragmentShaderMainCode({
			  		"normal" : this.infos["normal"],
			  		"ambient" : this.infos[n + "_ambientColor"],
			  		"diffuse" : this.infos[n + "_diffuseColor"],
			  		"specular" : this.infos[n + "_specularColor"],
			  		"constDissip" : this.infos[n + "_constDissip"],
			  		"linDissip" : this.infos[n + "_linDissip"],
			  		"quadDissip" : this.infos[n + "_quadDissip"],
			  		"position" : this.infos[n + "_position"],
			  		"name" : n
			  	});
				}
				for(let n in this.spotLights){
			  	this.fragmentSrc += this.spotLights[n].getFragmentShaderMainCode({
			  		"normal" : this.infos["normal"],
			  		"ambient" : this.infos[n + "_ambientColor"],
			  		"diffuse" : this.infos[n + "_diffuseColor"],
			  		"specular" : this.infos[n + "_specularColor"],
			  		"position" : this.infos[n + "_position"],
			  		"direction" : this.infos[n + "_direction"],
			  		"iLimit" : this.infos[n + "_iLimit"],
			  		"oLimit" : this.infos[n + "_oLimit"],
			  		"constDissip" : this.infos[n + "_constDissip"],
			  		"linDissip" : this.infos[n + "_linDissip"],
			  		"quadDissip" : this.infos[n + "_quadDissip"],
			  		"name" : n
			  	});
				}
			}else if(this.mode == "normal"){
				this.fragmentSrc += "gl_FragColor = " + this.infos["normalColor"].name + ";";
			}

			//Transparency
			if(this.fragmentUniforms["opacity"]){
				this.fragmentSrc += "gl_FragColor.a = gl_FragColor.a * " + this.infos["opacity"].name + ";";
			}else{
				this.fragmentSrc += "gl_FragColor.a = 1.0;";
			}

			if(this.mode == "event"){
				this.fragmentSrc += "gl_FragColor = vec4(" + this.infos["IDasColor"].name + ".xyz, 0.0);";
			}

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