const glmatrix = require("../node_modules/gl-matrix/gl-matrix-min.js");
const utils = require('./utils.js');
const vShader = require('./shaders/vShader.js');
const fShader = require('./shaders/fShader.js');

function init(){

	const display = document.getElementById("display");
	display.width = 1920;
	display.height = 100;
	const ctx = display.getContext("webgl");
	const shaderProgram = utils.initShaders(ctx, vShader, fShader);

	const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: ctx.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: {
      projectionMatrix: ctx.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: ctx.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  const positionBuffer = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, positionBuffer);

  const positions = [
     1.0,  1.0,
    -1.0,  1.0,
     1.0, -1.0,
    -1.0, -1.0,
  ];

  ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(positions), ctx.STATIC_DRAW);

  drawScene(ctx, programInfo, positionBuffer);

}

window.addEventListener("DOMContentLoaded", (event) => {
	
	init();

});

function drawScene(gl, programInfo, buffers) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // effacement en noir, complètement opaque
  gl.clearDepth(1.0);                 // tout effacer
  gl.enable(gl.DEPTH_TEST);           // activer le test de profondeur
  gl.depthFunc(gl.LEQUAL);            // les choses proches cachent les choses lointaines

  // Effacer le canevas avant que nous ne commencions à dessiner dessus.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Créer une matrice de perspective, une matrice spéciale qui est utilisée pour
  // simuler la distorsion de la perspective dans une caméra.
  // Notre champ de vision est de 45 degrés, avec un rapport largeur/hauteur qui 
  // correspond à la taille d'affichage du canvas ;
  // et nous voulons seulement voir les objets situés entre 0,1 unité et 100 unités
  // à partir de la caméra.

  const fieldOfView = 45 * Math.PI / 180;   // en radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = glmatrix.mat4.create();

  // note: glmatrix.js a toujours comme premier argument la destination
  // où stocker le résultat.
  glmatrix.mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Définir la position de dessin comme étant le point "origine", qui est
  // le centre de la scène.
  const modelViewMatrix = glmatrix.mat4.create();

  // Commencer maintenant à déplacer la position de dessin un peu vers là où
  // nous voulons commencer à dessiner le carré.

  glmatrix.mat4.translate(modelViewMatrix,     // matrice de destination
                 modelViewMatrix,     // matrice de déplacement
                 [-0.0, 0.0, -6.0]);  // quantité de déplacement

  // Indiquer à WebGL comment extraire les positions à partir du tampon des
  // positions pour les mettre dans l'attribut vertexPosition.
  //{
    const numComponents = 2;  // extraire 2 valeurs par itération
    const type = gl.FLOAT;    // les données dans le tampon sont des flottants 32bit
    const normalize = false;  // ne pas normaliser
    const stride = 0;         // combien d'octets à extraire entre un jeu de valeurs et le suivant
                              // 0 = utiliser le type et numComponents ci-dessus
    const offset = 0;         // démarrer à partir de combien d'octets dans le tampon
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  //}

  // Indiquer à WebGL d'utiliser notre programme pour dessiner

  gl.useProgram(programInfo.program);

  // Définir les uniformes du shader

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
}