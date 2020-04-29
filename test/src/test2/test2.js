const WebGLProgram = require("../class/WebGLProgram.class.js");
const Camera = require("../class/Camera.class.js");
const Cube = require("../class/Objects3D/Cube.class.js");
const Plan = require("../class/Objects3D/Plan.class.js");
const AmbientLight = require("../class/Lights/AmbientLight.class.js");
const Scene = require("../class/Scene.class.js");
const Rotate = require("../class/Movements/Rotate.class.js");
const Object3DGroup = require("../class/Objects3D/Object3DGroup.class.js");

module.exports = function(){
	const program = new WebGLProgram();
	program.insertInBlock(document.getElementById("display"));
	program.setUpdateOnResize(true);

	const scene = new Scene();

	const cube = new Cube();
	cube.setSize(2);
	cube.setPosition(0, 5, 0);
	const rotate1 = new Rotate(360, [0,3,1], 1200, function(){
		rotate1.reset();
	})
	const rotate2 = new Rotate(360, [1,2,0], 700, function(){
		rotate2.reset();
	})

	rotate1.setPosition(-3, 3, 0);
	rotate2.setPosition(-4, -1, 0);
	cube.addMovement("rotate1", rotate1);
	cube.addMovement("rotate2", rotate2);

	const texture = program.createImageTexture("/test2/text.png");
	cube.addTexture("text", texture);

	const plan = new Plan();
	plan.setPosition(0, 0, 0);
	const texture2 = program.createColorTexture(0.0, 0.0, 0.8, 0.4);
	const texture3 = program.createMirrorTexture();
	plan.addTexture("color", texture2);
	plan.addTexture("mirror", texture3);
	const rotate =  new Rotate(45, [0, 1, 0], 1, function(){

	});
	const rotatee =  new Rotate(-65, [1, 0, 0], 1, function(){

	});
	rotate.setPosition(0, 0, 0);
	plan.addMovement("rotate", rotate);
	plan.addMovement("rotate2", rotatee);
	plan.setSize(12, 12);


	rotate1.start();
	rotate2.start();
	rotate.start();
	rotatee.start();

	scene.add3DObject("cube", cube);
	scene.add3DObject("mirror", plan);
	scene.setClearColor(0,0,0,1);
	program.setScene(scene);

	const camera = new Camera();
	camera.setType("perspective", {
		"size" : 30
	});
	camera.setPosition(0, 0, 20);
	scene.addCamera("main", camera);
	scene.setCamera("main");

	const light = new AmbientLight();
	light.setPower(0.8);
	light.setRGB(1, 1, 1);
	scene.addLight("ambient", light);

	program.start();

	//scene.getRenderer().setScissor([0, 0, 400, 600]);

	window.addEventListener('DOMContentLoaded', function(event){


		

	});

}