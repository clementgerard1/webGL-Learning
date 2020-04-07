const glmatrix = require("../node_modules/gl-matrix/gl-matrix-min.js");
const utils = require('./utils.js');
const vShader = require('./shaders/vShader.js');
const fShader = require('./shaders/fShader.js');

var cubeRotation = 0.0;

function init(){

	const display = document.getElementById("display");
	display.width = 1920;
	display.height = 1080;
	const ctx = display.getContext("webgl");
	const shaderProgram = utils.initShaders(ctx, vShader, fShader);

	const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: ctx.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: ctx.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: ctx.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: ctx.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };

  const positionBuffer = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, positionBuffer);

  const positions = [
    // Face avant
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,
    
    // Face arrière
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,
    
    // Face supérieure
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,
    
    // Face inférieure
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,
    
    // Face droite
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,
    
    // Face gauche
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0
  ];

  ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(positions), ctx.STATIC_DRAW);

  const faceColors = [
    [1.0,  1.0,  1.0,  1.0],    // Face avant : blanc
    [1.0,  0.0,  0.0,  1.0],    // Face arrière : rouge
    [0.0,  1.0,  0.0,  1.0],    // Face supérieure : vert
    [0.0,  0.0,  1.0,  1.0],    // Face infiérieure : bleu
    [1.0,  1.0,  0.0,  1.0],    // Face droite : jaune
    [1.0,  0.0,  1.0,  1.0]     // Face gauche : violet
  ];

  const indexBuffer = ctx.createBuffer();
  ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // Ce tableau définit chaque face comme deux triangles, en utilisant les
  // indices dans le tableau des sommets pour spécifier la position de chaque 
  // triangle.

  const indices = [
    0,  1,  2,      0,  2,  3,    // avant
    4,  5,  6,      4,  6,  7,    // arrière
    8,  9,  10,     8,  10, 11,   // haut
    12, 13, 14,     12, 14, 15,   // bas
    16, 17, 18,     16, 18, 19,   // droite
    20, 21, 22,     20, 22, 23,   // gauche
  ];

  // Envoyer maintenant le tableau des éléments à GL

  ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), ctx.STATIC_DRAW);

  
  // Conversion du tableau des couleurs en une table pour tous les sommets

  var colors = [];
  
  for (let j = 0 ; j < faceColors.length ; j++){
    const c = faceColors[j];
    
    // Répéter chaque couleur quatre fois pour les quatre sommets d'une face
    colors = colors.concat(c, c, c, c);
  }
  
  const colorBuffer = ctx.createBuffer();
  ctx.bindBuffer(ctx.ARRAY_BUFFER, colorBuffer);
  ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(colors), ctx.STATIC_DRAW);

  var then = 0;

  // Dessiner la scène répétitivement
  function render(now) {
    now *= 0.001;  // conversion en secondes
    const deltaTime = now - then;
    then = now;

    drawScene(ctx, programInfo, { position : positionBuffer, color : colorBuffer, index : indexBuffer}, deltaTime);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

}

window.addEventListener("DOMContentLoaded", (event) => {
	
	init();

});

function drawScene(gl, programInfo, buffers, deltaTime) {
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

  glmatrix.mat4.rotate(modelViewMatrix,  // matrice de destination
            modelViewMatrix,  // matrice de rotation
            cubeRotation,   // rotation en radians
            [0, 0, 1]);       // axe autour duquel tourner
  glmatrix.mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation * .7, [0, 1, 0]);

  // Indiquer à WebGL comment extraire les positions à partir du tampon des
  // positions pour les mettre dans l'attribut vertexPosition.
  {
    const numComponents = 3;  // extraire 2 valeurs par itération
    const type = gl.FLOAT;    // les données dans le tampon sont des flottants 32bit
    const normalize = false;  // ne pas normaliser
    const stride = 0;         // combien d'octets à extraire entre un jeu de valeurs et le suivant
                              // 0 = utiliser le type et numComponents ci-dessus
    const offset = 0;         // démarrer à partir de combien d'octets dans le tampon
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  {
    const numComponents = 4;  // extraire 2 valeurs par itération
    const type = gl.FLOAT;    // les données dans le tampon sont des flottants 32bit
    const normalize = false;  // ne pas normaliser
    const stride = 0;         // combien d'octets à extraire entre un jeu de valeurs et le suivant
                              // 0 = utiliser le type et numComponents ci-dessus
    const offset = 0;         // démarrer à partir de combien d'octets dans le tampon
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }

  {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);
  }

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

    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  cubeRotation += deltaTime;

}