(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Object3D = require("../Interfaces/Object3D.class.js");

var Cube =
/*#__PURE__*/
function (_Object3D) {
  _inherits(Cube, _Object3D);

  function Cube() {
    _classCallCheck(this, Cube);

    return _possibleConstructorReturn(this, _getPrototypeOf(Cube).apply(this, arguments));
  }

  return Cube;
}(Object3D);

module.exports = Cube;
},{"../Interfaces/Object3D.class.js":4}],2:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Movable = require("./Interfaces/Movable.class.js");

var Camera =
/*#__PURE__*/
function (_Movable) {
  _inherits(Camera, _Movable);

  function Camera() {
    var _this;

    _classCallCheck(this, Camera);

    return _possibleConstructorReturn(_this);
  }

  _createClass(Camera, [{
    key: "instantMovement",
    value: function instantMovement(x, y, z) {}
  }, {
    key: "oneMovement",
    value: function oneMovement(path) {}
  }, {
    key: "perpetualMovement",
    value: function perpetualMovement(path) {}
  }]);

  return Camera;
}(Movable);
},{"./Interfaces/Movable.class.js":3}],3:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Movable =
/*#__PURE__*/
function () {
  function Movable() {
    _classCallCheck(this, Movable);
  }

  _createClass(Movable, [{
    key: "addPerpetualMovement",
    value: function addPerpetualMovement() {}
  }, {
    key: "addOneMovement",
    value: function addOneMovement() {}
  }]);

  return Movable;
}();

module.exports = Movable;
},{}],4:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Object3D =
/*#__PURE__*/
function () {
  function Object3D() {
    _classCallCheck(this, Object3D);
  }

  _createClass(Object3D, [{
    key: "setPositions",
    value: function setPositions() {}
  }, {
    key: "setColors",
    value: function setColors() {}
  }, {
    key: "setIndexes",
    value: function setIndexes() {}
  }, {
    key: "setTexture",
    value: function setTexture() {}
  }]);

  return Object3D;
}();

module.exports = Object3D;
},{}],5:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ShaderBuilder =
/*#__PURE__*/
function () {
  function ShaderBuilder(gl) {
    _classCallCheck(this, ShaderBuilder);

    this.gl = gl;
    this.vertexSrc = '';
    this.fragmentSrc = ''; //Shader Variable 

    this.position = true; //Shader uniform
  }

  _createClass(ShaderBuilder, [{
    key: "getShaderProgram",
    value: function getShaderProgram() {
      this._buildShaders();

      var vShader = this._createShader(this.gl.VERTEX_SHADER, this.vertexSrc);

      var fShader = this._createShader(this.gl.FRAGMENT_SHADER, this.fragmentSrc);

      var shaderProgram = this.gl.createProgram();
      this.gl.attachShader(shaderProgram, vShader);
      this.gl.attachShader(shaderProgram, fShader);
      this.gl.linkProgram(shaderProgram);

      if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
        console.log('Error lors de la liaison des shaders');
        return null;
      }

      return shaderProgram;
    }
  }, {
    key: "_createShader",
    value: function _createShader(type, src) {
      var shader = this.gl.createShader(type);
      this.gl.shaderSource(shader, src);
      this.gl.compileShader(shader, src);

      if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
        console.log('Erreur lors de la compilation du shader ' + src + "\n" + this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
        return null;
      }

      return shader;
    }
  }, {
    key: "_buildShaders",
    value: function _buildShaders() {
      this._buildVertexShader();

      this._buildFragmentShader();
    }
  }, {
    key: "_buildVertexShader",
    value: function _buildVertexShader() {
      this.vertexSrc = "\n\t\t  attribute vec4 aVertexPosition;\n\t\t  attribute vec4 aVertexColor;\n\n\t\t  uniform mat4 uModelViewMatrix;\n\t\t  uniform mat4 uProjectionMatrix;\n\n\t\t  varying lowp vec4 vColor;\n\n\t\t  void main() {\n\t\t    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;\n\t\t    vColor = aVertexColor;\n\t\t  }\n\t\t";
    }
  }, {
    key: "_buildFragmentShader",
    value: function _buildFragmentShader() {
      this.fragmentSrc = "\n\t\t\t\tvarying lowp vec4 vColor;\n\n\t\t\t  void main() {\n\t\t\t    gl_FragColor = vColor;\n\t\t\t  }\n\t\t";
    }
  }]);

  return ShaderBuilder;
}();

