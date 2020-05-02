const WebGLProgram = require("../class/WebGLProgram.class.js");
const Camera = require("../class/Camera.class.js");
const Cube = require("../class/Objects3D/Cube.class.js");
const AmbientLight = require("../class/Lights/AmbientLight.class.js");
const DirectionalLight = require("../class/Lights/DirectionalLight.class.js");
const PointLight = require("../class/Lights/PointLight.class.js");
const SpotLight = require("../class/Lights/SpotLight.class.js");
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
	const cube1 = new Cube(); cube1.setPosition(-2.3, 0, 0); cube1.setSize(2.);scene.add3DObject("cube1", cube1); const texture1 = program.createColorTexture(1, 0.2, 0.3, 1); cube1.addTexture("color", texture1);
	const cube2 = new Cube();	cube2.setPosition(0, 0, -3.3); cube2.setSize(3);scene.add3DObject("cube2", cube2); const texture2 = program.createColorTexture(1, 1, 1, 1); cube2.addTexture("color", texture2);
	const cube3 = new Cube();	cube3.setPosition(2.3, 0, 0); cube3.setSize(1.5);scene.add3DObject("cube3", cube3); const texture3 = program.createColorTexture(0.5, 1, 0.2, 1); cube3.addTexture("color", texture3);

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
	ambient.setPower(1);
	ambient.setRGB(1, 1, 1);

	const point = new PointLight();
	point.setPower(1);
	point.setRGB(1, 1, 1);
	point.setPosition(0,0,1);

	const spot = new SpotLight();
	spot.setPower(1);
	spot.setRGB(1, 0, 0);
	spot.setPosition(7, 0, 2);
	spot.setDirection(-1, 0, -1);

	scene.addLight("ambient", ambient);
	//scene.addLight("point", point);
	scene.addLight("spot", spot);

	const rotateP = new Rotate(360, [1, 0, 0], 1200, function(){
		rotateP.reset();
	});
	rotateP.setPosition(0, 0, -10);
	//point.addMovement(rotateP);
	rotateP.start();

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