const Texture = require("../Interfaces/Texture.class.js");

class FrameTexture extends Texture{

	constructor(webGLProgram, renderer){
		super();
		this.webGLProgram = webGLProgram;
		this.gl = webGLProgram.getContext();
		this.texture = this.gl.createTexture();
		this.renderer = renderer;
		this.renderer.setInitialisation(false);
		this.renderer.setResetConfigAtEnd(true);
	}

	update(width, height){

		const w = 256;
		const h = 256;

		//Bind texture
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);		
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, w, h, 0,this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);

    //FrameBuffer
    // Create and bind the framebuffer
		const fb = this.gl.createFramebuffer();
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fb);
		 
		// attach the texture as the first color attachment
		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.texture, 0);

		//RENDER
		this.renderer.render(this.webGLProgram);


		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
	}

	getTexture(){
		return this.texture;
	}
	
}

module.exports = FrameTexture;