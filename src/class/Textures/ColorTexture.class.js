const Texture = require("../Interfaces/Texture.class.js");

class ColorTexture extends Texture{

	constructor(webGLProgram, r, g, b, a){
		super();
		this.webGLProgram = webGLProgram;
		this.gl = webGLProgram.getContext();
		super();
		this.texture = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([r*255, g*255, b*255, a*255]));
	}

	getTexture(){
		return this.texture;
	}
	
}

module.exports = ColorTexture;