const Texture = require("../Interfaces/Texture.class.js");

class FrameTexture extends Texture{

	constructor(webGLProgram, renderer){
		super();
		this.webGLProgram = webGLProgram;
		this.gl = webGLProgram.getContext();
		this.texture = this.gl.createTexture();
		this.renderer = renderer;
		this.renderer.setResetConfigAtEnd(true);
	}

	update(object){

		let viewPortDimensions = {};
		if(typeof object.getTextureDimensions == "function"){
			const dims = object.getTextureDimensions();
			viewPortDimensions = {
				"width" : dims[0] / dims[1] * 255,
				"height" : dims[1] / dims[0] * 255
			}
		}

		//Bind texture
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);		
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, viewPortDimensions.width, viewPortDimensions.height, 0,this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);

    //FrameBuffer
    // Create and bind the framebuffer
		const fb = this.gl.createFramebuffer();
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fb);
		 
		const depthBuffer = this.gl.createRenderbuffer();
		this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, depthBuffer);
		this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, viewPortDimensions.width, viewPortDimensions.height);
		this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, depthBuffer);

		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.texture, 0);

		//RENDER
		this.renderer.render(this.webGLProgram, [viewPortDimensions.width, viewPortDimensions.height]);


		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
	}

	getTexture(){
		return this.texture;
	}
	
}

module.exports = FrameTexture;