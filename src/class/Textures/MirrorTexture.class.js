const Texture = require("../Interfaces/Texture.class.js");
const Object3DGroup = require("../Objects3D/Object3DGroup.class.js");
const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");
const Utils = require("../Utils.class.js");
const Translate = require("../Movements/Translate.class.js");
const Renderer = require("../Renderer.class.js");

class MirrorTexture extends Texture{

	constructor(webGLProgram){
		super();
		this.webGLProgram = webGLProgram;
		this.gl = webGLProgram.getContext();
	}

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
		const planeVec1 = glmatrix.vec4.fromValues(1,0, 0, 1);
		const planeVec2 = glmatrix.vec4.fromValues(0,1, 0, 1);
		const pos = mirrorObject.getPosition()
		const vecPosition = glmatrix.vec4.fromValues(pos[0], pos[1], pos[2], 1);
		glmatrix.vec4.transformMat4(planeVec1, planeVec1, transform);
		glmatrix.vec4.transformMat4(planeVec2, planeVec2, transform);
		glmatrix.vec4.transformMat4(vecPosition, vecPosition, transform);

		this.gl.uniform1i(this.webGLProgram.getShaderBuilder().getPointer("mirrorActive"), 1);
		this.gl.uniform4fv(this.webGLProgram.getShaderBuilder().getPointer("mirrorPoint"), vecPosition);
		this.gl.uniform4fv(this.webGLProgram.getShaderBuilder().getPointer("mirrorVec1"), planeVec1);
		this.gl.uniform4fv(this.webGLProgram.getShaderBuilder().getPointer("mirrorVec2"), planeVec2);

		/*const actualObjects = this.webGLProgram.getScene().get3DObjects();
		const reflectedObjects = new Object3DGroup();
		let i = 0;
		for(let obj in actualObjects){
			if(!Object.is(actualObjects[obj],mirrorObject)){
				const newObject = actualObjects[obj].clone(mirrorObject);
				newObject.mirrored++;
				reflectedObjects.add3DObject("name" + i, newObject);
				i++;
			}
		}*/
		const newScene = this.webGLProgram.getScene().clone([mirrorObject]);
		const renderer = new Renderer(newScene);
		renderer.setInitialisation(false);
		newScene.setRenderer(renderer);
		newScene.incMirrorValue();
		renderer.render(this.webGLProgram);
	}

	postDraw(mirrorObject, transform){

		//Return to init config
		this.gl.disable(this.gl.STENCIL_TEST);
		this.gl.uniform1i(this.webGLProgram.getShaderBuilder().getPointer("mirrorActive"), false, 0);

	}

}

module.exports = MirrorTexture;