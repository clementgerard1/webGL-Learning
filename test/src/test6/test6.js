const WebGLProgram = require("../class/WebGLProgram.class.js");
const Camera = require("../class/Camera.class.js");
const Cube = require("../class/Objects3D/Cube.class.js");
const AmbientLight = require("../class/Lights/AmbientLight.class.js");
const PointLight = require("../class/Lights/PointLight.class.js");
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
	const cube1 = new Cube(); cube1.setPosition(-1, 0, -1); scene.add3DObject("cube1", cube1); const texture1 = program.createColorTexture(0, 0, 1, 1); cube1.addTexture("color", texture1);
	const cube2 = new Cube();	cube2.setPosition(0, 0, -0); scene.add3DObject("cube2", cube2); const texture2 = program.createColorTexture(0, 1, 0, 1); cube2.addTexture("color", texture2);
	const cube3 = new Cube();	cube3.setPosition(1, 0, -1); scene.add3DObject("cube3", cube3); const texture3 = program.createColorTexture(1, 0, 0, 1); cube3.addTexture("color", texture3);

	const rotate1 = new Rotate(360, [0,1,0], 1000, function(){
		rotate1.reset();
	});
	const rotate11 = new Rotate(360, [1,0,1], 1300, function(){
		rotate11.reset();
	});
	const rotate111 = new Rotate(360, [1,1,1], 1300, function(){
		rotate111.reset();
	});
	rotate111.setPosition(1, 0, 1);

	const rotate2 = new Rotate(360, [0,1,0], 700, function(){
		rotate2.reset();
	});
	const rotate22 = new Rotate(360, [0,1,1], 1000, function(){
		rotate22.reset();
	});

	const rotate3 = new Rotate(360, [0,1,0], 800, function(){
		rotate3.reset();
	});
	const rotate33 = new Rotate(360, [1,1,0], 1000, function(){
		rotate33.reset();
	});
	const rotate333 = new Rotate(360, [1,1,-1], 1000, function(){
		rotate333.reset();
	});
	rotate333.setPosition(-1, 0, 1);

	rotate1.start();
	rotate11.start();
	rotate111.start();
	rotate2.start();
	rotate22.start();
	rotate3.start();
	rotate33.start();
	rotate333.start();

	cube1.addMovement(rotate1);
	cube1.addMovement(rotate11);
	cube1.addMovement(rotate111);
	cube2.addMovement(rotate2);
	cube2.addMovement(rotate22);
	cube3.addMovement(rotate3);
	cube3.addMovement(rotate33);
	cube3.addMovement(rotate333);

	scene.setClearColor(0,0,0,1);
	program.setScene(scene);

	//Carré invisible en haut à droite
	let isClicked = false;
	let clickX = null;
	let clickY = null;

	const cameraTL = new Camera();
	cameraTL.setType("perspective", {

	});
	cameraTL.setPosition(0, 0, 5);
	scene.addCamera("tl", cameraTL);
	scene.setCamera("tl");

	const cameraTR = new Camera();
	cameraTR.setType("perspective", {

	});
	cameraTR.setPosition(5, 0, 0);
	const lookAtTR = new LookAt(cube2, [0, 1, 0]);
	cameraTR.addMovement("lookat", lookAtTR);
	scene.addCamera("tr", cameraTR);

	const cameraBL = new Camera();
	cameraBL.setType("perspective", {

	});
	cameraBL.setPosition(0, 5, 0);
	const lookAtBL = new LookAt(cube2, [1, 0, 0]);
	cameraBL.addMovement("lookat", lookAtBL);
	scene.addCamera("bl", cameraBL);

	const cameraBR = new Camera();
	cameraBR.setType("orthogonal", {

	});
	cameraBR.setPosition(0, 0, -5);
	const lookAtBR = new LookAt(cube2, [1, 0, 0]);
	cameraBR.addMovement("lookat", lookAtBR);
	scene.addCamera("br", cameraBR);	


	//Light
	const ambient = new AmbientLight();
	ambient.setPower(1.);
	ambient.setRGB(1., 1., 1.);
	scene.addLight("ambient", ambient);

	const point = new PointLight();
	point.setPower(1.);
	point.setPosition(0,0,3)
	point.setRGB(1., 0.8, 0.8);
	//scene.addLight("point", point);



	//TOP LEFT
	const renderTL = scene.getRenderer(0);
	renderTL.setViewPort(0, 0.5, 0.5, 0.5);

	//affichage des normals
	const renderTLNormals = renderTL.clone();
	renderTLNormals.setInitialisation(false);

	const shader = scene.getShaderBuilder();
	const nShader = shader.clone(); // Normal Shader
	nShader.setMode("normal");
	renderTLNormals.setInitUserFunction(function(program){
		scene.setShaderBuilder(nShader);
	});
	renderTLNormals.setEndUserFunction(function(program){
		scene.setShaderBuilder(shader);
	});
	scene.addRenderer(renderTLNormals);

	//TOP RIGHT
	const renderTR = new Renderer(scene , function(program){
		//BEFORE
		scene.setCamera("tr");
	}, function(program){
		//AFTER
	});
	renderTR.setViewPort(0.5, 0.5, 0.5, 0.5);
	renderTR.setInitialisation(false);
	scene.addRenderer(renderTR);

	//Bottom left
	const renderBL = new Renderer(scene , function(program){
		//BEFORE
		scene.setCamera("bl");
	}, function(program){
		//AFTER
	});
	renderBL.setViewPort(0., 0., 0.5, 0.5);
	renderBL.setInitialisation(false);
	scene.addRenderer(renderBL);

	//bottom right
	const renderBR = new Renderer(scene , function(program){
		//BEFORE
		scene.setCamera("br");
	}, function(program){
		//AFTER
		scene.setCamera("tl");
	});
	renderBR.setViewPort(0.5, 0., 0.5, 0.5);
	renderBR.setInitialisation(false);
	scene.addRenderer(renderBR);


	//ENCADRE A DROITE
	const renderer = new Renderer(scene , function(program){
		//BEFORE
		scene.setClearColor(0, 0, 0, 0);
	}, function(program){
		//AFTER
		scene.setClearColor(0, 0, 0, 1);
	});
	renderer.setScissor(0.8, 0, 0.2, 0.2);
	scene.addRenderer(renderer);

	program.start();

	window.addEventListener('DOMContentLoaded', function(event){

		document.getElementById("switch").addEventListener("click", function(event){
			if(scene.getShaderBuilder().getMode() == "triangle"){
				scene.getShaderBuilder().setMode("line")
			}else{
				scene.getShaderBuilder().setMode("triangle")
			}
		});

	});

}