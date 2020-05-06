const Texture = require("../Interfaces/Texture.class.js");

class CanvasTexture extends Texture{

	constructor(webGLProgram, canvas, drawFunction){
		super();
		this.webGLProgram = webGLProgram;
		this.gl = webGLProgram.getContext();
		this.texture = this.gl.createTexture();
		this.canvas = canvas;
		this.drawFunction = drawFunction;
	}

	update(){

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

		const ctx = this.canvas.getContext("2d");
		ctx.resetTransform();
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		ctx.translate(0, this.canvas.height);
		ctx.scale(1, -1);
		this.drawFunction(this.canvas);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.canvas);
		if ((this.canvas.width & (this.canvas.width - 1)) == 0 && (this.canvas.height & (this.canvas.height - 1)) == 0) {
       this.gl.generateMipmap(this.gl.TEXTURE_2D);
    } else {
       this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
       this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
       this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    }
	}

	getTexture(){
		return this.texture;
	}
	
}

module.exports = CanvasTexture;