module.exports = ShaderBuilder;
},{}],6:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ShaderBuilder = require("./ShaderBuilder.class.js");

var WebGLProgram =
/*#__PURE__*/
function () {
  function WebGLProgram() {
    _classCallCheck(this, WebGLProgram);

    this.container = null;
    this.parentBlock = null;
    this.refreshId = null;
    this.updateOnResize = true;
    this.cameras = [];
    this.objects = [];
    this._handleResize = this._handleResize.bind(this);
    this.updateFrame = this.updateFrame.bind(this); //Initialisation de la classe

    this.canvas = document.createElement('canvas');
    this.gl = this.canvas.getContext("webgl");
    this.shaderBuilder = new ShaderBuilder(this.gl);
  }

  _createClass(WebGLProgram, [{
    key: "setUpdateOnResize",
    value: function setUpdateOnResize(bool) {
      this.updateOnResize = bool;

      if (bool) {
        window.addEventListener("resize", this._handleResize);
      } else {
        window.removeEventListener("resize", this._handleResize);
      }
    }
  }, {
    key: "getContext",
    value: function getContext() {
      return this.gl;
    }
  }, {
    key: "insertInBlock",
    value: function insertInBlock(block) {
      this.parentBlock = block;
      this.canvas.width = this.parentBlock.clientWidth;
      this.canvas.height = this.parentBlock.clientHeight;
      this.parentBlock.appendChild(this.canvas);

      if (this._updateOnResize) {
        window.addEventListener("resize", this._handleResize);
      }
    }
  }, {
    key: "updateProgram",
    value: function updateProgram() {
      //Création du programme
      this.shaderProgram = this.shaderBuilder.getShaderProgram();
    }
  }, {
    key: "_handleResize",
    value: function _handleResize() {
      this.canvas.width = this.parentBlock.clientWidth;
      this.canvas.height = this.parentBlock.clientHeight;
    }
  }, {
    key: "updateFrame",
    value: function updateFrame() {}
  }, {
    key: "start",
    value: function start() {
      this.refreshId = window.requestAnimationFrame(this.updateFrame);
    }
  }, {
    key: "stop",
    value: function stop() {
      window.cancelAnimationFrame(this.refreshId);
    }
  }, {
    key: "addCamera",
    value: function addCamera(name, camera) {
      this.cameras[name] = camera;
    }
  }, {
    key: "removeCamera",
    value: function removeCamera(name) {
      delete this.cameras[name];
    }
  }, {
    key: "add3DObject",
    value: function add3DObject(name, object) {
      this.objects[name] = object;
    }
  }, {
    key: "remove3DObject",
    value: function remove3DObject(name) {
      delete this.objects[name];
    }
  }]);

  return WebGLProgram;
}();

module.exports = WebGLProgram;
},{"./ShaderBuilder.class.js":5}],7:[function(require,module,exports){
"use strict";

var test1 = require("./test1/test1.js");

var str = window.location.href.split("/");

if (str[str.length - 1] != "") {
  eval(str[str.length - 1] + "()");
}
},{"./test1/test1.js":8}],8:[function(require,module,exports){
"use strict";

var WebGLProgram = require("../class/WebGLProgram.class.js");

var Camera = require("../class/Camera.class.js");

var Cube = require("../class/3DObjects/Cube.class.js");

module.exports = function () {
  var program = new WebGLProgram();
  program.insertInBlock(document.getElementById("display"));
  program.setUpdateOnResize(true);
};
},{"../class/3DObjects/Cube.class.js":1,"../class/Camera.class.js":2,"../class/WebGLProgram.class.js":6}]},{},[7]);
