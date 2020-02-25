(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const utils = require('./utils.js');

const vShader = require('./shaders/vShader.js');

const fShader = require('./shaders/fShader.js');

function init() {
  const display = document.getElementById("display");
  display.width = 300;
  display.height = 100;
  const ctx = display.getContext("webgl");
  utils.initShaders(ctx, vShader, fShader);
}

window.addEventListener("DOMContentLoaded", event => {
  init();
});
},{"./shaders/fShader.js":2,"./shaders/vShader.js":3,"./utils.js":4}],2:[function(require,module,exports){
module.exports = `

  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
  
`;
},{}],3:[function(require,module,exports){
module.exports = `

  attribute vec4 aVertexPosition;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  }
  
`;
},{}],4:[function(require,module,exports){
module.exports = {
  initShaders: function (glContext, vertexSrc, fragmentSrc) {
    const vShader = createShader(glContext, glContext.VERTEX_SHADER, vertexSrc);
    const fShader = createShader(glContext, glContext.FRAGMENT_SHADER, fragmentSrc);
    const shaderProgram = glContext.createProgram();
    glContext.attachShader(shaderProgram, vShader);
    glContext.attachShader(shaderProgram, fShader);
    glContext.linkProgram(shaderProgram);

    if (!glContext.getProgramParameter(shaderProgram, glContext.LINK_STATUS)) {
      console.log('Error lors de la liaison des shaders');
      return null;
    }
  }
};

function createShader(glContext, type, src) {
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
},{}]},{},[1]);
