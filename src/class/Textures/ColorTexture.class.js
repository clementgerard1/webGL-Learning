const Texture = require("../Interfaces/Texture.class.js");

class ColorTexture extends Texture{

	constructor(webGLProgram, r, g, b, a){
		super();
		this.webGLProgram = webGLProgram;
		this.gl = webGLProgram.getContext();
<<<<<<< HEAD
		super();
		this.texture = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([r*255, g*255, b*255, a*255]));
=======
		this.texture = this.gl.createTexture();
		this.rgba = [r, g, b, a]; 
		this.update();
	}

	update(){
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([this.rgba[0]*255, this.rgba[1]*255, this.rgba[2]*255, this.rgba[3]*255]));
>>>>>>> tmp
	}

	getTexture(){
		return this.texture;
	}
<<<<<<< HEAD
=======

	getRGBA(){
		return this.rgba;
	}

	setRGBA(r, g, b, a){
		this.rgba = [r, g, b, a];
		this.update();
	}
>>>>>>> tmp
	
}

module.exports = ColorTexture;