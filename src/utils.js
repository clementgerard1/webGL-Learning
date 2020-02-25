module.exports={
	
	initShaders : function(glContext, vertexSrc, fragmentSrc){
		const vShader = createShader(glContext, glContext.VERTEX_SHADER, vertexSrc);
		const fShader = createShader(glContext, glContext.FRAGMENT_SHADER, fragmentSrc);

		const shaderProgram = glContext.createProgram();
 	 	glContext.attachShader(shaderProgram, vShader);
  	glContext.attachShader(shaderProgram, fShader);
  	glContext.linkProgram(shaderProgram);

	  if (!glContext.getProgramParameter(shaderProgram, glContext.LINK_STATUS)) {
	    console.log('Error lors de la liaison des shaders')
	    return null;
	  }

	  return shaderProgram;

	}

}

function createShader(glContext, type, src){

	const shader = glContext.createShader(type);
	glContext.shaderSource(shader, src);
	glContext.compileShader(shader);

	if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
    console.log('Erreur lors de la compilation du shader ' + src + "\n" + glContext.getShaderInfoLog(shader));
    glContext.deleteShader(shader);
    return null;
  }

  return shader;

}