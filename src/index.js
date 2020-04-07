const glmatrix = require("../node_modules/gl-matrix/gl-matrix-min.js");
const WebGLProgram = require("./class/WebGLProgram.class.js");
const Camera = require("./class/Camera.class.js");
const Cube = require("./class/3DObjects/Cube.class.js");

window.addEventListener("DOMContentLoaded", (event) => {
	init();
});

function init(){

	const webGLProgram = new WebGLProgram();
	webGLProgram.insertInBlock(
		document.getElementById("display")
	);

	const camera = new Camera();
	webGLProgram.addCamera("main", camera);
	webGLProgram.setActiveCamera("main");

	const cube = new Cube();
	webGLProgram.add3DObject("Kitchen", cube);

	//const ambiant = new AmbiantLight();
	//webGLProgram.addLight("ambiant", ambiant);

	webGLProgram.start();

}
