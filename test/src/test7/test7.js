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

	const scene = new Scene();

	//Cubes
	const cubes = [];
	const xSize = 6;
	const ySize = 6;
	const zSize = 6;
	for(let i = 0; i < xSize ; i++){
		for(let j = 0; j < xSize ; j++){
			for(let k = 0; k < xSize ; k++){
				const texture = program.createColorTexture(Math.random(), Math.random(), Math.random(), 1); 
				cubes[cubes.length] = new Cube(); 
				cubes[cubes.length - 1].setOpacity(1.);
				cubes[cubes.length - 1].setSize(0.5);
				cubes[cubes.length - 1].setPosition(i - (xSize / 2)+ 0.5, -(j - (ySize / 2))- 0.5, -(k - (zSize / 2))- 0.5); 
				cubes[cubes.length - 1].addTexture("color", texture);
				scene.add3DObject(cubes[cubes.length - 1]); 
			}
		}
	}

	const clickTexture = program.createEventTexture(scene);
	program.setPreFrameFunction(function(){
		clickTexture.update(program.canvas.width, program.canvas.height);
	});

	const camera = new Camera();
	camera.setType("perspective", {

	});
	camera.setPosition(0, 0, 10);
	scene.addCamera("main", camera);
	scene.setCamera("main");
	const rotate = new Rotate(360, [0.4, 1, 0], 8000);
	rotate.setRepeat(true);
	rotate.start();
	rotate.setPosition(0, 0, -10);
	camera.addMovement(rotate);

	//Light
	const ambient = new AmbientLight();
	ambient.setPower(1.);
	ambient.setRGB(1., 1., 1.);
	scene.addLight("ambient", ambient);


	program.setScene(scene);
	program.start();

	window.addEventListener('DOMContentLoaded', function(event){
		program.getCanvas().addEventListener("click", function(event){
			clickTexture.getClick(event.clientX, event.clientY, function(object){
				if(typeof object != "undefined"){
					document.getElementById("objectID").innerHTML = object.id;
					object.getTextures()["color"].setRGBA(1, 1, 1, 1);
				}else{
					document.getElementById("objectID").innerHTML = "-1";
				}
			});
		})
	});

}