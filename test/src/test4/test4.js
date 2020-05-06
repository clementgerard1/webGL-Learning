const WebGLProgram = require("../class/WebGLProgram.class.js");
const Camera = require("../class/Camera.class.js");
const Cube = require("../class/Objects3D/Cube.class.js");
const AmbientLight = require("../class/Lights/AmbientLight.class.js");
const DirectionalLight = require("../class/Lights/DirectionalLight.class.js");
const Scene = require("../class/Scene.class.js");
const Rotate = require("../class/Movements/Rotate.class.js");
const LookAt = require("../class/Movements/LookAt.class.js");
const Object3DGroup = require("../class/Objects3D/Object3DGroup.class.js");
const Renderer = require("../class/Renderer.class.js");

module.exports = function(){
	const program = new WebGLProgram();
	program.insertInBlock(document.getElementById("display"));
	program.setUpdateOnResize(true);

	const scene = new Scene();

	//Cubes
	const cube1 = new Cube(); cube1.setPosition(-2, 0, 0); cube1.setSize(1.);scene.add3DObject("cube1", cube1); const texture1 = program.createColorTexture(1, 0.2, 0.3, 1); cube1.addTexture("color", texture1);
	const cube2 = new Cube();	cube2.setPosition(0, 0, 0); cube2.setSize(0.7);scene.add3DObject("cube2", cube2); const texture2 = program.createColorTexture(0.2, 0.1, 1, 1); cube2.addTexture("color", texture2);
	const cube3 = new Cube();	cube3.setPosition(2, 0, 0); cube3.setSize(0.4);scene.add3DObject("cube3", cube3); const texture3 = program.createColorTexture(0.5, 1, 0.2, 1); cube3.addTexture("color", texture3);

	const rotate1 = new Rotate(360, [0,1,0], 1100, function(){
		rotate1.reset();
	});
	const rotate2 = new Rotate(360, [1,1,0], 1700, function(){
		rotate2.reset();
	});
	const rotate3 = new Rotate(360, [0,1,1], 700, function(){
		rotate3.reset();
	});
	const rotate11 = new Rotate(360, [1,0,1], 1500, function(){
		rotate11.reset();
	});
	const rotate22 = new Rotate(360, [3,1,0], 1300, function(){
		rotate22.reset();
	});
	const rotate33 = new Rotate(360, [1,2,1], 1200, function(){
		rotate33.reset();
	});
	rotate1.start();
	rotate2.start();
	rotate3.start();
	rotate11.start();
	rotate22.start();
	rotate33.start();
	cube1.addMovement("rotate", rotate1);
	cube2.addMovement("rotate", rotate2);
	cube3.addMovement("rotate", rotate3);
	cube1.addMovement("rotate", rotate11);
	cube2.addMovement("rotate", rotate22);
	cube3.addMovement("rotate", rotate33);

	//Lumières
	const ambient = new AmbientLight();
	ambient.setPower([0.1, 0, 0]);
	ambient.setRGB(0.3, 0.6, 0.2);

	const directional = new DirectionalLight();
	directional.setPower([0, 1, 1]);
	directional.setRGB(1, 1, 1);
	directional.setDirection(-1, 0, -1);

	scene.addLight("ambiant", ambient);
	scene.addLight("directional", directional);

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