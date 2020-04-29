const WebGLProgram = require("../class/WebGLProgram.class.js");
const Camera = require("../class/Camera.class.js");
const Cube = require("../class/Objects3D/Cube.class.js");
const AmbientLight = require("../class/Lights/AmbientLight.class.js");
const Scene = require("../class/Scene.class.js");
const Rotate = require("../class/Movements/Rotate.class.js");
const LookAt = require("../class/Movements/LookAt.class.js");
const Object3DGroup = require("../class/Objects3D/Object3DGroup.class.js");
const Renderer = require("../class/Renderer.class.js");

module.exports = function(){
	const program = new WebGLProgram();
	program.insertInBlock(document.getElementById("display"));
	program.setUpdateOnResize(true);

	program.enableFPSCounter(function(fps){
		document.getElementById("fpsCounter").innerHTML = "Frame per second : " + fps;
	}, 300);

	const scene = new Scene();

	//Cubes
	const cube1 = new Cube(); cube1.setPosition(-1, 0, -11); scene.add3DObject("cube1", cube1); const texture1 = program.createColorTexture(0, 0, 1, 1); cube1.addTexture("color", texture1);
	const cube2 = new Cube();	cube2.setPosition(0, 0, -10); scene.add3DObject("cube2", cube2); const texture2 = program.createColorTexture(0, 1, 0, 1); cube2.addTexture("color", texture2);
	const cube3 = new Cube();	cube3.setPosition(1, 0, -11); scene.add3DObject("cube3", cube3); const texture3 = program.createColorTexture(1, 0, 0, 1); cube3.addTexture("color", texture3);

	scene.setClearColor(0,0,0,1);
	program.setScene(scene);

	//Carré invisible en haut à droite
	let isClicked = false;
	let clickX = null;
	let clickY = null;
	const renderer = new Renderer(scene , function(program){
		//BEFORE
		scene.setClearColor(0, 0, 0, 0);
	}, function(program){
		//AFTER
		scene.setClearColor(0, 0, 0, 1);
	});
	renderer.setScissor(0.8, 0, 0.2, 0.2);

	const depthTexture = program.getContext().createTexture();
	const rendererClick = new Renderer(scene , function(program){
		//BEFORE
		const gl = program.getContext();
		program.enableDepthTexture();
		//gl.colorMask(false, false, false, false);

		// Create the depth texture
		const width = program.getCanvas().width;
		const height = program.getCanvas().height;
		
		const framebuffer = gl.createFramebuffer();
		
		gl.bindTexture(gl.TEXTURE_2D, depthTexture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, width, height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_INT, null);

		//Create a color texture
		const colorTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, colorTexture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

		gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colorTexture, 0);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, depthTexture, 0);
		gl.uniform1i(program.actualShaderBuilder.getPointer("depthTexture"), true, 0);
		gl.clear(gl.DEPTH_BUFFER_BIT);
		

	}, function(program){
		//AFTER

		//Read
		const read = new Uint8Array(4);
		program.getContext().readPixels(
			Math.floor(program.getCanvas().width / 2), 
			Math.floor(program.getCanvas().height / 2), 
			1, 
			1, 
			program.getContext().RGBA, 
			program.getContext().UNSIGNED_BYTE, 
			read
		);

		console.log(read);

		//Restart
		program.getContext().bindFramebuffer(program.getContext().FRAMEBUFFER, null);
		program.disableDepthTexture();
		program.getContext().colorMask(true, true, true, true);
		isClicked = false;
	});
	rendererClick.setInitialisation(false);
	rendererClick.setResetConfigAtEnd(true);

	//Click selection :
	
	program.getCanvas().addEventListener("click", function(event){

		clickX = event.clientX;
		clickY = event.clientY;
		isClicked = true;

	});


	scene.addRenderer(renderer);
	scene.addRenderer(rendererClick);

	const camera = new Camera();
	camera.setType("perspective", {

	});
	camera.setPosition(0, 0, 10);
	scene.addCamera("main", camera);
	scene.setCamera("main");


	program.start();

	window.addEventListener('DOMContentLoaded', function(event){

		

	});

}