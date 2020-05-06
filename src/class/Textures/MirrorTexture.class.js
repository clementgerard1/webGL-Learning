const Texture = require("../Interfaces/Texture.class.js");
<<<<<<< HEAD
const Object3DGroup = require("../Objects3D/Object3DGroup.class.js");
const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");
const Utils = require("../Utils.class.js");
const Translate = require("../Movements/Translate.class.js");
=======
const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");
const Utils = require("../Utils.class.js");
const Translate = require("../Movements/Translate.class.js");
const Renderer = require("../Renderer.class.js");
>>>>>>> tmp

class MirrorTexture extends Texture{

	constructor(webGLProgram){
		super();
		this.webGLProgram = webGLProgram;
		this.gl = webGLProgram.getContext();
	}

<<<<<<< HEAD
	preDraw(mirrorObject){
		//Config
		//this.gl.depthMask(false);
		//this.gl.enable(this.gl.STENCIL_TEST);
		//this.gl.stencilOp(this.gl.KEEP, this.gl.KEEP, this.gl.REPLACE);  
		//this.gl.stencilFunc(this.gl.ALWAYS, 1, 0xFF);
		//this.gl.stencilMask(0xFF);
	}

	postDraw(mirrorObject, transform){
		//console.log(transform);

		const mirrorPos = mirrorObject.getPosition();
		//const tr =glmatrix.mat4.create();
		//glmatrix.mat4.translate(tr, tr, [-mirrorPos[0], -mirrorPos[1], -mirrorPos[2]]);
		//glmatrix.mat4.multiply(transform, tr, transform);
		mirrorObject.mirrorVec1 = glmatrix.vec3.fromValues(1,0, 0);
		mirrorObject.mirrorVec2 = glmatrix.vec3.fromValues(0,1, 0);
		mirrorObject.mirrorPos = glmatrix.vec3.fromValues(0,0, 0);
		glmatrix.mat4.add(mirrorObject.mirrorPos, mirrorObject.mirrorPos, [mirrorPos[0], mirrorPos[1], mirrorPos[2]]);

		//const point = glmatrix.vec3.fromValues(0, 0, 0);
		glmatrix.vec3.transformMat4(mirrorObject.mirrorVec1, mirrorObject.mirrorVec1, transform);
		glmatrix.vec3.transformMat4(mirrorObject.mirrorVec2, mirrorObject.mirrorVec2, transform);
		//glmatrix.vec3.transformMat4(mirrorObject.mirrorPos, mirrorObject.mirrorPos, transform);

    //let tr = Utils.symPlane(point, mirrorObject.mirrorPos, mirrorObject.mirrorVec1, mirrorObject.mirrorVec2);
    //tr = Utils.newVec(point, tr);
		//Config
		//this.gl.depthMask(true);
		//this.gl.stencilFunc(this.gl.EQUAL, 1, 0xFF);
		//this.gl.stencilMask(0x00);

		//Render reflected objects

		const actualObjects = this.webGLProgram.getScene().get3DObjects();
		const reflectedObjects = new Object3DGroup();
		let i = 0;
		for(let obj in actualObjects){
			if(!Object.is(actualObjects[obj],mirrorObject)){
				const newObject = actualObjects[obj].mirrorClone(mirrorObject);
				reflectedObjects.add3DObject("name" + i, newObject);
				i++;
			}
		}
		reflectedObjects.renderMirrored(this.webGLProgram, this.webGLProgram.getShaderBuilder().getActiveAttributes(), mirrorObject);

		//Return to init config
		this.gl.disable(this.gl.STENCIL_TEST);
=======
	preDraw(mirrorObject, transform){
		//Config
		this.gl.enable(this.gl.STENCIL_TEST);
		this.gl.clear(this.gl.STENCIL_BUFFER_BIT);
		this.gl.stencilOp(this.gl.KEEP, this.gl.KEEP, this.gl.REPLACE);  
		this.gl.stencilFunc(this.gl.ALWAYS, 1, 0xFF);
		this.gl.stencilMask(0xFF);
		this.gl.colorMask(false, false, false, false);

		//Draw stencil buffer

		mirrorObject.renderAttribute("position", this.webGLProgram);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.webGLProgram.getBuffer("index"));
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mirrorObject.indexes), this.gl.STATIC_DRAW);
		this.gl.uniformMatrix4fv(this.webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, transform);
    this.gl.drawElements(this.gl.TRIANGLES, mirrorObject.indexes.length, this.gl.UNSIGNED_SHORT, 0);

		//Config
		this.gl.colorMask(true, true, true, true);
		this.gl.stencilFunc(this.gl.EQUAL, 1, 0xFF);
		this.gl.stencilMask(0x00);

		//Render reflected objects
		let planeVec1 = glmatrix.vec4.fromValues(0.5,0, 0, 1);
		let planeVec2 = glmatrix.vec4.fromValues(0,0.5, 0, 1);
		const vecPosition = glmatrix.vec4.fromValues(0, 0, 0, 1);
		glmatrix.vec4.transformMat4(planeVec1, planeVec1, transform);
		glmatrix.vec4.transformMat4(planeVec2, planeVec2, transform);
		glmatrix.vec4.transformMat4(vecPosition, vecPosition, transform);

		this.gl.uniform1i(this.webGLProgram.getShaderBuilder().getPointer("mirrorActive"), 1);
		this.gl.uniform4fv(this.webGLProgram.getShaderBuilder().getPointer("mirrorPoint"), vecPosition);
		this.gl.uniform4fv(this.webGLProgram.getShaderBuilder().getPointer("mirrorVec1"), planeVec1);
		this.gl.uniform4fv(this.webGLProgram.getShaderBuilder().getPointer("mirrorVec2"), planeVec2);

		planeVec1 = Utils.newVec4(vecPosition, planeVec1);
		planeVec2 = Utils.newVec4(vecPosition, planeVec2);

		const newScene = this.webGLProgram.getScene().clone([mirrorObject]);
		const renderer = new Renderer(newScene);
		renderer.setResetConfigAtEnd(true);
		renderer.disableObjectStepUpAnimation();
		renderer.disableLightStepUpAnimation();
		renderer.disableCameraStepUpAnimation();
		renderer.disableClearColorBuffer();
		renderer.disableClearDepthBuffer();
		newScene.setRenderer(renderer, 0);
		newScene.incMirrorValue();
		renderer.render(this.webGLProgram);


		this.gl.uniform1i(this.webGLProgram.getShaderBuilder().getPointer("mirrorActive"), 0);
		//Render depth Buffer
		/*this.gl.colorMask(false, false, false, false);
		mirrorObject.renderAttribute("position", this.webGLProgram);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.webGLProgram.getBuffer("index"));
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mirrorObject.indexes), this.gl.STATIC_DRAW);
		this.gl.uniformMatrix4fv(this.webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, transform);
    this.gl.drawElements(this.gl.TRIANGLES, mirrorObject.indexes.length, this.gl.UNSIGNED_SHORT, 0);
    this.gl.colorMask(true,true,true,true);*/
	}

	postDraw(mirrorObject, transform){

		//Return to init config
		this.gl.disable(this.gl.STENCIL_TEST);
		this.gl.uniform1i(this.webGLProgram.getShaderBuilder().getPointer("mirrorActive"), false, 0);
>>>>>>> tmp

	}

}

module.exports = MirrorTexture;