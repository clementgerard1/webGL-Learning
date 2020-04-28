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
		document.getElementById("fpsCounter").innerHTML = fps + " FPS";
	}, 300);

	const scene = new Scene();

	scene.setClearColor(0,0,0,1);
	program.setScene(scene);

	//Carré invisible en haut à droite
	const renderer = new Renderer(scene , function(program){
		scene.setClearColor(0, 0, 0, 0);
	}, function(program){
		scene.setClearColor(0, 0, 0, 1);
	});
	renderer.setScissor(1000, 300, 300, 500);

	scene.addRenderer(renderer);

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