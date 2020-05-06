const Texture = require("../Interfaces/Texture.class.js");
const Renderer = require("../Renderer.class.js");
const Utils  = require("../Utils.class.js");

class EventTexture extends Texture{

	constructor(webGLProgram, scene){
		super();
		this.webGLProgram = webGLProgram;
		this.gl = webGLProgram.getContext();
		this.texture = this.gl.createTexture();
		this.scene = scene;

		const previousShader = webGLProgram.getShaderBuilder();
		this.shaderBuilder = webGLProgram.getShaderBuilder().clone();
		this.shaderBuilder.setMode("event");
		const that = this;
		this.renderer = new Renderer(this.scene, function(program){
			that.scene.setShaderBuilder(that.shaderBuilder);
		}, function(program){
			that.scene.setShaderBuilder(previousShader);
		});
		this.renderer.setResetConfigAtEnd(true);

		this.clickAsked = false;
		this.clickX = 0;
		this.clickY = 0;
		this.clickCallback = null;
		this.transparent = false;
	}

	getClick(x, y, callback){
		this.clickAsked = true;
		this.clickX = x;
		this.clickY = this.webGLProgram.getCanvas().height - y;
		this.clickCallback = callback;
	}

	update(width, height){

		//Bind texture
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);		
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0,this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);

    //FrameBuffer
    //Create and bind the framebuffer
		const fb = this.gl.createFramebuffer();
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fb);
		 		
		const depthBuffer = this.gl.createRenderbuffer();
		this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, depthBuffer);
		this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);
		this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, depthBuffer);

		this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.texture, 0);

		//RENDER
		this.renderer.render(this.webGLProgram, [width, height]);

    if(this.clickAsked){
    	const data = new Uint8Array(4);
    	this.gl.readPixels(
        this.clickX,            // x
        this.clickY,            // y
        1,                 // width
        1,                 // height
        this.gl.RGBA,           // format
        this.gl.UNSIGNED_BYTE,  // type
        data);
			this.clickCallback(Utils.getObjectByID(Utils.colorAsID(data)));
			this.clickAsked = false;
    }

		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
	}

	getTexture(){
		return this.texture;
	}
	
}

module.exports = EventTexture;