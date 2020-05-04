const Texture = require("../Interfaces/Texture.class.js");

class ColorTexture extends Texture{

	constructor(webGLProgram, r, g, b, a){
		super();
		this.webGLProgram = webGLProgram;
		this.gl = webGLProgram.getContext();
		this.texture = this.gl.createTexture();
		this.rgba = [r, g, b, a]; 
		this.update();
	}

	update(){
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([this.rgba[0]*255, this.rgba[1]*255, this.rgba[2]*255, this.rgba[3]*255]));
	}

	getTexture(){
		return this.texture;
	}

	getRGBA(){
		return this.rgba;
	}

	setRGBA(r, g, b, a){
		this.rgba = [r, g, b, a];
		this.update();
	}
	
}

module.exports = ColorTexture;