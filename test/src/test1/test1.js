const WebGLProgram = require("../class/WebGLProgram.class.js");
const Camera = require("../class/Camera.class.js");
const Cube = require("../class/Objects3D/Cube.class.js");
const AmbientLight = require("../class/Lights/AmbientLight.class.js");
const DirectionalLight = require("../class/Lights/DirectionalLight.class.js");
const Scene = require("../class/Scene.class.js");
const Rotate = require("../class/Movements/Rotate.class.js");
const Object3DGroup = require("../class/Objects3D/Object3DGroup.class.js");

module.exports = function(){
	const program = new WebGLProgram();
	program.insertInBlock(document.getElementById("display"));
	program.setUpdateOnResize(true);
	program.setTextureRenderer(false);

	const scene = new Scene();
	scene.setClearColor(0,0,0,1);


	//Tête
	const tete = new Cube();
	tete.setSize(2);
	const textTete = program.createColorTexture(1, 0, 1, 1);
	tete.addTexture(textTete);
	tete.setPosition(0, 0, 0);

	//Yeux
	const oeil1 = new Cube();
	const textYeux = program.createColorTexture(0, 1, 1, 1);
	oeil1.setSize(0.5);
	oeil1.addTexture(textYeux);
	oeil1.setPosition(-0.6, 0.5, 0);
	const oeil2 = new Cube();
	oeil2.setSize(0.5);
	oeil2.addTexture(textYeux);
	oeil2.setPosition(0.6, 0.5, 0);

	const yeux = new Object3DGroup();
	yeux.add3DObject("oeil1", oeil1);
	yeux.add3DObject("oeil2", oeil2);
	yeux.setPosition(0, 0, 1);
	const moveOeil1 = new Rotate(360, [0, 0, 1], 200, function(){
		moveOeil1.reset();
	});
	oeil1.addMovement("move", moveOeil1);
	moveOeil1.start();
	const moveOeil2 = new Rotate(-360, [0, 0, 1], 200, function(){
		moveOeil2.reset();
	});
	oeil2.addMovement("move", moveOeil2);
	moveOeil2.start();

	//Bouche
	const textDents = program.createColorTexture(1, 1, 1, 1);
	const dent1 = new Cube();
	dent1.setSize(0.1);
	dent1.addTexture(textDents);
	dent1.setPosition(-0.25, 0, 0);
	const dent2 = new Cube();
	dent2.setSize(0.1);
	dent2.addTexture(textDents);
	dent2.setPosition(0, 0, 0);
	const dent3 = new Cube();
	dent3.setSize(0.1);
	dent3.addTexture(textDents);
	dent3.setPosition(0.25, 0, 0);

	const dents = new Object3DGroup();
	dents.add3DObject("dent1", dent1);
	dents.add3DObject("dent2", dent2);
	dents.add3DObject("dent3", dent3);
	dents.setPosition(0, -0.5, 1);
	const moveDents = new Rotate(360, [0, 0, 1], 120, function(){
		moveDents.reset();
	});
	dents.addMovement("move", moveDents);
	moveDents.start();

	const group = new Object3DGroup();
	group.add3DObject("tete", tete);
	group.add3DObject("yeux", yeux);
	group.add3DObject("dents", dents);

	scene.add3DObject("group", group);

	const camera = new Camera();
	camera.setType("orthogonal", {

	});
	camera.setPosition(0, 0, 9);
	scene.addCamera("main", camera);
	scene.setCamera("main");

	const light = new DirectionalLight();
	light.setRGB(1, 1, 1);
	light.setPower([0.1, 1, 1]);
	light.setDirection(-0.3, 0, -1);
	scene.addLight("ambient", light);

	program.setScene(scene);

	program.start();

	window.addEventListener('DOMContentLoaded', function(event){

		document.getElementById("reset").addEventListener("click", function(){
			const movements = group.getMovements();
			for(let move in movements){
				group.removeMovement(move);
			}
		});

		document.getElementById("projection").addEventListener("click", function(event){
			if(event.target.textContent == "PERSPECTIVE"){
				console.log(camera);
				event.target.textContent = "ORTHOGONAL";
				camera.setType("perspective", {

				});
			}else{
				event.target.textContent = "PERSPECTIVE";
				camera.setType("orthogonal", {

				});
			}
		});

		document.getElementById("left").addEventListener("click", function(){
			const rotate = new Rotate(-45, [0, 1, 0], 30, function(){
				console.log("Movement left done !");
			});
			group.addMovement("rotate" + group.getNbMovements(), rotate);
			rotate.start();
		});
		document.getElementById("right").addEventListener("click", function(){
			const rotate = new Rotate(45, [0, 1, 0], 30, function(){
				console.log("Movement right done !");
			});
			group.addMovement("rotate" + group.getNbMovements(), rotate);
			rotate.start();
		});
		document.getElementById("up").addEventListener("click", function(){
			const rotate = new Rotate(-45, [1, 0, 0], 30, function(){
				console.log("Movement up done !");
			});
			group.addMovement("rotate" + group.getNbMovements(), rotate);
			rotate.start();
		});
		document.getElementById("down").addEventListener("click", function(){
			const rotate = new Rotate(45, [1, 0, 0], 30, function(){
				console.log("Movement down done !");
			});
			group.addMovement("rotate" + group.getNbMovements(), rotate);
			rotate.start();
		});

	});

}