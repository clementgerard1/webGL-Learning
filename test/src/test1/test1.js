const WebGLProgram = require("../class/WebGLProgram.class.js");
const Camera = require("../class/Camera.class.js");
const Cube = require("../class/3DObjects/Cube.class.js");
const AmbientLight = require("../class/Lights/AmbientLight.class.js");
const Scene = require("../class/Scene.class.js");

module.exports = function(){
	const program = new WebGLProgram();
	program.insertInBlock(document.getElementById("display"));
	program.setUpdateOnResize(true);

	const scene = new Scene();
	scene.setClearColor(0,0,0,1);

	const cube = new Cube();
	cube.setSize(2);
	cube.setColors({
		1:[0,0,0,1], //Devant
		2:[1,0,0,1], //Gauche
		3:[0,1,0,1], //Haut
		4:[0,0,1,1], //Droite
		5:[1,1,0,1], //Bas
		6:[0,1,1,1], //Derriere
	});
	cube.setPosition(0, 0, 0);
	scene.add3DObject("cube", cube);

	const camera = new Camera();
	camera.setType("perspective", {

	});
	camera.setPosition(0, 0, -9);
	scene.addCamera("main", camera);
	scene.setCamera("main");
	camera.setFixation(cube);

	const light = new AmbientLight();
	light.setPower(0.8);
	scene.addLight("ambient", light);

	program.setScene(scene);

	program.start();

}