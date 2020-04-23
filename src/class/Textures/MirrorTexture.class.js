const Texture = require("../Interfaces/Texture.class.js");
const Object3DGroup = require("../Objects3D/Object3DGroup.class.js");
const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");
const Utils = require("../Utils.class.js");
const Translate = require("../Movements/Translate.class.js");

class MirrorTexture extends Texture{

	constructor(webGLProgram){
		super();
		this.webGLProgram = webGLProgram;
		this.gl = webGLProgram.getContext();
	}

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

	}

}

module.exports = MirrorTexture;