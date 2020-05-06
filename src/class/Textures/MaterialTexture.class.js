const Texture = require("../Interfaces/Texture.class.js");

class MaterialTexture extends Texture{

	constructor(webGLProgram, src){
		super();
		this.webGLProgram = webGLProgram;
		this.gl = webGLProgram.getContext();
		const that = this;
		const image = new Image();
		this.texture = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));

		image.onload = function(){        
    	that.gl.bindTexture(that.gl.TEXTURE_2D, that.texture);
    	that.gl.texImage2D(that.gl.TEXTURE_2D, 0, that.gl.RGBA, that.gl.RGBA, that.gl.UNSIGNED_BYTE, image);
      if ((image.width & (image.width - 1)) == 0 && (image.height & (image.height - 1)) == 0) {
         that.gl.generateMipmap(that.gl.TEXTURE_2D);
      } else {
         that.gl.texParameteri(that.gl.TEXTURE_2D, that.gl.TEXTURE_WRAP_S, that.gl.CLAMP_TO_EDGE);
         that.gl.texParameteri(that.gl.TEXTURE_2D, that.gl.TEXTURE_WRAP_T, that.gl.CLAMP_TO_EDGE);
         that.gl.texParameteri(that.gl.TEXTURE_2D, that.gl.TEXTURE_MIN_FILTER, that.gl.LINEAR);
      }
		};
		image.src = src;
	}

	getTexture(){
		return this.texture;
	}
}

module.exports = MaterialTexture;