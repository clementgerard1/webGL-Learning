const utils = require('./utils.js');
const vShader = require('./shaders/vShader.js');
const fShader = require('./shaders/fShader.js');

function init(){

	const display = document.getElementById("display");
	display.width = 300;
	display.height = 100;
	const ctx = display.getContext("webgl");
	utils.initShaders(ctx, vShader, fShader);
	
}

window.addEventListener("DOMContentLoaded", (event) => {
	
	init();

});