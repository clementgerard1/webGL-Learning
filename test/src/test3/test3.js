const WebGLProgram = require("../class/WebGLProgram.class.js");
const Camera = require("../class/Camera.class.js");
const Cube = require("../class/3DObjects/Cube.class.js");
const AmbientLight = require("../class/Lights/AmbientLight.class.js");
const Scene = require("../class/Scene.class.js");
const Rotate = require("../class/Movements/Rotate.class.js");
const Object3DGroup = require("../class/3DObjects/Object3DGroup.class.js");

module.exports = function(){
	const program = new WebGLProgram();
	program.insertInBlock(document.getElementById("display"));
	program.setUpdateOnResize(true);


	const cube = new Cube();
	cube.setSize(2);
	cube.setPosition(0, 0, 0);
	const rotate1 = new Rotate(360, [0,0,1], 1000, function(){
		rotate1.reset();
	})
	const rotate2 = new Rotate(360, [1,2,0], 1500, function(){
		rotate2.reset();
	})
	cube.addMovement("rotate1", rotate1);
	cube.addMovement("rotate2", rotate2);
	rotate1.start();
	rotate2.start();

	const scene = new Scene();
	scene.add3DObject("cube", cube);
	scene.setClearColor(0,0,0,1);
	program.setScene(scene);

	const camera = new Camera();
	camera.setType("perspective", {

	});
	camera.setPosition(0, 0, 9);
	scene.addCamera("main", camera);
	scene.setCamera("main");

	program.start();

	window.addEventListener('DOMContentLoaded', function(event){

		

	});

}