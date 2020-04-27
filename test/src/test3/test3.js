const WebGLProgram = require("../class/WebGLProgram.class.js");
const Camera = require("../class/Camera.class.js");
const Cube = require("../class/Objects3D/Cube.class.js");
const AmbientLight = require("../class/Lights/AmbientLight.class.js");
const Scene = require("../class/Scene.class.js");
const Rotate = require("../class/Movements/Rotate.class.js");
const LookAt = require("../class/Movements/LookAt.class.js");
const Object3DGroup = require("../class/Objects3D/Object3DGroup.class.js");

module.exports = function(){
	const program = new WebGLProgram();
	program.insertInBlock(document.getElementById("display"));
	program.setUpdateOnResize(true);

	const cube = new Cube();
	cube.setSize(3);
	cube.setPosition(6, 2, 0);
	const texture = program.createImageTexture("/test3/text2.png");
	cube.addTexture("color", texture);
	cube.setOpacity(0.7);

	const cube2 = new Cube();
	cube2.setSize(2);
	cube2.setPosition(4, 1, -5);
	const texture2 = program.createImageTexture("/test3/text.jpg");
	cube2.addTexture("color", texture2);
	cube2.setOpacity(0.7);

	const cube3 = new Cube();
	cube3.setSize(5);
	cube3.setPosition(1, 1, -10);
	const texture3 = program.createColorTexture(0, 0, 1, 0.2);
	cube3.addTexture("color", texture3);

	const cube4 = new Cube();
	cube4.setSize(2);
	cube4.setPosition(3, 4, 1);
	const texture4 = program.createColorTexture(0.7, 0.3, 1, 0.6);
	cube4.addTexture("color", texture4);

	const cube5 = new Cube();
	cube5.setSize(3);
	cube5.setPosition(2, -4, -2);
	const texture5 = program.createColorTexture(0.2, 0.7, 1, 0.7);
	cube5.addTexture("color", texture5);

	const test = new Rotate(-20, [0,1,1], 1, function(){});

	const rotate1 = new Rotate(360, [0,1,0], 1000, function(){
		rotate1.reset();
	});
	const rotate2 = new Rotate(360, [1,2,0], 1500, function(){
		rotate2.reset();
	});
		const rotate3 = new Rotate(360, [0,0,1], 1000, function(){
		rotate3.reset();
	});
	test.setPosition(0, 0, 0);
	rotate1.setPosition(0, 0, 0);
	rotate2.setPosition(0, 0, 0);
	rotate3.setPosition(0, 0, 0);
	cube.addMovement("rotate1", rotate1);
	cube2.addMovement("rotate2", rotate2);
	cube3.addMovement("rotate3", rotate3);

	test.start();
	cube.addMovement("test", test);
	rotate1.start();
	rotate2.start();
	rotate3.start();

	const rotate4 = new Rotate(360, [1,0,1], 2000, function(){
		rotate4.reset();
	});
	const rotate5 = new Rotate(360, [3,0,1], 2500, function(){
		rotate5.reset();
	});
	const rotate6 = new Rotate(360, [2,0,0], 1200, function(){
		rotate6.reset();
	});
	rotate4.setPosition(0, 0, 0);
	rotate5.setPosition(0, 0, 0);
	rotate6.setPosition(0, 0, 0);
	cube.addMovement("rotate4", rotate4);
	cube2.addMovement("rotate5", rotate5);
	cube3.addMovement("rotate6", rotate6);
	rotate4.start();
	rotate5.start();
	rotate6.start();


	const scene = new Scene();
	scene.add3DObject("cube", cube);
	scene.add3DObject("cube2", cube2);
	scene.add3DObject("cube3", cube3);
	scene.add3DObject("cube4", cube4);
	scene.add3DObject("cube5", cube5);

	scene.setClearColor(0,0,0,1);
	program.setScene(scene);

	const camera = new Camera();
	camera.setType("perspective", {

	});
	const rotateCam = new Rotate(360, [0,1,0], 10000, function(){
		rotateCam.reset();
	});
	rotateCam.start();
	rotateCam.setPosition(0, 0, -15.5);
	const rotateCam2 = new Rotate(360, [1,0,0], 5000, function(){
		rotateCam2.reset();
	});

	const lookAt1 = new LookAt(camera, [0, 1, 0]);	
	const lookAt2 = new LookAt(camera, [0, 1, 0]);	
	cube4.addMovement("lookat", lookAt1);
	//cube5.addMovement("lookat", lookAt2);

	const lookAt = new LookAt(cube2, [0, 1, 0]);
	rotateCam2.start();
	rotateCam2.setPosition(0, 0, -15.5);
	camera.setPosition(0, 0, 10);
	camera.addMovement("rotate", rotateCam);
	camera.addMovement("rotate2", rotateCam2);
	camera.addMovement("lookAt", lookAt);
	scene.addCamera("main", camera);
	scene.setCamera("main");


	program.start();

	window.addEventListener('DOMContentLoaded', function(event){

		

	});

}