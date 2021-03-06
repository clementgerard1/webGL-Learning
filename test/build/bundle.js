(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var glmatrix = require("../../node_modules/gl-matrix/gl-matrix-min.js");
<<<<<<< HEAD

var Movable = require("./Interfaces/Movable.class.js");

var Object3D = require("./Interfaces/Object3D.class.js");

var Camera =
/*#__PURE__*/
function (_Movable) {
  _inherits(Camera, _Movable);

  function Camera() {
    var _this;

    _classCallCheck(this, Camera);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Camera).call(this));
    _this.position = glmatrix.vec4.fromValues(0, 0, 0, 1);
    _this.direction = glmatrix.vec4.fromValues(0, 0, 1, 1);
    _this.fixed = false;
    _this.type = "perspective";
    _this.orthoSettings = {
      "size": 6,
      "far": 100,
      "near": 0
    };
    _this.perspSettings = {
      "focal": 45,
      "far": 100,
      "near": 0.1
    };
    return _this;
  } //val = false || val = 3DObject || val = [x, y, z]


  _createClass(Camera, [{
    key: "setFixation",
    value: function setFixation(val) {
      if (val == false) {
        this.fixed = false;
      } else if (val.prototype instanceof Object3D) {
        var positions = val.getPosition();
        this.fixed = [positions[0], positions[1], positions[2]];
      } else if (typeof val == "array") {
        this.fixed = [val[0], val[1], val[2]];
      }
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return [this.position[0], this.position[1], this.position[2], this.position[3]];
    }
  }, {
    key: "setPosition",
    value: function setPosition(x, y, z) {
      this.position = glmatrix.vec4.fromValues(x, y, z, 1);
    }
  }, {
    key: "setType",
    value: function setType(name, args) {
      if (name == "orthogonal") {
        this.type = "orthogonal";

        for (var arg in args) {
          this.orthoSettings[arg] = args[arg];
        }
      } else {
        this.type = "perspective";

        for (var _arg in args) {
          this.perspSettings[_arg] = args[_arg];
        }
      }
    }
  }, {
    key: "getMatrix",
    value: function getMatrix(ratio) {
      var result = glmatrix.mat4.create();

      if (this.type == "orthogonal") {
        glmatrix.mat4.ortho(result, -(this.orthoSettings["size"] / 2) * ratio, this.orthoSettings["size"] / 2 * ratio, -(this.orthoSettings["size"] / 2), this.orthoSettings["size"] / 2, this.orthoSettings["near"], this.orthoSettings["far"]);
      } else if (this.type == "perspective") {
        glmatrix.mat4.perspective(result, this.perspSettings["focal"] * (Math.PI / 180), ratio, this.perspSettings["near"], this.perspSettings["far"]);
      }

      var move = glmatrix.mat4.create();
      glmatrix.mat4.translate(move, move, [-this.position[0], -this.position[1], -this.position[2]]);
      glmatrix.mat4.multiply(result, result, move);
      return result;
    }
  }]);

  return Camera;
}(Movable);

module.exports = Camera;
},{"../../node_modules/gl-matrix/gl-matrix-min.js":25,"./Interfaces/Movable.class.js":3,"./Interfaces/Object3D.class.js":5}],2:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Light = function Light() {
  _classCallCheck(this, Light);
};

module.exports = Light;
},{}],3:[function(require,module,exports){
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

var Movement = function Movement() {
  _classCallCheck(this, Movement);
};

module.exports = Movement;
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Texture = function Texture() {
  _classCallCheck(this, Texture);
};

module.exports = Texture;
},{}],7:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Light = require("../Interfaces/Light.class.js");

var AmbientLight =
/*#__PURE__*/
function (_Light) {
  _inherits(AmbientLight, _Light);

  function AmbientLight() {
    var _this;

    _classCallCheck(this, AmbientLight);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AmbientLight).call(this));
    _this.power = 1.;
    return _this;
  }

  _createClass(AmbientLight, [{
    key: "setPower",
    value: function setPower(f) {
      this.power = f;
    }
  }, {
    key: "getPower",
    value: function getPower() {
      return this.power;
    }
  }]);

  return AmbientLight;
}(Light);

module.exports = AmbientLight;
},{"../Interfaces/Light.class.js":2}],8:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

var Movement = require("../Interfaces/Movement.class.js");

var Utils = require("../Utils.class.js");

var Rotate =
/*#__PURE__*/
function (_Movement) {
  _inherits(Rotate, _Movement);

  function Rotate(angle, axe, nbFrame, callback) {
    var _this;

    _classCallCheck(this, Rotate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rotate).call(this));
    _this.angle = Math.PI * (angle / 180);
    _this.axe = axe;
    _this.nbFrame = nbFrame;
    _this.step = 0;
    _this.positions = [0, 0, 0];
    _this.started = false;
    _this.callback = callback;
    _this.finished = false;
    return _this;
  }

  _createClass(Rotate, [{
    key: "start",
    value: function start() {
      this.started = true;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.started = false;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.step = 0;
      this.finished = false;
    }
  }, {
    key: "setPosition",
    value: function setPosition(x, y, z) {
      this.positions = [x, y, z];
    }
  }, {
    key: "process",
    value: function process(matrix) {
      if (this.started && this.step < this.nbFrame) {
        this.step++;
      }

      glmatrix.mat4.translate(matrix, matrix, [this.positions[0], this.positions[1], this.positions[2]]);
      glmatrix.mat4.rotate(matrix, matrix, this.angle * (this.step / this.nbFrame), this.axe);
      glmatrix.mat4.translate(matrix, matrix, [-this.positions[0], -this.positions[1], -this.positions[2]]); //MOVEMENT COMPLETED

      if (!this.finished && this.step == this.nbFrame) {
        this.finished = true;
        this.callback();
      }
    }
  }, {
    key: "processMirror",
    value: function processMirror(matrix) {
      if (this.started && this.step < this.nbFrame) {
        this.step++;
      }

      glmatrix.mat4.rotate(matrix, matrix, this.angle * (this.step / this.nbFrame), this.axe); //MOVEMENT COMPLETED

      if (!this.finished && this.step == this.nbFrame) {
        this.finished = true;
        this.callback();
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      var neww = new this.constructor();
      neww.angle = this.angle;
      neww.axe = this.axe;
      neww.nbFrame = this.nbFrame;
      neww.step = this.step;
      neww.positions = this.positions.slice();
      neww.started = this.started;
      neww.classback = this.callback;
      neww.finished = this.finished;
      return neww;
    }
  }, {
    key: "mirrorClone",
    value: function mirrorClone(mirror) {
      var neww = new this.constructor();
      neww.angle = -this.angle;
      var p1 = Utils.symPlane(glmatrix.vec3.fromValues(0, 0, 0), mirror.mirrorPos, mirror.mirrorVec1, mirror.mirrorVec2);
      var p2 = Utils.symPlane(glmatrix.vec3.fromValues(this.axe[0], this.axe[1], this.axe[2]), mirror.mirrorPos, mirror.mirrorVec1, mirror.mirrorVec2);
      neww.axe = Utils.newVec(p1, p2);
      neww.nbFrame = this.nbFrame;
      neww.step = this.step;
      var point = glmatrix.vec3.fromValues(this.positions[0], this.positions[1], this.positions[2]);
      var newP = Utils.symPlane(point, mirror.mirrorPos, mirror.mirrorVec1, mirror.mirrorVec2);
      neww.positions = [newP[0], newP[1], newP[2]];
      neww.started = this.started;
      neww.callback = this.callback;
      neww.finished = this.finished;
      return neww;
    }
  }]);

  return Rotate;
}(Movement);

module.exports = Rotate;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":25,"../Interfaces/Movement.class.js":4,"../Utils.class.js":19}],9:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

var Movement = require("../Interfaces/Movement.class.js");

var Translate =
/*#__PURE__*/
function (_Movement) {
  _inherits(Translate, _Movement);

  function Translate(vec, nbFrame, callback) {
    var _this;

    _classCallCheck(this, Translate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Translate).call(this));
    _this.vec = vec;
    _this.nbFrame = nbFrame;
    _this.step = 0;
    _this.started = false;
    _this.callback = callback;
    _this.finished = false;
    return _this;
  }

  _createClass(Translate, [{
    key: "start",
    value: function start() {
      this.started = true;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.started = false;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.step = 0;
      this.finished = false;
    }
  }, {
    key: "process",
    value: function process(matrix) {
      if (this.started && this.step < this.nbFrame) {
        this.step++;
      }

      var tempVec = glmatrix.vec3.create();
      glmatrix.vec3.scale(tempVec, this.vec, this.step / this.nbFrame);
      glmatrix.mat4.translate(matrix, matrix, tempVec); //MOVEMENT COMPLETED

      if (!this.finished && this.step == this.nbFrame) {
        this.finished = true;
        this.callback();
      }
    }
  }]);

  return Translate;
}(Movement);

module.exports = Translate;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":25,"../Interfaces/Movement.class.js":4}],10:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Object3D = require("../Interfaces/Object3D.class.js");
=======
>>>>>>> tmp

var Movable = require("./Interfaces/Movable.class.js");

<<<<<<< HEAD
var Utils = require("../Utils.class.js");

var MirrorTexture = require("../Textures/MirrorTexture.class");

var Translate = require("../Movements/Translate.class.js");

var Cube =
=======
var Object3D = require("./Interfaces/Object3D.class.js");

var Translate = require("./Movements/Translate.class.js");

var Scale = require("./Movements/Scale.class.js");

var Rotate = require("./Movements/Rotate.class.js");

var LookAt = require("./Movements/LookAt.class.js");

var Camera =
>>>>>>> tmp
/*#__PURE__*/
function (_Movable) {
  _inherits(Camera, _Movable);

  function Camera() {
    var _this;

    _classCallCheck(this, Camera);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Camera).call(this));
    _this.movements = [];
<<<<<<< HEAD
    _this.textures = [];
    _this.indexes = [0, 1, 2, 0, 2, 3, // avant
    4, 5, 6, 4, 6, 7, // gauche
    8, 9, 10, 8, 10, 11, // haut
    12, 13, 14, 12, 14, 15, // bas
    16, 17, 18, 16, 18, 19, // dessous
    20, 21, 22, 20, 22, 23 // derriere
    ];
    _this.textureCoordonnees = [0., 0., 0., 1., 1., 1., 1., 0., 0., 0., 0., 1., 1., 1., 1., 0., 0., 0., 0., 1., 1., 1., 1., 0., 0., 0., 0., 1., 1., 1., 1., 0., 0., 0., 0., 1., 1., 1., 1., 0., 0., 0., 0., 1., 1., 1., 1., 0.];
    _this.bufferFunctions = {
      "position": _this._sendVertexPosition,
      "color": _this._sendVertexColor,
      "textureCoordonnees": _this._sendTextureCoordonnees
=======
    _this.stepUpAnimation = true; //Position

    _this.position = [0, 0, 0];
    _this.positionTranslate = new Translate(_this.position, 0, function () {});

    _this.positionTranslate.setPosition(0, 0, 0);

    _this.positionTranslate.setTranslationVec(0, 0, 0);

    _this.addMovement("position", _this.positionTranslate);

    _this.positionTranslate.start();

    _this.direction = [0, 0, 1];
    _this.type = "perspective";
    _this.orthoSettings = {
      "size": 6,
      "far": 100,
      "near": 0
    };
    _this.perspSettings = {
      "focal": 45,
      "far": 100,
      "near": 0.1
>>>>>>> tmp
    };
    return _this;
  }

  _createClass(Camera, [{
    key: "enableStepUpAnimation",
    value: function enableStepUpAnimation() {
      this.stepUpAnimation = true;
    }
  }, {
    key: "disableStepUpAnimation",
    value: function disableStepUpAnimation() {
      this.stepUpAnimation = false;
    }
  }, {
    key: "addMovement",
    value: function addMovement(name, movement) {
      if (typeof name != "string") {
        movement = name;
        name = "movement" + Object.keys(this.movements).length;
      }

      this.movements[name] = movement;
    }
  }, {
    key: "removeMovement",
    value: function removeMovement(name) {
      delete this.movements[name];
    }
  }, {
    key: "addTexture",
    value: function addTexture(name, texture) {
      this.textures[name] = texture;
    }
  }, {
    key: "removeTexture",
    value: function removeTexture(name) {
      delete this.textures[name];
    }
  }, {
    key: "getNbMovements",
    value: function getNbMovements() {
      return Object.keys(this.movements).length;
    }
  }, {
    key: "getMovements",
    value: function getMovements() {
      return this.movements;
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      this.disableStepUpAnimation();
      var transform = this.render();
      this.enableStepUpAnimation();
      var position = glmatrix.vec3.create();
      glmatrix.vec3.transformMat4(position, this.position, transform);
      return position;
    }
  }, {
<<<<<<< HEAD
    key: "renderAttribute",
    value: function renderAttribute(attribut, webGLProgram, func) {
      this.bufferFunctions[attribut](webGLProgram, this, func);
    }
  }, {
    key: "_sendTextureCoordonnees",
    value: function _sendTextureCoordonnees(webGLProgram, that) {
      var numTexture = 0;

      for (var text in that.textures) {
        if (!(that.textures[text] instanceof MirrorTexture)) {
          webGLProgram.getContext().activeTexture(webGLProgram.getContext().TEXTURE0);
          webGLProgram.getContext().bindTexture(webGLProgram.getContext().TEXTURE_2D, that.textures[text]);
          webGLProgram.getContext().uniform1i(webGLProgram.getShaderBuilder().getPointer("texture"), false, 0);
          webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ARRAY_BUFFER, webGLProgram.getBuffer("textureCoordonnees"));
          webGLProgram.getContext().vertexAttribPointer(webGLProgram.getShaderBuilder().getPointer("textureCoordonnees"), 2, webGLProgram.getContext().FLOAT, false, 0, 0); //Insérer les données

          webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(that.textureCoordonnees), webGLProgram.getContext().STATIC_DRAW);
        }
      }
    }
  }, {
    key: "_sendVertexPosition",
    value: function _sendVertexPosition(webGLProgram, that, func) {
      //Initialisation
      webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ARRAY_BUFFER, webGLProgram.getBuffer("position"));
      webGLProgram.getContext().vertexAttribPointer(webGLProgram.getShaderBuilder().getPointer("position"), 3, webGLProgram.getContext().FLOAT, false, 0, 0); //Insérer les données

      var positions = [that.centerPosition[0] - that.size / 2, that.centerPosition[1] - that.size / 2, that.centerPosition[2] + that.size / 2, //Face avant
      that.centerPosition[0] - that.size / 2, that.centerPosition[1] + that.size / 2, that.centerPosition[2] + that.size / 2, that.centerPosition[0] + that.size / 2, that.centerPosition[1] + that.size / 2, that.centerPosition[2] + that.size / 2, that.centerPosition[0] + that.size / 2, that.centerPosition[1] - that.size / 2, that.centerPosition[2] + that.size / 2, that.centerPosition[0] - that.size / 2, that.centerPosition[1] - that.size / 2, that.centerPosition[2] - that.size / 2, //Face gauche
      that.centerPosition[0] - that.size / 2, that.centerPosition[1] + that.size / 2, that.centerPosition[2] - that.size / 2, that.centerPosition[0] - that.size / 2, that.centerPosition[1] + that.size / 2, that.centerPosition[2] + that.size / 2, that.centerPosition[0] - that.size / 2, that.centerPosition[1] - that.size / 2, that.centerPosition[2] + that.size / 2, that.centerPosition[0] - that.size / 2, that.centerPosition[1] + that.size / 2, that.centerPosition[2] - that.size / 2, //Face haute
      that.centerPosition[0] + that.size / 2, that.centerPosition[1] + that.size / 2, that.centerPosition[2] - that.size / 2, that.centerPosition[0] + that.size / 2, that.centerPosition[1] + that.size / 2, that.centerPosition[2] + that.size / 2, that.centerPosition[0] - that.size / 2, that.centerPosition[1] + that.size / 2, that.centerPosition[2] + that.size / 2, that.centerPosition[0] + that.size / 2, that.centerPosition[1] + that.size / 2, that.centerPosition[2] - that.size / 2, //Face droite
      that.centerPosition[0] + that.size / 2, that.centerPosition[1] - that.size / 2, that.centerPosition[2] - that.size / 2, that.centerPosition[0] + that.size / 2, that.centerPosition[1] - that.size / 2, that.centerPosition[2] + that.size / 2, that.centerPosition[0] + that.size / 2, that.centerPosition[1] + that.size / 2, that.centerPosition[2] + that.size / 2, that.centerPosition[0] + that.size / 2, that.centerPosition[1] - that.size / 2, that.centerPosition[2] - that.size / 2, //Face dessous
      that.centerPosition[0] - that.size / 2, that.centerPosition[1] - that.size / 2, that.centerPosition[2] - that.size / 2, that.centerPosition[0] - that.size / 2, that.centerPosition[1] - that.size / 2, that.centerPosition[2] + that.size / 2, that.centerPosition[0] + that.size / 2, that.centerPosition[1] - that.size / 2, that.centerPosition[2] + that.size / 2, that.centerPosition[0] + that.size / 2, that.centerPosition[1] + that.size / 2, that.centerPosition[2] - that.size / 2, //Face derriere
      that.centerPosition[0] - that.size / 2, that.centerPosition[1] + that.size / 2, that.centerPosition[2] - that.size / 2, that.centerPosition[0] - that.size / 2, that.centerPosition[1] - that.size / 2, that.centerPosition[2] - that.size / 2, that.centerPosition[0] + that.size / 2, that.centerPosition[1] - that.size / 2, that.centerPosition[2] - that.size / 2];

      if (typeof func != "undefined") {
        for (var i = 0; i < positions.length / 3; i++) {
          var result = func(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
          positions[i * 3] = result[0];
          positions[i * 3 + 1] = result[1];
          positions[i * 3 + 2] = result[2];
        }
      }

      webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(positions), webGLProgram.getContext().STATIC_DRAW);
    }
  }, {
    key: "_sendVertexColor",
    value: function _sendVertexColor(webGLProgram, that) {
      //Initialisation
      webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ARRAY_BUFFER, webGLProgram.getBuffer("color"));
      webGLProgram.getContext().vertexAttribPointer(webGLProgram.getShaderBuilder().getPointer("color"), 4, webGLProgram.getContext().FLOAT, false, 0, 0); //Insérer les données
=======
    key: "setPosition",
    value: function setPosition(x, y, z) {
      this.position = [x, y, z];
      this.positionTranslate.setTranslationVec(x, y, z);
    }
  }, {
    key: "setType",
    value: function setType(name, args) {
      if (name == "orthogonal") {
        this.type = "orthogonal";

        for (var arg in args) {
          this.orthoSettings[arg] = args[arg];
        }
      } else {
        this.type = "perspective";
>>>>>>> tmp

        for (var _arg in args) {
          this.perspSettings[_arg] = args[_arg];
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      //Local transformation
      //base = matrice héritéé d'un groupe d'objet
      var processedMatrix = glmatrix.mat4.create();
      var stepUp = this.stepUpAnimation; //Translate

      for (var move in this.movements) {
        if (this.movements[move] instanceof Translate) {
          this.movements[move].process(processedMatrix, stepUp);
        }
      } //Rotate


      for (var _move in this.movements) {
        if (this.movements[_move] instanceof Rotate) {
          this.movements[_move].process(processedMatrix, stepUp);
        }
      } //LookAt


      for (var _move2 in this.movements) {
        if (this.movements[_move2] instanceof LookAt) {
          this.movements[_move2].process(processedMatrix, this);
        }
      }

      return processedMatrix;
    }
  }, {
    key: "getMatrix",
    value: function getMatrix(ratio) {
      var camera = glmatrix.mat4.create();

      if (this.type == "orthogonal") {
        glmatrix.mat4.ortho(camera, -(this.orthoSettings["size"] / 2) * ratio, this.orthoSettings["size"] / 2 * ratio, -(this.orthoSettings["size"] / 2), this.orthoSettings["size"] / 2, this.orthoSettings["near"], this.orthoSettings["far"]);
      } else if (this.type == "perspective") {
        glmatrix.mat4.perspective(camera, this.perspSettings["focal"] * (Math.PI / 180), ratio, this.perspSettings["near"], this.perspSettings["far"]);
      }

      var transform = this.render();
      glmatrix.mat4.invert(transform, transform);
      glmatrix.mat4.multiply(camera, camera, transform);
      return camera;
    }
  }, {
    key: "renderMirrored",
    value: function renderMirrored(webGLProgram, attributs, mirror, base) {
      var that = this;

      for (var i = 0; i < attributs.length; i++) {
        this.renderAttribute(attributs[i], webGLProgram, function (x, y, z) {
          var point = glmatrix.vec3.fromValues(x, y, z);
          return Utils.symPlane(point, mirror.mirrorPos, mirror.mirrorVec1, mirror.mirrorVec2);
        });
      } //Local transformation
      //base = matrice héritéé d'un groupe d'objet


      var processedMatrix;

      if (base == null || typeof base == "undefined") {
        processedMatrix = glmatrix.mat4.create();

        for (var move in this.movements) {
          this.movements[move].process(processedMatrix);
        }

        webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
      } else {
        processedMatrix = base;

        for (var _move2 in this.movements) {
          this.movements[_move2].process(processedMatrix);
        }

        webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
      } //Index


      webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, webGLProgram.getBuffer("index"));
      webGLProgram.getContext().bufferData(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexes), webGLProgram.getContext().STATIC_DRAW); //Draw

      webGLProgram.getContext().drawElements(webGLProgram.getContext().TRIANGLES, this.indexes.length, webGLProgram.getContext().UNSIGNED_SHORT, 0);
    }
  }, {
    key: "clone",
    value: function clone() {
      var neww = new this.constructor();
      neww.size = this.size;
      neww.centerPosition = this.centerPosition.slice();
      neww.colors = this.colors.slice();
      Object.assign(neww.movements, this.movements);
      Object.assign(neww.textures, this.textures);
      neww.indexes = this.indexes.slice();
      neww.textureCoordonnees = this.textureCoordonnees.slice();
      Object.assign(neww.bufferFunctions, this.bufferFunctions);
      return neww;
    }
  }, {
    key: "mirrorClone",
    value: function mirrorClone(mirror) {
      var neww = new this.constructor();
      neww.size = this.size; //New position

      neww.centerPosition = this.centerPosition.slice(); //const point = glmatrix.vec3.fromValues(this.centerPosition[0], this.centerPosition[1], this.centerPosition[2]);
      //const newP = Utils.symPlane(point, mirror.mirrorPos, mirror.mirrorVec1, mirror.mirrorVec2);
      //neww.centerPosition = [newP[0], newP[1], newP[2]];
      //neww.centerPosition = [this.centerPosition[0], this.centerPosition[1], this.centerPosition[2]];

      neww.colors = this.colors.slice(); //New center movements

      for (var move in this.movements) {
        neww.movements[move] = this.movements[move].mirrorClone(mirror);
      }

      Object.assign(neww.textures, this.textures);
      neww.indexes = this.indexes.slice();
      neww.textureCoordonnees = this.textureCoordonnees.slice();
      Object.assign(neww.bufferFunctions, this.bufferFunctions);
      return neww;
    }
  }]);

  return Camera;
}(Movable);

<<<<<<< HEAD
module.exports = Cube;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":25,"../Interfaces/Object3D.class.js":5,"../Movements/Translate.class.js":9,"../Textures/MirrorTexture.class":18,"../Utils.class.js":19}],11:[function(require,module,exports){
=======
module.exports = Camera;
},{"../../node_modules/gl-matrix/gl-matrix-min.js":38,"./Interfaces/Movable.class.js":3,"./Interfaces/Object3D.class.js":5,"./Movements/LookAt.class.js":12,"./Movements/Rotate.class.js":13,"./Movements/Scale.class.js":14,"./Movements/Translate.class.js":15}],2:[function(require,module,exports){
>>>>>>> tmp
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Light =
/*#__PURE__*/
function () {
  function Light(ambient, diffuse, specular) {
    _classCallCheck(this, Light);

    this.needRebuild = false;

    if (typeof ambient == "undefined") {
      ambient = [1., 1., 1., 1.];
    }

    if (typeof diffuse == "undefined") {
      diffuse = ambient;
    }

    if (typeof specular == "undefined") {
      specular = [1., 1., 1., 1.];
    }

    this.ambiant = ambient;
    this.diffuse = diffuse;
    this.specular = specular;
    this.aPower = 0.1;
    this.dPower = 1;
    this.sPower = 1;
  }

  _createClass(Light, [{
    key: "setPower",
    value: function setPower(f) {
      if (_typeof(f) != "object") {
        this.aPower = f;
        this.dPower = f;
        this.sPower = f;
      } else {
        this.aPower = f[0];
        this.dPower = f[1];
        this.sPower = f[2];
      }
    }
  }, {
    key: "setRGB",
    value: function setRGB(r, g, b) {
      this.ambient = [r, g, b];
      this.diffuse = [r, g, b];
      this.specular = [r, g, b];
    }
  }, {
<<<<<<< HEAD
    key: "getNbMovements",
    value: function getNbMovements() {
      return Object.keys(this.movements).length;
    }
  }, {
=======
    key: "getRGB",
    value: function getRGB() {
      return [this.ambient, this.diffuse, this.specular];
    }
  }, {
    key: "setAmbientRGB",
    value: function setAmbientRGB(r, g, b) {
      this.ambient = [r, g, b];
    }
  }, {
    key: "setDiffuseRGB",
    value: function setDiffuseRGB(r, g, b) {
      this.diffuse = [r, g, b];
    }
  }, {
    key: "setSpecularRGB",
    value: function setSpecularRGB(r, g, b) {
      this.specular = [r, g, b];
    }
  }, {
    key: "getPower",
    value: function getPower() {
      return this.power;
    }
  }, {
    key: "needShaderRebuild",
    value: function needShaderRebuild() {
      return this.needRebuild;
    }
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "getFragmentShaderPreCode",
    value: function getFragmentShaderPreCode() {}
  }, {
    key: "getFragmentShaderMainCode",
    value: function getFragmentShaderMainCode() {}
  }, {
    key: "getVertexShaderMainCode",
    value: function getVertexShaderMainCode() {}
  }, {
    key: "getVertexShaderPreCode",
    value: function getVertexShaderPreCode() {}
  }]);

  return Light;
}();

module.exports = Light;
},{}],3:[function(require,module,exports){
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

var Movement =
/*#__PURE__*/
function () {
  function Movement() {
    _classCallCheck(this, Movement);

    this.powSpeed = 1;
    this.reverse = false;
    this.step = 0;
    this.nbFrame;
    this.animate;
    this.started = false;
    this.callback;
    this.finished = false;
    this.repeat = false;
    this.direction = true;
  }

  _createClass(Movement, [{
    key: "setPowSpeed",
    value: function setPowSpeed(pow) {
      this.powSpeed = pow;
    }
  }, {
    key: "setRepeat",
    value: function setRepeat(bool) {
      this.repeat = bool;
    }
  }, {
    key: "setRepeatMode",
    value: function setRepeatMode(mode) {
      this.reverse = mode != "normal";
    }
  }, {
    key: "start",
    value: function start() {
      this.started = true;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.started = false;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.step = 0;
      this.finished = false;
    }
  }, {
    key: "getPourcent",
    value: function getPourcent() {
      var temp = this.step / this.nbFrame;

      if (temp < 0.5) {
        temp = Math.pow(temp * 2, this.powSpeed) / 2;
      } else {
        temp = Math.pow((temp - 0.5) * 2, 1 / this.powSpeed) / 2 + 0.5;
      }

      return temp;
    }
  }, {
    key: "endFrame",
    value: function endFrame() {
      if (this.started && !this.finished && this.step <= this.nbFrame) {
        if (this.direction) {
          this.step++;
        } else {
          this.step--;
        }
      } //MOVEMENT COMPLETED


      if (!this.finished && (this.step == this.nbFrame && this.direction || this.step == 0 && !this.direction)) {
        if (!this.repeat) {
          this.finished = true;
        } else {
          if (this.reverse) {
            this.direction = !this.direction;
          } else {
            this.reset();
          }
        }

        if (this.callback != null) {
          this.callback();
        }
      }
    }
  }]);

  return Movement;
}();

module.exports = Movement;
},{}],5:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MirrorTexture = require("../Textures/MirrorTexture.class");

var ColorTexture = require("../Textures/ColorTexture.class");

var FrameTexture = require("../Textures/FrameTexture.class");

var CanvasTexture = require("../Textures/CanvasTexture.class");

var Translate = require("../Movements/Translate.class.js");

var Scale = require("../Movements/Scale.class.js");

var Rotate = require("../Movements/Rotate.class.js");

var LookAt = require("../Movements/LookAt.class.js");

var Utils = require("../Utils.class");

var Material = require("../Material.class.js");

var glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

var Object3D =
/*#__PURE__*/
function () {
  function Object3D(material) {
    _classCallCheck(this, Object3D);

    this.id = Utils.newID(this);
    this.transparency = false;
    this.mirror = false;
    this.mirrored = 0;
    this.stepUpAnimation = true;
    this.direction = [0, 0, 1];

    if (typeof material != "undefined") {
      this.material = material;
    } else {
      this.material = new Material();
    }

    this.movements = []; //Position

    this.position = [0, 0, 0];
    this.positionTranslate = new Translate(this.position, 0, function () {});
    this.positionTranslate.setPosition(0, 0, 0);
    this.positionTranslate.setTranslationVec(0, 0, 0);
    this.addMovement("position", this.positionTranslate);
    this.positionTranslate.start();
    this.textureCoordonnees = [];
    this.positions = [];
  }

  _createClass(Object3D, [{
    key: "getMaterialInfos",
    value: function getMaterialInfos() {
      return this.material.getInfos();
    }
  }, {
    key: "renderTextures",
    value: function renderTextures() {
      this.material.renderTextures(this);
    }
  }, {
    key: "getMaterial",
    value: function getMaterial() {
      return this.material;
    }
  }, {
    key: "setMaterial",
    value: function setMaterial(material) {
      this.material = material;
    }
  }, {
    key: "enableStepUpAnimation",
    value: function enableStepUpAnimation() {
      this.stepUpAnimation = true;
    }
  }, {
    key: "disableStepUpAnimation",
    value: function disableStepUpAnimation() {
      this.stepUpAnimation = false;
    }
  }, {
    key: "addMovement",
    value: function addMovement(name, movement) {
      if (typeof name != "string") {
        movement = name;
        name = "movement" + Object.keys(this.movements).length;
      }

      this.movements[name] = movement;
    }
  }, {
    key: "removeMovement",
    value: function removeMovement(name) {
      delete this.movements[name];
    }
  }, {
    key: "_checkTransparency",
    value: function _checkTransparency() {
      this.transparency = this.material.isTransparent();
    }
  }, {
    key: "getNbMovements",
    value: function getNbMovements() {
      return Object.keys(this.movements).length;
    }
  }, {
>>>>>>> tmp
    key: "getMovements",
    value: function getMovements() {
      return this.movements;
    }
  }, {
    key: "setPosition",
    value: function setPosition(x, y, z) {
<<<<<<< HEAD
      this.centerPosition = [x, y, z];
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
  }, {
    key: "render",
    value: function render(webGLProgram, attributs, base) {
      //Local transformation
      //base = matrice héritéé d'un groupe d'objet
      var processedMatrix;

      if (base == null || typeof base == "undefined") {
        processedMatrix = glmatrix.mat4.create();
=======
      this.position = [x, y, z];
      this.positionTranslate.setTranslationVec(x, y, z);
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      var temp = [];
      this.disableStepUpAnimation();
      this.render(temp);
      this.enableStepUpAnimation();
      var position = glmatrix.vec3.fromValues(0, 0, 0);
      glmatrix.vec3.transformMat4(position, position, temp[this.id][1]);
      return position;
    }
  }, {
    key: "isTransparent",
    value: function isTransparent() {
      this._checkTransparency();

      return this.transparency;
    }
  }, {
    key: "isMirror",
    value: function isMirror() {
      return this.mirror;
    }
  }, {
    key: "setTransparency",
    value: function setTransparency(value) {
      this.transparency = value;
    }
  }, {
    key: "setMirror",
    value: function setMirror(value) {
      this.mirror = value;
    }
  }, {
    key: "clone",
    value: function clone(neww) {
      neww.mirrored = this.mirrored;
      neww.transparency = this.transparency;
      neww.material = this.material;
      neww.direction = this.direction.slice();
    }
  }, {
    key: "incMirrorValue",
    value: function incMirrorValue() {
      this.mirrored++;
    }
  }, {
    key: "getMirrorValue",
    value: function getMirrorValue() {
      return this.mirrored;
    }
  }, {
    key: "render",
    value: function render(transformsCollection, base) {
      //Local transformation
      //base = matrice héritéé d'un groupe d'objet
      var processedMatrix;
      var stepUp = this.stepUpAnimation;

      if (base == null || typeof base == "undefined") {
        processedMatrix = glmatrix.mat4.create();
      } else {
        processedMatrix = base;
      } //Translate


      for (var move in this.movements) {
        if (this.movements[move] instanceof Translate) {
          this.movements[move].process(processedMatrix, stepUp);
        }
      } //Rotate


      for (var _move in this.movements) {
        if (this.movements[_move] instanceof Rotate) {
          this.movements[_move].process(processedMatrix, stepUp);
        }
      } //LookAt


      for (var _move2 in this.movements) {
        if (this.movements[_move2] instanceof LookAt) {
          this.movements[_move2].process(processedMatrix, this);
        }
      } //Scale


      for (var _move3 in this.movements) {
        if (this.movements[_move3] instanceof Scale) {
          this.movements[_move3].process(processedMatrix, stepUp);
        }
      }

      transformsCollection[this.id] = [this, processedMatrix];
    }
  }, {
    key: "setOpacity",
    value: function setOpacity(value) {
      this.material.setOpacity(value);

      this._checkTransparency();
    }
  }, {
    key: "getOpacity",
    value: function getOpacity() {
      return this.material.getOpacity();
    }
  }, {
    key: "draw",
    value: function draw(webGLProgram) {
      if (webGLProgram.getShaderBuilder().getMode() == "event") {
        webGLProgram.getContext().uniform4fv(webGLProgram.getShaderBuilder().getPointer("IDasColor"), Utils.idAsColor(this.id));
      }

      if (this.transparency) {
        webGLProgram.getContext().depthMask(false);
      } else {
        webGLProgram.getContext().depthMask(true);
      }

      webGLProgram.getContext().uniform1f(webGLProgram.getShaderBuilder().getPointer("opacity"), this.material.getOpacity());
    }
  }, {
    key: "addTexture",
    value: function addTexture(name, texture) {
      this.material.addTexture(name, texture);

      this._checkTransparency();
    }
  }, {
    key: "removeTexture",
    value: function removeTexture(name) {
      this.material.removeTexture(name);

      this._checkTransparency();
    }
  }, {
    key: "toLines",
    value: function toLines(indexes) {
      var result = [];

      for (var i = 0; i < indexes.length / 3; i++) {
        //Line 1
        result[result.length] = indexes[i * 3];
        result[result.length] = indexes[i * 3 + 1]; //Line 2

        result[result.length] = indexes[i * 3 + 1];
        result[result.length] = indexes[i * 3 + 2]; //Line 3

        result[result.length] = indexes[i * 3 + 2];
        result[result.length] = indexes[i * 3];
      }

      return result;
    }
  }, {
    key: "_orderPositionsByDistance",
    value: function _orderPositionsByDistance(cameraPosition, transform) {
      //On calcul le centre de chaque triangle
      var centers = [];

      for (var i = 0; i < this.indexes.length / 3; i++) {
        centers[centers.length] = [];
        var vec1 = [this.positions[this.indexes[i * 3] * 3], this.positions[this.indexes[i * 3] * 3 + 1], this.positions[this.indexes[i * 3] * 3 + 2]];
        var vec2 = [this.positions[this.indexes[i * 3 + 1] * 3], this.positions[this.indexes[i * 3 + 1] * 3 + 1], this.positions[this.indexes[i * 3 + 1] * 3 + 2]];
        var vec3 = [this.positions[this.indexes[i * 3 + 2] * 3], this.positions[this.indexes[i * 3 + 2] * 3 + 1], this.positions[this.indexes[i * 3 + 2] * 3 + 2]];
        glmatrix.vec3.transformMat4(vec1, vec1, transform);
        glmatrix.vec3.transformMat4(vec2, vec2, transform);
        glmatrix.vec3.transformMat4(vec3, vec3, transform);
        centers[centers.length - 1][0] = Utils.getCentroid(vec1, vec2, vec3);
        centers[centers.length - 1][1] = i * 3;
      }

      centers.sort(function (elem1, elem2) {
        var distance1 = glmatrix.vec3.distance(cameraPosition, elem1[0]);
        var distance2 = glmatrix.vec3.distance(cameraPosition, elem2[0]);
        elem1[2] = distance1;
        elem2[2] = distance2;

        if (distance1 > distance2) {
          return -1;
        } else {
          return 1;
        }
      });
      var indexClone = this.indexes.slice();

      for (var _i = 0; _i < this.indexes.length / 3; _i++) {
        this.indexes[_i * 3] = indexClone[centers[_i][1]];
        this.indexes[_i * 3 + 1] = indexClone[centers[_i][1] + 1];
        this.indexes[_i * 3 + 2] = indexClone[centers[_i][1] + 2];
      }
    }
  }]);

  return Object3D;
}();

module.exports = Object3D;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":38,"../Material.class.js":11,"../Movements/LookAt.class.js":12,"../Movements/Rotate.class.js":13,"../Movements/Scale.class.js":14,"../Movements/Translate.class.js":15,"../Textures/CanvasTexture.class":22,"../Textures/ColorTexture.class":23,"../Textures/FrameTexture.class":25,"../Textures/MirrorTexture.class":27,"../Utils.class":28}],6:[function(require,module,exports){
"use strict";
>>>>>>> tmp

        for (var move in this.movements) {
          this.movements[move].process(processedMatrix);
        }

        webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
      } else {
        processedMatrix = base;

        for (var _move in this.movements) {
          this.movements[_move].process(processedMatrix);
        }

<<<<<<< HEAD
        webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
      }

      for (var object in this.objects) {
        var copy = glmatrix.mat4.clone(processedMatrix);
        this.objects[object].render(webGLProgram, attributs, copy);
      }
    }
  }, {
    key: "renderMirrored",
    value: function renderMirrored(webGLProgram, attributs, mirror, base) {
      //Local transformation
      //base = matrice héritéé d'un groupe d'objet
      var processedMatrix;

      if (base == null || typeof base == "undefined") {
        processedMatrix = glmatrix.mat4.create();

        for (var move in this.movements) {//this.movements[move].processMirrored(processedMatrix);
        }
=======
var Texture =
/*#__PURE__*/
function () {
  function Texture() {
    _classCallCheck(this, Texture);
  }

  _createClass(Texture, [{
    key: "preDraw",
    value: function preDraw() {}
  }, {
    key: "postDraw",
    value: function postDraw() {}
  }]);

  return Texture;
}();

module.exports = Texture;
},{}],7:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
>>>>>>> tmp

        webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
      } else {
        processedMatrix = base;

        for (var _move2 in this.movements) {//this.movements[move].processMirrored(processedMatrix);
        }

<<<<<<< HEAD
        webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
      }

      for (var object in this.objects) {
        var copy = glmatrix.mat4.clone(processedMatrix);
        this.objects[object].renderMirrored(webGLProgram, attributs, mirror, copy);
      }
    }
  }]);

  return Object3DGroup;
}(Object3D);

module.exports = Object3DGroup;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":25,"../Interfaces/Object3D.class.js":5}],12:[function(require,module,exports){
=======
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Light = require("../Interfaces/Light.class.js");

var AmbientLight =
/*#__PURE__*/
function (_Light) {
  _inherits(AmbientLight, _Light);

  function AmbientLight(ambient, diffuse, specular) {
    _classCallCheck(this, AmbientLight);

    return _possibleConstructorReturn(this, _getPrototypeOf(AmbientLight).call(this, ambient, diffuse, specular)); // Only ambient is usefull for this light
  }

  _createClass(AmbientLight, [{
    key: "render",
    value: function render(webGLProgram, name) {
      var ambientRGB = [];

      for (var i = 0; i < this.ambient.length; i++) {
        ambientRGB[i] = this.ambient[i] * this.aPower;
      }

      webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name), ambientRGB);
    }
  }, {
    key: "getFragmentShaderMainCode",
    value: function getFragmentShaderMainCode(infos) {
      return "gl_FragColor.rgb += ambientLight(" + infos.name + ", materialAmbient.rgb);";
    }
  }]);

  return AmbientLight;
}(Light);

module.exports = AmbientLight;
},{"../Interfaces/Light.class.js":2}],8:[function(require,module,exports){
>>>>>>> tmp
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

<<<<<<< HEAD
var Object3D = require("../Interfaces/Object3D.class.js");

var glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

var MirrorTexture = require("../Textures/MirrorTexture.class.js");

var Plan =
/*#__PURE__*/
function (_Object3D) {
  _inherits(Plan, _Object3D);

  function Plan() {
    var _this;

    _classCallCheck(this, Plan);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Plan).call(this));
    _this.width = 1;
    _this.height = 1;
    _this.centerPosition = [0, 0, 0];
    _this.movements = [];
    _this.vecToProcess = [];
    _this.indexes = [0, 1, 2, 0, 2, 3 // avant
    ];
    _this.textures = [];
    _this.textureCoordonnees = [0., 0., 0., 1., 1., 1., 1., 0.];
    _this.bufferFunctions = {
      "position": _this._sendVertexPosition,
      "textureCoordonnees": _this._sendTextureCoordonnees
    };
    return _this;
  }

  _createClass(Plan, [{
    key: "addMovement",
    value: function addMovement(name, movement) {
      this.movements[name] = movement;
    }
  }, {
    key: "removeMovement",
    value: function removeMovement(name) {
      delete this.movements[name];
    }
  }, {
    key: "addTexture",
    value: function addTexture(name, texture) {
      this.textures[name] = texture;
    }
  }, {
    key: "removeTexture",
    value: function removeTexture(name) {
      delete this.textures[name];
    }
  }, {
    key: "getNbMovements",
    value: function getNbMovements() {
      return Object.keys(this.movements).length;
    }
  }, {
    key: "getMovements",
    value: function getMovements() {
      return this.movements;
=======
var Light = require("../Interfaces/Light.class.js");

var glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

var DirectionalLight =
/*#__PURE__*/
function (_Light) {
  _inherits(DirectionalLight, _Light);

  function DirectionalLight() {
    var _this;

    _classCallCheck(this, DirectionalLight);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DirectionalLight).call(this));
    _this.rgb;
    _this.vector = glmatrix.vec3.fromValues(0, 0, -1);
    return _this;
  }

  _createClass(DirectionalLight, [{
    key: "render",
    value: function render(webGLProgram, name) {
      var ambientRGB = [];

      for (var i = 0; i < this.ambient.length; i++) {
        ambientRGB[i] = this.ambient[i] * this.aPower;
      }

      webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_ambientColor"), ambientRGB);
      var diffuseRGB = [];

      for (var _i = 0; _i < this.diffuse.length; _i++) {
        diffuseRGB[_i] = this.diffuse[_i] * this.dPower;
      }

      webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_diffuseColor"), diffuseRGB);
      var specularRGB = [];

      for (var _i2 = 0; _i2 < this.specular.length; _i2++) {
        specularRGB[_i2] = this.specular[_i2] * this.sPower;
      }

      webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_specularColor"), specularRGB);
      webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_vector"), this.vector);
    }
  }, {
    key: "getFragmentShaderMainCode",
    value: function getFragmentShaderMainCode(infos) {
      return "gl_FragColor.rgb += directionalLight(" + infos.normal.varyingName + ".rgb, " + infos.vector.name + ", viewVec, " + infos.ambient.name + ", materialAmbient.rgb," + infos.diffuse.name + ", materialDiffuse.rgb," + infos.specular.name + ", materialSpecular.rgb, materialShininess);";
>>>>>>> tmp
    }
  }, {
    key: "setDirection",
    value: function setDirection(x, y, z) {
      glmatrix.vec3.normalize(this.vector, [-x, -y, -z]);
    }
  }]);

  return DirectionalLight;
}(Light);

module.exports = DirectionalLight;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":38,"../Interfaces/Light.class.js":2}],9:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Light = require("../Interfaces/Light.class.js");

var glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

var Translate = require("../Movements/Translate.class.js");

var Scale = require("../Movements/Scale.class.js");

var Rotate = require("../Movements/Rotate.class.js");

var LookAt = require("../Movements/LookAt.class.js");

var PointLight =
/*#__PURE__*/
function (_Light) {
  _inherits(PointLight, _Light);

  function PointLight() {
    var _this;

    _classCallCheck(this, PointLight);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PointLight).call(this));
    _this.power = 1.;
    _this.rgb;
    _this.position = [0, 0, 0];
    _this.movements = [];
    _this.stepUpAnimation = true;
    _this.dissipation = [1., 1., 1.]; // Disspation constante, linéaire, quadratique

    _this.position = [0, 0, 0];
    _this.positionTranslate = new Translate(_this.position, 0, function () {});

    _this.positionTranslate.setPosition(0, 0, 0);

    _this.positionTranslate.setTranslationVec(0, 0, 0);

    _this.addMovement("position", _this.positionTranslate);

    _this.positionTranslate.start();

    return _this;
  }

  _createClass(PointLight, [{
    key: "setPosition",
    value: function setPosition(x, y, z) {
<<<<<<< HEAD
      this.centerPosition = [x, y, z];
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return this.centerPosition;
    }
  }, {
    key: "setSize",
    value: function setSize(width, height) {
      this.width = width;
      this.height = height;
    }
  }, {
    key: "renderAttribute",
    value: function renderAttribute(attribut, webGLProgram) {
      this.bufferFunctions[attribut](webGLProgram, this);
    }
  }, {
    key: "_sendTextureCoordonnees",
    value: function _sendTextureCoordonnees(webGLProgram, that) {
      var numTexture = 0;

      for (var text in that.textures) {
        if (!(that.textures[text] instanceof MirrorTexture)) {
          webGLProgram.getContext().activeTexture(webGLProgram.getContext().TEXTURE0);
          webGLProgram.getContext().bindTexture(webGLProgram.getContext().TEXTURE_2D, that.textures[text]);
          webGLProgram.getContext().uniform1i(webGLProgram.getShaderBuilder().getPointer("texture"), false, 0);
          webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ARRAY_BUFFER, webGLProgram.getBuffer("textureCoordonnees"));
          webGLProgram.getContext().vertexAttribPointer(webGLProgram.getShaderBuilder().getPointer("textureCoordonnees"), 2, webGLProgram.getContext().FLOAT, false, 0, 0); //Insérer les données

          webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(that.textureCoordonnees), webGLProgram.getContext().STATIC_DRAW);
        }
=======
      this.position = [x, y, z];
      this.positionTranslate.setTranslationVec(x, y, z);
    }
  }, {
    key: "setDissipation",
    value: function setDissipation(cons, lin, quad) {
      this.dissipation = [cons, lin, quad];
    }
  }, {
    key: "enableStepUpAnimation",
    value: function enableStepUpAnimation() {
      this.stepUpAnimation = true;
    }
  }, {
    key: "disableStepUpAnimation",
    value: function disableStepUpAnimation() {
      this.stepUpAnimation = false;
    }
  }, {
    key: "addMovement",
    value: function addMovement(name, movement) {
      if (typeof name != "string") {
        movement = name;
        name = "movement" + Object.keys(this.movements).length;
>>>>>>> tmp
      }
    }
  }, {
    key: "_sendVertexPosition",
    value: function _sendVertexPosition(webGLProgram, that) {
      //Initialisation
      webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ARRAY_BUFFER, webGLProgram.getBuffer("position"));
      webGLProgram.getContext().vertexAttribPointer(webGLProgram.getShaderBuilder().getPointer("position"), 3, webGLProgram.getContext().FLOAT, false, 0, 0); //Insérer les données

<<<<<<< HEAD
      var positions = [that.centerPosition[0] - that.width / 2, that.centerPosition[1] - that.height / 2, that.centerPosition[2], that.centerPosition[0] - that.width / 2, that.centerPosition[1] + that.height / 2, that.centerPosition[2], that.centerPosition[0] + that.width / 2, that.centerPosition[1] + that.height / 2, that.centerPosition[2], that.centerPosition[0] + that.width / 2, that.centerPosition[1] - that.height / 2, that.centerPosition[2]];
      webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(positions), webGLProgram.getContext().STATIC_DRAW);
    }
  }, {
    key: "render",
    value: function render(webGLProgram, attributs, base) {
      var mirror = false; //Mirror PreSettings

      for (var text in this.textures) {
        if (this.textures[text] instanceof MirrorTexture) {
          this.textures[text].preDraw(this);
          mirror = true;
        }
      }

      for (var i = 0; i < attributs.length; i++) {
        this.renderAttribute(attributs[i], webGLProgram);
      } //Local transformation
      //base = matrice héritéé d'un groupe d'objet


      var processedMatrix;
      var processedMatrixMirror;

      if (base == null || typeof base == "undefined") {
        processedMatrix = glmatrix.mat4.create();

        if (mirror) {
          processedMatrixMirror = glmatrix.mat4.create();
          ;
        }

        for (var move in this.movements) {
          this.movements[move].process(processedMatrix);

          if (mirror) {
            this.movements[move].processMirror(processedMatrixMirror);
          }
        }

        webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
      } else {
        processedMatrix = base;

        for (var _move in this.movements) {
          this.movements[_move].process(processedMatrix);

          if (mirror) {
            this.movements[_move].processMirror(processedMatrixMirror);
          }
        }

        webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
      } //Index


      webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, webGLProgram.getBuffer("index"));
      webGLProgram.getContext().bufferData(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexes), webGLProgram.getContext().STATIC_DRAW); //Draw

      webGLProgram.getContext().drawElements(webGLProgram.getContext().TRIANGLES, this.indexes.length, webGLProgram.getContext().UNSIGNED_SHORT, 0); //Mirror PostSettings

      for (var _text in this.textures) {
        if (this.textures[_text] instanceof MirrorTexture) {
          this.textures[_text].postDraw(this, processedMatrixMirror);
        }
=======
      this.movements[name] = movement;
    }
  }, {
    key: "removeMovement",
    value: function removeMovement(name) {
      delete this.movements[name];
    }
  }, {
    key: "render",
    value: function render(webGLProgram, name) {
      //Local transformation
      var processedMatrix = glmatrix.mat4.create();
      var stepUp = this.stepUpAnimation; //Translate

      for (var move in this.movements) {
        if (this.movements[move] instanceof Translate) {
          this.movements[move].process(processedMatrix, stepUp);
        }
      } //Rotate


      for (var _move in this.movements) {
        if (this.movements[_move] instanceof Rotate) {
          this.movements[_move].process(processedMatrix, stepUp);
        }
      } //LookAt


      for (var _move2 in this.movements) {
        if (this.movements[_move2] instanceof LookAt) {
          this.movements[_move2].process(processedMatrix, this);
        }
      } //Scale


      for (var _move3 in this.movements) {
        if (this.movements[_move3] instanceof Scale) {
          this.movements[_move3].process(processedMatrix, stepUp);
        }
      }

      var position = glmatrix.vec3.create();
      glmatrix.vec3.transformMat4(position, position, processedMatrix);
      webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_position"), position);
      var ambientRGB = [];

      for (var i = 0; i < this.ambient.length; i++) {
        ambientRGB[i] = this.ambient[i] * this.aPower;
>>>>>>> tmp
      }

      webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_ambientColor"), ambientRGB);
      var diffuseRGB = [];

      for (var _i = 0; _i < this.diffuse.length; _i++) {
        diffuseRGB[_i] = this.diffuse[_i] * this.dPower;
      }

      webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_diffuseColor"), diffuseRGB);
      var specularRGB = [];

      for (var _i2 = 0; _i2 < this.specular.length; _i2++) {
        specularRGB[_i2] = this.specular[_i2] * this.sPower;
      }

      webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_specularColor"), specularRGB);
      webGLProgram.getContext().uniform1f(webGLProgram.actualShaderBuilder.getPointer(name + "_constDissip"), this.dissipation[0]);
      webGLProgram.getContext().uniform1f(webGLProgram.actualShaderBuilder.getPointer(name + "_linDissip"), this.dissipation[1]);
      webGLProgram.getContext().uniform1f(webGLProgram.actualShaderBuilder.getPointer(name + "_quadDissip"), this.dissipation[2]);
    }
  }, {
    key: "getVertexShaderPreCode",
    value: function getVertexShaderPreCode(infos) {
      var str = 'varying mediump vec3 v' + infos.name + "_dir;";
      return str;
    }
  }, {
    key: "getVertexShaderMainCode",
    value: function getVertexShaderMainCode(infos) {
      //let str = "highp float " + infos.vector.name + "power = dot(normalize(vec3(" + infos.normal.varyingName + ")), " + infos.vector.name + ");";
      var str = "v" + infos.name + "_dir = newVec( gl_Position, vec4(" + infos.position.name + ", 1)).xyz;";
      return str;
    }
  }, {
    key: "getFragmentShaderPreCode",
    value: function getFragmentShaderPreCode(infos) {
      var str = 'varying mediump vec3 v' + infos.name + "_dir;";
      return str;
    }
  }, {
    key: "getFragmentShaderMainCode",
    value: function getFragmentShaderMainCode(infos) {
      return "gl_FragColor.rgb += pointLight(" + infos.normal.varyingName + ".rgb, " + infos.constDissip.name + ", " + infos.linDissip.name + ", " + infos.quadDissip.name + ", v" + infos.name + "_dir, viewVec, " + infos.ambient.name + ", materialAmbient.rgb," + infos.diffuse.name + ", materialDiffuse.rgb," + infos.specular.name + ", materialSpecular.rgb, materialShininess);";
    }
  }]);

<<<<<<< HEAD
  return Plan;
}(Object3D);

module.exports = Plan;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":25,"../Interfaces/Object3D.class.js":5,"../Textures/MirrorTexture.class.js":18}],13:[function(require,module,exports){
=======
  return PointLight;
}(Light);

module.exports = PointLight;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":38,"../Interfaces/Light.class.js":2,"../Movements/LookAt.class.js":12,"../Movements/Rotate.class.js":13,"../Movements/Scale.class.js":14,"../Movements/Translate.class.js":15}],10:[function(require,module,exports){
>>>>>>> tmp
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Light = require("../Interfaces/Light.class.js");

var glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

var Translate = require("../Movements/Translate.class.js");

var Scale = require("../Movements/Scale.class.js");

var Rotate = require("../Movements/Rotate.class.js");

var LookAt = require("../Movements/LookAt.class.js");

var Utils = require("../Utils.class.js");

var SpotLight =
/*#__PURE__*/
function (_Light) {
  _inherits(SpotLight, _Light);

  function SpotLight() {
    var _this;

    _classCallCheck(this, SpotLight);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SpotLight).call(this));
    _this.position = [0, 0, 0];
    _this.movements = [];
    _this.innerLimit = Utils.fromDegToDotSpace(10);
    _this.outerLimit = Utils.fromDegToDotSpace(30);
    _this.stepUpAnimation = true;
    _this.dissipation = [1., 1., 1.]; // Disspation constante, linéaire, quadratique

    _this.position = [0, 0, 0];
    _this.positionTranslate = new Translate(_this.position, 0, function () {});

    _this.positionTranslate.setPosition(0, 0, 0);

    _this.positionTranslate.setTranslationVec(0, 0, 0);

    _this.addMovement("position", _this.positionTranslate);

    _this.positionTranslate.start();

    return _this;
  }

  _createClass(SpotLight, [{
    key: "setDissipation",
    value: function setDissipation(cons, lin, quad) {
      this.dissipation = [cons, lin, quad];
    }
  }, {
    key: "enableStepUpAnimation",
    value: function enableStepUpAnimation() {
      this.stepUpAnimation = true;
    }
  }, {
    key: "disableStepUpAnimation",
    value: function disableStepUpAnimation() {
      this.stepUpAnimation = false;
    }
  }, {
    key: "setPosition",
    value: function setPosition(x, y, z) {
      this.position = [x, y, z];
      this.positionTranslate.setTranslationVec(x, y, z);
    }
  }, {
    key: "setLimits",
    value: function setLimits(inner, outer) {
      this.innerLimit = Utils.fromDegToDotSpace(inner);
      this.outerLimit = Utils.fromDegToDotSpace(outer);
    }
  }, {
    key: "setDirection",
    value: function setDirection(x, y, z) {
      this.vec = [x, y, z];
    }
  }, {
    key: "addMovement",
    value: function addMovement(name, movement) {
      if (typeof name != "string") {
        movement = name;
        name = "movement" + Object.keys(this.movements).length;
      }

      this.movements[name] = movement;
    }
  }, {
    key: "removeMovement",
    value: function removeMovement(name) {
      delete this.movements[name];
    }
  }, {
<<<<<<< HEAD
    key: "get3DObjects",
    value: function get3DObjects() {
      return this.objects;
    }
  }, {
    key: "setClearColor",
    value: function setClearColor(r, g, b, a) {
      this.clearColor = [r, g, b, a];
=======
    key: "render",
    value: function render(webGLProgram, name) {
      //Local transformation
      var processedMatrix = glmatrix.mat4.create();
      var stepUp = this.stepUpAnimation; //Translate

      for (var move in this.movements) {
        if (this.movements[move] instanceof Translate) {
          this.movements[move].process(processedMatrix, stepUp);
        }
      } //Rotate


      for (var _move in this.movements) {
        if (this.movements[_move] instanceof Rotate) {
          this.movements[_move].process(processedMatrix, stepUp);
        }
      } //LookAt


      for (var _move2 in this.movements) {
        if (this.movements[_move2] instanceof LookAt) {
          this.movements[_move2].process(processedMatrix, this);
        }
      } //Scale


      for (var _move3 in this.movements) {
        if (this.movements[_move3] instanceof Scale) {
          this.movements[_move3].process(processedMatrix, stepUp);
        }
      }

      var position = glmatrix.vec3.create();
      glmatrix.vec3.transformMat4(position, position, processedMatrix);
      var direction = glmatrix.vec3.create();
      var processedMatrixWithoutTranslate = glmatrix.mat3.create();
      glmatrix.mat3.fromMat4(processedMatrixWithoutTranslate, processedMatrix);
      glmatrix.vec3.transformMat3(direction, this.vec, processedMatrixWithoutTranslate); //Limits

      webGLProgram.getContext().uniform1f(webGLProgram.actualShaderBuilder.getPointer(name + "_iLimit"), this.innerLimit);
      webGLProgram.getContext().uniform1f(webGLProgram.actualShaderBuilder.getPointer(name + "_oLimit"), this.outerLimit); //Vectors

      webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_direction"), direction);
      webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_position"), position);
      var ambientRGB = [];

      for (var i = 0; i < this.ambient.length; i++) {
        ambientRGB[i] = this.ambient[i] * this.aPower;
      }

      webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_ambientColor"), ambientRGB);
      var diffuseRGB = [];

      for (var _i = 0; _i < this.diffuse.length; _i++) {
        diffuseRGB[_i] = this.diffuse[_i] * this.dPower;
      }

      webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_diffuseColor"), diffuseRGB);
      var specularRGB = [];

      for (var _i2 = 0; _i2 < this.specular.length; _i2++) {
        specularRGB[_i2] = this.specular[_i2] * this.sPower;
      }

      webGLProgram.getContext().uniform3fv(webGLProgram.actualShaderBuilder.getPointer(name + "_specularColor"), specularRGB);
      webGLProgram.getContext().uniform1f(webGLProgram.actualShaderBuilder.getPointer(name + "_constDissip"), this.dissipation[0]);
      webGLProgram.getContext().uniform1f(webGLProgram.actualShaderBuilder.getPointer(name + "_linDissip"), this.dissipation[1]);
      webGLProgram.getContext().uniform1f(webGLProgram.actualShaderBuilder.getPointer(name + "_quadDissip"), this.dissipation[2]);
>>>>>>> tmp
    }
  }, {
    key: "getVertexShaderPreCode",
    value: function getVertexShaderPreCode(infos) {
      var str = 'varying mediump vec3 v' + infos.name + "_dir;";
      return str;
    }
  }, {
    key: "getVertexShaderMainCode",
    value: function getVertexShaderMainCode(infos) {
      var str = "v" + infos.name + "_dir = newVec( gl_Position, vec4(" + infos.position.name + ", 1)).xyz;";
      return str;
    }
  }, {
    key: "getFragmentShaderPreCode",
    value: function getFragmentShaderPreCode(infos) {
      var str = 'varying mediump vec3 v' + infos.name + "_dir;";
      return str;
    }
  }, {
    key: "getFragmentShaderMainCode",
    value: function getFragmentShaderMainCode(infos) {
      return "gl_FragColor.rgb += spotLight(" + infos.normal.varyingName + ".rgb, " + infos.iLimit.name + ", " + infos.oLimit.name + ", " + infos.direction.name + ", " + infos.constDissip.name + ", " + infos.linDissip.name + ", " + infos.quadDissip.name + ", v" + infos.name + "_dir, viewVec, " + infos.ambient.name + ", materialAmbient.rgb," + infos.diffuse.name + ", materialDiffuse.rgb," + infos.specular.name + ", materialSpecular.rgb, materialShininess);";
    }
  }]);

  return SpotLight;
}(Light);

<<<<<<< HEAD
module.exports = Scene;
},{"./ShaderBuilder.class.js":14}],14:[function(require,module,exports){
=======
module.exports = SpotLight;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":38,"../Interfaces/Light.class.js":2,"../Movements/LookAt.class.js":12,"../Movements/Rotate.class.js":13,"../Movements/Scale.class.js":14,"../Movements/Translate.class.js":15,"../Utils.class.js":28}],11:[function(require,module,exports){
>>>>>>> tmp
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Utils = require("./Utils.class");

var MirrorTexture = require("./Textures/MirrorTexture.class");

var ColorTexture = require("./Textures/ColorTexture.class");

var FrameTexture = require("./Textures/FrameTexture.class");

var CanvasTexture = require("./Textures/CanvasTexture.class");

var glmatrix = require("../../node_modules/gl-matrix/gl-matrix-min.js");

var Material =
/*#__PURE__*/
function () {
  function Material(ambient, diffuse, specular, shininess) {
    _classCallCheck(this, Material);

    this.id = Utils.newMaterialID(this);
    this.ambientTextures = [];
    this.diffuseTextures = [];
    this.specularTextures = [];
    this.shininessTextures = [];
    this.normalTextures = [];
    this.normals = [];
    this.normalMap = false;
    this.opacity = 1; //Mapping

    this.textures = [];
  }

  _createClass(Material, [{
    key: "render",
    value: function render(webGLProgram) {
      var textIndexes = [];
      var gl = webGLProgram.getContext(); //Renders textures units

      var i = 1;
      var countT = 0;

      for (var text in this.textures) {
        if (!(this.textures[text] instanceof MirrorTexture) && !(this.textures[text] instanceof ColorTexture)) {
          gl.activeTexture(gl.TEXTURE0 + 0);
          gl.bindTexture(gl.TEXTURE_2D, this.textures[text].getTexture());
          gl.uniform1i(webGLProgram.getShaderBuilder().getPointer("texture" + countT), false, 0);
          textIndexes[text] = i;
          i *= 2;
          countT++;
        }
      }

      var colorIndexes = []; //Renders colors

      var j = 1;
      var countC = 0;

      for (var _text in this.textures) {
        if (this.textures[_text] instanceof ColorTexture) {
          gl.uniform4fv(webGLProgram.actualShaderBuilder.getPointer("color" + countC), this.textures[_text].getRGBA());
          colorIndexes[_text] = j;
          j *= 2;
          countC++;
        }
      } //Renders nombres of informations pour chaque caractéristique
      //Ambient


      var count = 0;
      var count2 = 0;

      for (var _text2 in this.ambientTextures) {
        if (!(this.textures[this.ambientTextures[_text2]] instanceof MirrorTexture) && !(this.textures[this.ambientTextures[_text2]] instanceof ColorTexture)) {
          count += textIndexes[this.ambientTextures[_text2]];
        } else if (this.textures[this.ambientTextures[_text2]] instanceof ColorTexture) {
          count2 += colorIndexes[this.ambientTextures[_text2]];
        }
      }

      gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("ambientTIndex"), count);
      gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("ambientCIndex"), count2); //Diffuse

      count = 0;
      count2 = 0;

      for (var _text3 in this.diffuseTextures) {
        if (!(this.textures[this.diffuseTextures[_text3]] instanceof MirrorTexture) && !(this.textures[this.diffuseTextures[_text3]] instanceof ColorTexture)) {
          count += textIndexes[this.diffuseTextures[_text3]];
        } else if (this.textures[this.diffuseTextures[_text3]] instanceof ColorTexture) {
          count2 += colorIndexes[this.diffuseTextures[_text3]];
        }
      }

      gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("diffuseTIndex"), count);
      gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("diffuseCIndex"), count2); //Specular

      count = 0;
      count2 = 0;

      for (var _text4 in this.specularTextures) {
        if (!(this.textures[this.specularTextures[_text4]] instanceof MirrorTexture) && !(this.textures[this.specularTextures[_text4]] instanceof ColorTexture)) {
          count += textIndexes[this.specularTextures[_text4]];
        } else if (this.textures[this.specularTextures[_text4]] instanceof ColorTexture) {
          count2 += colorIndexes[this.specularTextures[_text4]];
        }
      }

      gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("specularTIndex"), count);
      gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("specularCIndex"), count2); //Shininess

      count = 0;
      count2 = 0;

      for (var _text5 in this.shininessTextures) {
        if (!(this.textures[this.shininessTextures[_text5]] instanceof MirrorTexture) && !(this.textures[this.shininessTextures[_text5]] instanceof ColorTexture)) {
          count += textIndexes[this.shininessTextures[_text5]];
        } else if (this.textures[this.shininessTextures[_text5]] instanceof ColorTexture) {
          count2 += colorIndexes[this.shininessTextures[_text5]];
        }
      }

      gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("shininessTIndex"), count);
      gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("shininessCIndex"), count2); //Normal

      count = 0;
      count2 = 0;

      for (var _text6 in this.normalTextures) {
        if (!(this.textures[this.normalTextures[_text6]] instanceof MirrorTexture) && !(this.textures[this.normalTextures[_text6]] instanceof ColorTexture)) {
          count += textIndexes[this.normalTextures[_text6]];
        } else if (this.textures[this.normalTextures[_text6]] instanceof ColorTexture) {
          count2 += colorIndexes[this.normalTextures[_text6]];
        }
      }

      gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("normalTIndex"), count);
      gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("normalCIndex"), count2);

      if (this.normalMap) {
        gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("normalVarying"), 0);
      } else {
        gl.uniform1i(webGLProgram.actualShaderBuilder.getPointer("normalVarying"), 1);
      }
    }
  }, {
    key: "getTextures",
    value: function getTextures() {
      return this.textures;
    }
  }, {
    key: "getInfos",
    value: function getInfos() {
      var nbTextures = 0;
      var nbColors = 0;

      for (var text in this.textures) {
        if (!(this.textures[text] instanceof MirrorTexture) && !(this.textures[text] instanceof ColorTexture)) {
          nbTextures++;
        } else if (this.textures[text] instanceof ColorTexture) {
          nbColors++;
        }
      }

      return {
        "textures": nbTextures,
        "colors": nbColors
      };
    }
  }, {
    key: "setOpacity",
    value: function setOpacity(value) {
      this.opacity = value;
    }
  }, {
    key: "getOpacity",
    value: function getOpacity() {
      return this.opacity;
    }
  }, {
    key: "generateNormalPositions",
    value: function generateNormalPositions(that) {
      var positions = [];

      for (var i = 0; i < this.normals.length / 3; i++) {
        positions[positions.length] = that.positions[i * 3];
        positions[positions.length] = that.positions[i * 3 + 1];
        positions[positions.length] = that.positions[i * 3 + 2];
        positions[positions.length] = that.positions[i * 3] + this.normals[i * 3];
        positions[positions.length] = that.positions[i * 3 + 1] + this.normals[i * 3 + 1];
        positions[positions.length] = that.positions[i * 3 + 2] + this.normals[i * 3 + 2];
      }

      return positions;
    }
  }, {
    key: "generateNormals",
    value: function generateNormals(that) {
      this.normals = [];

      for (var i = 0; i < that.indexes.length / 3; i++) {
        var p1 = [that.positions[that.indexes[i * 3] * 3], that.positions[that.indexes[i * 3] * 3 + 1], that.positions[that.indexes[i * 3] * 3 + 2]];
        var p2 = [that.positions[that.indexes[i * 3 + 1] * 3], that.positions[that.indexes[i * 3 + 1] * 3 + 1], that.positions[that.indexes[i * 3 + 1] * 3 + 2]];
        var p3 = [that.positions[that.indexes[i * 3 + 2] * 3], that.positions[that.indexes[i * 3 + 2] * 3 + 1], that.positions[that.indexes[i * 3 + 2] * 3 + 2]];
        var vec1 = glmatrix.vec3.create();
        var vec2 = glmatrix.vec3.create();
        glmatrix.vec3.scale(p1, p1, -1);
        glmatrix.vec3.add(vec1, p2, p1);
        glmatrix.vec3.add(vec2, p3, p1);
        var norm = glmatrix.vec3.create();
        glmatrix.vec3.cross(norm, vec1, vec2);
        glmatrix.vec3.normalize(norm, norm);
        this.normals[that.indexes[i * 3] * 3] = norm[0];
        this.normals[that.indexes[i * 3] * 3 + 1] = norm[1];
        this.normals[that.indexes[i * 3] * 3 + 2] = norm[2];
        this.normals[that.indexes[i * 3 + 1] * 3] = norm[0];
        this.normals[that.indexes[i * 3 + 1] * 3 + 1] = norm[1];
        this.normals[that.indexes[i * 3 + 1] * 3 + 2] = norm[2];
        this.normals[that.indexes[i * 3 + 2] * 3] = norm[0];
        this.normals[that.indexes[i * 3 + 2] * 3 + 1] = norm[1];
        this.normals[that.indexes[i * 3 + 2] * 3 + 2] = norm[2];
      }
    }
  }, {
    key: "renderTextures",
    value: function renderTextures(that) {
      for (var n in this.textures) {
        if (this.textures[n] instanceof CanvasTexture) {
          this.textures[n].update();
        } else if (this.textures[n] instanceof FrameTexture) {
          this.textures[n].update(that);
        }
      }
    }
  }, {
    key: "addTexture",
    value: function addTexture(name, texture) {
      if (typeof name != "string") {
        texture = name;
        name = "texture" + Object.keys(this.textures).length;
      }

      this.textures[name] = texture;
      this.ambientTextures = [name];
      this.diffuseTextures = [name];
      this.specularTextures = [name];
      this.shininessTextures = [name];
    }
  }, {
    key: "removeTexture",
    value: function removeTexture(name) {
      delete this.textures[name];
    }
  }, {
    key: "assignTexture",
    value: function assignTexture(name, type) {}
  }, {
    key: "isTransparent",
    value: function isTransparent() {
      this.transparency = false;

      for (var text in this.textures) {
        if (this.textures[text] instanceof MirrorTexture) {
          this.transparency = true;
          this.mirror = true;
        } else if (this.textures[text] instanceof ColorTexture && this.textures[text].getRGBA()[3] < 1) {
          this.transparency = true;
        } else if (this.opacity < 1) {
          this.transparency = true;
        } //Gérer le cas des ImageTexture Transparentes

      }

      return this.transparency;
    }
  }, {
    key: "preDraw",
    value: function preDraw(that, processedMatrix) {
      for (var text in this.textures) {
        this.textures[text].preDraw(that, processedMatrix);
      }
    }
  }, {
    key: "postDraw",
    value: function postDraw(that, processedMatrix) {
      for (var text in this.textures) {
        this.textures[text].postDraw(that, processedMatrix);
      }
    }
  }]);

  return Material;
}();

module.exports = Material;
},{"../../node_modules/gl-matrix/gl-matrix-min.js":38,"./Textures/CanvasTexture.class":22,"./Textures/ColorTexture.class":23,"./Textures/FrameTexture.class":25,"./Textures/MirrorTexture.class":27,"./Utils.class":28}],12:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

var Movement = require("../Interfaces/Movement.class.js");

var Utils = require("../Utils.class.js");

var LookAt =
/*#__PURE__*/
function (_Movement) {
  _inherits(LookAt, _Movement);

  function LookAt(center, up) {
    var _this;

    _classCallCheck(this, LookAt);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LookAt).call(this));
    _this.center = center;
    _this.up = up;
    _this.animate = false;
    return _this;
  }

  _createClass(LookAt, [{
    key: "setCenter",
    value: function setCenter(center) {
      this.center = center;
    }
  }, {
    key: "process",
    value: function process(matrix, viewer) {
      var centerP;

      if (typeof this.center == "array") {
        centerP = glmatrix.vec3.fromValues(this.center[0], this.center[1], this.center[2]);
      } else {
        centerP = this.center.getPosition();
        centerP = glmatrix.vec3.fromValues(centerP[0], centerP[1], centerP[2]);
      }

      var eyePosition = glmatrix.vec3.create();
      glmatrix.vec3.transformMat4(eyePosition, eyePosition, matrix);
      var lookAt = glmatrix.mat4.create();
      glmatrix.mat4.targetTo(matrix, eyePosition, centerP, this.up);
    }
  }, {
    key: "clone",
    value: function clone() {
      var neww = new this.constructor();
      neww.center = this.center;
      neww.up = this.up.slice();
      return neww;
    }
  }]);

  return LookAt;
}(Movement);

module.exports = LookAt;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":38,"../Interfaces/Movement.class.js":4,"../Utils.class.js":28}],13:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

var Movement = require("../Interfaces/Movement.class.js");

var Utils = require("../Utils.class.js");

var Rotate =
/*#__PURE__*/
function (_Movement) {
  _inherits(Rotate, _Movement);

  function Rotate(angle, axe, nbFrame, callback) {
    var _this;

    _classCallCheck(this, Rotate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rotate).call(this));
    _this.angle = Math.PI * (angle / 180);
    _this.axe = axe;
    _this.nbFrame = nbFrame;
    _this.step = 0;
    _this.positions = [0, 0, 0];
    _this.started = false;
    _this.callback = callback;
    _this.finished = false;
    _this.animate = nbFrame > 0;

    if (typeof callback != "undefined") {
      _this.callback = callback;
    } else {
      _this.callback = null;
    }

    return _this;
  }

  _createClass(Rotate, [{
    key: "setPosition",
    value: function setPosition(x, y, z) {
      this.positions = [x, y, z];
    }
  }, {
    key: "process",
    value: function process(matrix, stepup) {
      //glmatrix.vec3.transformQuat(axe, this.axe, quat);
      //const quat = glmatrix.quat.create();
      //glmatrix.mat4.getRotation(quat, matrix);
      //glmatrix.quat.invert(quat, quat);
      var positions = this.positions; //glmatrix.vec3.create();
      //const axe = glmatrix.vec3.create();

      glmatrix.mat4.translate(matrix, matrix, [this.positions[0], this.positions[1], this.positions[2]]);

      if (this.animate) {
        glmatrix.mat4.rotate(matrix, matrix, this.angle * _get(_getPrototypeOf(Rotate.prototype), "getPourcent", this).call(this), this.axe
        /*axe*/
        );
      } else {
        glmatrix.mat4.rotate(matrix, matrix, this.angle, this.axe
        /*axe*/
        );
      } //glmatrix.vec3.transformQuat(positions, this.positions, quat);


      glmatrix.mat4.translate(matrix, matrix, [-this.positions[0], -this.positions[1], -this.positions[2]]);

      if (stepup && this.animate) {
        _get(_getPrototypeOf(Rotate.prototype), "endFrame", this).call(this);
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      var neww = new this.constructor();
      neww.angle = this.angle;
      neww.axe = this.axe;
      neww.nbFrame = this.nbFrame;
      neww.step = this.step;
      neww.positions = this.positions.slice();
      neww.started = this.started;
      neww.classback = this.callback;
      neww.finished = this.finished;
      return neww;
    }
  }]);

  return Rotate;
}(Movement);

module.exports = Rotate;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":38,"../Interfaces/Movement.class.js":4,"../Utils.class.js":28}],14:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

var Movement = require("../Interfaces/Movement.class.js");

var Scale =
/*#__PURE__*/
function (_Movement) {
  _inherits(Scale, _Movement);

  function Scale(vec, nbFrame, callback) {
    var _this;

    _classCallCheck(this, Scale);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Scale).call(this));
    _this.vec = vec;
    _this.nbFrame = nbFrame;
    _this.positions = [0, 0, 0];
    _this.started = false;
    _this.finished = false;
    _this.animate = nbFrame > 0;

    if (typeof callback != "undefined") {
      _this.callback = callback;
    } else {
      _this.callback = null;
    }

    return _this;
  }

  _createClass(Scale, [{
    key: "setPosition",
    value: function setPosition(x, y, z) {
      this.positions = [x, y, z];
    }
  }, {
    key: "setScaleVec",
    value: function setScaleVec(x, y, z) {
      this.vec = [x, y, z];
    }
  }, {
    key: "process",
    value: function process(matrix, stepup) {
      glmatrix.mat4.translate(matrix, matrix, [this.positions[0], this.positions[1], this.positions[2]]);

      if (this.animate) {
        var vec = glmatrix.vec3.create();

        var pourcent = _get(_getPrototypeOf(Scale.prototype), "getPourcent", this).call(this);

        glmatrix.vec3.scale(vec, this.vec, pourcent);
        glmatrix.mat4.scale(matrix, matrix, vec);
      } else {
        glmatrix.mat4.scale(matrix, matrix, this.vec);
      }

      glmatrix.mat4.translate(matrix, matrix, [-this.positions[0], -this.positions[1], -this.positions[2]]);

      if (stepup && this.animate) {
        _get(_getPrototypeOf(Scale.prototype), "endFrame", this).call(this);
      }
    }
  }]);

  return Scale;
}(Movement);

module.exports = Scale;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":38,"../Interfaces/Movement.class.js":4}],15:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

var Movement = require("../Interfaces/Movement.class.js");

var Translate =
/*#__PURE__*/
function (_Movement) {
  _inherits(Translate, _Movement);

  function Translate(vec, nbFrame, callback) {
    var _this;

    _classCallCheck(this, Translate);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Translate).call(this));
    _this.vec = vec;
    _this.nbFrame = nbFrame;
    _this.step = 0;
    _this.positions = [0, 0, 0];
    _this.callback = callback;
    _this.animate = nbFrame > 0;

    if (typeof callback != "undefined") {
      _this.callback = callback;
    } else {
      _this.callback = null;
    }

    return _this;
  }

  _createClass(Translate, [{
    key: "setTranslationVec",
    value: function setTranslationVec(x, y, z) {
      this.vec = [x, y, z];
    }
  }, {
    key: "setPosition",
    value: function setPosition(x, y, z) {
      this.positions = [x, y, z];
    }
  }, {
    key: "process",
    value: function process(matrix, stepup) {
      glmatrix.mat4.translate(matrix, matrix, [this.positions[0], this.positions[1], this.positions[2]]);

      if (this.animate) {
        var vec = glmatrix.vec3.create();

        var pourcent = _get(_getPrototypeOf(Translate.prototype), "getPourcent", this).call(this);

        glmatrix.vec3.scale(vec, this.vec, [pourcent, pourcent, pourcent]);
        glmatrix.mat4.translate(matrix, matrix, vec);
      } else {
        glmatrix.mat4.translate(matrix, matrix, this.vec);
      }

      glmatrix.mat4.translate(matrix, matrix, [-this.positions[0], -this.positions[1], -this.positions[2]]);

      if (stepup && this.animate) {
        _get(_getPrototypeOf(Translate.prototype), "endFrame", this).call(this);
      }
    }
  }]);

  return Translate;
}(Movement);

module.exports = Translate;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":38,"../Interfaces/Movement.class.js":4}],16:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Object3D = require("../Interfaces/Object3D.class.js");

var glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

var Utils = require("../Utils.class.js");

var MirrorTexture = require("../Textures/MirrorTexture.class");

var ColorTexture = require("../Textures/ColorTexture.class");

var CanvasTexture = require("../Textures/CanvasTexture.class");

var FrameTexture = require("../Textures/FrameTexture.class");

var Translate = require("../Movements/Translate.class.js");

var Scale = require("../Movements/Scale.class.js");

var Rotate = require("../Movements/Rotate.class.js");

var Cube =
/*#__PURE__*/
function (_Object3D) {
  _inherits(Cube, _Object3D);

  function Cube(material) {
    var _this;

    _classCallCheck(this, Cube);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cube).call(this, material));
    _this.colors = [0., 0., 1., 1., //Face avant
    0., 0., 1., 1., 0., 0., 1., 1., 0., 0., 1., 1., 0., 1., 1., 1., //Face gauche
    0., 1., 1., 1., 0., 1., 1., 1., 0., 1., 1., 1., 1., 1., 0., 1., //Face haute
    1., 1., 0., 1., 1., 1., 0., 1., 1., 1., 0., 1., 0., 1., 0., 1., //Face droite
    0., 1., 0., 1., 0., 1., 0., 1., 0., 1., 0., 1., 1., 1., 1., 1., //Face dessous
    1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 1., 0., 0., 1., //Face derriere
    1., 0., 0., 1., 1., 0., 0., 1., 1., 0., 0., 1.]; //Position

    _this.positions = [-0.5, -0.5, 0.5, //Face avant
    -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, //Face gauche
    -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, //Face haute
    0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, //Face droite
    0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, //Face dessous
    -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5, //Face derriere
    -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5]; //Scale

    _this.size = 1;
    _this.sizeScale = new Scale([_this.size / 2, _this.size / 2, _this.size / 2], 0, function () {});

    _this.sizeScale.setPosition(0, 0, 0);

    _this.addMovement("size", _this.sizeScale);

    _this.sizeScale.start();

    _this.indexes = [0, 2, 1, 0, 3, 2, // avant
    4, 6, 5, 4, 7, 6, // gauche
    8, 10, 9, 8, 11, 10, // haut
    12, 14, 13, 12, 15, 14, // bas
    16, 18, 17, 16, 19, 18, // dessous
    20, 22, 21, 20, 23, 22 // derriere
    ];
    _this.textureCoordonnees = [0., 0., 0., 1., 1., 1., 1., 0., 0., 0., 0., 1., 1., 1., 1., 0., 0., 0., 0., 1., 1., 1., 1., 0., 0., 0., 0., 1., 1., 1., 1., 0., 0., 0., 0., 1., 1., 1., 1., 0., 0., 0., 0., 1., 1., 1., 1., 0.];
    _this.bufferFunctions = {
      "position": _this._sendVertexPosition,
      "color": _this._sendVertexColor,
      "textureCoordonnees": _this._sendTextureCoordonnees,
      "normal": _this._sendVertexNormals
    };

    _this.material.generateNormals(_assertThisInitialized(_this));

    return _this;
  }

  _createClass(Cube, [{
    key: "setSize",
    value: function setSize(s) {
      this.size = s;
      this.sizeScale.setScaleVec(s, s, s);
    }
  }, {
    key: "setColors",
    value: function setColors(devant, gauche, haut, droite, bas, derriere) {
      this.colors = [];
      this.colors = this.colors.concat(devant).concat(devant).concat(devant).concat(devant);
      this.colors = this.colors.concat(gauche).concat(gauche).concat(gauche).concat(gauche);
      this.colors = this.colors.concat(haut).concat(haut).concat(haut).concat(haut);
      this.colors = this.colors.concat(droite).concat(droite).concat(droite).concat(droite);
      this.colors = this.colors.concat(bas).concat(bas).concat(bas).concat(bas);
      this.colors = this.colors.concat(derriere).concat(derriere).concat(derriere).concat(derriere);
    }
  }, {
    key: "renderAttribute",
    value: function renderAttribute(attribut, webGLProgram, func) {
      this.bufferFunctions[attribut](webGLProgram, this, func);
    }
  }, {
    key: "_sendTextureCoordonnees",
    value: function _sendTextureCoordonnees(webGLProgram, that) {
      //Render textures
      that.material.render(webGLProgram);
      webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ARRAY_BUFFER, webGLProgram.getBuffer("textureCoordonnees"));
      webGLProgram.getContext().vertexAttribPointer(webGLProgram.getShaderBuilder().getPointer("textureCoordonnees"), 2, webGLProgram.getContext().FLOAT, false, 0, 0); //Insérer les données

      webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(that.textureCoordonnees), webGLProgram.getContext().STATIC_DRAW);
    }
  }, {
    key: "_sendVertexColor",
    value: function _sendVertexColor(webGLProgram, that) {
      //Initialisation
      webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ARRAY_BUFFER, webGLProgram.getBuffer("color"));
      webGLProgram.getContext().vertexAttribPointer(webGLProgram.getShaderBuilder().getPointer("color"), 4, webGLProgram.getContext().FLOAT, false, 0, 0); //Insérer les données

      webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(that.colors), webGLProgram.getContext().STATIC_DRAW);
    }
  }, {
    key: "_sendVertexPosition",
    value: function _sendVertexPosition(webGLProgram, that) {
      //Initialisation
      webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ARRAY_BUFFER, webGLProgram.getBuffer("position"));
      webGLProgram.getContext().vertexAttribPointer(webGLProgram.getShaderBuilder().getPointer("position"), 3, webGLProgram.getContext().FLOAT, false, 0, 0);

      if (webGLProgram.getShaderBuilder().getMode() != "normal") {
        webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(that.positions), webGLProgram.getContext().STATIC_DRAW);
      } else {
        var positions = that.material.generateNormalPositions(that);
        webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(positions), webGLProgram.getContext().STATIC_DRAW);
      }
    }
  }, {
    key: "_sendVertexNormals",
    value: function _sendVertexNormals(webGLProgram, that) {
      //Initialisation
      webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ARRAY_BUFFER, webGLProgram.getBuffer("normal"));
      webGLProgram.getContext().vertexAttribPointer(webGLProgram.getShaderBuilder().getPointer("normal"), 3, webGLProgram.getContext().FLOAT, false, 0, 0);
      webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(that.material.normals), webGLProgram.getContext().STATIC_DRAW);
    }
  }, {
    key: "draw",
    value: function draw(webGLProgram, attributs, processedMatrix, orderTriangles) {
      _get(_getPrototypeOf(Cube.prototype), "draw", this).call(this, webGLProgram);

      if (typeof orderTriangles != "undefined" && orderTriangles) {
        this._orderPositionsByDistance(webGLProgram.getScene().getCamera().getPosition(), processedMatrix);
      }

      for (var i = 0; i < attributs.length; i++) {
        this.renderAttribute(attributs[i], webGLProgram);
      }

      webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
      var ti = glmatrix.mat4.create();
      glmatrix.mat4.invert(ti, processedMatrix);
      glmatrix.mat4.transpose(ti, ti);
      webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformationTransposeInvert"), false, ti); //Index

      webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, webGLProgram.getBuffer("index"));

      if (webGLProgram.getShaderBuilder().getMode() == "line") {
        var indexes = _get(_getPrototypeOf(Cube.prototype), "toLines", this).call(this, this.indexes);

        webGLProgram.getContext().bufferData(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), webGLProgram.getContext().STATIC_DRAW); //Draw

        webGLProgram.getContext().drawElements(webGLProgram.getContext().LINES, indexes.length, webGLProgram.getContext().UNSIGNED_SHORT, 0);
      } else if (webGLProgram.getShaderBuilder().getMode() == "normal") {
        webGLProgram.getContext().uniform4fv(webGLProgram.getShaderBuilder().getPointer("normalColor"), webGLProgram.getShaderBuilder().getNormalColor());
        webGLProgram.getContext().drawArrays(webGLProgram.getContext().LINES, 0, this.material.normals.length * 2 / 3);
      } else {
        webGLProgram.getContext().bufferData(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexes), webGLProgram.getContext().STATIC_DRAW); //Draw

        webGLProgram.getContext().drawElements(webGLProgram.getContext().TRIANGLES, this.indexes.length, webGLProgram.getContext().UNSIGNED_SHORT, 0);
      }
    }
  }, {
    key: "getDistance",
    value: function getDistance(x, y, z, transform) {
      var vec1 = glmatrix.vec3.fromValues(x, y, z);
      var vec2 = glmatrix.vec3.create();
      glmatrix.vec3.transformMat4(vec2, vec2, transform);
      return glmatrix.vec3.distance(vec1, vec2);
    }
  }, {
    key: "clone",
    value: function clone() {
      var neww = new this.constructor();

      _get(_getPrototypeOf(Cube.prototype), "clone", this).call(this, neww);

      neww.size = this.size;
      neww.position = this.position.slice();
      neww.colors = this.colors.slice();
      Object.assign(neww.movements, this.movements);
      neww.indexes = this.indexes.slice();
      neww.textureCoordonnees = this.textureCoordonnees.slice();
      Object.assign(neww.bufferFunctions, this.bufferFunctions);
      return neww;
    }
  }, {
    key: "getTextures",
    value: function getTextures() {
      return this.material.getTextures();
    }
  }, {
    key: "getTextureDimensions",
    value: function getTextureDimensions() {
      return [this.size, this.size];
    }
  }]);

  return Cube;
}(Object3D);

module.exports = Cube;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":38,"../Interfaces/Object3D.class.js":5,"../Movements/Rotate.class.js":13,"../Movements/Scale.class.js":14,"../Movements/Translate.class.js":15,"../Textures/CanvasTexture.class":22,"../Textures/ColorTexture.class":23,"../Textures/FrameTexture.class":25,"../Textures/MirrorTexture.class":27,"../Utils.class.js":28}],17:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Object3D = require("../Interfaces/Object3D.class.js");

var glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

var Object3DGroup =
/*#__PURE__*/
function (_Object3D) {
  _inherits(Object3DGroup, _Object3D);

  function Object3DGroup() {
    var _this;

    _classCallCheck(this, Object3DGroup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Object3DGroup).call(this));
    _this.objects = [];
    _this.bufferFunctions = {
      "position": _this._sendVertexPosition,
      "color": _this._sendVertexColor
    };
    return _this;
  }

  _createClass(Object3DGroup, [{
    key: "add3DObject",
    value: function add3DObject(name, object) {
      this.objects[name] = object;
    }
  }, {
    key: "remove3DObject",
    value: function remove3DObject(name) {
      delete this.objects[name];
    }
    /*  updatePosition(){
        let nb = 0;
        let posX = 0;
        let posY = 0;
        let posZ = 0;
        for(let obj in this.objects){
          const p = this.objects[obj].getPosition();
          posX += p[0];
          posY += p[1];
          posZ += p[2];
          nb++;
        }
    
        this.setPosition(posX / nb, posY / nb, posZ / nb);
      }
    
      getPosition(){
        this.updatePosition();
        return super.getPosition();
      }*/

  }, {
    key: "getAllObjects",
    value: function getAllObjects(r) {
      for (var obj in this.objects) {
        if (this.objects[obj] instanceof Object3DGroup) {
          this.objects[obj].getAllObjects(r);
        } else {
          r[obj] = this.objects[obj];
        }
      }
    }
  }, {
    key: "render",
    value: function render(transformsCollection, base) {
      //this.updatePosition();
      //Local transformation
      //base = matrice héritéé d'un groupe d'objet
      var processedMatrix;
      var stepUp = this.mirrored == 0;

      if (base == null || typeof base == "undefined") {
        processedMatrix = glmatrix.mat4.create();

        if (this.mirrored == 0) {
          for (var move in this.movements) {
            this.movements[move].process(processedMatrix, stepUp);
          }
        }
      } else {
        processedMatrix = base;

        if (this.mirrored == 0) {
          for (var _move in this.movements) {
            this.movements[_move].process(processedMatrix, stepUp);
          }
        }
      }

      for (var object in this.objects) {
        var copy = glmatrix.mat4.clone(processedMatrix);
        this.objects[object].render(transformsCollection, copy);
      }
    }
  }, {
    key: "draw",
    value: function draw() {}
  }, {
    key: "clone",
    value: function clone() {}
  }]);

  return Object3DGroup;
}(Object3D);

module.exports = Object3DGroup;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":38,"../Interfaces/Object3D.class.js":5}],18:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Object3D = require("../Interfaces/Object3D.class.js");

var glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

var MirrorTexture = require("../Textures/MirrorTexture.class.js");

var ColorTexture = require("../Textures/ColorTexture.class");

var CanvasTexture = require("../Textures/CanvasTexture.class");

var FrameTexture = require("../Textures/FrameTexture.class");

var Scale = require("../Movements/Scale.class.js");

var Translate = require("../Movements/Translate.class.js");

var Rotate = require("../Movements/Rotate.class.js");

var Plan =
/*#__PURE__*/
function (_Object3D) {
  _inherits(Plan, _Object3D);

  function Plan(material) {
    var _this;

    _classCallCheck(this, Plan);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Plan).call(this, material));
    _this.indexes = [0, 1, 2, 0, 2, 3 // avant
    ];
    _this.textureCoordonnees = [0., 0., 0., 1., 1., 1., 1., 0.];
    _this.positions = [-0.5, -0.5, 0, -0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0];
    _this.bufferFunctions = {
      "position": _this._sendVertexPosition,
      "textureCoordonnees": _this._sendTextureCoordonnees,
      "normal": _this._sendVertexNormals
    }; //Scale

    _this.width = 1;
    _this.height = 1;
    _this.sizeScale = new Scale([_this.width, _this.height, 1], 0, function () {});

    _this.sizeScale.setPosition(0, 0, 0);

    _this.addMovement("size", _this.sizeScale);

    _this.sizeScale.start();

    _this.material.generateNormals(_assertThisInitialized(_this));

    return _this;
  }

  _createClass(Plan, [{
    key: "setSize",
    value: function setSize(width, height) {
      this.width = width;
      this.height = height;
      this.sizeScale.setScaleVec(this.width, this.height, 1);
    }
  }, {
    key: "renderAttribute",
    value: function renderAttribute(attribut, webGLProgram) {
      this.bufferFunctions[attribut](webGLProgram, this);
    }
  }, {
    key: "_sendTextureCoordonnees",
    value: function _sendTextureCoordonnees(webGLProgram, that) {
      //Render textures
      that.material.render(webGLProgram);
      webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ARRAY_BUFFER, webGLProgram.getBuffer("textureCoordonnees"));
      webGLProgram.getContext().vertexAttribPointer(webGLProgram.getShaderBuilder().getPointer("textureCoordonnees"), 2, webGLProgram.getContext().FLOAT, false, 0, 0); //Insérer les données

      webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(that.textureCoordonnees), webGLProgram.getContext().STATIC_DRAW);
    }
  }, {
    key: "_sendVertexPosition",
    value: function _sendVertexPosition(webGLProgram, that) {
      //Initialisation
      webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ARRAY_BUFFER, webGLProgram.getBuffer("position"));
      webGLProgram.getContext().vertexAttribPointer(webGLProgram.getShaderBuilder().getPointer("position"), 3, webGLProgram.getContext().FLOAT, false, 0, 0);

      if (webGLProgram.getShaderBuilder().getMode() != "normal") {
        webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(that.positions), webGLProgram.getContext().STATIC_DRAW);
      } else {
        var positions = _get(_getPrototypeOf(Plan.prototype), "generateNormalPositions", this).call(this);

        webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(positions), webGLProgram.getContext().STATIC_DRAW);
      }
    }
  }, {
    key: "_sendVertexNormals",
    value: function _sendVertexNormals(webGLProgram, that) {
      //Initialisation
      webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ARRAY_BUFFER, webGLProgram.getBuffer("normal"));
      webGLProgram.getContext().vertexAttribPointer(webGLProgram.getShaderBuilder().getPointer("normal"), 3, webGLProgram.getContext().FLOAT, false, 0, 0);
      webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(that.material.normals), webGLProgram.getContext().STATIC_DRAW);
    }
  }, {
    key: "draw",
    value: function draw(webGLProgram, attributs, processedMatrix) {
      _get(_getPrototypeOf(Plan.prototype), "draw", this).call(this, webGLProgram); //Mirror


      this.material.preDraw(this, processedMatrix); //Render attributs

      for (var i = 0; i < attributs.length; i++) {
        this.renderAttribute(attributs[i], webGLProgram);
      }

      webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix); //Index

      webGLProgram.getContext().disable(webGLProgram.getContext().CULL_FACE);
      webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, webGLProgram.getBuffer("index")); //Draw

      if (webGLProgram.getShaderBuilder().getMode() == "line") {
        var indexes = _get(_getPrototypeOf(Plan.prototype), "toLines", this).call(this, this.indexes);

        webGLProgram.getContext().bufferData(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), webGLProgram.getContext().STATIC_DRAW); //Draw

        webGLProgram.getContext().drawElements(webGLProgram.getContext().LINES, indexes.length, webGLProgram.getContext().UNSIGNED_SHORT, 0);
      } else if (webGLProgram.getShaderBuilder().getMode() == "normal") {
        webGLProgram.getContext().uniform4fv(webGLProgram.getShaderBuilder().getPointer("normalColor"), false, webGLProgram.getShaderBuilder().getNormalColor());
        webGLProgram.getContext().drawArrays(webGLProgram.getContext().LINES, 0, this.material.normals.length * 2);
      } else {
        webGLProgram.getContext().bufferData(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexes), webGLProgram.getContext().STATIC_DRAW); //Draw

        webGLProgram.getContext().drawElements(webGLProgram.getContext().TRIANGLES, this.indexes.length, webGLProgram.getContext().UNSIGNED_SHORT, 0);
      }

      webGLProgram.getContext().enable(webGLProgram.getContext().CULL_FACE); //Mirror PostSettings

      this.material.postDraw(this, processedMatrix);
    }
  }, {
    key: "clone",
    value: function clone() {
      var neww = new this.constructor();

      _get(_getPrototypeOf(Plan.prototype), "clone", this).call(this, neww);

      neww.width = this.width;
      neww.height = this.height;
      neww.position = this.position.slice();
      neww.indexes = this.indexes.slice();
      neww.textureCoordonnees = this.textureCoordonnees.slice();
      Object.assign(neww.movements, this.movements);
      Object.assign(neww.bufferFunctions, this.bufferFunctions);
      return neww;
    }
  }, {
    key: "getTextureDimensions",
    value: function getTextureDimensions() {
      return [this.width, this.height];
    }
  }]);

  return Plan;
}(Object3D);

module.exports = Plan;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":38,"../Interfaces/Object3D.class.js":5,"../Movements/Rotate.class.js":13,"../Movements/Scale.class.js":14,"../Movements/Translate.class.js":15,"../Textures/CanvasTexture.class":22,"../Textures/ColorTexture.class":23,"../Textures/FrameTexture.class":25,"../Textures/MirrorTexture.class.js":27}],19:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Renderer =
/*#__PURE__*/
function () {
  function Renderer(scene, initFunc, endFunc) {
    _classCallCheck(this, Renderer);

    this.scissor = null;
    this.scene = scene;
    this.transforms = [];
    this.resetConfigAtEnd = false;
    this.memory = [];
    this.viewport = [0, 0, 1, 1];
    this.stepUpObjectAnimation = true;
    this.stepUpCameraAnimation = true;
    this.stepUpLightAnimation = true;
    this.viewPortUpdate = true;
    this.clearColorUpdate = true;
    this.depthTestUpdate = true;
    this.cullFaceTestUpdate = true;
    this.clearColorBuffer = true;
    this.clearDepthBuffer = true;

    if (typeof initFunc == "undefined") {
      this.initUser = function (program) {};
    } else {
      this.initUser = initFunc;
    }

    if (typeof endFunc == "undefined") {
      this.endUser = function (program) {};
    } else {
      this.endUser = endFunc;
    }
  }

  _createClass(Renderer, [{
    key: "enableObjectStepUpAnimation",
    value: function enableObjectStepUpAnimation() {
      this.stepUpObjectAnimation = true;
    }
  }, {
    key: "disableObjectStepUpAnimation",
    value: function disableObjectStepUpAnimation() {
      this.stepUpObjectAnimation = false;
    }
  }, {
    key: "enableCameraStepUpAnimation",
    value: function enableCameraStepUpAnimation() {
      this.stepUpCameraAnimation = true;
    }
  }, {
    key: "disableCameraStepUpAnimation",
    value: function disableCameraStepUpAnimation() {
      this.stepUpCameraAnimation = false;
    }
  }, {
    key: "enableLightStepUpAnimation",
    value: function enableLightStepUpAnimation() {
      this.stepUpLightAnimation = true;
    }
  }, {
    key: "disableLightStepUpAnimation",
    value: function disableLightStepUpAnimation() {
      this.stepUpLightAnimation = false;
    }
  }, {
    key: "setInitUserFunction",
    value: function setInitUserFunction(func) {
      this.initUser = func;
    }
  }, {
    key: "setEndUserFunction",
    value: function setEndUserFunction(func) {
      this.endUser = func;
    }
  }, {
    key: "enableViewPortUpdate",
    value: function enableViewPortUpdate() {
      this.viewPortUpdate = true;
    }
  }, {
    key: "disableViewPortUpdate",
    value: function disableViewPortUpdate() {
      this.viewPortUpdate = false;
    }
  }, {
    key: "enableClearColorUpdate",
    value: function enableClearColorUpdate() {
      this.clearColorUpdate = true;
    }
  }, {
    key: "disableClearColorUpdate",
    value: function disableClearColorUpdate() {
      this.clearColorUpdate = false;
    }
  }, {
    key: "enableDepthTestUpdate",
    value: function enableDepthTestUpdate() {
      this.depthTestUpdate = true;
    }
  }, {
    key: "disableDepthTestUpdate",
    value: function disableDepthTestUpdate() {
      this.depthTestUpdate = false;
    }
  }, {
    key: "enableCullFaceTestUpdate",
    value: function enableCullFaceTestUpdate() {
      this.cullFaceTestUpdate = true;
    }
  }, {
    key: "disableCullFaceTestUpdate",
    value: function disableCullFaceTestUpdate() {
      this.cullFaceTestUpdate = false;
    }
  }, {
    key: "enableClearColorBuffer",
    value: function enableClearColorBuffer() {
      this.clearColorBuffer = true;
    }
  }, {
    key: "disableClearColorBuffer",
    value: function disableClearColorBuffer() {
      this.clearColorBuffer = false;
    }
  }, {
    key: "enableClearDepthBuffer",
    value: function enableClearDepthBuffer() {
      this.clearDepthBuffer = true;
    }
  }, {
    key: "disableClearDepthBuffer",
    value: function disableClearDepthBuffer() {
      this.clearDepthBuffer = false;
    }
  }, {
    key: "renderTextures",
    value: function renderTextures(webGLProgram) {
      var sceneObjects = this.scene.getAllObjects();

      for (var obj in sceneObjects) {
        sceneObjects[obj].renderTextures();
      }
    }
  }, {
    key: "render",
    value: function render(webGLProgram, viewPortDimensions) {
      if (_typeof(viewPortDimensions) == "object") {
        viewPortDimensions = {
          "width": viewPortDimensions[0],
          "height": viewPortDimensions[1]
        };
      }

      if (typeof viewPortDimensions == "undefined") {
        viewPortDimensions = {
          "width": webGLProgram.canvas.clientWidth,
          "height": webGLProgram.canvas.clientHeight
        };
      }

      var gl = webGLProgram.getContext();

      if (this.resetConfigAtEnd) {
        this._stateMemory(webGLProgram);
      }

      this.initUser(webGLProgram);

      if (this.scene.getShaderBuilder() != webGLProgram.actualShaderBuilder) {
        webGLProgram.actualShaderBuilder = this.scene.getShaderBuilder();
      }

      if (!webGLProgram.actualShaderBuilder.checkLights(this.scene.getNbAmbientLights(), this.scene.getNbDirectionalLights(), this.scene.getNbPointLights(), this.scene.getNbSpotLights()) && !webGLProgram.actualShaderBuilder.checkTextures(this.scene.getInfos())) {
        webGLProgram.actualShaderBuilder.buildShaderProgram(gl, this.scene);
      } else if (webGLProgram.actualShaderBuilder.needRebuild()) {
        webGLProgram.actualShaderBuilder.buildShaderProgram(gl, this.scene);
      }

      gl.useProgram(webGLProgram.actualShaderBuilder.getShaderProgram()); //Création des buffers

      webGLProgram.buffers = [];
      webGLProgram.buffers["index"] = gl.createBuffer();
      var attributs = webGLProgram.actualShaderBuilder.getActiveAttributes();

      for (var a in attributs) {
        webGLProgram.buffers[attributs[a]] = gl.createBuffer();
      }

      if (this.viewPortUpdate) {
        gl.viewport(this.viewport[0] * viewPortDimensions.width, this.viewport[1] * viewPortDimensions.height, this.viewport[2] * viewPortDimensions.width, this.viewport[3] * viewPortDimensions.height);
      }

      if (this.stepUpCameraAnimation) {
        this.scene.getCamera().enableStepUpAnimation();
      } else {
        this.scene.getCamera().disableStepUpAnimation();
      } //Camera Matrix


      gl.uniformMatrix4fv(webGLProgram.actualShaderBuilder.getPointer("projection"), false, this.scene.getCamera().getMatrix(viewPortDimensions.width * this.viewport[2] / (viewPortDimensions.height * this.viewport[3]))); //Camera Position

      var camPos = webGLProgram.actualShaderBuilder.getPointer("cameraPosition");

      if (camPos != null) {
        gl.uniform3fv(camPos, this.scene.getCamera().getPosition());
      }

      if (this.scissor != null) {
        gl.enable(gl.SCISSOR_TEST);
        gl.scissor(this.scissor[0] * viewPortDimensions.width, this.scissor[1] * viewPortDimensions.height - this.scissor[3] * viewPortDimensions.height, this.scissor[2] * viewPortDimensions.width, this.scissor[3] * viewPortDimensions.height);
        gl.getParameter(gl.SCISSOR_BOX);
      } else {
        gl.disable(gl.SCISSOR_TEST);
      }

      if (this.clearColorUpdate) {
        var colors = this.scene.getClearColor();
        gl.clearColor(colors[0], colors[1], colors[2], colors[3]);
      }

      if (this.depthTestUpdate) {
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
      }

      if (this.cullFaceTestUpdate) {
        gl.enable(gl.CULL_FACE);
      }

      if (this.clearColorBuffer) {
        gl.clear(gl.COLOR_BUFFER_BIT);
      }

      if (this.clearDepthBuffer) {
        gl.clear(gl.DEPTH_BUFFER_BIT);
      }

      for (var i = 0; i < attributs.length; i++) {
        gl.enableVertexAttribArray(webGLProgram.actualShaderBuilder.getPointer(attributs[i]));
      } //Tri des objets


      var opaques = [];
      var transparents = [];
      var mirrors = [];
      var sceneObjects = this.scene.getAllObjects();

      for (var _i in sceneObjects) {
        if (sceneObjects[_i].isMirror()) {
          mirrors[mirrors.length] = sceneObjects[_i];
        } else if (sceneObjects[_i].isTransparent()) {
          transparents[transparents.length] = sceneObjects[_i];
        } else {
          opaques[opaques.length] = sceneObjects[_i];
        }
      } //Configuration (si transparent non vide)


      if (transparents.length != 0 || mirrors.length != 0) {
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      } else {
        gl.disable(gl.BLEND);
      } //RENDERING


      this.transforms = [];
      var activeAttributs = webGLProgram.getShaderBuilder().getActiveAttributes();

      for (var obj in this.scene.objects) {
        //StepUp setting
        if (this.stepUpObjectAnimation) {
          this.scene.objects[obj].enableStepUpAnimation();
        } else {
          this.scene.objects[obj].disableStepUpAnimation();
        }

        this.scene.objects[obj].render(this.transforms);
      } //Affichage des objets opaques


      for (var _i2 = 0; _i2 < opaques.length; _i2++) {
        this.transforms[opaques[_i2].id][0].draw(webGLProgram, activeAttributs, this.transforms[opaques[_i2].id][1], false);
      } //Affichage des mirroirs


      gl.disable(gl.CULL_FACE);

      for (var _i3 = 0; _i3 < mirrors.length; _i3++) {
        this.transforms[mirrors[_i3].id][0].draw(webGLProgram, activeAttributs, this.transforms[mirrors[_i3].id][1], false);
      } //Tri des objets transparent


      var that = this;
      var cameraPosition = that.scene.getCamera().getPosition();
      transparents.sort(function (elem1, elem2) {
        var distance1 = elem1.getDistance(cameraPosition[0], cameraPosition[1], cameraPosition[2], that.transforms[elem1.id][1]);
        var distance2 = elem2.getDistance(cameraPosition[0], cameraPosition[1], cameraPosition[2], that.transforms[elem2.id][1]);

        if (distance1 > distance2) {
          return -1;
        } else {
          return 1;
        }
      }); //Affichage des objets transparents

      for (var _i4 = 0; _i4 < transparents.length; _i4++) {
        this.transforms[transparents[_i4].id][0].draw(webGLProgram, activeAttributs, this.transforms[transparents[_i4].id][1], true);
      }

      gl.enable(gl.CULL_FACE); //Lumieres

      for (var n in this.scene.ambientLights) {
        this.scene.ambientLights[n].render(webGLProgram, n);
      }

      for (var _n in this.scene.directionalLights) {
        this.scene.directionalLights[_n].render(webGLProgram, _n);
      }

      for (var _n2 in this.scene.pointLights) {
        if (this.stepUpLightAnimation) {
          this.scene.pointLights[_n2].enableStepUpAnimation();
        } else {
          this.scene.pointLights[_n2].disableStepUpAnimation();
        }

        this.scene.pointLights[_n2].render(webGLProgram, _n2);
      }

      for (var _n3 in this.scene.spotLights) {
        if (this.stepUpLightAnimation) {
          this.scene.spotLights[_n3].enableStepUpAnimation();
        } else {
          this.scene.spotLights[_n3].disableStepUpAnimation();
        }

        this.scene.spotLights[_n3].render(webGLProgram, _n3);
      }

      if (this.resetConfigAtEnd) {
        this._resetConfigEnd(webGLProgram);
      }

      this.endUser(webGLProgram);
    }
  }, {
    key: "setViewPort",
    value: function setViewPort(x, y, width, height) {
      this.viewport = [x, y, width, height];
    }
  }, {
    key: "getViewPort",
    value: function getViewPort() {
      return this.viewport;
    }
  }, {
    key: "setInitFunction",
    value: function setInitFunction(func) {
      this.initUser = func;
    }
  }, {
    key: "setResetConfigAtEnd",
    value: function setResetConfigAtEnd(bool) {
      this.resetConfigAtEnd = bool;
    }
  }, {
    key: "setScissor",
    value: function setScissor(x, y, width, height) {
      var tab = [x, 1 - y, width, height];

      if (tab == null) {
        this.scissor = null;
      } else {
        this.scissor = tab;
      }
    }
  }, {
    key: "getScissor",
    value: function getScissor() {
      return this.scissor;
    }
  }, {
    key: "_stateMemory",
    value: function _stateMemory(webGLProgram) {
      this.memory["clearColor"] = webGLProgram.getContext().getParameter(webGLProgram.getContext().COLOR_CLEAR_VALUE);
      this.memory["blend"] = webGLProgram.getContext().isEnabled(webGLProgram.getContext().BLEND);
      this.memory["blendFuncSrc"] = webGLProgram.getContext().getParameter(webGLProgram.getContext().BLEND_SRC_RGB);
      this.memory["blendFuncDst"] = webGLProgram.getContext().getParameter(webGLProgram.getContext().BLEND_DST_RGB);
      this.memory["depthTest"] = webGLProgram.getContext().isEnabled(webGLProgram.getContext().DEPTH_TEST);
      this.memory["depthFunc"] = webGLProgram.getContext().getParameter(webGLProgram.getContext().DEPTH_FUNC);
      this.memory["cullFace"] = webGLProgram.getContext().isEnabled(webGLProgram.getContext().CULL_FACE);
      this.memory["scissor"] = webGLProgram.getContext().getParameter(webGLProgram.getContext().SCISSOR_BOX);
    }
  }, {
    key: "_resetConfigEnd",
    value: function _resetConfigEnd(webGLProgram) {
      webGLProgram.getContext().clearColor(this.memory["clearColor"][0], this.memory["clearColor"][1], this.memory["clearColor"][2], this.memory["clearColor"][3]);
      webGLProgram.getContext().scissor(this.memory["scissor"][0], this.memory["scissor"][1], this.memory["scissor"][2], this.memory["scissor"][3]);

      if (this.memory["blend"]) {
        webGLProgram.getContext().enable(webGLProgram.getContext().BLEND);
      } else {
        webGLProgram.getContext().disable(webGLProgram.getContext().BLEND);
      }

      webGLProgram.getContext().blendFunc(this.memory["blendFuncSrc"], this.memory["blendFuncDst"]);

      if (this.memory["depthTest"]) {
        webGLProgram.getContext().enable(webGLProgram.getContext().DEPTH_TEST);
      } else {
        webGLProgram.getContext().disable(webGLProgram.getContext().DEPTH_TEST);
      }

      webGLProgram.getContext().depthFunc(this.memory["depthFunc"]);

      if (this.memory["cullFace"]) {
        webGLProgram.getContext().enable(webGLProgram.getContext().CULL_FACE);
      } else {
        webGLProgram.getContext().disable(webGLProgram.getContext().CULL_FACE);
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      var neww = new this.constructor();

      if (this.scissor == null) {
        neww.scissor = null;
      } else {
        neww.scissor = this.scissor.slice();
      }

      neww.scene = this.scene;
      Object.assign(neww.transforms, this.transforms);
      neww.resetConfigAtEnd = this.resetConfigAtEnd;
      neww.memory = [];
      neww.viewport = this.viewport.slice();
      neww.initUser = this.initUser;
      neww.endUser = this.endUser;
      return neww;
    }
  }]);

  return Renderer;
}();

module.exports = Renderer;
},{}],20:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ShaderBuilder = require("./ShaderBuilder.class.js");

var Renderer = require("./Renderer.class.js");

var Object3DGroup = require("./Objects3D/Object3DGroup.class.js");

var AmbientLight = require("./Lights/AmbientLight.class.js");

var DirectionalLight = require("./Lights/DirectionalLight.class.js");

var PointLight = require("./Lights/PointLight.class.js");

var SpotLight = require("./Lights/SpotLight.class.js");

var Scene =
/*#__PURE__*/
function () {
  function Scene() {
    _classCallCheck(this, Scene);

    this.clearColor = [0.0, 0.0, 0.0, 1.0];
    this.shaderBuilder = new ShaderBuilder();
    this.renderers = [];
    this.renderers[0] = new Renderer(this);
    this.activeCamera = null;
    this.cameras = [];
    this.objects = [];
    this.ambientLights = [];
    this.directionalLights = [];
    this.pointLights = [];
    this.spotLights = [];
  }

  _createClass(Scene, [{
    key: "getCamera",
    value: function getCamera() {
      return this.activeCamera;
    }
  }, {
    key: "getInfos",
    value: function getInfos() {
      var nbTextures = 0;
      var nbColors = 0;
      var objs = this.getAllObjects();

      for (var obj in objs) {
        var infos = objs[obj].getMaterialInfos();
        nbTextures = Math.max(nbTextures, infos.textures);
        nbColors = Math.max(nbColors, infos.colors);
      }

      return {
        "textures": nbTextures,
        "colors": nbColors
      };
    }
  }, {
    key: "addRenderer",
    value: function addRenderer(renderer, i) {
      if (typeof i == "undefined") {
        this.renderers[this.renderers.length] = renderer;
      } else {
        this.renderers.splice(i, 0, renderer);
      }
    }
  }, {
    key: "removeRenderer",
    value: function removeRenderer(i) {
      if (typeof i == "undefined") {
        i = 0;
      }

      this.renderers.splice(i, 1);
    }
  }, {
    key: "setRenderer",
    value: function setRenderer(renderer, i) {
      if (typeof i == "undefined") {
        i = 0;
      }

      this.renderers[i] = renderer;
    }
  }, {
    key: "getRenderer",
    value: function getRenderer(i) {
      if (typeof i == "undefined") {
        i = 0;
      }

      return this.renderers[i];
    }
  }, {
    key: "setCamera",
    value: function setCamera(name) {
      this.activeCamera = this.cameras[name];
    }
  }, {
    key: "addCamera",
    value: function addCamera(name, camera) {
      if (typeof name != "string") {
        camera = name;
        name = "camera" + Object.keys(this.cameras).length;
      }

      this.cameras[name] = camera;

      if (this.activeCamera == null) {
        this.activeCamera = this.cameras[name];
      }
    }
  }, {
    key: "getAllObjects",
    value: function getAllObjects() {
      var r = [];

      for (var obj in this.objects) {
        if (this.objects[obj] instanceof Object3DGroup) {
          this.objects[obj].getAllObjects(r);
        } else {
          r[obj] = this.objects[obj];
        }
      }

      return r;
    }
  }, {
    key: "removeCamera",
    value: function removeCamera(name) {
      delete this.cameras[name];
    }
  }, {
    key: "addLight",
    value: function addLight(name, light) {
      if (typeof name != "string") {
        light = name;
        name = "light" + Object.keys(this.lights).length;
      }

      if (light instanceof AmbientLight) {
        this.ambientLights[name] = light;
      } else if (light instanceof DirectionalLight) {
        this.directionalLights[name] = light;
      } else if (light instanceof PointLight) {
        this.pointLights[name] = light;
      } else if (light instanceof SpotLight) {
        this.spotLights[name] = light;
      }
    }
  }, {
    key: "removeLight",
    value: function removeLight(name) {
      if (this.ambientLights.includes(name)) {
        delete this.ambientLights[name];
      }

      if (this.directionalLights.includes(name)) {
        delete this.directionalLights[name];
      }

      if (this.pointLights.includes(name)) {
        delete this.pointLights[name];
      }

      if (this.spotLights.includes(name)) {
        delete this.spotLights[name];
      }
    }
  }, {
    key: "getNbAmbientLights",
    value: function getNbAmbientLights() {
      return Object.keys(this.ambientLights).length;
    }
  }, {
    key: "getNbDirectionalLights",
    value: function getNbDirectionalLights() {
      return Object.keys(this.directionalLights).length;
    }
  }, {
    key: "getNbPointLights",
    value: function getNbPointLights() {
      return Object.keys(this.pointLights).length;
    }
  }, {
    key: "getNbSpotLights",
    value: function getNbSpotLights() {
      return Object.keys(this.spotLights).length;
    }
  }, {
    key: "getAmbientLights",
    value: function getAmbientLights() {
      return this.ambientLights;
    }
  }, {
    key: "getDirectionalLights",
    value: function getDirectionalLights() {
      return this.directionalLights;
    }
  }, {
    key: "getPointLights",
    value: function getPointLights() {
      return this.pointLights;
    }
  }, {
    key: "getSpotLights",
    value: function getSpotLights() {
      return this.spotLights;
    }
  }, {
    key: "add3DObject",
    value: function add3DObject(name, object) {
      if (typeof name != "string") {
        object = name;
        name = "object" + Object.keys(this.objects).length;
      }

      this.objects[name] = object;
    }
  }, {
    key: "remove3DObject",
    value: function remove3DObject(name) {
      delete this.objects[name];
    }
  }, {
    key: "get3DObjects",
    value: function get3DObjects() {
      return this.objects;
    }
  }, {
    key: "setClearColor",
    value: function setClearColor(r, g, b, a) {
      this.clearColor = [r, g, b, a];
    }
  }, {
    key: "getClearColor",
    value: function getClearColor() {
      return this.clearColor;
    }
  }, {
    key: "getShaderBuilder",
    value: function getShaderBuilder() {
      return this.shaderBuilder;
    }
  }, {
    key: "setShaderBuilder",
    value: function setShaderBuilder(sb) {
      this.shaderBuilder = sb;
    }
  }, {
    key: "render",
    value: function render(webGLProgram) {
      for (var i = 0; i < this.renderers.length; i++) {
        if (i > 0) {
          this.renderers[i].disableObjectStepUpAnimation();
          this.renderers[i].disableLightStepUpAnimation();
          this.renderers[i].disableCameraStepUpAnimation();
        }

        this.renderers[i].render(webGLProgram);
      }
    }
  }, {
    key: "renderTextures",
    value: function renderTextures(webGLProgram) {
      for (var i = 0; i < this.renderers.length; i++) {
        this.renderers[i].renderTextures(webGLProgram);
      }
    }
  }, {
    key: "clone",
    value: function clone(objectsToRemove) {
      var neww = new this.constructor();
      neww.clearColor = this.clearColor.slice();
      neww.shaderBuilder = this.shaderBuilder;
      neww.renderers = this.renderers.slice();
      neww.activeCamera = this.activeCamera;
      Object.assign(neww.cameras, this.cameras);
      Object.assign(neww.ambientLights, this.ambientLights);
      Object.assign(neww.directionalLights, this.directionalLights);
      Object.assign(neww.pointLights, this.pointLights);
      Object.assign(neww.spotLights, this.spotLights);

      for (var obj in this.objects) {
        if (!objectsToRemove.includes(this.objects[obj])) {
          neww.objects[obj] = this.objects[obj].clone();
        }
      }

      return neww;
    }
  }, {
    key: "remove3DObjectByValue",
    value: function remove3DObjectByValue(object) {
      for (var obj in this.objects) {
        if (this.objects[obj] != object) {
          delete this.objects[obj];
        }
      }
    }
  }, {
    key: "incMirrorValue",
    value: function incMirrorValue() {
      for (var obj in this.objects) {
        this.objects[obj].incMirrorValue();
      }
    }
  }]);

  return Scene;
}();

module.exports = Scene;
},{"./Lights/AmbientLight.class.js":7,"./Lights/DirectionalLight.class.js":8,"./Lights/PointLight.class.js":9,"./Lights/SpotLight.class.js":10,"./Objects3D/Object3DGroup.class.js":17,"./Renderer.class.js":19,"./ShaderBuilder.class.js":21}],21:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ShaderBuilder =
/*#__PURE__*/
function () {
  function ShaderBuilder() {
    _classCallCheck(this, ShaderBuilder);

    this.vertexSrc = null;
    this.fragmentSrc = null;
    this.lastShaderProgram = null;
    this.triangleMode = true;
    this.normalDisplay = false;
    this.normalColor = [1, 1, 1, 1];
    this.mode = "triangle"; //Lights configuration

    this.ambientLights = [];
    this.directionalLights = [];
    this.pointLights = [];
    this.spotLights = [];
    this.needReBuild = true;
    this.nbTextures = null;
    this.nbColors = null; //Vertex Shader Attributes

    this.vertexAttributes = {
      "position": true
    }; //Fragment Shader Attributes

    this.fragmentAttributes = {
      "textureCoordonnees": true,
      // ALWAYS TRUE
      "normal": true
    }; //Vertex Shader Uniform

    this.vertexUniforms = {
      "projection": true,
      "localTransformation": true,
      "localTransformationTransposeInvert": true,
      "mirrorActive": true,
      "mirrorPoint": true,
      "mirrorVec1": true,
      "mirrorVec2": true,
      "cameraPosition": false
    }; //Fragment Shader Uniform

    this.fragmentUniforms = {
      "opacity": true,
      "normalColor": false,
      "IDasColor": false,
      "ambientTIndex": true,
      "ambientCIndex": true,
      "diffuseTIndex": true,
      "diffuseCIndex": true,
      "specularTIndex": true,
      "specularCIndex": true,
      "shininessTIndex": true,
      "shininessCIndex": true,
      "normalTIndex": true,
      "normalCIndex": true,
      "normalVarying": true //Material
      //"depthTexture" : true,

    };
    this.infos = {
      "position": {
        "nbDatas": 3,
        "type": "attribute vec4",
        "name": "aVertexPosition"
      },
      "normal": {
        "nbDatas": 3,
        "type": "attribute vec4",
        "name": "aVertexNormal",
        "varyingType": "varying mediump vec4",
        "varyingName": "vNormal"
      },
      "projection": {
        "type": "uniform mat4",
        "name": "uProjectionMatrix"
      },
      "localTransformation": {
        "type": "uniform mat4",
        "name": "uLocalTransformationMatrix"
      },
      "localTransformationTransposeInvert": {
        "type": "uniform mat4",
        "name": "uLocalTransformationTIMatrix"
      },
      "opacity": {
        "type": "uniform highp float",
        "name": "uOpacity"
      },
      "textureCoordonnees": {
        "nbDatas": 2,
        "type": "attribute vec2",
        "name": "aTextureCoord",
        "varyingType": "varying highp vec2",
        "varyingName": "vTextureCoord"
      },
      "mirrorActive": {
        "type": "uniform bool",
        "name": "uMirrorActive"
      },
      "mirrorVec1": {
        "type": "uniform vec4",
        "name": "uMirrorVec1"
      },
      "mirrorVec2": {
        "type": "uniform vec4",
        "name": "uMirrorVec2"
      },
      "mirrorPoint": {
        "type": "uniform vec4",
        "name": "uMirrorPoint"
      },
      "normalColor": {
        "type": "uniform lowp vec4",
        "name": "uNormalColor"
      },
      "IDasColor": {
        "type": "uniform highp vec4",
        "name": "uIdColor"
      },
      "cameraPosition": {
        "type": "uniform lowp vec3",
        "name": "uCamPosition"
      },
      //Material
      "ambientTIndex": {
        "type": "uniform lowp int",
        "name": "uAmbientTIndex"
      },
      "ambientCIndex": {
        "type": "uniform lowp int",
        "name": "uAmbientCIndex"
      },
      "diffuseTIndex": {
        "type": "uniform lowp int",
        "name": "uDiffuseTIndex"
      },
      "diffuseCIndex": {
        "type": "uniform lowp int",
        "name": "uDiffuseCIndex"
      },
      "specularTIndex": {
        "type": "uniform lowp int",
        "name": "uSpecularTIndex"
      },
      "specularCIndex": {
        "type": "uniform lowp int",
        "name": "uSpecularCIndex"
      },
      "shininessTIndex": {
        "type": "uniform lowp int",
        "name": "uShininessTIndex"
      },
      "shininessCIndex": {
        "type": "uniform lowp int",
        "name": "uShininessCIndex"
      },
      "normalTIndex": {
        "type": "uniform lowp int",
        "name": "uNormalTIndex"
      },
      "normalCIndex": {
        "type": "uniform lowp int",
        "name": "uNormalCIndex"
      },
      "normalVarying": {
        "type": "uniform bool",
        "name": "uNormalVarying"
      }
    };
    this.pointers = {
      "position": null,
      "normal": null,
      "projection": null,
      "localTransformation": null,
      "localTransformationTransposeInvert": null,
      "textureCoordonnees": null,
      "mirrorActive": null,
      "mirrorVec1": null,
      "mirrorVec2": null,
      "mirrorPoint": null,
      "opacity": null,
      "normalColor": null,
      "IDasColor": null,
      "cameraPosition": null,
      "ambientTIndex": null,
      "ambientCIndex": null,
      "diffuseTIndex": null,
      "diffuseCIndex": null,
      "specularTIndex": null,
      "specularCIndex": null,
      "shininessTIndex": null,
      "shininessCIndex": null,
      "normalTIndex": null,
      "normalCIndex": null,
      "normalVarying": null
    };
  }

  _createClass(ShaderBuilder, [{
    key: "needRebuild",
    value: function needRebuild() {
      return this.needReBuild;
    }
  }, {
    key: "getMode",
    value: function getMode() {
      return this.mode;
    }
  }, {
    key: "setMode",
    value: function setMode(mode) {
      if (mode != this.mode) {
        this.needReBuild = true;
        this.mode = mode;

        if (mode == "line") {
          this.triangleMode = false;
          this.normalDisplay = false;
          this.fragmentAttributes["normal"] = true;
          this.fragmentAttributes["textureCoordonnees"] = true;
          this.fragmentUniforms["normalColor"] = false;
          this.fragmentUniforms["opacity"] = true;
          this.fragmentUniforms["IDasColor"] = false;
        } else if (mode == "normal") {
          this.triangleMode = false;
          this.normalDisplay = true;
          this.fragmentAttributes["normal"] = false;
          this.fragmentAttributes["textureCoordonnees"] = false;
          this.fragmentUniforms["normalColor"] = true;
          this.fragmentUniforms["opacity"] = false;
          this.fragmentUniforms["IDasColor"] = false;
        } else if (mode == "event") {
          this.triangleMode = true;
          this.normalDisplay = false;
          this.fragmentAttributes["normal"] = false;
          this.fragmentAttributes["textureCoordonnees"] = false;
          this.fragmentUniforms["normalColor"] = false;
          this.fragmentUniforms["opacity"] = false;
          this.fragmentUniforms["IDasColor"] = true;
        } else {
          this.triangleMode = true;
          this.normalDisplay = false;
          this.fragmentAttributes["normal"] = true;
          this.fragmentAttributes["textureCoordonnees"] = true;
          this.fragmentUniforms["normalColor"] = false;
          this.fragmentUniforms["opacity"] = true;
          this.fragmentUniforms["IDasColor"] = false;
        }
      }
    }
  }, {
    key: "getPointer",
    value: function getPointer(value) {
      return this.pointers[value];
    }
  }, {
    key: "getActiveAttributes",
    value: function getActiveAttributes() {
      var result = [];

      for (var a in this.vertexAttributes) {
        if (this.vertexAttributes[a]) {
          result[result.length] = a;
        }
      }

      for (var _a in this.fragmentAttributes) {
        if (this.fragmentAttributes[_a]) {
          result[result.length] = _a;
        }
      }

      return result;
    }
  }, {
    key: "checkTextures",
    value: function checkTextures(infos) {
      return this.nbTextures == infos.textures && this.nbColors == infos.colors;
    }
  }, {
    key: "checkLights",
    value: function checkLights(ambient, directionals, points, spots) {
      if (ambient != Object.keys(this.ambientLights).length || directionals != Object.keys(this.directionalLights).length || points != Object.keys(this.pointLights).length || spots != Object.keys(this.spotLights).length) {
        return false;
      }

      for (var n in this.ambientLights) {
        if (this.ambientLights[n].needShaderRebuild()) return false;
      }

      for (var _n in this.directionalLights) {
        if (this.directionalLights[_n].needShaderRebuild()) return false;
      }

      for (var _n2 in this.pointLights) {
        if (this.pointLights[_n2].needShaderRebuild()) return false;
      }

      for (var _n3 in this.spotLights) {
        if (this.spotLights[_n3].needShaderRebuild()) return false;
      }

      return true;
    }
  }, {
    key: "getNormalColor",
    value: function getNormalColor() {
      return this.normalColor;
    }
  }, {
    key: "setNormalColor",
    value: function setNormalColor(r, g, b, a) {
      this.normalColor = [r, g, b, a];
    }
  }, {
    key: "getShaderProgram",
    value: function getShaderProgram() {
      return this.lastShaderProgram;
    }
  }, {
    key: "buildShaderProgram",
    value: function buildShaderProgram(gl, scene) {
      //LIGTHS
      this.ambientLights = scene.getAmbientLights();
      this.directionalLights = scene.getDirectionalLights();
      this.pointLights = scene.getPointLights();
      this.spotLights = scene.getSpotLights();
      var texturesInfos = scene.getInfos();
      this.nbTextures = texturesInfos.textures;
      this.nbColors = texturesInfos.colors;

      if (Object.keys(this.directionalLights).length != 0 || Object.keys(this.pointLights).length != 0 || Object.keys(this.spotLights).length != 0) {
        this.vertexUniforms["cameraPosition"] = true;
      } //add uniforms and attributes


      for (var name in this.ambientLights) {
        this.fragmentUniforms[name] = true;
        this.pointers[name] = null;
        this.infos[name] = {
          "nbDatas": 3,
          "type": "uniform mediump vec3",
          "name": "ual_" + name
        };
      }

      for (var _name in this.directionalLights) {
        this.fragmentUniforms[_name + "_ambientColor"] = true;
        this.fragmentUniforms[_name + "_diffuseColor"] = true;
        this.fragmentUniforms[_name + "_specularColor"] = true;
        this.fragmentUniforms[_name + "_vector"] = true;
        this.pointers[_name + "_ambientColor"] = null;
        this.pointers[_name + "_diffuseColor"] = null;
        this.pointers[_name + "_specularColor"] = null;
        this.pointers[_name + "_vector"] = null;
        this.infos[_name + "_ambientColor"] = {
          "nbDatas": 3,
          "type": "uniform mediump vec3",
          "name": "udl_ambientColor_" + _name
        };
        this.infos[_name + "_diffuseColor"] = {
          "nbDatas": 3,
          "type": "uniform mediump vec3",
          "name": "udl_diffuseColor_" + _name
        };
        this.infos[_name + "_specularColor"] = {
          "nbDatas": 3,
          "type": "uniform mediump vec3",
          "name": "udl_specularColor_" + _name
        };
        this.infos[_name + "_vector"] = {
          "nbDatas": 3,
          "type": "uniform mediump vec3",
          "name": "udl_vector_" + _name
        };
      }

      for (var _name2 in this.pointLights) {
        this.fragmentUniforms[_name2 + "_ambientColor"] = true;
        this.fragmentUniforms[_name2 + "_diffuseColor"] = true;
        this.fragmentUniforms[_name2 + "_specularColor"] = true;
        this.fragmentUniforms[_name2 + "_constDissip"] = true;
        this.fragmentUniforms[_name2 + "_linDissip"] = true;
        this.fragmentUniforms[_name2 + "_quadDissip"] = true;
        this.vertexUniforms[_name2 + "_position"] = true;
        this.pointers[_name2 + "_ambientColor"] = null;
        this.pointers[_name2 + "_diffuseColor"] = null;
        this.pointers[_name2 + "_specularColor"] = null;
        this.pointers[_name2 + "_constDissip"] = null;
        this.pointers[_name2 + "_linDissip"] = null;
        this.pointers[_name2 + "_quadDissip"] = null;
        this.pointers[_name2 + "_position"] = null;
        this.infos[_name2 + "_ambientColor"] = {
          "nbDatas": 3,
          "type": "uniform mediump vec3",
          "name": "udl_ambientColor_" + _name2
        };
        this.infos[_name2 + "_diffuseColor"] = {
          "nbDatas": 3,
          "type": "uniform mediump vec3",
          "name": "udl_diffuseColor_" + _name2
        };
        this.infos[_name2 + "_specularColor"] = {
          "nbDatas": 3,
          "type": "uniform mediump vec3",
          "name": "udl_specularColor_" + _name2
        };
        this.infos[_name2 + "_constDissip"] = {
          "nbDatas": 1,
          "type": "uniform mediump float",
          "name": "udl_constDissip_" + _name2
        };
        this.infos[_name2 + "_linDissip"] = {
          "nbDatas": 1,
          "type": "uniform mediump float",
          "name": "udl_linDissip_" + _name2
        };
        this.infos[_name2 + "_quadDissip"] = {
          "nbDatas": 3,
          "type": "uniform mediump float",
          "name": "udl_quadDissip_" + _name2
        };
        this.infos[_name2 + "_position"] = {
          "nbDatas": 3,
          "type": "uniform mediump vec3",
          "name": "upl_position_" + _name2
        };
      }

      for (var _name3 in this.spotLights) {
        this.fragmentUniforms[_name3 + "_direction"] = true;
        this.fragmentUniforms[_name3 + "_iLimit"] = true;
        this.fragmentUniforms[_name3 + "_oLimit"] = true;
        this.vertexUniforms[_name3 + "_position"] = true;
        this.fragmentUniforms[_name3 + "_ambientColor"] = true;
        this.fragmentUniforms[_name3 + "_diffuseColor"] = true;
        this.fragmentUniforms[_name3 + "_specularColor"] = true;
        this.fragmentUniforms[_name3 + "_constDissip"] = true;
        this.fragmentUniforms[_name3 + "_linDissip"] = true;
        this.fragmentUniforms[_name3 + "_quadDissip"] = true;
        this.pointers[_name3 + "_direction"] = null;
        this.pointers[_name3 + "_iLimit"] = null;
        this.pointers[_name3 + "_oLimit"] = null;
        this.pointers[_name3 + "_ambientColor"] = null;
        this.pointers[_name3 + "_diffuseColor"] = null;
        this.pointers[_name3 + "_specularColor"] = null;
        this.pointers[_name3 + "_constDissip"] = null;
        this.pointers[_name3 + "_linDissip"] = null;
        this.pointers[_name3 + "_quadDissip"] = null;
        this.pointers[_name3 + "_position"] = null;
        this.infos[_name3 + "_ambientColor"] = {
          "nbDatas": 3,
          "type": "uniform mediump vec3",
          "name": "udl_ambientColor_" + _name3
        };
        this.infos[_name3 + "_diffuseColor"] = {
          "nbDatas": 3,
          "type": "uniform mediump vec3",
          "name": "udl_diffuseColor_" + _name3
        };
        this.infos[_name3 + "_specularColor"] = {
          "nbDatas": 3,
          "type": "uniform mediump vec3",
          "name": "udl_specularColor_" + _name3
        };
        this.infos[_name3 + "_constDissip"] = {
          "nbDatas": 1,
          "type": "uniform mediump float",
          "name": "udl_constDissip_" + _name3
        };
        this.infos[_name3 + "_linDissip"] = {
          "nbDatas": 1,
          "type": "uniform mediump float",
          "name": "udl_linDissip_" + _name3
        };
        this.infos[_name3 + "_quadDissip"] = {
          "nbDatas": 3,
          "type": "uniform mediump float",
          "name": "udl_quadDissip_" + _name3
        };
        this.infos[_name3 + "_position"] = {
          "nbDatas": 3,
          "type": "uniform mediump vec3",
          "name": "usl_position_" + _name3
        };
        this.infos[_name3 + "_direction"] = {
          "nbDatas": 3,
          "type": "uniform mediump vec3",
          "name": "usl_direction_" + _name3
        };
        this.infos[_name3 + "_iLimit"] = {
          "nbDatas": 1,
          "type": "uniform mediump float",
          "name": "usl_ilimit_" + _name3
        };
        this.infos[_name3 + "_oLimit"] = {
          "nbDatas": 1,
          "type": "uniform mediump float",
          "name": "usl_olimit_" + _name3
        };
      } //Textures Mapping


      for (var i = 0; i < this.nbTextures; i++) {
        this.fragmentUniforms["texture" + i] = true;
        this.pointers["texture" + i] = null;
        this.infos["texture" + i] = {
          "type": "uniform sampler2D",
          "name": "uSampler" + i
        };
      } //Colors Mapping


      for (var _i = 0; _i < this.nbColors; _i++) {
        this.fragmentUniforms["color" + _i] = true;
        this.pointers["color" + _i] = null;
        this.infos["color" + _i] = {
          "type": "uniform mediump vec4",
          "name": "uColor" + _i
        };
      }

      this._buildShaders();

      var vShader = this._createShader(gl.VERTEX_SHADER, this.vertexSrc, gl);

      var fShader = this._createShader(gl.FRAGMENT_SHADER, this.fragmentSrc, gl);

      var shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vShader);
      gl.attachShader(shaderProgram, fShader);
      gl.linkProgram(shaderProgram);

      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log('Error lors de la liaison des shaders');
        return null;
      }
      /* POINTERS */


      this.pointers = [];

      for (var a in this.vertexAttributes) {
        if (this.vertexAttributes[a]) {
          this.pointers[a] = gl.getAttribLocation(shaderProgram, this.infos[a].name);
        }
      }

      for (var _a2 in this.fragmentAttributes) {
        if (this.fragmentAttributes[_a2]) {
          this.pointers[_a2] = gl.getAttribLocation(shaderProgram, this.infos[_a2].name);
        }
      }

      for (var u in this.vertexUniforms) {
        if (this.vertexUniforms[u]) {
          this.pointers[u] = gl.getUniformLocation(shaderProgram, this.infos[u].name);
        }
      }

      for (var _u in this.fragmentUniforms) {
        if (this.fragmentUniforms[_u]) {
          this.pointers[_u] = gl.getUniformLocation(shaderProgram, this.infos[_u].name);
        }
      }

      this.lastShaderProgram = shaderProgram;
    }
  }, {
    key: "_createShader",
    value: function _createShader(type, src, gl) {
      var shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader, src);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log('Erreur lors de la compilation du shader ' + src + "\n" + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    }
  }, {
    key: "_buildShaders",
    value: function _buildShaders() {
      this._buildVertexShader();

      this._buildFragmentShader();

      this.needReBuild = false;
    }
  }, {
    key: "_buildVertexShader",
    value: function _buildVertexShader() {
      this.vertexSrc = ''; //

      for (var a in this.vertexAttributes) {
        if (this.vertexAttributes[a]) {
          this.vertexSrc += this.infos[a].type + " " + this.infos[a].name + ";";
        }
      }

      for (var _a3 in this.fragmentAttributes) {
        if (this.fragmentAttributes[_a3]) {
          this.vertexSrc += this.infos[_a3].type + " " + this.infos[_a3].name + ";";
          this.vertexSrc += this.infos[_a3].varyingType + " " + this.infos[_a3].varyingName + ";";
        }
      }

      if (Object.keys(this.directionalLights).length != 0 || Object.keys(this.pointLights).length != 0 || Object.keys(this.spotLights).length != 0) {
        this.vertexSrc += "varying highp vec3 viewVec;";
      }

      for (var u in this.vertexUniforms) {
        if (this.vertexUniforms[u]) {
          this.vertexSrc += this.infos[u].type + " " + this.infos[u].name + ";";
        }
      } //Projeté orthogonal


      this.vertexSrc += "\n\t\t\tvec4 projOrth(vec4 point, vec4 mirrorPoint, vec4 mVec1, vec4 mVec2){\n\t\t\t\tvec3 norm = cross(mVec1.xyz, mVec2.xyz);\n\t\t\t\tfloat d = (-norm.x * mirrorPoint.x) + (-norm.y * mirrorPoint.y) + (-norm.z * mirrorPoint.z);\n\t\t\t\tfloat beta = (-(point.x * norm.x) - (point.y * norm.y) - (point.z * norm.z) - d) / (norm.x * norm.x  + norm.y * norm.y + norm.z * norm.z);\n\t\t\t\treturn vec4(point.x + norm.x * beta, point.y + norm.y * beta, point.z + norm.z * beta , 1);\n\t\t\t}\n\t\t"; //new vec from two point

      this.vertexSrc += "\n\t\t\tvec4 newVec(vec4 point1, vec4 point2){\n\t\t\t\treturn vec4(((point2 - point1).xyz), 1);\n\t\t\t}\n\t\t"; //Scale

      this.vertexSrc += "\n\t\t\tvec4 scale(vec4 v, float scal){\n\t\t\t\treturn vec4( v.x * scal, v.y * scal, v.z * scal, 1);\n\t\t\t}\n\t\t"; //Translate 

      this.vertexSrc += "\n\t\t\tvec4 translate(vec4 v, vec4 transVec){\n\t\t\t\treturn (mat4(\n\t\t\t\t\t\t1.0, 0.0, 0.0, 0.0, \n\t\t\t\t\t  0.0, 1.0, 0.0, 0.0, \n\t\t\t\t\t  0.0, 0.0, 1.0, 0.0,  \n\t\t\t\t\t  transVec.x, transVec.y, transVec.z, transVec.w) * v);\n\t\t\t}\n\t\t";

      if (this.mode != "normal" && this.mode != "event") {
        //Point Light
        for (var n in this.pointLights) {
          this.vertexSrc += this.pointLights[n].getVertexShaderPreCode({
            "name": n
          });
        } //Spot Light


        for (var _n4 in this.spotLights) {
          this.vertexSrc += this.spotLights[_n4].getVertexShaderPreCode({
            "name": _n4
          });
        }
      }

      this.vertexSrc += "void main() {"; //Fragment Atributes

      for (var _a4 in this.fragmentAttributes) {
        if (this.fragmentAttributes[_a4]) {
          this.vertexSrc += this.infos[_a4].varyingName + " = " + this.infos[_a4].name + ";";
        }
      } //Normal transformation


      if (this.fragmentAttributes["normal"]) {
        this.vertexSrc += this.infos["normal"].varyingName + " = " + this.infos["localTransformationTransposeInvert"].name + " * " + this.infos["normal"].name + ";";
      } //Transformation


      if (this.vertexUniforms["localTransformation"] && this.vertexAttributes["position"]) {
        this.vertexSrc += "gl_Position = " + this.infos["localTransformation"].name + " * " + this.infos["position"].name + ";";
      } //Mirror


      if (this.vertexUniforms["mirrorActive"] && this.vertexUniforms["localTransformation"]) {
        this.vertexSrc += 'if(' + this.infos["mirrorActive"].name + '){'; //vec4 mirrorTransp = projOrth(gl_Position, uMirrorPoint, uMirrorVec1, uMirrorVec2);

        this.vertexSrc += "vec4 mirrorTransp = projOrth(gl_Position, " + this.infos["mirrorPoint"].name + ", " + this.infos["mirrorVec1"].name + ", " + this.infos["mirrorVec2"].name + ");";
        this.vertexSrc += "gl_Position = translate(gl_Position, scale(newVec(gl_Position, mirrorTransp), 2.));"; //this.vertexSrc += "gl_Position = translate(gl_Position, scale(uMirrorVec1, 2.0));";

        this.vertexSrc += '}';
      }

      if (this.mode != "normal" && this.mode != "event") {
        //Point Light
        for (var _n5 in this.pointLights) {
          this.vertexSrc += this.pointLights[_n5].getVertexShaderMainCode({
            "position": this.infos[_n5 + "_position"],
            "name": _n5
          });
        } //Spot Light


        for (var _n6 in this.spotLights) {
          this.vertexSrc += this.spotLights[_n6].getVertexShaderMainCode({
            "position": this.infos[_n6 + "_position"],
            "name": _n6
          });
        }
      }

      if (Object.keys(this.directionalLights).length != 0 || Object.keys(this.pointLights).length != 0 || Object.keys(this.spotLights).length != 0) {
        this.vertexSrc += "viewVec = normalize(newVec(vec4(" + this.infos["cameraPosition"].name + ", 1), gl_Position).xyz);";
      } //Projection


      if (this.vertexUniforms["projection"] && this.vertexUniforms["localTransformation"] && this.vertexAttributes["position"]) {
        this.vertexSrc += "gl_Position = " + this.infos["projection"].name + " * gl_Position;";
      }

      this.vertexSrc += "}";
      console.log(this.vertexSrc);
    }
  }, {
    key: "_buildFragmentShader",
    value: function _buildFragmentShader() {
      this.fragmentSrc = " precision mediump float; ";

      for (var a in this.fragmentAttributes) {
        if (this.fragmentAttributes[a]) {
          this.fragmentSrc += this.infos[a].varyingType + " " + this.infos[a].varyingName + ";";
        }
      }

      if (Object.keys(this.directionalLights).length != 0 || Object.keys(this.pointLights).length != 0 || Object.keys(this.spotLights).length != 0) {
        this.fragmentSrc += "varying highp vec3 viewVec;";
      }

      for (var u in this.fragmentUniforms) {
        if (this.fragmentUniforms[u]) {
          this.fragmentSrc += this.infos[u].type + " " + this.infos[u].name + ";";
        }
      }

      if (this.mode != "normal" && this.mode != "event") {
        //Point Light
        for (var n in this.pointLights) {
          this.fragmentSrc += this.pointLights[n].getFragmentShaderPreCode({
            "name": n
          });
        } //Spot Light


        for (var _n7 in this.spotLights) {
          this.fragmentSrc += this.spotLights[_n7].getFragmentShaderPreCode({
            "name": _n7
          });
        }
      } //Light functions


      this.fragmentSrc += "\n\t\t\tlowp vec3 ambientLight(vec3 ambientLight, vec3 ambientObject){\n\t\t\t\tlowp vec3 ambient  = ambientLight  * ambientObject;\n\t\t\t\treturn ambient;\n\t\t\t}\n\t\t\tlowp vec3 directionalLight(vec3 normal, vec3 lightVec, vec3 viewVec, vec3 ambientLight, vec3 ambientObject, vec3 diffuseLight, vec3 diffuseObject, vec3 specularLight, vec3 specularObject, float shininess){\n\t\t\t\thighp float diff = max(dot(normalize(normal), lightVec), 0.0);\n\t\t\t\tlowp vec3 reflectDir = reflect(lightVec, normalize(normal));\n    \t\tmediump float spec = pow(max(dot(viewVec, reflectDir), 0.0), shininess);\n\t\t\t\tlowp vec3 ambient  = ambientLight  * ambientObject;\n    \t\tlowp vec3 diffuse  = diffuseLight  * diff * diffuseObject;\n    \t\tlowp vec3 specular = specularLight * spec * specularObject;\n\t\t\t\treturn ambient + diffuse + specular;\n\t\t\t}\n\t\t\tlowp vec3 pointLight(vec3 normal, float constDissip, float linDissip, float quadDissip, vec3 lightVec, vec3 viewVec, vec3 ambientLight, vec3 ambientObject, vec3 diffuseLight, vec3 diffuseObject, vec3 specularLight, vec3 specularObject, float shininess){\n\t\t\t\thighp float diff = max(dot(normalize(normal), normalize(lightVec)), 0.0);\n\t\t\t\tlowp vec3 reflectDir = reflect(normalize(lightVec), normalize(normal));\n    \t\tmediump float spec = pow(max(dot(viewVec, reflectDir), 0.0), shininess);\n\n    \t\tmediump float distance    = length(lightVec);\n    \t\tmediump float sum = (constDissip + linDissip * distance + quadDissip * (distance * distance));\n    \t\tmediump float attenuation = 1.0;\n    \t\tif(sum != 0.0){\n    \t\t\tattenuation = clamp(1.0 / sum, 0.0, 1.0);  \n    \t\t}\n\n\t\t\t\tlowp vec3 ambient  = ambientLight  * ambientObject * attenuation;\n    \t\tlowp vec3 diffuse  = diffuseLight  * diff * diffuseObject * attenuation;\n    \t\tlowp vec3 specular = specularLight * spec * specularObject * attenuation;\n\t\t\t\treturn ambient + diffuse + specular;\n\t\t\t}\n\t\t\tlowp vec3 spotLight(vec3 normal, float iLimit, float oLimit, vec3 direction, float constDissip, float linDissip, float quadDissip, vec3 lightVec, vec3 viewVec, vec3 ambientLight, vec3 ambientObject, vec3 diffuseLight, vec3 diffuseObject, vec3 specularLight, vec3 specularObject, float shininess){\n\t\t\t\tmediump float isIn = max(dot(normalize(-direction), normalize(lightVec)), 0.0);\n\t\t\t\tmediump float diff = 0.0;\n\t\t\t\tmediump float spec = 0.0;\n\t\t\t\tlowp vec3 reflectDir;\n\t\t\t\tif(isIn > iLimit){ \n\t\t\t\t\tdiff = max(dot(normalize(normal), normalize(lightVec)), 0.0);\n\t\t\t\t\treflectDir = reflect(normalize(lightVec), normalize(normal));\n\t\t\t\t\tspec = pow(max(dot(viewVec, reflectDir), 0.0), shininess);\n\t\t\t\t}else if(isIn < oLimit){ \n\t\t\t\t\tdiff = 0.0;\n\t\t\t\t\tspec = 0.0;\n\t\t\t\t}else{\n\t\t\t\t\tlowp float deg = clamp(( isIn - oLimit) / (iLimit - oLimit), 0.0, 1.0);\n\t\t\t\t\treflectDir = reflect(normalize(lightVec), normalize(normal));\n\t\t\t\t\tdiff = deg * max(dot(normalize(normal), normalize(lightVec)), 0.0);\n\t\t\t\t\tspec = deg * pow(max(dot(viewVec, reflectDir), 0.0), shininess);\n\t\t\t\t} \n\n    \t\tmediump float distance = length(lightVec);\n    \t\tmediump float sum = (constDissip + linDissip * distance + quadDissip * (distance * distance));\n    \t\tmediump float attenuation = 1.0;\n    \t\tif(sum != 0.0){\n    \t\t\tattenuation = clamp(1.0 / sum, 0.0, 1.0);  \n    \t\t}\n\n\t\t\t\tlowp vec3 ambient  = ambientLight  * ambientObject * attenuation;\n    \t\tlowp vec3 diffuse  = diffuseLight  * diff * diffuseObject * attenuation;\n    \t\tlowp vec3 specular = specularLight * spec * specularObject * attenuation;\n\t\t\t\treturn ambient + diffuse + specular;\n\t\t\t}\n\t\t\t";
      this.fragmentSrc += "lowp vec4 determineColor(int textIndex, int colorIndex){";
      this.fragmentSrc += "lowp vec4 result = vec4(1, 1, 1, 1);"; //Textures

      this.fragmentSrc += "lowp int temp = textIndex;";

      for (var i = this.nbTextures - 1; i >= 0; i--) {
        this.fragmentSrc += "if(temp >= " + Math.pow(2, i) + "){";

        if (this.fragmentAttributes["textureCoordonnees"]) {
          this.fragmentSrc += "result = result * texture2D(" + this.infos["texture" + i].name + ", " + this.infos["textureCoordonnees"].varyingName + ");";
          this.fragmentSrc += "temp = temp - " + Math.pow(2, i) + ";";
        }

        this.fragmentSrc += "}";
      } //Colors


      this.fragmentSrc += "temp = colorIndex;";

      for (var _i2 = this.nbColors - 1; _i2 >= 0; _i2--) {
        this.fragmentSrc += "if(temp >= " + Math.pow(2, _i2) + "){";
        this.fragmentSrc += "result = result * " + this.infos["color" + _i2].name + ";";
        this.fragmentSrc += "temp = temp - " + Math.pow(2, _i2) + ";";
        this.fragmentSrc += "}";
      }

      this.fragmentSrc += "return result;";
      this.fragmentSrc += "}";
      this.fragmentSrc += "highp float determineShininess(int textIndex, int colorIndex){\n\t\t\t\tlowp vec4 result = determineColor(textIndex, colorIndex);\n\t\t\t\treturn (result.r * 1000.0 + result.g * 100.0 + result.b * 10.0 + result.a);\n\t\t\t}";
      ;
      this.fragmentSrc += "void main() {"; //Material

      this.fragmentSrc += "lowp vec4 materialAmbient = determineColor(" + this.infos["ambientTIndex"].name + "," + this.infos["ambientCIndex"].name + ");";
      this.fragmentSrc += "lowp vec4 materialDiffuse = determineColor(" + this.infos["diffuseTIndex"].name + "," + this.infos["diffuseCIndex"].name + ");";
      this.fragmentSrc += "lowp vec4 materialSpecular = determineColor(" + this.infos["specularTIndex"].name + "," + this.infos["specularCIndex"].name + ");";
      this.fragmentSrc += "highp float materialShininess = determineShininess(" + this.infos["shininessTIndex"].name + "," + this.infos["shininessCIndex"].name + ");";

      if (this.mode != "normal" && this.mode != "event") {
        if (Object.keys(this.ambientLights).length != 0 || Object.keys(this.directionalLights).length != 0 || Object.keys(this.pointLights).length != 0 || Object.keys(this.spotLights).length != 0) {
          this.fragmentSrc += "gl_FragColor = vec4(0, 0, 0, materialAmbient.a);";
        } //LIGHTS


        for (var _n8 in this.ambientLights) {
          this.fragmentSrc += this.ambientLights[_n8].getFragmentShaderMainCode({
            "name": this.infos[_n8].name
          });
        }

        for (var _n9 in this.directionalLights) {
          this.fragmentSrc += this.directionalLights[_n9].getFragmentShaderMainCode({
            "normal": this.infos["normal"],
            "ambient": this.infos[_n9 + "_ambientColor"],
            "diffuse": this.infos[_n9 + "_diffuseColor"],
            "specular": this.infos[_n9 + "_specularColor"],
            "vector": this.infos[_n9 + "_vector"],
            "name": _n9
          });
        }

        for (var _n10 in this.pointLights) {
          this.fragmentSrc += this.pointLights[_n10].getFragmentShaderMainCode({
            "normal": this.infos["normal"],
            "ambient": this.infos[_n10 + "_ambientColor"],
            "diffuse": this.infos[_n10 + "_diffuseColor"],
            "specular": this.infos[_n10 + "_specularColor"],
            "constDissip": this.infos[_n10 + "_constDissip"],
            "linDissip": this.infos[_n10 + "_linDissip"],
            "quadDissip": this.infos[_n10 + "_quadDissip"],
            "position": this.infos[_n10 + "_position"],
            "name": _n10
          });
        }

        for (var _n11 in this.spotLights) {
          this.fragmentSrc += this.spotLights[_n11].getFragmentShaderMainCode({
            "normal": this.infos["normal"],
            "ambient": this.infos[_n11 + "_ambientColor"],
            "diffuse": this.infos[_n11 + "_diffuseColor"],
            "specular": this.infos[_n11 + "_specularColor"],
            "position": this.infos[_n11 + "_position"],
            "direction": this.infos[_n11 + "_direction"],
            "iLimit": this.infos[_n11 + "_iLimit"],
            "oLimit": this.infos[_n11 + "_oLimit"],
            "constDissip": this.infos[_n11 + "_constDissip"],
            "linDissip": this.infos[_n11 + "_linDissip"],
            "quadDissip": this.infos[_n11 + "_quadDissip"],
            "name": _n11
          });
        }
      } else if (this.mode == "normal") {
        this.fragmentSrc += "gl_FragColor = " + this.infos["normalColor"].name + ";";
      } //Transparency


      if (this.fragmentUniforms["opacity"]) {
        this.fragmentSrc += "gl_FragColor.a = gl_FragColor.a * " + this.infos["opacity"].name + ";";
      } else {
        this.fragmentSrc += "gl_FragColor.a = 1.0;";
      }

      if (this.mode == "event") {
        this.fragmentSrc += "gl_FragColor = vec4(" + this.infos["IDasColor"].name + ".xyz, 0.0);";
      }

      this.fragmentSrc += "}";
      console.log(this.fragmentSrc);
    }
  }, {
    key: "clone",
    value: function clone() {
      var neww = new this.constructor();
      neww.vertexSrc = this.vertexSrc;
      neww.fragmentSrc = this.fragmentSrc;
      neww.lastShaderProgram = this.lastShaderProgram;
      neww.triangleMode = this.triangleMode;
      neww.normalDisplay = this.normalDisplay;
      neww.normalColor = this.normalColor.slice();
      neww.mode = this.mode; //Lights configuration

      Object.assign(neww.ambientLights, this.ambientLights);
      Object.assign(neww.directionalLights, this.directionalLights);
      Object.assign(neww.pointLights, this.pointLights);
      Object.assign(neww.spotLights, this.spotLights);
      neww.needReBuild = this.needReBuild;
      Object.assign(neww.vertexAttributes, this.vertexAttributes);
      Object.assign(neww.fragmentAttributes, this.fragmentAttributes);
      Object.assign(neww.vertexUniforms, this.vertexUniforms);
      Object.assign(neww.fragmentUniforms, this.fragmentUniforms);
      Object.assign(neww.infos, this.infos);
      Object.assign(neww.pointers, this.pointers);
      return neww;
    }
  }]);

  return ShaderBuilder;
}();

module.exports = ShaderBuilder;
},{}],22:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Texture = require("../Interfaces/Texture.class.js");

var CanvasTexture =
/*#__PURE__*/
function (_Texture) {
  _inherits(CanvasTexture, _Texture);

  function CanvasTexture(webGLProgram, canvas, drawFunction) {
    var _this;

    _classCallCheck(this, CanvasTexture);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CanvasTexture).call(this));
    _this.webGLProgram = webGLProgram;
    _this.gl = webGLProgram.getContext();
    _this.texture = _this.gl.createTexture();
    _this.canvas = canvas;
    _this.drawFunction = drawFunction;
    return _this;
  }

  _createClass(CanvasTexture, [{
    key: "update",
    value: function update() {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      var ctx = this.canvas.getContext("2d");
      ctx.resetTransform();
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.translate(0, this.canvas.height);
      ctx.scale(1, -1);
      this.drawFunction(this.canvas);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.canvas);

      if ((this.canvas.width & this.canvas.width - 1) == 0 && (this.canvas.height & this.canvas.height - 1) == 0) {
        this.gl.generateMipmap(this.gl.TEXTURE_2D);
      } else {
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
      }
    }
  }, {
    key: "getTexture",
    value: function getTexture() {
      return this.texture;
    }
  }]);

  return CanvasTexture;
}(Texture);

module.exports = CanvasTexture;
},{"../Interfaces/Texture.class.js":6}],23:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Texture = require("../Interfaces/Texture.class.js");

var ColorTexture =
/*#__PURE__*/
function (_Texture) {
  _inherits(ColorTexture, _Texture);

  function ColorTexture(webGLProgram, r, g, b, a) {
    var _this;

    _classCallCheck(this, ColorTexture);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ColorTexture).call(this));
    _this.webGLProgram = webGLProgram;
    _this.gl = webGLProgram.getContext();
    _this.texture = _this.gl.createTexture();
    _this.rgba = [r, g, b, a];

    _this.update();

    return _this;
  }

  _createClass(ColorTexture, [{
    key: "update",
    value: function update() {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([this.rgba[0] * 255, this.rgba[1] * 255, this.rgba[2] * 255, this.rgba[3] * 255]));
    }
  }, {
    key: "getTexture",
    value: function getTexture() {
      return this.texture;
    }
  }, {
    key: "getRGBA",
    value: function getRGBA() {
      return this.rgba;
    }
  }, {
    key: "setRGBA",
    value: function setRGBA(r, g, b, a) {
      this.rgba = [r, g, b, a];
      this.update();
    }
  }]);

  return ColorTexture;
}(Texture);

module.exports = ColorTexture;
},{"../Interfaces/Texture.class.js":6}],24:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Texture = require("../Interfaces/Texture.class.js");

var Renderer = require("../Renderer.class.js");

var Utils = require("../Utils.class.js");

var EventTexture =
/*#__PURE__*/
function (_Texture) {
  _inherits(EventTexture, _Texture);

  function EventTexture(webGLProgram, scene) {
    var _this;

    _classCallCheck(this, EventTexture);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EventTexture).call(this));
    _this.webGLProgram = webGLProgram;
    _this.gl = webGLProgram.getContext();
    _this.texture = _this.gl.createTexture();
    _this.scene = scene;
    var previousShader = webGLProgram.getShaderBuilder();
    _this.shaderBuilder = webGLProgram.getShaderBuilder().clone();

    _this.shaderBuilder.setMode("event");

    var that = _assertThisInitialized(_this);

    _this.renderer = new Renderer(_this.scene, function (program) {
      that.scene.setShaderBuilder(that.shaderBuilder);
    }, function (program) {
      that.scene.setShaderBuilder(previousShader);
    });

    _this.renderer.setResetConfigAtEnd(true);

    _this.clickAsked = false;
    _this.clickX = 0;
    _this.clickY = 0;
    _this.clickCallback = null;
    _this.transparent = false;
    return _this;
  }

  _createClass(EventTexture, [{
    key: "getClick",
    value: function getClick(x, y, callback) {
      this.clickAsked = true;
      this.clickX = x;
      this.clickY = this.webGLProgram.getCanvas().height - y;
      this.clickCallback = callback;
    }
  }, {
    key: "update",
    value: function update(width, height) {
      //Bind texture
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR); //FrameBuffer
      //Create and bind the framebuffer

      var fb = this.gl.createFramebuffer();
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fb);
      var depthBuffer = this.gl.createRenderbuffer();
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, depthBuffer);
      this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);
      this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, depthBuffer);
      this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.texture, 0); //RENDER

      this.renderer.render(this.webGLProgram, [width, height]);

      if (this.clickAsked) {
        var data = new Uint8Array(4);
        this.gl.readPixels(this.clickX, // x
        this.clickY, // y
        1, // width
        1, // height
        this.gl.RGBA, // format
        this.gl.UNSIGNED_BYTE, // type
        data);
        this.clickCallback(Utils.getObjectByID(Utils.colorAsID(data)));
        this.clickAsked = false;
      }

      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    }
  }, {
    key: "getTexture",
    value: function getTexture() {
      return this.texture;
    }
  }]);

  return EventTexture;
}(Texture);

module.exports = EventTexture;
},{"../Interfaces/Texture.class.js":6,"../Renderer.class.js":19,"../Utils.class.js":28}],25:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Texture = require("../Interfaces/Texture.class.js");

var FrameTexture =
/*#__PURE__*/
function (_Texture) {
  _inherits(FrameTexture, _Texture);

  function FrameTexture(webGLProgram, renderer) {
    var _this;

    _classCallCheck(this, FrameTexture);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FrameTexture).call(this));
    _this.webGLProgram = webGLProgram;
    _this.gl = webGLProgram.getContext();
    _this.texture = _this.gl.createTexture();
    _this.renderer = renderer;

    _this.renderer.setResetConfigAtEnd(true);

    return _this;
  }

  _createClass(FrameTexture, [{
    key: "update",
    value: function update(object) {
      var viewPortDimensions = {};

      if (typeof object.getTextureDimensions == "function") {
        var dims = object.getTextureDimensions();
        viewPortDimensions = {
          "width": dims[0] / dims[1] * 255,
          "height": dims[1] / dims[0] * 255
        };
      } //Bind texture


      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
      this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, viewPortDimensions.width, viewPortDimensions.height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
      this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR); //FrameBuffer
      // Create and bind the framebuffer

      var fb = this.gl.createFramebuffer();
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fb);
      var depthBuffer = this.gl.createRenderbuffer();
      this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, depthBuffer);
      this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, viewPortDimensions.width, viewPortDimensions.height);
      this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, depthBuffer);
      this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.texture, 0); //RENDER

      this.renderer.render(this.webGLProgram, [viewPortDimensions.width, viewPortDimensions.height]);
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    }
  }, {
    key: "getTexture",
    value: function getTexture() {
      return this.texture;
    }
  }]);

  return FrameTexture;
}(Texture);

module.exports = FrameTexture;
},{"../Interfaces/Texture.class.js":6}],26:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Texture = require("../Interfaces/Texture.class.js");

var ImageTexture =
/*#__PURE__*/
function (_Texture) {
  _inherits(ImageTexture, _Texture);

  function ImageTexture(webGLProgram, src) {
    var _this;

    _classCallCheck(this, ImageTexture);

<<<<<<< HEAD
    this.fragmentAttributes = {
      "color": false,
      // ALWAYS FALSE
      "textureCoordonnees": true // ALWAYS TRUE

    }; //Vertex Shader Uniform
=======
    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageTexture).call(this));
    _this.webGLProgram = webGLProgram;
    _this.gl = webGLProgram.getContext();
>>>>>>> tmp

    var that = _assertThisInitialized(_this);

<<<<<<< HEAD
    this.fragmentUniforms = {
      "texture": true // ALWAYS TRUE

    };
    this.infos = {
      "position": {
        "nbDatas": 3,
        "type": "attribute vec4",
        "name": "aVertexPosition"
      },
      "color": {
        "nbDatas": 4,
        "type": "attribute vec4",
        "name": "aVertexColor",
        "varyingType": "varying lowp vec4",
        "varyingName": "vColor"
      },
      "projection": {
        "type": "uniform mat4",
        "name": "uProjectionMatrix"
      },
      "localTransformation": {
        "type": "uniform mat4",
        "name": "uLocalTransformationMatrix"
      },
      "texture": {
        "type": "uniform sampler2D",
        "name": "uSampler"
      },
      "textureCoordonnees": {
        "nbDatas": 2,
        "type": "attribute vec2",
        "name": "aTextureCoord",
        "varyingType": "varying highp vec2",
        "varyingName": "vTextureCoord"
      }
    };
    this.pointers = {
      "position": null,
      "color": null,
      "projection": null,
      "localTransformation": null,
      "textureCoordonnees": null
    };
=======
    var image = new Image();
    _this.texture = _this.gl.createTexture();

    _this.gl.bindTexture(_this.gl.TEXTURE_2D, _this.texture);

    _this.gl.texImage2D(_this.gl.TEXTURE_2D, 0, _this.gl.RGBA, 1, 1, 0, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));

    image.onload = function () {
      that.gl.bindTexture(that.gl.TEXTURE_2D, that.texture);
      that.gl.texImage2D(that.gl.TEXTURE_2D, 0, that.gl.RGBA, that.gl.RGBA, that.gl.UNSIGNED_BYTE, image);

      if ((image.width & image.width - 1) == 0 && (image.height & image.height - 1) == 0) {
        that.gl.generateMipmap(that.gl.TEXTURE_2D);
      } else {
        that.gl.texParameteri(that.gl.TEXTURE_2D, that.gl.TEXTURE_WRAP_S, that.gl.CLAMP_TO_EDGE);
        that.gl.texParameteri(that.gl.TEXTURE_2D, that.gl.TEXTURE_WRAP_T, that.gl.CLAMP_TO_EDGE);
        that.gl.texParameteri(that.gl.TEXTURE_2D, that.gl.TEXTURE_MIN_FILTER, that.gl.LINEAR);
      }
    };

    image.src = src;
    return _this;
>>>>>>> tmp
  }

  _createClass(ImageTexture, [{
    key: "getTexture",
    value: function getTexture() {
      return this.texture;
    }
  }]);

  return ImageTexture;
}(Texture);

module.exports = ImageTexture;
},{"../Interfaces/Texture.class.js":6}],27:[function(require,module,exports){
"use strict";

<<<<<<< HEAD
      return result;
    }
  }, {
    key: "setTextureRenderer",
    value: function setTextureRenderer(bool) {
      if (bool) {
        this.fragmentAttributes["color"] = false;
        this.fragmentAttributes["textureCoordonnees"] = true;
        this.fragmentUniforms["texture"] = true;
      } else {
        this.fragmentAttributes["color"] = true;
        this.fragmentAttributes["textureCoordonnees"] = false;
        this.fragmentUniforms["texture"] = false;
      }
    }
  }, {
    key: "getShaderProgram",
    value: function getShaderProgram(gl) {
      this._buildShaders();
=======
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
>>>>>>> tmp

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Texture = require("../Interfaces/Texture.class.js");

var glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

var Utils = require("../Utils.class.js");

var Translate = require("../Movements/Translate.class.js");

var Renderer = require("../Renderer.class.js");

var MirrorTexture =
/*#__PURE__*/
function (_Texture) {
  _inherits(MirrorTexture, _Texture);

  function MirrorTexture(webGLProgram) {
    var _this;

    _classCallCheck(this, MirrorTexture);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MirrorTexture).call(this));
    _this.webGLProgram = webGLProgram;
    _this.gl = webGLProgram.getContext();
    return _this;
  }

  _createClass(MirrorTexture, [{
    key: "preDraw",
    value: function preDraw(mirrorObject, transform) {
      //Config
      this.gl.enable(this.gl.STENCIL_TEST);
      this.gl.clear(this.gl.STENCIL_BUFFER_BIT);
      this.gl.stencilOp(this.gl.KEEP, this.gl.KEEP, this.gl.REPLACE);
      this.gl.stencilFunc(this.gl.ALWAYS, 1, 0xFF);
      this.gl.stencilMask(0xFF);
      this.gl.colorMask(false, false, false, false); //Draw stencil buffer

      mirrorObject.renderAttribute("position", this.webGLProgram);
      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.webGLProgram.getBuffer("index"));
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mirrorObject.indexes), this.gl.STATIC_DRAW);
      this.gl.uniformMatrix4fv(this.webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, transform);
      this.gl.drawElements(this.gl.TRIANGLES, mirrorObject.indexes.length, this.gl.UNSIGNED_SHORT, 0); //Config

      this.gl.colorMask(true, true, true, true);
      this.gl.stencilFunc(this.gl.EQUAL, 1, 0xFF);
      this.gl.stencilMask(0x00); //Render reflected objects

      var planeVec1 = glmatrix.vec4.fromValues(0.5, 0, 0, 1);
      var planeVec2 = glmatrix.vec4.fromValues(0, 0.5, 0, 1);
      var vecPosition = glmatrix.vec4.fromValues(0, 0, 0, 1);
      glmatrix.vec4.transformMat4(planeVec1, planeVec1, transform);
      glmatrix.vec4.transformMat4(planeVec2, planeVec2, transform);
      glmatrix.vec4.transformMat4(vecPosition, vecPosition, transform);
      this.gl.uniform1i(this.webGLProgram.getShaderBuilder().getPointer("mirrorActive"), 1);
      this.gl.uniform4fv(this.webGLProgram.getShaderBuilder().getPointer("mirrorPoint"), vecPosition);
      this.gl.uniform4fv(this.webGLProgram.getShaderBuilder().getPointer("mirrorVec1"), planeVec1);
      this.gl.uniform4fv(this.webGLProgram.getShaderBuilder().getPointer("mirrorVec2"), planeVec2);
      planeVec1 = Utils.newVec4(vecPosition, planeVec1);
      planeVec2 = Utils.newVec4(vecPosition, planeVec2);
      var newScene = this.webGLProgram.getScene().clone([mirrorObject]);
      var renderer = new Renderer(newScene);
      renderer.setResetConfigAtEnd(true);
      renderer.disableObjectStepUpAnimation();
      renderer.disableLightStepUpAnimation();
      renderer.disableCameraStepUpAnimation();
      renderer.disableClearColorBuffer();
      renderer.disableClearDepthBuffer();
      newScene.setRenderer(renderer, 0);
      newScene.incMirrorValue();
      renderer.render(this.webGLProgram);
      this.gl.uniform1i(this.webGLProgram.getShaderBuilder().getPointer("mirrorActive"), 0); //Render depth Buffer

      /*this.gl.colorMask(false, false, false, false);
      mirrorObject.renderAttribute("position", this.webGLProgram);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.webGLProgram.getBuffer("index"));
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mirrorObject.indexes), this.gl.STATIC_DRAW);
      this.gl.uniformMatrix4fv(this.webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, transform);
        this.gl.drawElements(this.gl.TRIANGLES, mirrorObject.indexes.length, this.gl.UNSIGNED_SHORT, 0);
        this.gl.colorMask(true,true,true,true);*/
    }
  }, {
    key: "postDraw",
    value: function postDraw(mirrorObject, transform) {
      //Return to init config
      this.gl.disable(this.gl.STENCIL_TEST);
      this.gl.uniform1i(this.webGLProgram.getShaderBuilder().getPointer("mirrorActive"), false, 0);
    }
  }]);

  return MirrorTexture;
}(Texture);

module.exports = MirrorTexture;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":38,"../Interfaces/Texture.class.js":6,"../Movements/Translate.class.js":15,"../Renderer.class.js":19,"../Utils.class.js":28}],28:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var glmatrix = require("../../node_modules/gl-matrix/gl-matrix-min.js");

<<<<<<< HEAD
      if (this.fragmentAttributes["color"]) {
        this.fragmentSrc += "gl_FragColor = " + this.infos["color"].varyingName + ";";
      } else if (this.fragmentAttributes["textureCoordonnees"]) {
        this.fragmentSrc += "gl_FragColor = texture2D(" + this.infos["texture"].name + ", " + this.infos["textureCoordonnees"].varyingName + ");";
      }
=======
var Utils =
/*#__PURE__*/
function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }
>>>>>>> tmp

  _createClass(Utils, null, [{
    key: "newID",
    value: function newID(obj) {
      this.nextID = this.nextID + 1;
      this.objects[this.nextID] = obj;
      return this.nextID;
    }
  }, {
    key: "newMaterialID",
    value: function newMaterialID(obj) {
      this.nextMaterialID = this.nextMaterialID + 1;
      this.materials[this.nextMaterialID] = obj;
      return this.nextMaterialID;
    }
  }, {
    key: "orthoProjectPlane",
    value: function orthoProjectPlane(point, pointPlan, vec1, vec2) {
      var normal = glmatrix.vec3.create();
      glmatrix.vec3.cross(normal, vec1, vec2);
      var plan = {
        a: normal[0],
        b: normal[1],
        c: normal[2],
        d: -normal[0] * pointPlan[0] + -normal[1] * pointPlan[1] + -normal[2] * pointPlan[2]
      };
      var beta = (-(point[0] * plan.a) - point[1] * plan.b - point[2] * plan.c - plan.d) / (plan.a * plan.a + plan.b * plan.b + plan.c * plan.c);
      return glmatrix.vec3.fromValues(point[0] + plan.a * beta, point[1] + plan.b * beta, point[2] + plan.c * beta);
    }
  }, {
    key: "newVec3",
    value: function newVec3(point1, point2) {
      var p1 = glmatrix.vec3.create();
      glmatrix.vec3.scale(p1, point1, -1);
      var v3 = glmatrix.vec3.create();
      glmatrix.vec3.add(v3, point2, p1);
      return v3;
    }
  }, {
    key: "newVec4",
    value: function newVec4(point1, point2) {
      var p1 = glmatrix.vec4.create();
      glmatrix.vec4.scale(p1, point1, -1);
      var v4 = glmatrix.vec4.create();
      glmatrix.vec4.add(v4, point2, p1);
      v4[3] = 1;
      return v4;
    }
  }, {
    key: "symPlane",
    value: function symPlane(point, planePoint, planeVec1, planeVec2) {
      var proj = Utils.orthoProjectPlane(point, planePoint, planeVec1, planeVec2);
      var vec = Utils.newVec(point, proj);
      glmatrix.vec3.scale(vec, vec, 2);
      var result = glmatrix.vec3.create();
      glmatrix.vec3.add(result, point, vec);
      return result;
    }
  }, {
    key: "getCentroid",
    value: function getCentroid(vec1, vec2, vec3) {
      return [(vec1[0] + vec2[0] + vec3[0]) / 3, (vec1[1] + vec2[1] + vec3[1]) / 3, (vec1[2] + vec2[2] + vec3[2]) / 3];
    }
  }, {
    key: "fromDegToDotSpace",
    value: function fromDegToDotSpace(x) {
      return Math.cos(x / 180 * Math.PI);
    }
  }, {
    key: "idAsColor",
    value: function idAsColor(id) {
      return [(id >> 0 & 0xFF) / 0xFF, (id >> 8 & 0xFF) / 0xFF, (id >> 16 & 0xFF) / 0xFF, (id >> 24 & 0xFF) / 0xFF];
    }
  }, {
    key: "colorAsID",
    value: function colorAsID(vec4) {
      return vec4[0] + (vec4[1] << 8) + (vec4[2] << 16) + (vec4[3] << 24);
    }
  }, {
    key: "getObjectByID",
    value: function getObjectByID(id) {
      return this.objects[id];
    }
  }]);

  return Utils;
}();

<<<<<<< HEAD
module.exports = ShaderBuilder;
},{}],15:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Texture = require("../Interfaces/Texture.class.js");

var ColorTexture =
/*#__PURE__*/
function (_Texture) {
  _inherits(ColorTexture, _Texture);

  function ColorTexture(webGLProgram, r, g, b, a) {
    var _this;

    _classCallCheck(this, ColorTexture);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ColorTexture).call(this));
    _this.webGLProgram = webGLProgram;
    _this.gl = webGLProgram.getContext();
    _this = _possibleConstructorReturn(this, _getPrototypeOf(ColorTexture).call(this));
    _this.texture = _this.gl.createTexture();

    _this.gl.bindTexture(_this.gl.TEXTURE_2D, _this.texture);

    _this.gl.texImage2D(_this.gl.TEXTURE_2D, 0, _this.gl.RGBA, 1, 1, 0, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, new Uint8Array([r * 255, g * 255, b * 255, a * 255]));

    return _this;
  }

  _createClass(ColorTexture, [{
    key: "getTexture",
    value: function getTexture() {
      return this.texture;
    }
  }]);

  return ColorTexture;
}(Texture);

module.exports = ColorTexture;
},{"../Interfaces/Texture.class.js":6}],16:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Texture = require("../Interfaces/Texture.class.js");

var FrameTexture =
/*#__PURE__*/
function (_Texture) {
  _inherits(FrameTexture, _Texture);

  function FrameTexture() {
    _classCallCheck(this, FrameTexture);

    return _possibleConstructorReturn(this, _getPrototypeOf(FrameTexture).apply(this, arguments));
  }

  return FrameTexture;
}(Texture);

module.exports = FrameTexture;
},{"../Interfaces/Texture.class.js":6}],17:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Texture = require("../Interfaces/Texture.class.js");

var ImageTexture =
/*#__PURE__*/
function (_Texture) {
  _inherits(ImageTexture, _Texture);

  function ImageTexture(webGLProgram, src) {
    var _this;

    _classCallCheck(this, ImageTexture);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageTexture).call(this));
    _this.webGLProgram = webGLProgram;
    _this.gl = webGLProgram.getContext();

    var that = _assertThisInitialized(_this);

    var image = new Image();
    _this.texture = _this.gl.createTexture();

    _this.gl.bindTexture(_this.gl.TEXTURE_2D, _this.texture);

    _this.gl.texImage2D(_this.gl.TEXTURE_2D, 0, _this.gl.RGBA, 1, 1, 0, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));

    image.onload = function () {
      that.gl.bindTexture(that.gl.TEXTURE_2D, that.texture);
      that.gl.texImage2D(that.gl.TEXTURE_2D, 0, that.gl.RGBA, that.gl.RGBA, that.gl.UNSIGNED_BYTE, image);

      if ((image.width & image.width - 1) == 0 && (image.height & image.height - 1) == 0) {
        that.gl.generateMipmap(that.gl.TEXTURE_2D);
      } else {
        that.gl.texParameteri(that.gl.TEXTURE_2D, that.gl.TEXTURE_WRAP_S, that.gl.CLAMP_TO_EDGE);
        that.gl.texParameteri(that.gl.TEXTURE_2D, that.gl.TEXTURE_WRAP_T, that.gl.CLAMP_TO_EDGE);
        that.gl.texParameteri(that.gl.TEXTURE_2D, that.gl.TEXTURE_MIN_FILTER, that.gl.LINEAR);
      }
    };

    image.src = src;
    return _this;
  }

  _createClass(ImageTexture, [{
    key: "getTexture",
    value: function getTexture() {
      return this.texture;
    }
  }]);

  return ImageTexture;
}(Texture);

module.exports = ImageTexture;
},{"../Interfaces/Texture.class.js":6}],18:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Texture = require("../Interfaces/Texture.class.js");

var Object3DGroup = require("../Objects3D/Object3DGroup.class.js");

var glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

var Utils = require("../Utils.class.js");

var Translate = require("../Movements/Translate.class.js");

var MirrorTexture =
/*#__PURE__*/
function (_Texture) {
  _inherits(MirrorTexture, _Texture);

  function MirrorTexture(webGLProgram) {
    var _this;

    _classCallCheck(this, MirrorTexture);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MirrorTexture).call(this));
    _this.webGLProgram = webGLProgram;
    _this.gl = webGLProgram.getContext();
    return _this;
  }

  _createClass(MirrorTexture, [{
    key: "preDraw",
    value: function preDraw(mirrorObject) {//Config
      //this.gl.depthMask(false);
      //this.gl.enable(this.gl.STENCIL_TEST);
      //this.gl.stencilOp(this.gl.KEEP, this.gl.KEEP, this.gl.REPLACE);  
      //this.gl.stencilFunc(this.gl.ALWAYS, 1, 0xFF);
      //this.gl.stencilMask(0xFF);
    }
  }, {
    key: "postDraw",
    value: function postDraw(mirrorObject, transform) {
      //console.log(transform);
      var mirrorPos = mirrorObject.getPosition(); //const tr =glmatrix.mat4.create();
      //glmatrix.mat4.translate(tr, tr, [-mirrorPos[0], -mirrorPos[1], -mirrorPos[2]]);
      //glmatrix.mat4.multiply(transform, tr, transform);

      mirrorObject.mirrorVec1 = glmatrix.vec3.fromValues(1, 0, 0);
      mirrorObject.mirrorVec2 = glmatrix.vec3.fromValues(0, 1, 0);
      mirrorObject.mirrorPos = glmatrix.vec3.fromValues(0, 0, 0);
      glmatrix.mat4.add(mirrorObject.mirrorPos, mirrorObject.mirrorPos, [mirrorPos[0], mirrorPos[1], mirrorPos[2]]); //const point = glmatrix.vec3.fromValues(0, 0, 0);

      glmatrix.vec3.transformMat4(mirrorObject.mirrorVec1, mirrorObject.mirrorVec1, transform);
      glmatrix.vec3.transformMat4(mirrorObject.mirrorVec2, mirrorObject.mirrorVec2, transform); //glmatrix.vec3.transformMat4(mirrorObject.mirrorPos, mirrorObject.mirrorPos, transform);
      //let tr = Utils.symPlane(point, mirrorObject.mirrorPos, mirrorObject.mirrorVec1, mirrorObject.mirrorVec2);
      //tr = Utils.newVec(point, tr);
      //Config
      //this.gl.depthMask(true);
      //this.gl.stencilFunc(this.gl.EQUAL, 1, 0xFF);
      //this.gl.stencilMask(0x00);
      //Render reflected objects

      var actualObjects = this.webGLProgram.getScene().get3DObjects();
      var reflectedObjects = new Object3DGroup();
      var i = 0;

      for (var obj in actualObjects) {
        if (!Object.is(actualObjects[obj], mirrorObject)) {
          var newObject = actualObjects[obj].mirrorClone(mirrorObject);
          reflectedObjects.add3DObject("name" + i, newObject);
          i++;
        }
      }

      reflectedObjects.renderMirrored(this.webGLProgram, this.webGLProgram.getShaderBuilder().getActiveAttributes(), mirrorObject); //Return to init config

      this.gl.disable(this.gl.STENCIL_TEST);
    }
  }]);

  return MirrorTexture;
}(Texture);

module.exports = MirrorTexture;
},{"../../../node_modules/gl-matrix/gl-matrix-min.js":25,"../Interfaces/Texture.class.js":6,"../Movements/Translate.class.js":9,"../Objects3D/Object3DGroup.class.js":11,"../Utils.class.js":19}],19:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var glmatrix = require("../../node_modules/gl-matrix/gl-matrix-min.js");

var Utils =
/*#__PURE__*/
function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "orthoProjectPlane",
    value: function orthoProjectPlane(point, pointPlan, vec1, vec2) {
      console.log(pointPlan);
      var normal = glmatrix.vec3.create();
      glmatrix.vec3.cross(normal, vec1, vec2); //console.log(vec1, vec2);
      //console.log(normal);

      var plan = {
        a: normal[0],
        b: normal[1],
        c: normal[2],
        d: -normal[0] * pointPlan[0] + -normal[1] * pointPlan[1] + -normal[2] * pointPlan[2]
      }; //console.log(plan);

      var beta = (-(point[0] * plan.a) - point[1] * plan.b - point[2] * plan.c - plan.d) / (plan.a * plan.a + plan.b * plan.b + plan.c * plan.c); //console.log(beta);
      //console.log(point);

      return glmatrix.vec3.fromValues(point[0] + plan.a * beta, point[1] + plan.b * beta, point[2] + plan.c * beta);
    }
  }, {
    key: "newVec",
    value: function newVec(point1, point2) {
      var p1 = glmatrix.vec3.create();
      glmatrix.vec3.scale(p1, point1, -1);
      var v3 = glmatrix.vec3.create();
      glmatrix.vec3.add(v3, point2, p1);
      return v3;
    }
  }, {
    key: "symPlane",
    value: function symPlane(point, planePoint, planeVec1, planeVec2) {
      var proj = Utils.orthoProjectPlane(point, planePoint, planeVec1, planeVec2);
      var vec = Utils.newVec(point, proj);
      glmatrix.vec3.scale(vec, vec, 2);
      var result = glmatrix.vec3.create();
      glmatrix.vec3.add(result, point, vec);
      return result;
    }
  }]);

  return Utils;
}();

module.exports = Utils;
},{"../../node_modules/gl-matrix/gl-matrix-min.js":25}],20:[function(require,module,exports){
=======
_defineProperty(Utils, "nextID", -1);

_defineProperty(Utils, "objects", []);

_defineProperty(Utils, "nextMaterialID", -1);

_defineProperty(Utils, "materials", []);

module.exports = Utils;
},{"../../node_modules/gl-matrix/gl-matrix-min.js":38}],29:[function(require,module,exports){
>>>>>>> tmp
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ShaderBuilder = require("./ShaderBuilder.class.js");

var ColorTexture = require("./Textures/ColorTexture.class.js");

var ImageTexture = require("./Textures/ImageTexture.class.js");

var MirrorTexture = require("./Textures/MirrorTexture.class.js");

var FrameTexture = require("./Textures/FrameTexture.class.js");

<<<<<<< HEAD
=======
var CanvasTexture = require("./Textures/CanvasTexture.class.js");

var EventTexture = require("./Textures/EventTexture.class.js");

>>>>>>> tmp
var WebGLProgram =
/*#__PURE__*/
function () {
  function WebGLProgram() {
    _classCallCheck(this, WebGLProgram);

    this.container = null;
    this.parentBlock = null;
    this.refreshId = null;
    this.scenes = [];
    this.started = false;
    this.updateOnResize = true;
    this.depthTextureExt = null; //FPS Counter

    this.fpsTime = 0;
    this.fpsCount = 0;
    this.fpsCallback;
    this.fpsLast;
    this.fpsDisplay = 1000;
    this._handleResize = this._handleResize.bind(this);
    this.updateFrame = this.updateFrame.bind(this); //Initialisation de l'environnement

    this.canvas = document.createElement('canvas');
    this.gl = this.canvas.getContext("webgl", {
      stencil: true //alpha: false 

    }); //Default Shader

    this.defaultShaderBuilder = new ShaderBuilder();
    this.actualShaderBuilder = this.defaultShaderBuilder; //Variables

    this.buffers = [];
    this.preFrameFunction = null;
    this.postFrameFunction = null;
  }

  _createClass(WebGLProgram, [{
<<<<<<< HEAD
    key: "setTextureRenderer",
    value: function setTextureRenderer(bool) {
      this.actualShaderBuilder.setTextureRenderer(bool);
    }
  }, {
    key: "createFrameTexture",
    value: function createFrameTexture() {}
=======
    key: "setPreFrameFunction",
    value: function setPreFrameFunction(func) {
      this.preFrameFunction = func;
    }
  }, {
    key: "setPostFrameFunction",
    value: function setPostFrameFunction(func) {
      this.postFrameFunction = func;
    }
  }, {
    key: "setFPSDisplayTime",
    value: function setFPSDisplayTime(fpsDisplayTime) {
      this.fpsDisplay = fpsDisplayTime;
    }
  }, {
    key: "enableDepthTexture",
    value: function enableDepthTexture() {
      this.depthTextureExt = this.gl.getExtension("WEBGL_depth_texture");
    }
  }, {
    key: "disableDepthTexture",
    value: function disableDepthTexture() {
      this.depthTextureExt = null;
    }
  }, {
    key: "enableFPSCounter",
    value: function enableFPSCounter(callback, fpsDisplayTime) {
      if (typeof fpsDisplayTime != "undefined") {
        this.fpsDisplay = fpsDisplayTime;
      }

      this.fpsCallback = callback;
      this.fpsTime = 0;
      this.fpsCount = 0;
    }
  }, {
    key: "disableFPSCounter",
    value: function disableFPSCounter() {
      this.fpsCallback = null;
      this.fpsLast = null;
    }
  }, {
    key: "createFrameTexture",
    value: function createFrameTexture(renderer) {
      var texture = new FrameTexture(this, renderer);
      return texture;
    }
  }, {
    key: "createCanvasTexture",
    value: function createCanvasTexture(canvas, func) {
      var texture = new CanvasTexture(this, canvas, func);
      return texture;
    }
>>>>>>> tmp
  }, {
    key: "createImageTexture",
    value: function createImageTexture(src) {
      var texture = new ImageTexture(this, src);
<<<<<<< HEAD
      return texture.getTexture();
=======
      return texture;
>>>>>>> tmp
    }
  }, {
    key: "createMirrorTexture",
    value: function createMirrorTexture() {
      var texture = new MirrorTexture(this);
      return texture;
    }
  }, {
    key: "createColorTexture",
    value: function createColorTexture(r, g, b, a) {
<<<<<<< HEAD
      var texture = new ColorTexture(this, 1., 0., 0., 1);
      return texture.getTexture();
=======
      var texture = new ColorTexture(this, r, g, b, a);
      return texture;
    }
  }, {
    key: "createEventTexture",
    value: function createEventTexture(renderer) {
      var texture = new EventTexture(this, renderer);
      return texture;
>>>>>>> tmp
    }
  }, {
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
    key: "getShaderBuilder",
    value: function getShaderBuilder() {
      return this.actualShaderBuilder;
    }
  }, {
    key: "addScene",
    value: function addScene(scene, i) {
      if (typeof i == "undefined") {
        this.scenes[this.scenes.length] = scene;
      } else {
        this.scenes.splice(i, 0, scene);
      }
    }
  }, {
    key: "removeScene",
    value: function removeScene(i) {
      if (typeof i == "undefined") {
        i = 0;
      }

      this.scenes.splice(i, 1);
    }
  }, {
    key: "setScene",
    value: function setScene(scene, i) {
      if (typeof i == "undefined") {
        i = 0;
      }

      this.scenes[i] = scene;
    }
  }, {
    key: "getScene",
    value: function getScene(i) {
      if (typeof i == "undefined") {
        i = 0;
      }

      return this.scenes[i];
    }
  }, {
    key: "insertInBlock",
    value: function insertInBlock(block) {
      this.parentBlock = block;

      this._handleResize();

      this.parentBlock.appendChild(this.canvas);

      if (this._updateOnResize) {
        window.addEventListener("resize", this._handleResize);
      }
    }
  }, {
    key: "getCanvas",
    value: function getCanvas() {
      return this.canvas;
    }
  }, {
    key: "getBuffer",
    value: function getBuffer(name) {
      return this.buffers[name];
    }
  }, {
    key: "_handleResize",
    value: function _handleResize() {
      //var realToCSSPixels = window.devicePixelRatio;
      //https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html Pour la prise en charge écran rétina
      this.canvas.width = Math.floor(this.parentBlock.clientWidth); // * realToCSSPixels);

      this.canvas.height = Math.floor(this.parentBlock.clientHeight); // * realToCSSPixels);
    }
  }, {
    key: "updateFrame",
    value: function updateFrame() {
      if (this.preFrameFunction != null) {
        this.preFrameFunction();
      }

      if (this.fpsCallback != null) {
        var now = new Date().getTime();

        if (this.fpsLast != null) {
          this.fpsTime += now - this.fpsLast;
          this.fpsCount++;

          if (this.fpsTime > this.fpsDisplay) {
            this.fpsCallback((this.fpsCount * (1000 / this.fpsTime)).toFixed(2));
            this.fpsTime = 0;
            this.fpsCount = 0;
          }
        }

        this.fpsLast = now;
      } //Render


      for (var i = 0; i < this.scenes.length; i++) {
        this.scenes[i].renderTextures(this);
      }

      for (var _i = 0; _i < this.scenes.length; _i++) {
        this.scenes[_i].render(this);
      }

      if (this.postFrameFunction != null) {
        this.postFrameFunction();
      } //Next Frame


      if (this.started) {
        this.refreshId = window.requestAnimationFrame(this.updateFrame);
      }
    }
  }, {
    key: "start",
    value: function start() {
      if (!this.started) {
        this.started = true;
        this.refreshId = window.requestAnimationFrame(this.updateFrame);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      if (this.start) {
        this.started = false;
        window.cancelAnimationFrame(this.refreshId);
      }
    }
  }]);

  return WebGLProgram;
}();

module.exports = WebGLProgram;
<<<<<<< HEAD
},{"./ShaderBuilder.class.js":14,"./Textures/ColorTexture.class.js":15,"./Textures/FrameTexture.class.js":16,"./Textures/ImageTexture.class.js":17,"./Textures/MirrorTexture.class.js":18}],21:[function(require,module,exports){
=======
},{"./ShaderBuilder.class.js":21,"./Textures/CanvasTexture.class.js":22,"./Textures/ColorTexture.class.js":23,"./Textures/EventTexture.class.js":24,"./Textures/FrameTexture.class.js":25,"./Textures/ImageTexture.class.js":26,"./Textures/MirrorTexture.class.js":27}],30:[function(require,module,exports){
>>>>>>> tmp
"use strict";

var test1 = require("./test1/test1.js");

var test2 = require("./test2/test2.js");

var test3 = require("./test3/test3.js");

<<<<<<< HEAD
=======
var test4 = require("./test4/test4.js");

var test5 = require("./test5/test5.js");

var test6 = require("./test6/test6.js");

var test7 = require("./test7/test7.js");

>>>>>>> tmp
var str = window.location.href.split("/");

if (str[str.length - 1] != "") {
  eval(str[str.length - 1] + "()");
} else if (str[str.length - 2] != "" && str[str.length - 2] != "localhost:3000") {
  eval(str[str.length - 2] + "()");
}
<<<<<<< HEAD
},{"./test1/test1.js":22,"./test2/test2.js":23,"./test3/test3.js":24}],22:[function(require,module,exports){
=======
},{"./test1/test1.js":31,"./test2/test2.js":32,"./test3/test3.js":33,"./test4/test4.js":34,"./test5/test5.js":35,"./test6/test6.js":36,"./test7/test7.js":37}],31:[function(require,module,exports){
>>>>>>> tmp
"use strict";

var WebGLProgram = require("../class/WebGLProgram.class.js");

var Camera = require("../class/Camera.class.js");

var Cube = require("../class/Objects3D/Cube.class.js");

var AmbientLight = require("../class/Lights/AmbientLight.class.js");

var DirectionalLight = require("../class/Lights/DirectionalLight.class.js");

var Scene = require("../class/Scene.class.js");

var Rotate = require("../class/Movements/Rotate.class.js");

var Object3DGroup = require("../class/Objects3D/Object3DGroup.class.js");

module.exports = function () {
  var program = new WebGLProgram();
  program.insertInBlock(document.getElementById("display"));
  program.setUpdateOnResize(true);
  program.setTextureRenderer(false);
  var scene = new Scene();
  scene.setClearColor(0, 0, 0, 1); //Tête

  var tete = new Cube();
  tete.setSize(2);
  var textTete = program.createColorTexture(1, 0, 1, 1);
  tete.addTexture(textTete);
  tete.setPosition(0, 0, 0); //Yeux

  var oeil1 = new Cube();
  var textYeux = program.createColorTexture(0, 1, 1, 1);
  oeil1.setSize(0.5);
  oeil1.addTexture(textYeux);
  oeil1.setPosition(-0.6, 0.5, 0);
  var oeil2 = new Cube();
  oeil2.setSize(0.5);
  oeil2.addTexture(textYeux);
  oeil2.setPosition(0.6, 0.5, 0);
  var yeux = new Object3DGroup();
  yeux.add3DObject("oeil1", oeil1);
  yeux.add3DObject("oeil2", oeil2);
  yeux.setPosition(0, 0, 1);
  var moveOeil1 = new Rotate(360, [0, 0, 1], 200, function () {
    moveOeil1.reset();
  });
  oeil1.addMovement("move", moveOeil1);
  moveOeil1.start();
  var moveOeil2 = new Rotate(-360, [0, 0, 1], 200, function () {
    moveOeil2.reset();
  });
  oeil2.addMovement("move", moveOeil2);
  moveOeil2.start(); //Bouche

  var textDents = program.createColorTexture(1, 1, 1, 1);
  var dent1 = new Cube();
  dent1.setSize(0.1);
  dent1.addTexture(textDents);
  dent1.setPosition(-0.25, 0, 0);
  var dent2 = new Cube();
  dent2.setSize(0.1);
  dent2.addTexture(textDents);
  dent2.setPosition(0, 0, 0);
  var dent3 = new Cube();
  dent3.setSize(0.1);
  dent3.addTexture(textDents);
  dent3.setPosition(0.25, 0, 0);
  var dents = new Object3DGroup();
  dents.add3DObject("dent1", dent1);
  dents.add3DObject("dent2", dent2);
  dents.add3DObject("dent3", dent3);
  dents.setPosition(0, -0.5, 1);
  var moveDents = new Rotate(360, [0, 0, 1], 120, function () {
    moveDents.reset();
  });
  dents.addMovement("move", moveDents);
  moveDents.start();
  var group = new Object3DGroup();
  group.add3DObject("tete", tete);
  group.add3DObject("yeux", yeux);
  group.add3DObject("dents", dents);
  scene.add3DObject("group", group);
  var camera = new Camera();
  camera.setType("orthogonal", {});
  camera.setPosition(0, 0, 9);
  scene.addCamera("main", camera);
  scene.setCamera("main");
  var light = new DirectionalLight();
  light.setRGB(1, 1, 1);
  light.setPower([0.1, 1, 1]);
  light.setDirection(-0.3, 0, -1);
  scene.addLight("ambient", light);
  program.setScene(scene);
  program.start();
  window.addEventListener('DOMContentLoaded', function (event) {
    document.getElementById("reset").addEventListener("click", function () {
      var movements = group.getMovements();

      for (var move in movements) {
        group.removeMovement(move);
      }
    });
    document.getElementById("projection").addEventListener("click", function (event) {
      if (event.target.textContent == "PERSPECTIVE") {
        console.log(camera);
        event.target.textContent = "ORTHOGONAL";
        camera.setType("perspective", {});
      } else {
        event.target.textContent = "PERSPECTIVE";
        camera.setType("orthogonal", {});
      }
    });
    document.getElementById("left").addEventListener("click", function () {
      var rotate = new Rotate(-45, [0, 1, 0], 30, function () {
        console.log("Movement left done !");
      });
      group.addMovement("rotate" + group.getNbMovements(), rotate);
      rotate.start();
    });
    document.getElementById("right").addEventListener("click", function () {
      var rotate = new Rotate(45, [0, 1, 0], 30, function () {
        console.log("Movement right done !");
      });
      group.addMovement("rotate" + group.getNbMovements(), rotate);
      rotate.start();
    });
    document.getElementById("up").addEventListener("click", function () {
      var rotate = new Rotate(-45, [1, 0, 0], 30, function () {
        console.log("Movement up done !");
      });
      group.addMovement("rotate" + group.getNbMovements(), rotate);
      rotate.start();
    });
    document.getElementById("down").addEventListener("click", function () {
      var rotate = new Rotate(45, [1, 0, 0], 30, function () {
        console.log("Movement down done !");
      });
      group.addMovement("rotate" + group.getNbMovements(), rotate);
      rotate.start();
    });
  });
};
<<<<<<< HEAD
},{"../class/Camera.class.js":1,"../class/Lights/AmbientLight.class.js":7,"../class/Movements/Rotate.class.js":8,"../class/Objects3D/Cube.class.js":10,"../class/Objects3D/Object3DGroup.class.js":11,"../class/Scene.class.js":13,"../class/WebGLProgram.class.js":20}],23:[function(require,module,exports){
=======
},{"../class/Camera.class.js":1,"../class/Lights/AmbientLight.class.js":7,"../class/Lights/DirectionalLight.class.js":8,"../class/Movements/Rotate.class.js":13,"../class/Objects3D/Cube.class.js":16,"../class/Objects3D/Object3DGroup.class.js":17,"../class/Scene.class.js":20,"../class/WebGLProgram.class.js":29}],32:[function(require,module,exports){
>>>>>>> tmp
"use strict";

var WebGLProgram = require("../class/WebGLProgram.class.js");

var Camera = require("../class/Camera.class.js");

var Cube = require("../class/Objects3D/Cube.class.js");

var Plan = require("../class/Objects3D/Plan.class.js");

var AmbientLight = require("../class/Lights/AmbientLight.class.js");

var Scene = require("../class/Scene.class.js");

var Rotate = require("../class/Movements/Rotate.class.js");

var Object3DGroup = require("../class/Objects3D/Object3DGroup.class.js");

module.exports = function () {
  var program = new WebGLProgram();
  program.insertInBlock(document.getElementById("display"));
  program.setUpdateOnResize(true);
<<<<<<< HEAD
  program.setTextureRenderer(true);
  var scene = new Scene();
  var cube = new Cube();
  cube.setSize(2);
  cube.setPosition(8, 3, 0);
  var rotate1 = new Rotate(360, [0, 0, 1], 1000, function () {
    rotate1.reset();
  });
  var rotate2 = new Rotate(360, [1, 2, 0], 1500, function () {
    rotate2.reset();
  });
  rotate1.setPosition(8, 3, 0);
  rotate2.setPosition(8, 3, 0);
=======
  var scene = new Scene();
  var cube = new Cube();
  cube.setSize(2);
  cube.setPosition(0, 5, 0);
  var rotate1 = new Rotate(360, [0, 3, 1], 1200, function () {
    rotate1.reset();
  });
  var rotate2 = new Rotate(360, [1, 2, 0], 700, function () {
    rotate2.reset();
  });
  rotate1.setPosition(-3, 3, 0);
  rotate2.setPosition(-4, -1, 0);
>>>>>>> tmp
  cube.addMovement("rotate1", rotate1);
  cube.addMovement("rotate2", rotate2);
  var texture = program.createImageTexture("/test2/text.png");
  cube.addTexture("text", texture);
  var plan = new Plan();
<<<<<<< HEAD
  plan.setPosition(-1, 0, 5);
  var texture2 = program.createColorTexture(1, 0, 0, 1);
  var texture3 = program.createMirrorTexture();
  plan.addTexture("color", texture2);
  plan.addTexture("mirror", texture3);
  var rotate = new Rotate(45, [-3, 1, 1], 1, function () {});
  rotate.setPosition(-1, 0, 5);
  plan.addMovement("rotate", rotate);
  plan.setSize(10, 10);
  rotate1.start();
  rotate2.start();
  rotate.start();
=======
  plan.setPosition(0, 0, 0);
  var texture2 = program.createColorTexture(0.0, 0.0, 0.8, 0.4);
  var texture3 = program.createMirrorTexture();
  plan.addTexture("mirror", texture3);
  plan.addTexture("color", texture2);
  var rotate = new Rotate(45, [0, 1, 0], 0, function () {});
  var rotatee = new Rotate(-65, [1, 0, 0], 0, function () {});
  rotate.setPosition(0, 0, 0);
  plan.addMovement("rotate", rotate);
  plan.addMovement("rotate2", rotatee);
  plan.setSize(12, 12);
  rotate1.start();
  rotate2.start();
  rotate.start();
  rotatee.start();
>>>>>>> tmp
  scene.add3DObject("cube", cube);
  scene.add3DObject("mirror", plan);
  scene.setClearColor(0, 0, 0, 1);
  program.setScene(scene);
  var camera = new Camera();
  camera.setType("perspective", {
    "size": 30
  });
<<<<<<< HEAD
  camera.setPosition(0, 0, 30);
  scene.addCamera("main", camera);
  scene.setCamera("main");
  program.start();
  window.addEventListener('DOMContentLoaded', function (event) {});
};
},{"../class/Camera.class.js":1,"../class/Lights/AmbientLight.class.js":7,"../class/Movements/Rotate.class.js":8,"../class/Objects3D/Cube.class.js":10,"../class/Objects3D/Object3DGroup.class.js":11,"../class/Objects3D/Plan.class.js":12,"../class/Scene.class.js":13,"../class/WebGLProgram.class.js":20}],24:[function(require,module,exports){
=======
  camera.setPosition(0, 0, 20);
  scene.addCamera("main", camera);
  scene.setCamera("main");
  var light = new AmbientLight();
  light.setPower(1);
  light.setRGB(1, 1, 1);
  scene.addLight("ambient", light);
  program.start(); //scene.getRenderer().setScissor([0, 0, 400, 600]);

  window.addEventListener('DOMContentLoaded', function (event) {});
};
},{"../class/Camera.class.js":1,"../class/Lights/AmbientLight.class.js":7,"../class/Movements/Rotate.class.js":13,"../class/Objects3D/Cube.class.js":16,"../class/Objects3D/Object3DGroup.class.js":17,"../class/Objects3D/Plan.class.js":18,"../class/Scene.class.js":20,"../class/WebGLProgram.class.js":29}],33:[function(require,module,exports){
>>>>>>> tmp
"use strict";

var WebGLProgram = require("../class/WebGLProgram.class.js");

var Camera = require("../class/Camera.class.js");

var Cube = require("../class/Objects3D/Cube.class.js");

var AmbientLight = require("../class/Lights/AmbientLight.class.js");

var Scene = require("../class/Scene.class.js");

var Rotate = require("../class/Movements/Rotate.class.js");

<<<<<<< HEAD
=======
var LookAt = require("../class/Movements/LookAt.class.js");

>>>>>>> tmp
var Object3DGroup = require("../class/Objects3D/Object3DGroup.class.js");

module.exports = function () {
  var program = new WebGLProgram();
  program.insertInBlock(document.getElementById("display"));
  program.setUpdateOnResize(true);
  var cube = new Cube();
<<<<<<< HEAD
  cube.setSize(2);
  cube.setPosition(0, 0, 0);
  var rotate1 = new Rotate(360, [0, 0, 1], 1000, function () {
=======
  cube.setSize(3);
  cube.setPosition(6, 2, 0);
  var texture = program.createImageTexture("/test3/text2.png");
  cube.addTexture("color", texture);
  cube.setOpacity(0.7);
  var cube2 = new Cube();
  cube2.setSize(2);
  cube2.setPosition(4, 1, -5);
  var texture2 = program.createImageTexture("/test3/text.jpg");
  cube2.addTexture("color", texture2);
  cube2.setOpacity(0.7);
  var cube3 = new Cube();
  cube3.setSize(5);
  cube3.setPosition(1, 1, -10);
  var texture3 = program.createColorTexture(0, 0, 1, 0.2);
  cube3.addTexture("color", texture3);
  var cube4 = new Cube();
  cube4.setSize(2);
  cube4.setPosition(3, 4, 1);
  var texture4 = program.createColorTexture(0.7, 0.3, 1, 0.6);
  cube4.addTexture("color", texture4);
  var cube5 = new Cube();
  cube5.setSize(3);
  cube5.setPosition(2, -4, -2);
  var texture5 = program.createColorTexture(0.2, 0.7, 1, 0.7);
  cube5.addTexture("color", texture5);
  var test = new Rotate(-20, [0, 1, 1], 1, function () {});
  var rotate1 = new Rotate(360, [0, 1, 0], 1000, function () {
>>>>>>> tmp
    rotate1.reset();
  });
  var rotate2 = new Rotate(360, [1, 2, 0], 1500, function () {
    rotate2.reset();
  });
<<<<<<< HEAD
  cube.addMovement("rotate1", rotate1);
  cube.addMovement("rotate2", rotate2);
  rotate1.start();
  rotate2.start();
  var scene = new Scene();
  scene.add3DObject("cube", cube);
=======
  var rotate3 = new Rotate(360, [0, 0, 1], 1000, function () {
    rotate3.reset();
  });
  test.setPosition(0, 0, 0);
  rotate1.setPosition(0, 0, 0);
  rotate2.setPosition(0, 0, 0);
  rotate3.setPosition(0, 0, 0);
  cube.addMovement("rotate1", rotate1);
  cube2.addMovement("rotate2", rotate2);
  cube3.addMovement("rotate3", rotate3);
  test.start();
  cube.addMovement("test", test);
  rotate1.start();
  rotate2.start();
  rotate3.start();
  var rotate4 = new Rotate(360, [1, 0, 1], 2000, function () {
    rotate4.reset();
  });
  var rotate5 = new Rotate(360, [3, 0, 1], 2500, function () {
    rotate5.reset();
  });
  var rotate6 = new Rotate(360, [2, 0, 0], 1200, function () {
    rotate6.reset();
  });
  rotate4.setPosition(0, 0, 0);
  rotate5.setPosition(0, 0, 0);
  rotate6.setPosition(0, 0, 0);
  cube.addMovement("rotate4", rotate4);
  cube2.addMovement("rotate5", rotate5);
  cube3.addMovement("rotate6", rotate6);
  rotate4.start();
  rotate5.start();
  rotate6.start();
  var scene = new Scene();
  scene.add3DObject("cube", cube);
  scene.add3DObject("cube2", cube2);
  scene.add3DObject("cube3", cube3);
  scene.add3DObject("cube4", cube4);
  scene.add3DObject("cube5", cube5);
  scene.setClearColor(0, 0, 0, 1);
  program.setScene(scene);
  var camera = new Camera();
  camera.setType("perspective", {});
  var rotateCam = new Rotate(360, [0, 1, 0], 2100, function () {
    rotateCam.reset();
  });
  rotateCam.start();
  rotateCam.setPosition(0, 0, -15.5);
  var rotateCam2 = new Rotate(360, [1, 0, 0], 1000, function () {
    rotateCam2.reset();
  });
  var lookAt1 = new LookAt(camera, [0, 1, 0]);
  var lookAt2 = new LookAt(camera, [0, 1, 0]);
  cube4.addMovement("lookat", lookAt1); //cube5.addMovement("lookat", lookAt2);

  var lookAt = new LookAt(cube2, [0, 1, 0]);
  rotateCam2.start();
  rotateCam2.setPosition(0, 0, -15.5);
  camera.setPosition(0, 0, 10);
  camera.addMovement("rotate", rotateCam);
  camera.addMovement("rotate2", rotateCam2);
  camera.addMovement("lookAt", lookAt);
  scene.addCamera("main", camera);
  scene.setCamera("main");
  var light = new AmbientLight();
  light.setPower(1);
  light.setRGB(1, 1, 1);
  scene.addLight("ambient", light);
  program.start();
  window.addEventListener('DOMContentLoaded', function (event) {});
};
},{"../class/Camera.class.js":1,"../class/Lights/AmbientLight.class.js":7,"../class/Movements/LookAt.class.js":12,"../class/Movements/Rotate.class.js":13,"../class/Objects3D/Cube.class.js":16,"../class/Objects3D/Object3DGroup.class.js":17,"../class/Scene.class.js":20,"../class/WebGLProgram.class.js":29}],34:[function(require,module,exports){
"use strict";

var WebGLProgram = require("../class/WebGLProgram.class.js");

var Camera = require("../class/Camera.class.js");

var Cube = require("../class/Objects3D/Cube.class.js");

var AmbientLight = require("../class/Lights/AmbientLight.class.js");

var DirectionalLight = require("../class/Lights/DirectionalLight.class.js");

var Scene = require("../class/Scene.class.js");

var Rotate = require("../class/Movements/Rotate.class.js");

var LookAt = require("../class/Movements/LookAt.class.js");

var Object3DGroup = require("../class/Objects3D/Object3DGroup.class.js");

var Renderer = require("../class/Renderer.class.js");

module.exports = function () {
  var program = new WebGLProgram();
  program.insertInBlock(document.getElementById("display"));
  program.setUpdateOnResize(true);
  var scene = new Scene(); //Cubes

  var cube1 = new Cube();
  cube1.setPosition(-2, 0, 0);
  cube1.setSize(1.);
  scene.add3DObject("cube1", cube1);
  var texture1 = program.createColorTexture(1, 0.2, 0.3, 1);
  cube1.addTexture("color", texture1);
  var cube2 = new Cube();
  cube2.setPosition(0, 0, 0);
  cube2.setSize(0.7);
  scene.add3DObject("cube2", cube2);
  var texture2 = program.createColorTexture(0.2, 0.1, 1, 1);
  cube2.addTexture("color", texture2);
  var cube3 = new Cube();
  cube3.setPosition(2, 0, 0);
  cube3.setSize(0.4);
  scene.add3DObject("cube3", cube3);
  var texture3 = program.createColorTexture(0.5, 1, 0.2, 1);
  cube3.addTexture("color", texture3);
  var rotate1 = new Rotate(360, [0, 1, 0], 1100, function () {
    rotate1.reset();
  });
  var rotate2 = new Rotate(360, [1, 1, 0], 1700, function () {
    rotate2.reset();
  });
  var rotate3 = new Rotate(360, [0, 1, 1], 700, function () {
    rotate3.reset();
  });
  var rotate11 = new Rotate(360, [1, 0, 1], 1500, function () {
    rotate11.reset();
  });
  var rotate22 = new Rotate(360, [3, 1, 0], 1300, function () {
    rotate22.reset();
  });
  var rotate33 = new Rotate(360, [1, 2, 1], 1200, function () {
    rotate33.reset();
  });
  rotate1.start();
  rotate2.start();
  rotate3.start();
  rotate11.start();
  rotate22.start();
  rotate33.start();
  cube1.addMovement("rotate", rotate1);
  cube2.addMovement("rotate", rotate2);
  cube3.addMovement("rotate", rotate3);
  cube1.addMovement("rotate", rotate11);
  cube2.addMovement("rotate", rotate22);
  cube3.addMovement("rotate", rotate33); //Lumières

  var ambient = new AmbientLight();
  ambient.setPower([0.1, 0, 0]);
  ambient.setRGB(0.3, 0.6, 0.2);
  var directional = new DirectionalLight();
  directional.setPower([0, 1, 1]);
  directional.setRGB(1, 1, 1);
  directional.setDirection(-1, 0, -1);
  scene.addLight("ambiant", ambient);
  scene.addLight("directional", directional);
  scene.setClearColor(0, 0, 0, 1);
  program.setScene(scene);
  var camera = new Camera();
  camera.setType("perspective", {});
  camera.setPosition(0, 0, 9);
  scene.addCamera("main", camera);
  scene.setCamera("main");
  program.start();
  window.addEventListener('DOMContentLoaded', function (event) {});
};
},{"../class/Camera.class.js":1,"../class/Lights/AmbientLight.class.js":7,"../class/Lights/DirectionalLight.class.js":8,"../class/Movements/LookAt.class.js":12,"../class/Movements/Rotate.class.js":13,"../class/Objects3D/Cube.class.js":16,"../class/Objects3D/Object3DGroup.class.js":17,"../class/Renderer.class.js":19,"../class/Scene.class.js":20,"../class/WebGLProgram.class.js":29}],35:[function(require,module,exports){
"use strict";

var WebGLProgram = require("../class/WebGLProgram.class.js");

var Camera = require("../class/Camera.class.js");

var Cube = require("../class/Objects3D/Cube.class.js");

var AmbientLight = require("../class/Lights/AmbientLight.class.js");

var DirectionalLight = require("../class/Lights/DirectionalLight.class.js");

var PointLight = require("../class/Lights/PointLight.class.js");

var SpotLight = require("../class/Lights/SpotLight.class.js");

var Scene = require("../class/Scene.class.js");

var Rotate = require("../class/Movements/Rotate.class.js");

var LookAt = require("../class/Movements/LookAt.class.js");

var Object3DGroup = require("../class/Objects3D/Object3DGroup.class.js");

var Renderer = require("../class/Renderer.class.js");

module.exports = function () {
  var program = new WebGLProgram();
  program.insertInBlock(document.getElementById("display"));
  program.setUpdateOnResize(true);
  var scene = new Scene(); //Cubes

  var cube1 = new Cube();
  cube1.setPosition(-2.3, 0, 0);
  cube1.setSize(2.);
  scene.add3DObject("cube1", cube1);
  var texture1 = program.createColorTexture(1, 0.2, 0.3, 1);
  cube1.addTexture("color", texture1);
  var cube2 = new Cube();
  cube2.setPosition(0, 0, -3.3);
  cube2.setSize(3);
  scene.add3DObject("cube2", cube2);
  var texture2 = program.createColorTexture(1, 1, 1, 1);
  cube2.addTexture("color", texture2);
  var cube3 = new Cube();
  cube3.setPosition(2.3, 0, 0);
  cube3.setSize(1.5);
  scene.add3DObject("cube3", cube3);
  var texture3 = program.createColorTexture(0.5, 1, 0.2, 1);
  cube3.addTexture("color", texture3);
  var rotate1 = new Rotate(360, [0, 1, 0], 1100, function () {
    rotate1.reset();
  });
  var rotate2 = new Rotate(360, [1, 1, 0], 1700, function () {
    rotate2.reset();
  });
  var rotate3 = new Rotate(360, [0, 1, 1], 700, function () {
    rotate3.reset();
  });
  var rotate11 = new Rotate(360, [1, 0, 1], 1500, function () {
    rotate11.reset();
  });
  var rotate22 = new Rotate(360, [3, 1, 0], 1300, function () {
    rotate22.reset();
  });
  var rotate33 = new Rotate(360, [1, 2, 1], 1200, function () {
    rotate33.reset();
  });
  rotate1.start();
  rotate2.start();
  rotate3.start();
  rotate11.start();
  rotate22.start();
  rotate33.start();
  cube1.addMovement("rotate", rotate1);
  cube2.addMovement("rotate", rotate2);
  cube3.addMovement("rotate", rotate3);
  cube1.addMovement("rotate", rotate11);
  cube2.addMovement("rotate", rotate22);
  cube3.addMovement("rotate", rotate33); //Lumières

  var ambient = new AmbientLight();
  ambient.setPower(1);
  ambient.setRGB(1, 1, 1);
  var point = new PointLight();
  point.setPower([0.1, 0.3, 0.4]);
  point.setRGB(0, 0, 1);
  point.setPosition(0, 0, 1);
  point.setDissipation(0, 0.2, 0.1);
  var spot = new SpotLight();
  spot.setPower([0.1, 1, 1]);
  spot.setRGB(1, 0, 0);
  spot.setPosition(1, 0, 1);
  spot.setDirection(-1, 0, -1);
  spot.setDissipation(0., 0, 0); //scene.addLight("ambient", ambient);

  scene.addLight("point", point);
  scene.addLight("spot", spot);
  var rotateP = new Rotate(360, [1, 0, 0], 1200, function () {
    rotateP.reset();
  });
  rotateP.setPosition(0, 0, -10); //point.addMovement(rotateP);

  rotateP.start();
>>>>>>> tmp
  scene.setClearColor(0, 0, 0, 1);
  program.setScene(scene);
  var camera = new Camera();
  camera.setType("perspective", {});
  camera.setPosition(0, 0, 9);
  scene.addCamera("main", camera);
  scene.setCamera("main");
  program.start();
  window.addEventListener('DOMContentLoaded', function (event) {});
};
<<<<<<< HEAD
},{"../class/Camera.class.js":1,"../class/Lights/AmbientLight.class.js":7,"../class/Movements/Rotate.class.js":8,"../class/Objects3D/Cube.class.js":10,"../class/Objects3D/Object3DGroup.class.js":11,"../class/Scene.class.js":13,"../class/WebGLProgram.class.js":20}],25:[function(require,module,exports){
=======
},{"../class/Camera.class.js":1,"../class/Lights/AmbientLight.class.js":7,"../class/Lights/DirectionalLight.class.js":8,"../class/Lights/PointLight.class.js":9,"../class/Lights/SpotLight.class.js":10,"../class/Movements/LookAt.class.js":12,"../class/Movements/Rotate.class.js":13,"../class/Objects3D/Cube.class.js":16,"../class/Objects3D/Object3DGroup.class.js":17,"../class/Renderer.class.js":19,"../class/Scene.class.js":20,"../class/WebGLProgram.class.js":29}],36:[function(require,module,exports){
"use strict";

var WebGLProgram = require("../class/WebGLProgram.class.js");

var Camera = require("../class/Camera.class.js");

var Cube = require("../class/Objects3D/Cube.class.js");

var AmbientLight = require("../class/Lights/AmbientLight.class.js");

var PointLight = require("../class/Lights/PointLight.class.js");

var Scene = require("../class/Scene.class.js");

var Rotate = require("../class/Movements/Rotate.class.js");

var LookAt = require("../class/Movements/LookAt.class.js");

var Object3DGroup = require("../class/Objects3D/Object3DGroup.class.js");

var Renderer = require("../class/Renderer.class.js");

module.exports = function () {
  var program = new WebGLProgram();
  program.insertInBlock(document.getElementById("display"));
  program.setUpdateOnResize(true);
  program.enableFPSCounter(function (fps) {
    document.getElementById("fpsCounter").innerHTML = "Frame per second : " + fps;
  }, 300);
  var scene = new Scene(); //Canvas Texture

  var canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  var texture1 = program.createCanvasTexture(canvas, function (canvas) {
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 1000, 1000);
    ctx.fillStyle = "#00FF00";
    ctx.font = "10px Arial";
    ctx.fillText("CANVAS", 20, 40);
    ctx.fillText("TEXTURE", 20, 70);
  }); //Frame Texture

  var scene2 = new Scene();
  var c1 = new Cube();
  c1.setPosition(0, 0, -0);
  scene2.add3DObject("c1", c1);
  c1.setSize(1);
  var t1 = program.createColorTexture(1, 0, 0, 1);
  c1.addTexture("color", t1);
  var rotateT = new Rotate(360, [0, 0, 1], 1200);
  rotateT.setRepeat(true);
  var rotateT2 = new Rotate(360, [1, 0, 0], 3000);
  rotateT.setRepeat(true);
  rotateT.setPosition(-1, 0, 0);
  rotateT2.setPosition(0, 0, 2);
  c1.setPosition(1, 0, -2);
  c1.addMovement(rotateT);
  c1.addMovement(rotateT2);
  rotateT.start();
  rotateT2.start();
  scene2.add3DObject(c1);
  var cameraTexture = new Camera();
  var ambientT = new AmbientLight();
  ambientT.setPower(1.);
  ambientT.setRGB(1., 1., 1.);
  scene2.addLight("ambient", ambientT);
  cameraTexture.setType("perspective", {});
  cameraTexture.setPosition(0, 0, 5);
  scene2.addCamera(cameraTexture);
  var textureRenderer = new Renderer(scene2);
  scene2.setClearColor(1, 1, 0, 1);
  var texture3 = program.createFrameTexture(textureRenderer); //Cubes

  var cube1 = new Cube();
  cube1.setPosition(-1, 0, -1);
  cube1.setSize(1);
  scene.add3DObject("cube1", cube1);
  cube1.addTexture("color", texture1);
  var cube2 = new Cube();
  cube2.setPosition(0, 0, -0);
  scene.add3DObject("cube2", cube2);
  var texture2 = program.createColorTexture(0, 1, 0, 1);
  cube2.addTexture("color", texture2);
  var cube3 = new Cube();
  cube3.setPosition(1, 0, -1);
  scene.add3DObject("cube3", cube3);
  cube3.addTexture("color", texture3);
  var rotate1 = new Rotate(360, [0, 1, 0], 3000);
  rotate1.setRepeat(true); //rotate1.setPowSpeed(0.7);

  var rotate11 = new Rotate(360, [1, 0, 0], 3000);
  rotate11.setRepeat(true);
  rotate11.setPowSpeed(1);
  var rotate111 = new Rotate(360, [1, 0, 0], 3000);
  rotate111.setRepeat(true);
  rotate111.setPowSpeed(1);
  rotate1.setPosition(0, 0, 0.);
  rotate11.setPosition(0, 0, 0);
  rotate111.setPosition(0, 0, 0.5);
  var rotate2 = new Rotate(360, [0, 1, 0], 7000);
  rotate2.setRepeat(true);
  var rotate22 = new Rotate(360, [0, 1, 1], 1000);
  rotate22.setRepeat(true);
  var rotate3 = new Rotate(360, [0, 1, 0], 8000);
  rotate3.setRepeat(true);
  var rotate33 = new Rotate(360, [1, 1, 0], 1000);
  rotate33.setRepeat(true);
  var rotate333 = new Rotate(360, [1, 1, -1], 1000);
  rotate333.setRepeat(true);
  rotate333.setPosition(-1, 0, 1);
  rotate1.start();
  rotate11.start();
  rotate111.start();
  rotate2.start();
  rotate22.start();
  rotate3.start();
  rotate33.start();
  rotate333.start();
  cube1.addMovement(rotate111);
  cube1.addMovement(rotate1);
  cube1.addMovement(rotate11);
  cube2.addMovement(rotate2);
  cube2.addMovement(rotate22);
  cube3.addMovement(rotate3);
  cube3.addMovement(rotate33);
  cube3.addMovement(rotate333);
  scene.setClearColor(0, 0, 0, 1);
  program.setScene(scene); //Carré invisible en haut à droite

  var isClicked = false;
  var clickX = null;
  var clickY = null;
  var cameraTL = new Camera();
  cameraTL.setType("perspective", {});
  cameraTL.setPosition(0, 0, 5);
  scene.addCamera("tl", cameraTL);
  scene.setCamera("tl");
  var cameraTR = new Camera();
  cameraTR.setType("perspective", {});
  cameraTR.setPosition(5, 0, 0);
  var lookAtTR = new LookAt(cube2, [0, 1, 0]);
  cameraTR.addMovement("lookat", lookAtTR);
  scene.addCamera("tr", cameraTR);
  var cameraBL = new Camera();
  cameraBL.setType("perspective", {});
  cameraBL.setPosition(0, 5, 0);
  var lookAtBL = new LookAt(cube2, [1, 0, 0]);
  cameraBL.addMovement("lookat", lookAtBL);
  scene.addCamera("bl", cameraBL);
  var cameraBR = new Camera();
  cameraBR.setType("orthogonal", {});
  cameraBR.setPosition(0, 0, -5);
  var lookAtBR = new LookAt(cube2, [1, 0, 0]);
  cameraBR.addMovement("lookat", lookAtBR);
  scene.addCamera("br", cameraBR); //Light

  var ambient = new AmbientLight();
  ambient.setPower(1.);
  ambient.setRGB(1., 1., 1.);
  scene.addLight("ambient", ambient);
  var point = new PointLight();
  point.setPower(1.);
  point.setPosition(0, 0, 3);
  point.setRGB(1., 0.8, 0.8); //scene.addLight("point", point);
  //TOP LEFT

  var renderTL = scene.getRenderer(0);
  renderTL.setViewPort(0, 0.5, 0.5, 0.5); //affichage des normals

  var renderTLNormals = renderTL.clone();
  renderTLNormals.disableClearDepthBuffer();
  renderTLNormals.disableClearColorBuffer();
  var shader = scene.getShaderBuilder();
  var nShader = shader.clone(); // Normal Shader

  var tempS = null;
  nShader.setMode("normal");
  renderTLNormals.setInitUserFunction(function (program) {
    tempS = scene.getShaderBuilder();
    scene.setShaderBuilder(nShader);
  });
  renderTLNormals.setEndUserFunction(function (program) {
    scene.setShaderBuilder(tempS);
  });
  scene.addRenderer(renderTLNormals); //TOP RIGHT

  var renderTR = new Renderer(scene, function (program) {
    //BEFORE
    scene.setCamera("tr");
  }, function (program) {//AFTER
  });
  renderTR.setViewPort(0.5, 0.5, 0.5, 0.5);
  renderTR.disableClearColorBuffer();
  scene.addRenderer(renderTR); //Bottom left

  var renderBL = new Renderer(scene, function (program) {
    //BEFORE
    scene.setCamera("bl");
  }, function (program) {//AFTER
  });
  renderBL.setViewPort(0., 0., 0.5, 0.5);
  renderBL.disableClearColorBuffer();
  scene.addRenderer(renderBL); //bottom right

  var renderBR = new Renderer(scene, function (program) {
    //BEFORE
    scene.setCamera("br");
  }, function (program) {
    //AFTER
    scene.setCamera("tl");
  });
  renderBR.setViewPort(0.5, 0., 0.5, 0.5);
  renderBR.disableClearColorBuffer();
  scene.addRenderer(renderBR); //ENCADRE A DROITE

  var renderer = new Renderer(scene, function (program) {
    //BEFORE
    scene.setClearColor(0, 0, 0, 0);
  }, function (program) {
    //AFTER
    scene.setClearColor(0, 0, 0, 1);
  });
  renderer.setScissor(0.8, 0, 0.2, 0.2);
  scene.addRenderer(renderer);
  program.start();
  var lShader = shader.clone();
  lShader.setMode("line");
  window.addEventListener('DOMContentLoaded', function (event) {
    document.getElementById("switch").addEventListener("click", function (event) {
      if (scene.getShaderBuilder().getMode() == "triangle") {
        scene.setShaderBuilder(lShader);
      } else {
        scene.setShaderBuilder(shader);
      }
    });
  });
};
},{"../class/Camera.class.js":1,"../class/Lights/AmbientLight.class.js":7,"../class/Lights/PointLight.class.js":9,"../class/Movements/LookAt.class.js":12,"../class/Movements/Rotate.class.js":13,"../class/Objects3D/Cube.class.js":16,"../class/Objects3D/Object3DGroup.class.js":17,"../class/Renderer.class.js":19,"../class/Scene.class.js":20,"../class/WebGLProgram.class.js":29}],37:[function(require,module,exports){
"use strict";

var WebGLProgram = require("../class/WebGLProgram.class.js");

var Camera = require("../class/Camera.class.js");

var Cube = require("../class/Objects3D/Cube.class.js");

var AmbientLight = require("../class/Lights/AmbientLight.class.js");

var PointLight = require("../class/Lights/PointLight.class.js");

var Scene = require("../class/Scene.class.js");

var Rotate = require("../class/Movements/Rotate.class.js");

var LookAt = require("../class/Movements/LookAt.class.js");

var Object3DGroup = require("../class/Objects3D/Object3DGroup.class.js");

var Renderer = require("../class/Renderer.class.js");

module.exports = function () {
  var program = new WebGLProgram();
  program.insertInBlock(document.getElementById("display"));
  program.setUpdateOnResize(true);
  var scene = new Scene(); //Cubes

  var cubes = [];
  var xSize = 6;
  var ySize = 6;
  var zSize = 6;

  for (var i = 0; i < xSize; i++) {
    for (var j = 0; j < xSize; j++) {
      for (var k = 0; k < xSize; k++) {
        var texture = program.createColorTexture(Math.random(), Math.random(), Math.random(), 1);
        cubes[cubes.length] = new Cube();
        cubes[cubes.length - 1].setOpacity(1.);
        cubes[cubes.length - 1].setSize(0.5);
        cubes[cubes.length - 1].setPosition(i - xSize / 2 + 0.5, -(j - ySize / 2) - 0.5, -(k - zSize / 2) - 0.5);
        cubes[cubes.length - 1].addTexture("color", texture);
        scene.add3DObject(cubes[cubes.length - 1]);
      }
    }
  }

  var clickTexture = program.createEventTexture(scene);
  program.setPreFrameFunction(function () {
    clickTexture.update(program.canvas.width, program.canvas.height);
  });
  var camera = new Camera();
  camera.setType("perspective", {});
  camera.setPosition(0, 0, 10);
  scene.addCamera("main", camera);
  scene.setCamera("main");
  var rotate = new Rotate(360, [0.4, 1, 0], 8000);
  rotate.setRepeat(true);
  rotate.start();
  rotate.setPosition(0, 0, -10);
  camera.addMovement(rotate); //Light

  var ambient = new AmbientLight();
  ambient.setPower(1.);
  ambient.setRGB(1., 1., 1.);
  scene.addLight("ambient", ambient);
  program.setScene(scene);
  program.start();
  window.addEventListener('DOMContentLoaded', function (event) {
    program.getCanvas().addEventListener("click", function (event) {
      clickTexture.getClick(event.clientX, event.clientY, function (object) {
        if (typeof object != "undefined") {
          document.getElementById("objectID").innerHTML = object.id;
          object.getTextures()["color"].setRGBA(1, 1, 1, 1);
        } else {
          document.getElementById("objectID").innerHTML = "-1";
        }
      });
    });
  });
};
},{"../class/Camera.class.js":1,"../class/Lights/AmbientLight.class.js":7,"../class/Lights/PointLight.class.js":9,"../class/Movements/LookAt.class.js":12,"../class/Movements/Rotate.class.js":13,"../class/Objects3D/Cube.class.js":16,"../class/Objects3D/Object3DGroup.class.js":17,"../class/Renderer.class.js":19,"../class/Scene.class.js":20,"../class/WebGLProgram.class.js":29}],38:[function(require,module,exports){
>>>>>>> tmp
/*!
@fileoverview gl-matrix - High performance matrix and vector operations
@author Brandon Jones
@author Colin MacKenzie IV
@version 3.2.1

Copyright (c) 2015-2020, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t=t||self).glMatrix={})}(this,(function(t){"use strict";var n="undefined"!=typeof Float32Array?Float32Array:Array,a=Math.random;var r=Math.PI/180;Math.hypot||(Math.hypot=function(){for(var t=0,n=arguments.length;n--;)t+=arguments[n]*arguments[n];return Math.sqrt(t)});var e=Object.freeze({__proto__:null,EPSILON:1e-6,get ARRAY_TYPE(){return n},RANDOM:a,setMatrixArrayType:function(t){n=t},toRadian:function(t){return t*r},equals:function(t,n){return Math.abs(t-n)<=1e-6*Math.max(1,Math.abs(t),Math.abs(n))}});function u(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3],i=a[0],h=a[1],c=a[2],s=a[3];return t[0]=r*i+u*h,t[1]=e*i+o*h,t[2]=r*c+u*s,t[3]=e*c+o*s,t}function o(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t}var i=u,h=o,c=Object.freeze({__proto__:null,create:function(){var t=new n(4);return n!=Float32Array&&(t[1]=0,t[2]=0),t[0]=1,t[3]=1,t},clone:function(t){var a=new n(4);return a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a},copy:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t},identity:function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t},fromValues:function(t,a,r,e){var u=new n(4);return u[0]=t,u[1]=a,u[2]=r,u[3]=e,u},set:function(t,n,a,r,e){return t[0]=n,t[1]=a,t[2]=r,t[3]=e,t},transpose:function(t,n){if(t===n){var a=n[1];t[1]=n[2],t[2]=a}else t[0]=n[0],t[1]=n[2],t[2]=n[1],t[3]=n[3];return t},invert:function(t,n){var a=n[0],r=n[1],e=n[2],u=n[3],o=a*u-e*r;return o?(o=1/o,t[0]=u*o,t[1]=-r*o,t[2]=-e*o,t[3]=a*o,t):null},adjoint:function(t,n){var a=n[0];return t[0]=n[3],t[1]=-n[1],t[2]=-n[2],t[3]=a,t},determinant:function(t){return t[0]*t[3]-t[2]*t[1]},multiply:u,rotate:function(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(a),h=Math.cos(a);return t[0]=r*h+u*i,t[1]=e*h+o*i,t[2]=r*-i+u*h,t[3]=e*-i+o*h,t},scale:function(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3],i=a[0],h=a[1];return t[0]=r*i,t[1]=e*i,t[2]=u*h,t[3]=o*h,t},fromRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=r,t[1]=a,t[2]=-a,t[3]=r,t},fromScaling:function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=n[1],t},str:function(t){return"mat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},frob:function(t){return Math.hypot(t[0],t[1],t[2],t[3])},LDU:function(t,n,a,r){return t[2]=r[2]/r[0],a[0]=r[0],a[1]=r[1],a[3]=r[3]-t[2]*a[1],[t,n,a]},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t},subtract:o,exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]},equals:function(t,n){var a=t[0],r=t[1],e=t[2],u=t[3],o=n[0],i=n[1],h=n[2],c=n[3];return Math.abs(a-o)<=1e-6*Math.max(1,Math.abs(a),Math.abs(o))&&Math.abs(r-i)<=1e-6*Math.max(1,Math.abs(r),Math.abs(i))&&Math.abs(e-h)<=1e-6*Math.max(1,Math.abs(e),Math.abs(h))&&Math.abs(u-c)<=1e-6*Math.max(1,Math.abs(u),Math.abs(c))},multiplyScalar:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t},multiplyScalarAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t},mul:i,sub:h});function s(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3],i=n[4],h=n[5],c=a[0],s=a[1],M=a[2],f=a[3],l=a[4],v=a[5];return t[0]=r*c+u*s,t[1]=e*c+o*s,t[2]=r*M+u*f,t[3]=e*M+o*f,t[4]=r*l+u*v+i,t[5]=e*l+o*v+h,t}function M(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t[4]=n[4]-a[4],t[5]=n[5]-a[5],t}var f=s,l=M,v=Object.freeze({__proto__:null,create:function(){var t=new n(6);return n!=Float32Array&&(t[1]=0,t[2]=0,t[4]=0,t[5]=0),t[0]=1,t[3]=1,t},clone:function(t){var a=new n(6);return a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a[4]=t[4],a[5]=t[5],a},copy:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t},identity:function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t},fromValues:function(t,a,r,e,u,o){var i=new n(6);return i[0]=t,i[1]=a,i[2]=r,i[3]=e,i[4]=u,i[5]=o,i},set:function(t,n,a,r,e,u,o){return t[0]=n,t[1]=a,t[2]=r,t[3]=e,t[4]=u,t[5]=o,t},invert:function(t,n){var a=n[0],r=n[1],e=n[2],u=n[3],o=n[4],i=n[5],h=a*u-r*e;return h?(h=1/h,t[0]=u*h,t[1]=-r*h,t[2]=-e*h,t[3]=a*h,t[4]=(e*i-u*o)*h,t[5]=(r*o-a*i)*h,t):null},determinant:function(t){return t[0]*t[3]-t[1]*t[2]},multiply:s,rotate:function(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3],i=n[4],h=n[5],c=Math.sin(a),s=Math.cos(a);return t[0]=r*s+u*c,t[1]=e*s+o*c,t[2]=r*-c+u*s,t[3]=e*-c+o*s,t[4]=i,t[5]=h,t},scale:function(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3],i=n[4],h=n[5],c=a[0],s=a[1];return t[0]=r*c,t[1]=e*c,t[2]=u*s,t[3]=o*s,t[4]=i,t[5]=h,t},translate:function(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3],i=n[4],h=n[5],c=a[0],s=a[1];return t[0]=r,t[1]=e,t[2]=u,t[3]=o,t[4]=r*c+u*s+i,t[5]=e*c+o*s+h,t},fromRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=r,t[1]=a,t[2]=-a,t[3]=r,t[4]=0,t[5]=0,t},fromScaling:function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=n[1],t[4]=0,t[5]=0,t},fromTranslation:function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=n[0],t[5]=n[1],t},str:function(t){return"mat2d("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+")"},frob:function(t){return Math.hypot(t[0],t[1],t[2],t[3],t[4],t[5],1)},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t[4]=n[4]+a[4],t[5]=n[5]+a[5],t},subtract:M,multiplyScalar:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*a,t[5]=n[5]*a,t},multiplyScalarAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t[4]=n[4]+a[4]*r,t[5]=n[5]+a[5]*r,t},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]},equals:function(t,n){var a=t[0],r=t[1],e=t[2],u=t[3],o=t[4],i=t[5],h=n[0],c=n[1],s=n[2],M=n[3],f=n[4],l=n[5];return Math.abs(a-h)<=1e-6*Math.max(1,Math.abs(a),Math.abs(h))&&Math.abs(r-c)<=1e-6*Math.max(1,Math.abs(r),Math.abs(c))&&Math.abs(e-s)<=1e-6*Math.max(1,Math.abs(e),Math.abs(s))&&Math.abs(u-M)<=1e-6*Math.max(1,Math.abs(u),Math.abs(M))&&Math.abs(o-f)<=1e-6*Math.max(1,Math.abs(o),Math.abs(f))&&Math.abs(i-l)<=1e-6*Math.max(1,Math.abs(i),Math.abs(l))},mul:f,sub:l});function b(){var t=new n(9);return n!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[5]=0,t[6]=0,t[7]=0),t[0]=1,t[4]=1,t[8]=1,t}function m(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3],i=n[4],h=n[5],c=n[6],s=n[7],M=n[8],f=a[0],l=a[1],v=a[2],b=a[3],m=a[4],d=a[5],p=a[6],x=a[7],y=a[8];return t[0]=f*r+l*o+v*c,t[1]=f*e+l*i+v*s,t[2]=f*u+l*h+v*M,t[3]=b*r+m*o+d*c,t[4]=b*e+m*i+d*s,t[5]=b*u+m*h+d*M,t[6]=p*r+x*o+y*c,t[7]=p*e+x*i+y*s,t[8]=p*u+x*h+y*M,t}function d(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t[4]=n[4]-a[4],t[5]=n[5]-a[5],t[6]=n[6]-a[6],t[7]=n[7]-a[7],t[8]=n[8]-a[8],t}var p=m,x=d,y=Object.freeze({__proto__:null,create:b,fromMat4:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[4],t[4]=n[5],t[5]=n[6],t[6]=n[8],t[7]=n[9],t[8]=n[10],t},clone:function(t){var a=new n(9);return a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a[4]=t[4],a[5]=t[5],a[6]=t[6],a[7]=t[7],a[8]=t[8],a},copy:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t},fromValues:function(t,a,r,e,u,o,i,h,c){var s=new n(9);return s[0]=t,s[1]=a,s[2]=r,s[3]=e,s[4]=u,s[5]=o,s[6]=i,s[7]=h,s[8]=c,s},set:function(t,n,a,r,e,u,o,i,h,c){return t[0]=n,t[1]=a,t[2]=r,t[3]=e,t[4]=u,t[5]=o,t[6]=i,t[7]=h,t[8]=c,t},identity:function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},transpose:function(t,n){if(t===n){var a=n[1],r=n[2],e=n[5];t[1]=n[3],t[2]=n[6],t[3]=a,t[5]=n[7],t[6]=r,t[7]=e}else t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8];return t},invert:function(t,n){var a=n[0],r=n[1],e=n[2],u=n[3],o=n[4],i=n[5],h=n[6],c=n[7],s=n[8],M=s*o-i*c,f=-s*u+i*h,l=c*u-o*h,v=a*M+r*f+e*l;return v?(v=1/v,t[0]=M*v,t[1]=(-s*r+e*c)*v,t[2]=(i*r-e*o)*v,t[3]=f*v,t[4]=(s*a-e*h)*v,t[5]=(-i*a+e*u)*v,t[6]=l*v,t[7]=(-c*a+r*h)*v,t[8]=(o*a-r*u)*v,t):null},adjoint:function(t,n){var a=n[0],r=n[1],e=n[2],u=n[3],o=n[4],i=n[5],h=n[6],c=n[7],s=n[8];return t[0]=o*s-i*c,t[1]=e*c-r*s,t[2]=r*i-e*o,t[3]=i*h-u*s,t[4]=a*s-e*h,t[5]=e*u-a*i,t[6]=u*c-o*h,t[7]=r*h-a*c,t[8]=a*o-r*u,t},determinant:function(t){var n=t[0],a=t[1],r=t[2],e=t[3],u=t[4],o=t[5],i=t[6],h=t[7],c=t[8];return n*(c*u-o*h)+a*(-c*e+o*i)+r*(h*e-u*i)},multiply:m,translate:function(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3],i=n[4],h=n[5],c=n[6],s=n[7],M=n[8],f=a[0],l=a[1];return t[0]=r,t[1]=e,t[2]=u,t[3]=o,t[4]=i,t[5]=h,t[6]=f*r+l*o+c,t[7]=f*e+l*i+s,t[8]=f*u+l*h+M,t},rotate:function(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3],i=n[4],h=n[5],c=n[6],s=n[7],M=n[8],f=Math.sin(a),l=Math.cos(a);return t[0]=l*r+f*o,t[1]=l*e+f*i,t[2]=l*u+f*h,t[3]=l*o-f*r,t[4]=l*i-f*e,t[5]=l*h-f*u,t[6]=c,t[7]=s,t[8]=M,t},scale:function(t,n,a){var r=a[0],e=a[1];return t[0]=r*n[0],t[1]=r*n[1],t[2]=r*n[2],t[3]=e*n[3],t[4]=e*n[4],t[5]=e*n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t},fromTranslation:function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=n[0],t[7]=n[1],t[8]=1,t},fromRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=r,t[1]=a,t[2]=0,t[3]=-a,t[4]=r,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},fromScaling:function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=n[1],t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},fromMat2d:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=0,t[3]=n[2],t[4]=n[3],t[5]=0,t[6]=n[4],t[7]=n[5],t[8]=1,t},fromQuat:function(t,n){var a=n[0],r=n[1],e=n[2],u=n[3],o=a+a,i=r+r,h=e+e,c=a*o,s=r*o,M=r*i,f=e*o,l=e*i,v=e*h,b=u*o,m=u*i,d=u*h;return t[0]=1-M-v,t[3]=s-d,t[6]=f+m,t[1]=s+d,t[4]=1-c-v,t[7]=l-b,t[2]=f-m,t[5]=l+b,t[8]=1-c-M,t},normalFromMat4:function(t,n){var a=n[0],r=n[1],e=n[2],u=n[3],o=n[4],i=n[5],h=n[6],c=n[7],s=n[8],M=n[9],f=n[10],l=n[11],v=n[12],b=n[13],m=n[14],d=n[15],p=a*i-r*o,x=a*h-e*o,y=a*c-u*o,q=r*h-e*i,g=r*c-u*i,_=e*c-u*h,A=s*b-M*v,w=s*m-f*v,R=s*d-l*v,z=M*m-f*b,j=M*d-l*b,P=f*d-l*m,S=p*P-x*j+y*z+q*R-g*w+_*A;return S?(S=1/S,t[0]=(i*P-h*j+c*z)*S,t[1]=(h*R-o*P-c*w)*S,t[2]=(o*j-i*R+c*A)*S,t[3]=(e*j-r*P-u*z)*S,t[4]=(a*P-e*R+u*w)*S,t[5]=(r*R-a*j-u*A)*S,t[6]=(b*_-m*g+d*q)*S,t[7]=(m*y-v*_-d*x)*S,t[8]=(v*g-b*y+d*p)*S,t):null},projection:function(t,n,a){return t[0]=2/n,t[1]=0,t[2]=0,t[3]=0,t[4]=-2/a,t[5]=0,t[6]=-1,t[7]=1,t[8]=1,t},str:function(t){return"mat3("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+")"},frob:function(t){return Math.hypot(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8])},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t[4]=n[4]+a[4],t[5]=n[5]+a[5],t[6]=n[6]+a[6],t[7]=n[7]+a[7],t[8]=n[8]+a[8],t},subtract:d,multiplyScalar:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=n[7]*a,t[8]=n[8]*a,t},multiplyScalarAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t[4]=n[4]+a[4]*r,t[5]=n[5]+a[5]*r,t[6]=n[6]+a[6]*r,t[7]=n[7]+a[7]*r,t[8]=n[8]+a[8]*r,t},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]&&t[8]===n[8]},equals:function(t,n){var a=t[0],r=t[1],e=t[2],u=t[3],o=t[4],i=t[5],h=t[6],c=t[7],s=t[8],M=n[0],f=n[1],l=n[2],v=n[3],b=n[4],m=n[5],d=n[6],p=n[7],x=n[8];return Math.abs(a-M)<=1e-6*Math.max(1,Math.abs(a),Math.abs(M))&&Math.abs(r-f)<=1e-6*Math.max(1,Math.abs(r),Math.abs(f))&&Math.abs(e-l)<=1e-6*Math.max(1,Math.abs(e),Math.abs(l))&&Math.abs(u-v)<=1e-6*Math.max(1,Math.abs(u),Math.abs(v))&&Math.abs(o-b)<=1e-6*Math.max(1,Math.abs(o),Math.abs(b))&&Math.abs(i-m)<=1e-6*Math.max(1,Math.abs(i),Math.abs(m))&&Math.abs(h-d)<=1e-6*Math.max(1,Math.abs(h),Math.abs(d))&&Math.abs(c-p)<=1e-6*Math.max(1,Math.abs(c),Math.abs(p))&&Math.abs(s-x)<=1e-6*Math.max(1,Math.abs(s),Math.abs(x))},mul:p,sub:x});function q(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function g(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3],i=n[4],h=n[5],c=n[6],s=n[7],M=n[8],f=n[9],l=n[10],v=n[11],b=n[12],m=n[13],d=n[14],p=n[15],x=a[0],y=a[1],q=a[2],g=a[3];return t[0]=x*r+y*i+q*M+g*b,t[1]=x*e+y*h+q*f+g*m,t[2]=x*u+y*c+q*l+g*d,t[3]=x*o+y*s+q*v+g*p,x=a[4],y=a[5],q=a[6],g=a[7],t[4]=x*r+y*i+q*M+g*b,t[5]=x*e+y*h+q*f+g*m,t[6]=x*u+y*c+q*l+g*d,t[7]=x*o+y*s+q*v+g*p,x=a[8],y=a[9],q=a[10],g=a[11],t[8]=x*r+y*i+q*M+g*b,t[9]=x*e+y*h+q*f+g*m,t[10]=x*u+y*c+q*l+g*d,t[11]=x*o+y*s+q*v+g*p,x=a[12],y=a[13],q=a[14],g=a[15],t[12]=x*r+y*i+q*M+g*b,t[13]=x*e+y*h+q*f+g*m,t[14]=x*u+y*c+q*l+g*d,t[15]=x*o+y*s+q*v+g*p,t}function _(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3],i=r+r,h=e+e,c=u+u,s=r*i,M=r*h,f=r*c,l=e*h,v=e*c,b=u*c,m=o*i,d=o*h,p=o*c;return t[0]=1-(l+b),t[1]=M+p,t[2]=f-d,t[3]=0,t[4]=M-p,t[5]=1-(s+b),t[6]=v+m,t[7]=0,t[8]=f+d,t[9]=v-m,t[10]=1-(s+l),t[11]=0,t[12]=a[0],t[13]=a[1],t[14]=a[2],t[15]=1,t}function A(t,n){return t[0]=n[12],t[1]=n[13],t[2]=n[14],t}function w(t,n){var a=n[0],r=n[1],e=n[2],u=n[4],o=n[5],i=n[6],h=n[8],c=n[9],s=n[10];return t[0]=Math.hypot(a,r,e),t[1]=Math.hypot(u,o,i),t[2]=Math.hypot(h,c,s),t}function R(t,a){var r=new n(3);w(r,a);var e=1/r[0],u=1/r[1],o=1/r[2],i=a[0]*e,h=a[1]*u,c=a[2]*o,s=a[4]*e,M=a[5]*u,f=a[6]*o,l=a[8]*e,v=a[9]*u,b=a[10]*o,m=i+M+b,d=0;return m>0?(d=2*Math.sqrt(m+1),t[3]=.25*d,t[0]=(f-v)/d,t[1]=(l-c)/d,t[2]=(h-s)/d):i>M&&i>b?(d=2*Math.sqrt(1+i-M-b),t[3]=(f-v)/d,t[0]=.25*d,t[1]=(h+s)/d,t[2]=(l+c)/d):M>b?(d=2*Math.sqrt(1+M-i-b),t[3]=(l-c)/d,t[0]=(h+s)/d,t[1]=.25*d,t[2]=(f+v)/d):(d=2*Math.sqrt(1+b-i-M),t[3]=(h-s)/d,t[0]=(l+c)/d,t[1]=(f+v)/d,t[2]=.25*d),t}function z(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t[4]=n[4]-a[4],t[5]=n[5]-a[5],t[6]=n[6]-a[6],t[7]=n[7]-a[7],t[8]=n[8]-a[8],t[9]=n[9]-a[9],t[10]=n[10]-a[10],t[11]=n[11]-a[11],t[12]=n[12]-a[12],t[13]=n[13]-a[13],t[14]=n[14]-a[14],t[15]=n[15]-a[15],t}var j=g,P=z,S=Object.freeze({__proto__:null,create:function(){var t=new n(16);return n!=Float32Array&&(t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0),t[0]=1,t[5]=1,t[10]=1,t[15]=1,t},clone:function(t){var a=new n(16);return a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a[4]=t[4],a[5]=t[5],a[6]=t[6],a[7]=t[7],a[8]=t[8],a[9]=t[9],a[10]=t[10],a[11]=t[11],a[12]=t[12],a[13]=t[13],a[14]=t[14],a[15]=t[15],a},copy:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t},fromValues:function(t,a,r,e,u,o,i,h,c,s,M,f,l,v,b,m){var d=new n(16);return d[0]=t,d[1]=a,d[2]=r,d[3]=e,d[4]=u,d[5]=o,d[6]=i,d[7]=h,d[8]=c,d[9]=s,d[10]=M,d[11]=f,d[12]=l,d[13]=v,d[14]=b,d[15]=m,d},set:function(t,n,a,r,e,u,o,i,h,c,s,M,f,l,v,b,m){return t[0]=n,t[1]=a,t[2]=r,t[3]=e,t[4]=u,t[5]=o,t[6]=i,t[7]=h,t[8]=c,t[9]=s,t[10]=M,t[11]=f,t[12]=l,t[13]=v,t[14]=b,t[15]=m,t},identity:q,transpose:function(t,n){if(t===n){var a=n[1],r=n[2],e=n[3],u=n[6],o=n[7],i=n[11];t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=a,t[6]=n[9],t[7]=n[13],t[8]=r,t[9]=u,t[11]=n[14],t[12]=e,t[13]=o,t[14]=i}else t[0]=n[0],t[1]=n[4],t[2]=n[8],t[3]=n[12],t[4]=n[1],t[5]=n[5],t[6]=n[9],t[7]=n[13],t[8]=n[2],t[9]=n[6],t[10]=n[10],t[11]=n[14],t[12]=n[3],t[13]=n[7],t[14]=n[11],t[15]=n[15];return t},invert:function(t,n){var a=n[0],r=n[1],e=n[2],u=n[3],o=n[4],i=n[5],h=n[6],c=n[7],s=n[8],M=n[9],f=n[10],l=n[11],v=n[12],b=n[13],m=n[14],d=n[15],p=a*i-r*o,x=a*h-e*o,y=a*c-u*o,q=r*h-e*i,g=r*c-u*i,_=e*c-u*h,A=s*b-M*v,w=s*m-f*v,R=s*d-l*v,z=M*m-f*b,j=M*d-l*b,P=f*d-l*m,S=p*P-x*j+y*z+q*R-g*w+_*A;return S?(S=1/S,t[0]=(i*P-h*j+c*z)*S,t[1]=(e*j-r*P-u*z)*S,t[2]=(b*_-m*g+d*q)*S,t[3]=(f*g-M*_-l*q)*S,t[4]=(h*R-o*P-c*w)*S,t[5]=(a*P-e*R+u*w)*S,t[6]=(m*y-v*_-d*x)*S,t[7]=(s*_-f*y+l*x)*S,t[8]=(o*j-i*R+c*A)*S,t[9]=(r*R-a*j-u*A)*S,t[10]=(v*g-b*y+d*p)*S,t[11]=(M*y-s*g-l*p)*S,t[12]=(i*w-o*z-h*A)*S,t[13]=(a*z-r*w+e*A)*S,t[14]=(b*x-v*q-m*p)*S,t[15]=(s*q-M*x+f*p)*S,t):null},adjoint:function(t,n){var a=n[0],r=n[1],e=n[2],u=n[3],o=n[4],i=n[5],h=n[6],c=n[7],s=n[8],M=n[9],f=n[10],l=n[11],v=n[12],b=n[13],m=n[14],d=n[15];return t[0]=i*(f*d-l*m)-M*(h*d-c*m)+b*(h*l-c*f),t[1]=-(r*(f*d-l*m)-M*(e*d-u*m)+b*(e*l-u*f)),t[2]=r*(h*d-c*m)-i*(e*d-u*m)+b*(e*c-u*h),t[3]=-(r*(h*l-c*f)-i*(e*l-u*f)+M*(e*c-u*h)),t[4]=-(o*(f*d-l*m)-s*(h*d-c*m)+v*(h*l-c*f)),t[5]=a*(f*d-l*m)-s*(e*d-u*m)+v*(e*l-u*f),t[6]=-(a*(h*d-c*m)-o*(e*d-u*m)+v*(e*c-u*h)),t[7]=a*(h*l-c*f)-o*(e*l-u*f)+s*(e*c-u*h),t[8]=o*(M*d-l*b)-s*(i*d-c*b)+v*(i*l-c*M),t[9]=-(a*(M*d-l*b)-s*(r*d-u*b)+v*(r*l-u*M)),t[10]=a*(i*d-c*b)-o*(r*d-u*b)+v*(r*c-u*i),t[11]=-(a*(i*l-c*M)-o*(r*l-u*M)+s*(r*c-u*i)),t[12]=-(o*(M*m-f*b)-s*(i*m-h*b)+v*(i*f-h*M)),t[13]=a*(M*m-f*b)-s*(r*m-e*b)+v*(r*f-e*M),t[14]=-(a*(i*m-h*b)-o*(r*m-e*b)+v*(r*h-e*i)),t[15]=a*(i*f-h*M)-o*(r*f-e*M)+s*(r*h-e*i),t},determinant:function(t){var n=t[0],a=t[1],r=t[2],e=t[3],u=t[4],o=t[5],i=t[6],h=t[7],c=t[8],s=t[9],M=t[10],f=t[11],l=t[12],v=t[13],b=t[14],m=t[15];return(n*o-a*u)*(M*m-f*b)-(n*i-r*u)*(s*m-f*v)+(n*h-e*u)*(s*b-M*v)+(a*i-r*o)*(c*m-f*l)-(a*h-e*o)*(c*b-M*l)+(r*h-e*i)*(c*v-s*l)},multiply:g,translate:function(t,n,a){var r,e,u,o,i,h,c,s,M,f,l,v,b=a[0],m=a[1],d=a[2];return n===t?(t[12]=n[0]*b+n[4]*m+n[8]*d+n[12],t[13]=n[1]*b+n[5]*m+n[9]*d+n[13],t[14]=n[2]*b+n[6]*m+n[10]*d+n[14],t[15]=n[3]*b+n[7]*m+n[11]*d+n[15]):(r=n[0],e=n[1],u=n[2],o=n[3],i=n[4],h=n[5],c=n[6],s=n[7],M=n[8],f=n[9],l=n[10],v=n[11],t[0]=r,t[1]=e,t[2]=u,t[3]=o,t[4]=i,t[5]=h,t[6]=c,t[7]=s,t[8]=M,t[9]=f,t[10]=l,t[11]=v,t[12]=r*b+i*m+M*d+n[12],t[13]=e*b+h*m+f*d+n[13],t[14]=u*b+c*m+l*d+n[14],t[15]=o*b+s*m+v*d+n[15]),t},scale:function(t,n,a){var r=a[0],e=a[1],u=a[2];return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=n[3]*r,t[4]=n[4]*e,t[5]=n[5]*e,t[6]=n[6]*e,t[7]=n[7]*e,t[8]=n[8]*u,t[9]=n[9]*u,t[10]=n[10]*u,t[11]=n[11]*u,t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t},rotate:function(t,n,a,r){var e,u,o,i,h,c,s,M,f,l,v,b,m,d,p,x,y,q,g,_,A,w,R,z,j=r[0],P=r[1],S=r[2],E=Math.hypot(j,P,S);return E<1e-6?null:(j*=E=1/E,P*=E,S*=E,e=Math.sin(a),o=1-(u=Math.cos(a)),i=n[0],h=n[1],c=n[2],s=n[3],M=n[4],f=n[5],l=n[6],v=n[7],b=n[8],m=n[9],d=n[10],p=n[11],x=j*j*o+u,y=P*j*o+S*e,q=S*j*o-P*e,g=j*P*o-S*e,_=P*P*o+u,A=S*P*o+j*e,w=j*S*o+P*e,R=P*S*o-j*e,z=S*S*o+u,t[0]=i*x+M*y+b*q,t[1]=h*x+f*y+m*q,t[2]=c*x+l*y+d*q,t[3]=s*x+v*y+p*q,t[4]=i*g+M*_+b*A,t[5]=h*g+f*_+m*A,t[6]=c*g+l*_+d*A,t[7]=s*g+v*_+p*A,t[8]=i*w+M*R+b*z,t[9]=h*w+f*R+m*z,t[10]=c*w+l*R+d*z,t[11]=s*w+v*R+p*z,n!==t&&(t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t)},rotateX:function(t,n,a){var r=Math.sin(a),e=Math.cos(a),u=n[4],o=n[5],i=n[6],h=n[7],c=n[8],s=n[9],M=n[10],f=n[11];return n!==t&&(t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[4]=u*e+c*r,t[5]=o*e+s*r,t[6]=i*e+M*r,t[7]=h*e+f*r,t[8]=c*e-u*r,t[9]=s*e-o*r,t[10]=M*e-i*r,t[11]=f*e-h*r,t},rotateY:function(t,n,a){var r=Math.sin(a),e=Math.cos(a),u=n[0],o=n[1],i=n[2],h=n[3],c=n[8],s=n[9],M=n[10],f=n[11];return n!==t&&(t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=u*e-c*r,t[1]=o*e-s*r,t[2]=i*e-M*r,t[3]=h*e-f*r,t[8]=u*r+c*e,t[9]=o*r+s*e,t[10]=i*r+M*e,t[11]=h*r+f*e,t},rotateZ:function(t,n,a){var r=Math.sin(a),e=Math.cos(a),u=n[0],o=n[1],i=n[2],h=n[3],c=n[4],s=n[5],M=n[6],f=n[7];return n!==t&&(t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15]),t[0]=u*e+c*r,t[1]=o*e+s*r,t[2]=i*e+M*r,t[3]=h*e+f*r,t[4]=c*e-u*r,t[5]=s*e-o*r,t[6]=M*e-i*r,t[7]=f*e-h*r,t},fromTranslation:function(t,n){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t},fromScaling:function(t,n){return t[0]=n[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=n[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},fromRotation:function(t,n,a){var r,e,u,o=a[0],i=a[1],h=a[2],c=Math.hypot(o,i,h);return c<1e-6?null:(o*=c=1/c,i*=c,h*=c,r=Math.sin(n),u=1-(e=Math.cos(n)),t[0]=o*o*u+e,t[1]=i*o*u+h*r,t[2]=h*o*u-i*r,t[3]=0,t[4]=o*i*u-h*r,t[5]=i*i*u+e,t[6]=h*i*u+o*r,t[7]=0,t[8]=o*h*u+i*r,t[9]=i*h*u-o*r,t[10]=h*h*u+e,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t)},fromXRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=r,t[6]=a,t[7]=0,t[8]=0,t[9]=-a,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},fromYRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=r,t[1]=0,t[2]=-a,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=a,t[9]=0,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},fromZRotation:function(t,n){var a=Math.sin(n),r=Math.cos(n);return t[0]=r,t[1]=a,t[2]=0,t[3]=0,t[4]=-a,t[5]=r,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},fromRotationTranslation:_,fromQuat2:function(t,a){var r=new n(3),e=-a[0],u=-a[1],o=-a[2],i=a[3],h=a[4],c=a[5],s=a[6],M=a[7],f=e*e+u*u+o*o+i*i;return f>0?(r[0]=2*(h*i+M*e+c*o-s*u)/f,r[1]=2*(c*i+M*u+s*e-h*o)/f,r[2]=2*(s*i+M*o+h*u-c*e)/f):(r[0]=2*(h*i+M*e+c*o-s*u),r[1]=2*(c*i+M*u+s*e-h*o),r[2]=2*(s*i+M*o+h*u-c*e)),_(t,a,r),t},getTranslation:A,getScaling:w,getRotation:R,fromRotationTranslationScale:function(t,n,a,r){var e=n[0],u=n[1],o=n[2],i=n[3],h=e+e,c=u+u,s=o+o,M=e*h,f=e*c,l=e*s,v=u*c,b=u*s,m=o*s,d=i*h,p=i*c,x=i*s,y=r[0],q=r[1],g=r[2];return t[0]=(1-(v+m))*y,t[1]=(f+x)*y,t[2]=(l-p)*y,t[3]=0,t[4]=(f-x)*q,t[5]=(1-(M+m))*q,t[6]=(b+d)*q,t[7]=0,t[8]=(l+p)*g,t[9]=(b-d)*g,t[10]=(1-(M+v))*g,t[11]=0,t[12]=a[0],t[13]=a[1],t[14]=a[2],t[15]=1,t},fromRotationTranslationScaleOrigin:function(t,n,a,r,e){var u=n[0],o=n[1],i=n[2],h=n[3],c=u+u,s=o+o,M=i+i,f=u*c,l=u*s,v=u*M,b=o*s,m=o*M,d=i*M,p=h*c,x=h*s,y=h*M,q=r[0],g=r[1],_=r[2],A=e[0],w=e[1],R=e[2],z=(1-(b+d))*q,j=(l+y)*q,P=(v-x)*q,S=(l-y)*g,E=(1-(f+d))*g,O=(m+p)*g,T=(v+x)*_,D=(m-p)*_,F=(1-(f+b))*_;return t[0]=z,t[1]=j,t[2]=P,t[3]=0,t[4]=S,t[5]=E,t[6]=O,t[7]=0,t[8]=T,t[9]=D,t[10]=F,t[11]=0,t[12]=a[0]+A-(z*A+S*w+T*R),t[13]=a[1]+w-(j*A+E*w+D*R),t[14]=a[2]+R-(P*A+O*w+F*R),t[15]=1,t},fromQuat:function(t,n){var a=n[0],r=n[1],e=n[2],u=n[3],o=a+a,i=r+r,h=e+e,c=a*o,s=r*o,M=r*i,f=e*o,l=e*i,v=e*h,b=u*o,m=u*i,d=u*h;return t[0]=1-M-v,t[1]=s+d,t[2]=f-m,t[3]=0,t[4]=s-d,t[5]=1-c-v,t[6]=l+b,t[7]=0,t[8]=f+m,t[9]=l-b,t[10]=1-c-M,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},frustum:function(t,n,a,r,e,u,o){var i=1/(a-n),h=1/(e-r),c=1/(u-o);return t[0]=2*u*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*u*h,t[6]=0,t[7]=0,t[8]=(a+n)*i,t[9]=(e+r)*h,t[10]=(o+u)*c,t[11]=-1,t[12]=0,t[13]=0,t[14]=o*u*2*c,t[15]=0,t},perspective:function(t,n,a,r,e){var u,o=1/Math.tan(n/2);return t[0]=o/a,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=o,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[11]=-1,t[12]=0,t[13]=0,t[15]=0,null!=e&&e!==1/0?(u=1/(r-e),t[10]=(e+r)*u,t[14]=2*e*r*u):(t[10]=-1,t[14]=-2*r),t},perspectiveFromFieldOfView:function(t,n,a,r){var e=Math.tan(n.upDegrees*Math.PI/180),u=Math.tan(n.downDegrees*Math.PI/180),o=Math.tan(n.leftDegrees*Math.PI/180),i=Math.tan(n.rightDegrees*Math.PI/180),h=2/(o+i),c=2/(e+u);return t[0]=h,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=c,t[6]=0,t[7]=0,t[8]=-(o-i)*h*.5,t[9]=(e-u)*c*.5,t[10]=r/(a-r),t[11]=-1,t[12]=0,t[13]=0,t[14]=r*a/(a-r),t[15]=0,t},ortho:function(t,n,a,r,e,u,o){var i=1/(n-a),h=1/(r-e),c=1/(u-o);return t[0]=-2*i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*h,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*c,t[11]=0,t[12]=(n+a)*i,t[13]=(e+r)*h,t[14]=(o+u)*c,t[15]=1,t},lookAt:function(t,n,a,r){var e,u,o,i,h,c,s,M,f,l,v=n[0],b=n[1],m=n[2],d=r[0],p=r[1],x=r[2],y=a[0],g=a[1],_=a[2];return Math.abs(v-y)<1e-6&&Math.abs(b-g)<1e-6&&Math.abs(m-_)<1e-6?q(t):(s=v-y,M=b-g,f=m-_,e=p*(f*=l=1/Math.hypot(s,M,f))-x*(M*=l),u=x*(s*=l)-d*f,o=d*M-p*s,(l=Math.hypot(e,u,o))?(e*=l=1/l,u*=l,o*=l):(e=0,u=0,o=0),i=M*o-f*u,h=f*e-s*o,c=s*u-M*e,(l=Math.hypot(i,h,c))?(i*=l=1/l,h*=l,c*=l):(i=0,h=0,c=0),t[0]=e,t[1]=i,t[2]=s,t[3]=0,t[4]=u,t[5]=h,t[6]=M,t[7]=0,t[8]=o,t[9]=c,t[10]=f,t[11]=0,t[12]=-(e*v+u*b+o*m),t[13]=-(i*v+h*b+c*m),t[14]=-(s*v+M*b+f*m),t[15]=1,t)},targetTo:function(t,n,a,r){var e=n[0],u=n[1],o=n[2],i=r[0],h=r[1],c=r[2],s=e-a[0],M=u-a[1],f=o-a[2],l=s*s+M*M+f*f;l>0&&(s*=l=1/Math.sqrt(l),M*=l,f*=l);var v=h*f-c*M,b=c*s-i*f,m=i*M-h*s;return(l=v*v+b*b+m*m)>0&&(v*=l=1/Math.sqrt(l),b*=l,m*=l),t[0]=v,t[1]=b,t[2]=m,t[3]=0,t[4]=M*m-f*b,t[5]=f*v-s*m,t[6]=s*b-M*v,t[7]=0,t[8]=s,t[9]=M,t[10]=f,t[11]=0,t[12]=e,t[13]=u,t[14]=o,t[15]=1,t},str:function(t){return"mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"},frob:function(t){return Math.hypot(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],t[9],t[10],t[11],t[12],t[13],t[14],t[15])},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t[4]=n[4]+a[4],t[5]=n[5]+a[5],t[6]=n[6]+a[6],t[7]=n[7]+a[7],t[8]=n[8]+a[8],t[9]=n[9]+a[9],t[10]=n[10]+a[10],t[11]=n[11]+a[11],t[12]=n[12]+a[12],t[13]=n[13]+a[13],t[14]=n[14]+a[14],t[15]=n[15]+a[15],t},subtract:z,multiplyScalar:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=n[7]*a,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=n[11]*a,t[12]=n[12]*a,t[13]=n[13]*a,t[14]=n[14]*a,t[15]=n[15]*a,t},multiplyScalarAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t[4]=n[4]+a[4]*r,t[5]=n[5]+a[5]*r,t[6]=n[6]+a[6]*r,t[7]=n[7]+a[7]*r,t[8]=n[8]+a[8]*r,t[9]=n[9]+a[9]*r,t[10]=n[10]+a[10]*r,t[11]=n[11]+a[11]*r,t[12]=n[12]+a[12]*r,t[13]=n[13]+a[13]*r,t[14]=n[14]+a[14]*r,t[15]=n[15]+a[15]*r,t},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]&&t[8]===n[8]&&t[9]===n[9]&&t[10]===n[10]&&t[11]===n[11]&&t[12]===n[12]&&t[13]===n[13]&&t[14]===n[14]&&t[15]===n[15]},equals:function(t,n){var a=t[0],r=t[1],e=t[2],u=t[3],o=t[4],i=t[5],h=t[6],c=t[7],s=t[8],M=t[9],f=t[10],l=t[11],v=t[12],b=t[13],m=t[14],d=t[15],p=n[0],x=n[1],y=n[2],q=n[3],g=n[4],_=n[5],A=n[6],w=n[7],R=n[8],z=n[9],j=n[10],P=n[11],S=n[12],E=n[13],O=n[14],T=n[15];return Math.abs(a-p)<=1e-6*Math.max(1,Math.abs(a),Math.abs(p))&&Math.abs(r-x)<=1e-6*Math.max(1,Math.abs(r),Math.abs(x))&&Math.abs(e-y)<=1e-6*Math.max(1,Math.abs(e),Math.abs(y))&&Math.abs(u-q)<=1e-6*Math.max(1,Math.abs(u),Math.abs(q))&&Math.abs(o-g)<=1e-6*Math.max(1,Math.abs(o),Math.abs(g))&&Math.abs(i-_)<=1e-6*Math.max(1,Math.abs(i),Math.abs(_))&&Math.abs(h-A)<=1e-6*Math.max(1,Math.abs(h),Math.abs(A))&&Math.abs(c-w)<=1e-6*Math.max(1,Math.abs(c),Math.abs(w))&&Math.abs(s-R)<=1e-6*Math.max(1,Math.abs(s),Math.abs(R))&&Math.abs(M-z)<=1e-6*Math.max(1,Math.abs(M),Math.abs(z))&&Math.abs(f-j)<=1e-6*Math.max(1,Math.abs(f),Math.abs(j))&&Math.abs(l-P)<=1e-6*Math.max(1,Math.abs(l),Math.abs(P))&&Math.abs(v-S)<=1e-6*Math.max(1,Math.abs(v),Math.abs(S))&&Math.abs(b-E)<=1e-6*Math.max(1,Math.abs(b),Math.abs(E))&&Math.abs(m-O)<=1e-6*Math.max(1,Math.abs(m),Math.abs(O))&&Math.abs(d-T)<=1e-6*Math.max(1,Math.abs(d),Math.abs(T))},mul:j,sub:P});function E(){var t=new n(3);return n!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t}function O(t){var n=t[0],a=t[1],r=t[2];return Math.hypot(n,a,r)}function T(t,a,r){var e=new n(3);return e[0]=t,e[1]=a,e[2]=r,e}function D(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t}function F(t,n,a){return t[0]=n[0]*a[0],t[1]=n[1]*a[1],t[2]=n[2]*a[2],t}function I(t,n,a){return t[0]=n[0]/a[0],t[1]=n[1]/a[1],t[2]=n[2]/a[2],t}function L(t,n){var a=n[0]-t[0],r=n[1]-t[1],e=n[2]-t[2];return Math.hypot(a,r,e)}function V(t,n){var a=n[0]-t[0],r=n[1]-t[1],e=n[2]-t[2];return a*a+r*r+e*e}function Q(t){var n=t[0],a=t[1],r=t[2];return n*n+a*a+r*r}function Y(t,n){var a=n[0],r=n[1],e=n[2],u=a*a+r*r+e*e;return u>0&&(u=1/Math.sqrt(u)),t[0]=n[0]*u,t[1]=n[1]*u,t[2]=n[2]*u,t}function X(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]}function Z(t,n,a){var r=n[0],e=n[1],u=n[2],o=a[0],i=a[1],h=a[2];return t[0]=e*h-u*i,t[1]=u*o-r*h,t[2]=r*i-e*o,t}var B,N=D,k=F,U=I,W=L,C=V,G=O,H=Q,J=(B=E(),function(t,n,a,r,e,u){var o,i;for(n||(n=3),a||(a=0),i=r?Math.min(r*n+a,t.length):t.length,o=a;o<i;o+=n)B[0]=t[o],B[1]=t[o+1],B[2]=t[o+2],e(B,B,u),t[o]=B[0],t[o+1]=B[1],t[o+2]=B[2];return t}),K=Object.freeze({__proto__:null,create:E,clone:function(t){var a=new n(3);return a[0]=t[0],a[1]=t[1],a[2]=t[2],a},length:O,fromValues:T,copy:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t},set:function(t,n,a,r){return t[0]=n,t[1]=a,t[2]=r,t},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t},subtract:D,multiply:F,divide:I,ceil:function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t},floor:function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t},min:function(t,n,a){return t[0]=Math.min(n[0],a[0]),t[1]=Math.min(n[1],a[1]),t[2]=Math.min(n[2],a[2]),t},max:function(t,n,a){return t[0]=Math.max(n[0],a[0]),t[1]=Math.max(n[1],a[1]),t[2]=Math.max(n[2],a[2]),t},round:function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t},scale:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t},scaleAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t},distance:L,squaredDistance:V,squaredLength:Q,negate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t},inverse:function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t},normalize:Y,dot:X,cross:Z,lerp:function(t,n,a,r){var e=n[0],u=n[1],o=n[2];return t[0]=e+r*(a[0]-e),t[1]=u+r*(a[1]-u),t[2]=o+r*(a[2]-o),t},hermite:function(t,n,a,r,e,u){var o=u*u,i=o*(2*u-3)+1,h=o*(u-2)+u,c=o*(u-1),s=o*(3-2*u);return t[0]=n[0]*i+a[0]*h+r[0]*c+e[0]*s,t[1]=n[1]*i+a[1]*h+r[1]*c+e[1]*s,t[2]=n[2]*i+a[2]*h+r[2]*c+e[2]*s,t},bezier:function(t,n,a,r,e,u){var o=1-u,i=o*o,h=u*u,c=i*o,s=3*u*i,M=3*h*o,f=h*u;return t[0]=n[0]*c+a[0]*s+r[0]*M+e[0]*f,t[1]=n[1]*c+a[1]*s+r[1]*M+e[1]*f,t[2]=n[2]*c+a[2]*s+r[2]*M+e[2]*f,t},random:function(t,n){n=n||1;var r=2*a()*Math.PI,e=2*a()-1,u=Math.sqrt(1-e*e)*n;return t[0]=Math.cos(r)*u,t[1]=Math.sin(r)*u,t[2]=e*n,t},transformMat4:function(t,n,a){var r=n[0],e=n[1],u=n[2],o=a[3]*r+a[7]*e+a[11]*u+a[15];return o=o||1,t[0]=(a[0]*r+a[4]*e+a[8]*u+a[12])/o,t[1]=(a[1]*r+a[5]*e+a[9]*u+a[13])/o,t[2]=(a[2]*r+a[6]*e+a[10]*u+a[14])/o,t},transformMat3:function(t,n,a){var r=n[0],e=n[1],u=n[2];return t[0]=r*a[0]+e*a[3]+u*a[6],t[1]=r*a[1]+e*a[4]+u*a[7],t[2]=r*a[2]+e*a[5]+u*a[8],t},transformQuat:function(t,n,a){var r=a[0],e=a[1],u=a[2],o=a[3],i=n[0],h=n[1],c=n[2],s=e*c-u*h,M=u*i-r*c,f=r*h-e*i,l=e*f-u*M,v=u*s-r*f,b=r*M-e*s,m=2*o;return s*=m,M*=m,f*=m,l*=2,v*=2,b*=2,t[0]=i+s+l,t[1]=h+M+v,t[2]=c+f+b,t},rotateX:function(t,n,a,r){var e=[],u=[];return e[0]=n[0]-a[0],e[1]=n[1]-a[1],e[2]=n[2]-a[2],u[0]=e[0],u[1]=e[1]*Math.cos(r)-e[2]*Math.sin(r),u[2]=e[1]*Math.sin(r)+e[2]*Math.cos(r),t[0]=u[0]+a[0],t[1]=u[1]+a[1],t[2]=u[2]+a[2],t},rotateY:function(t,n,a,r){var e=[],u=[];return e[0]=n[0]-a[0],e[1]=n[1]-a[1],e[2]=n[2]-a[2],u[0]=e[2]*Math.sin(r)+e[0]*Math.cos(r),u[1]=e[1],u[2]=e[2]*Math.cos(r)-e[0]*Math.sin(r),t[0]=u[0]+a[0],t[1]=u[1]+a[1],t[2]=u[2]+a[2],t},rotateZ:function(t,n,a,r){var e=[],u=[];return e[0]=n[0]-a[0],e[1]=n[1]-a[1],e[2]=n[2]-a[2],u[0]=e[0]*Math.cos(r)-e[1]*Math.sin(r),u[1]=e[0]*Math.sin(r)+e[1]*Math.cos(r),u[2]=e[2],t[0]=u[0]+a[0],t[1]=u[1]+a[1],t[2]=u[2]+a[2],t},angle:function(t,n){var a=t[0],r=t[1],e=t[2],u=n[0],o=n[1],i=n[2],h=Math.sqrt(a*a+r*r+e*e)*Math.sqrt(u*u+o*o+i*i),c=h&&X(t,n)/h;return Math.acos(Math.min(Math.max(c,-1),1))},zero:function(t){return t[0]=0,t[1]=0,t[2]=0,t},str:function(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")"},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]},equals:function(t,n){var a=t[0],r=t[1],e=t[2],u=n[0],o=n[1],i=n[2];return Math.abs(a-u)<=1e-6*Math.max(1,Math.abs(a),Math.abs(u))&&Math.abs(r-o)<=1e-6*Math.max(1,Math.abs(r),Math.abs(o))&&Math.abs(e-i)<=1e-6*Math.max(1,Math.abs(e),Math.abs(i))},sub:N,mul:k,div:U,dist:W,sqrDist:C,len:G,sqrLen:H,forEach:J});function $(){var t=new n(4);return n!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[3]=0),t}function tt(t){var a=new n(4);return a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a}function nt(t,a,r,e){var u=new n(4);return u[0]=t,u[1]=a,u[2]=r,u[3]=e,u}function at(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t}function rt(t,n,a,r,e){return t[0]=n,t[1]=a,t[2]=r,t[3]=e,t}function et(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t}function ut(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t[2]=n[2]-a[2],t[3]=n[3]-a[3],t}function ot(t,n,a){return t[0]=n[0]*a[0],t[1]=n[1]*a[1],t[2]=n[2]*a[2],t[3]=n[3]*a[3],t}function it(t,n,a){return t[0]=n[0]/a[0],t[1]=n[1]/a[1],t[2]=n[2]/a[2],t[3]=n[3]/a[3],t}function ht(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t}function ct(t,n){var a=n[0]-t[0],r=n[1]-t[1],e=n[2]-t[2],u=n[3]-t[3];return Math.hypot(a,r,e,u)}function st(t,n){var a=n[0]-t[0],r=n[1]-t[1],e=n[2]-t[2],u=n[3]-t[3];return a*a+r*r+e*e+u*u}function Mt(t){var n=t[0],a=t[1],r=t[2],e=t[3];return Math.hypot(n,a,r,e)}function ft(t){var n=t[0],a=t[1],r=t[2],e=t[3];return n*n+a*a+r*r+e*e}function lt(t,n){var a=n[0],r=n[1],e=n[2],u=n[3],o=a*a+r*r+e*e+u*u;return o>0&&(o=1/Math.sqrt(o)),t[0]=a*o,t[1]=r*o,t[2]=e*o,t[3]=u*o,t}function vt(t,n){return t[0]*n[0]+t[1]*n[1]+t[2]*n[2]+t[3]*n[3]}function bt(t,n,a,r){var e=n[0],u=n[1],o=n[2],i=n[3];return t[0]=e+r*(a[0]-e),t[1]=u+r*(a[1]-u),t[2]=o+r*(a[2]-o),t[3]=i+r*(a[3]-i),t}function mt(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]}function dt(t,n){var a=t[0],r=t[1],e=t[2],u=t[3],o=n[0],i=n[1],h=n[2],c=n[3];return Math.abs(a-o)<=1e-6*Math.max(1,Math.abs(a),Math.abs(o))&&Math.abs(r-i)<=1e-6*Math.max(1,Math.abs(r),Math.abs(i))&&Math.abs(e-h)<=1e-6*Math.max(1,Math.abs(e),Math.abs(h))&&Math.abs(u-c)<=1e-6*Math.max(1,Math.abs(u),Math.abs(c))}var pt=ut,xt=ot,yt=it,qt=ct,gt=st,_t=Mt,At=ft,wt=function(){var t=$();return function(n,a,r,e,u,o){var i,h;for(a||(a=4),r||(r=0),h=e?Math.min(e*a+r,n.length):n.length,i=r;i<h;i+=a)t[0]=n[i],t[1]=n[i+1],t[2]=n[i+2],t[3]=n[i+3],u(t,t,o),n[i]=t[0],n[i+1]=t[1],n[i+2]=t[2],n[i+3]=t[3];return n}}(),Rt=Object.freeze({__proto__:null,create:$,clone:tt,fromValues:nt,copy:at,set:rt,add:et,subtract:ut,multiply:ot,divide:it,ceil:function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t[2]=Math.ceil(n[2]),t[3]=Math.ceil(n[3]),t},floor:function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t[2]=Math.floor(n[2]),t[3]=Math.floor(n[3]),t},min:function(t,n,a){return t[0]=Math.min(n[0],a[0]),t[1]=Math.min(n[1],a[1]),t[2]=Math.min(n[2],a[2]),t[3]=Math.min(n[3],a[3]),t},max:function(t,n,a){return t[0]=Math.max(n[0],a[0]),t[1]=Math.max(n[1],a[1]),t[2]=Math.max(n[2],a[2]),t[3]=Math.max(n[3],a[3]),t},round:function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t[2]=Math.round(n[2]),t[3]=Math.round(n[3]),t},scale:ht,scaleAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t[2]=n[2]+a[2]*r,t[3]=n[3]+a[3]*r,t},distance:ct,squaredDistance:st,length:Mt,squaredLength:ft,negate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=-n[3],t},inverse:function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t[2]=1/n[2],t[3]=1/n[3],t},normalize:lt,dot:vt,cross:function(t,n,a,r){var e=a[0]*r[1]-a[1]*r[0],u=a[0]*r[2]-a[2]*r[0],o=a[0]*r[3]-a[3]*r[0],i=a[1]*r[2]-a[2]*r[1],h=a[1]*r[3]-a[3]*r[1],c=a[2]*r[3]-a[3]*r[2],s=n[0],M=n[1],f=n[2],l=n[3];return t[0]=M*c-f*h+l*i,t[1]=-s*c+f*o-l*u,t[2]=s*h-M*o+l*e,t[3]=-s*i+M*u-f*e,t},lerp:bt,random:function(t,n){var r,e,u,o,i,h;n=n||1;do{i=(r=2*a()-1)*r+(e=2*a()-1)*e}while(i>=1);do{h=(u=2*a()-1)*u+(o=2*a()-1)*o}while(h>=1);var c=Math.sqrt((1-i)/h);return t[0]=n*r,t[1]=n*e,t[2]=n*u*c,t[3]=n*o*c,t},transformMat4:function(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3];return t[0]=a[0]*r+a[4]*e+a[8]*u+a[12]*o,t[1]=a[1]*r+a[5]*e+a[9]*u+a[13]*o,t[2]=a[2]*r+a[6]*e+a[10]*u+a[14]*o,t[3]=a[3]*r+a[7]*e+a[11]*u+a[15]*o,t},transformQuat:function(t,n,a){var r=n[0],e=n[1],u=n[2],o=a[0],i=a[1],h=a[2],c=a[3],s=c*r+i*u-h*e,M=c*e+h*r-o*u,f=c*u+o*e-i*r,l=-o*r-i*e-h*u;return t[0]=s*c+l*-o+M*-h-f*-i,t[1]=M*c+l*-i+f*-o-s*-h,t[2]=f*c+l*-h+s*-i-M*-o,t[3]=n[3],t},zero:function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=0,t},str:function(t){return"vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},exactEquals:mt,equals:dt,sub:pt,mul:xt,div:yt,dist:qt,sqrDist:gt,len:_t,sqrLen:At,forEach:wt});function zt(){var t=new n(4);return n!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0),t[3]=1,t}function jt(t,n,a){a*=.5;var r=Math.sin(a);return t[0]=r*n[0],t[1]=r*n[1],t[2]=r*n[2],t[3]=Math.cos(a),t}function Pt(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3],i=a[0],h=a[1],c=a[2],s=a[3];return t[0]=r*s+o*i+e*c-u*h,t[1]=e*s+o*h+u*i-r*c,t[2]=u*s+o*c+r*h-e*i,t[3]=o*s-r*i-e*h-u*c,t}function St(t,n,a){a*=.5;var r=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(a),h=Math.cos(a);return t[0]=r*h+o*i,t[1]=e*h+u*i,t[2]=u*h-e*i,t[3]=o*h-r*i,t}function Et(t,n,a){a*=.5;var r=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(a),h=Math.cos(a);return t[0]=r*h-u*i,t[1]=e*h+o*i,t[2]=u*h+r*i,t[3]=o*h-e*i,t}function Ot(t,n,a){a*=.5;var r=n[0],e=n[1],u=n[2],o=n[3],i=Math.sin(a),h=Math.cos(a);return t[0]=r*h+e*i,t[1]=e*h-r*i,t[2]=u*h+o*i,t[3]=o*h-u*i,t}function Tt(t,n){var a=n[0],r=n[1],e=n[2],u=n[3],o=Math.sqrt(a*a+r*r+e*e),i=Math.exp(u),h=o>0?i*Math.sin(o)/o:0;return t[0]=a*h,t[1]=r*h,t[2]=e*h,t[3]=i*Math.cos(o),t}function Dt(t,n){var a=n[0],r=n[1],e=n[2],u=n[3],o=Math.sqrt(a*a+r*r+e*e),i=o>0?Math.atan2(o,u)/o:0;return t[0]=a*i,t[1]=r*i,t[2]=e*i,t[3]=.5*Math.log(a*a+r*r+e*e+u*u),t}function Ft(t,n,a,r){var e,u,o,i,h,c=n[0],s=n[1],M=n[2],f=n[3],l=a[0],v=a[1],b=a[2],m=a[3];return(u=c*l+s*v+M*b+f*m)<0&&(u=-u,l=-l,v=-v,b=-b,m=-m),1-u>1e-6?(e=Math.acos(u),o=Math.sin(e),i=Math.sin((1-r)*e)/o,h=Math.sin(r*e)/o):(i=1-r,h=r),t[0]=i*c+h*l,t[1]=i*s+h*v,t[2]=i*M+h*b,t[3]=i*f+h*m,t}function It(t,n){var a,r=n[0]+n[4]+n[8];if(r>0)a=Math.sqrt(r+1),t[3]=.5*a,a=.5/a,t[0]=(n[5]-n[7])*a,t[1]=(n[6]-n[2])*a,t[2]=(n[1]-n[3])*a;else{var e=0;n[4]>n[0]&&(e=1),n[8]>n[3*e+e]&&(e=2);var u=(e+1)%3,o=(e+2)%3;a=Math.sqrt(n[3*e+e]-n[3*u+u]-n[3*o+o]+1),t[e]=.5*a,a=.5/a,t[3]=(n[3*u+o]-n[3*o+u])*a,t[u]=(n[3*u+e]+n[3*e+u])*a,t[o]=(n[3*o+e]+n[3*e+o])*a}return t}var Lt,Vt,Qt,Yt,Xt,Zt,Bt=tt,Nt=nt,kt=at,Ut=rt,Wt=et,Ct=Pt,Gt=ht,Ht=vt,Jt=bt,Kt=Mt,$t=Kt,tn=ft,nn=tn,an=lt,rn=mt,en=dt,un=(Lt=E(),Vt=T(1,0,0),Qt=T(0,1,0),function(t,n,a){var r=X(n,a);return r<-.999999?(Z(Lt,Vt,n),G(Lt)<1e-6&&Z(Lt,Qt,n),Y(Lt,Lt),jt(t,Lt,Math.PI),t):r>.999999?(t[0]=0,t[1]=0,t[2]=0,t[3]=1,t):(Z(Lt,n,a),t[0]=Lt[0],t[1]=Lt[1],t[2]=Lt[2],t[3]=1+r,an(t,t))}),on=(Yt=zt(),Xt=zt(),function(t,n,a,r,e,u){return Ft(Yt,n,e,u),Ft(Xt,a,r,u),Ft(t,Yt,Xt,2*u*(1-u)),t}),hn=(Zt=b(),function(t,n,a,r){return Zt[0]=a[0],Zt[3]=a[1],Zt[6]=a[2],Zt[1]=r[0],Zt[4]=r[1],Zt[7]=r[2],Zt[2]=-n[0],Zt[5]=-n[1],Zt[8]=-n[2],an(t,It(t,Zt))}),cn=Object.freeze({__proto__:null,create:zt,identity:function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t},setAxisAngle:jt,getAxisAngle:function(t,n){var a=2*Math.acos(n[3]),r=Math.sin(a/2);return r>1e-6?(t[0]=n[0]/r,t[1]=n[1]/r,t[2]=n[2]/r):(t[0]=1,t[1]=0,t[2]=0),a},getAngle:function(t,n){var a=Ht(t,n);return Math.acos(2*a*a-1)},multiply:Pt,rotateX:St,rotateY:Et,rotateZ:Ot,calculateW:function(t,n){var a=n[0],r=n[1],e=n[2];return t[0]=a,t[1]=r,t[2]=e,t[3]=Math.sqrt(Math.abs(1-a*a-r*r-e*e)),t},exp:Tt,ln:Dt,pow:function(t,n,a){return Dt(t,n),Gt(t,t,a),Tt(t,t),t},slerp:Ft,random:function(t){var n=a(),r=a(),e=a(),u=Math.sqrt(1-n),o=Math.sqrt(n);return t[0]=u*Math.sin(2*Math.PI*r),t[1]=u*Math.cos(2*Math.PI*r),t[2]=o*Math.sin(2*Math.PI*e),t[3]=o*Math.cos(2*Math.PI*e),t},invert:function(t,n){var a=n[0],r=n[1],e=n[2],u=n[3],o=a*a+r*r+e*e+u*u,i=o?1/o:0;return t[0]=-a*i,t[1]=-r*i,t[2]=-e*i,t[3]=u*i,t},conjugate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=n[3],t},fromMat3:It,fromEuler:function(t,n,a,r){var e=.5*Math.PI/180;n*=e,a*=e,r*=e;var u=Math.sin(n),o=Math.cos(n),i=Math.sin(a),h=Math.cos(a),c=Math.sin(r),s=Math.cos(r);return t[0]=u*h*s-o*i*c,t[1]=o*i*s+u*h*c,t[2]=o*h*c-u*i*s,t[3]=o*h*s+u*i*c,t},str:function(t){return"quat("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},clone:Bt,fromValues:Nt,copy:kt,set:Ut,add:Wt,mul:Ct,scale:Gt,dot:Ht,lerp:Jt,length:Kt,len:$t,squaredLength:tn,sqrLen:nn,normalize:an,exactEquals:rn,equals:en,rotationTo:un,sqlerp:on,setAxes:hn});function sn(t,n,a){var r=.5*a[0],e=.5*a[1],u=.5*a[2],o=n[0],i=n[1],h=n[2],c=n[3];return t[0]=o,t[1]=i,t[2]=h,t[3]=c,t[4]=r*c+e*h-u*i,t[5]=e*c+u*o-r*h,t[6]=u*c+r*i-e*o,t[7]=-r*o-e*i-u*h,t}function Mn(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t}var fn=kt;var ln=kt;function vn(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3],i=a[4],h=a[5],c=a[6],s=a[7],M=n[4],f=n[5],l=n[6],v=n[7],b=a[0],m=a[1],d=a[2],p=a[3];return t[0]=r*p+o*b+e*d-u*m,t[1]=e*p+o*m+u*b-r*d,t[2]=u*p+o*d+r*m-e*b,t[3]=o*p-r*b-e*m-u*d,t[4]=r*s+o*i+e*c-u*h+M*p+v*b+f*d-l*m,t[5]=e*s+o*h+u*i-r*c+f*p+v*m+l*b-M*d,t[6]=u*s+o*c+r*h-e*i+l*p+v*d+M*m-f*b,t[7]=o*s-r*i-e*h-u*c+v*p-M*b-f*m-l*d,t}var bn=vn;var mn=Ht;var dn=Kt,pn=dn,xn=tn,yn=xn;var qn=Object.freeze({__proto__:null,create:function(){var t=new n(8);return n!=Float32Array&&(t[0]=0,t[1]=0,t[2]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0),t[3]=1,t},clone:function(t){var a=new n(8);return a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a[4]=t[4],a[5]=t[5],a[6]=t[6],a[7]=t[7],a},fromValues:function(t,a,r,e,u,o,i,h){var c=new n(8);return c[0]=t,c[1]=a,c[2]=r,c[3]=e,c[4]=u,c[5]=o,c[6]=i,c[7]=h,c},fromRotationTranslationValues:function(t,a,r,e,u,o,i){var h=new n(8);h[0]=t,h[1]=a,h[2]=r,h[3]=e;var c=.5*u,s=.5*o,M=.5*i;return h[4]=c*e+s*r-M*a,h[5]=s*e+M*t-c*r,h[6]=M*e+c*a-s*t,h[7]=-c*t-s*a-M*r,h},fromRotationTranslation:sn,fromTranslation:function(t,n){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t[4]=.5*n[0],t[5]=.5*n[1],t[6]=.5*n[2],t[7]=0,t},fromRotation:function(t,n){return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=0,t[5]=0,t[6]=0,t[7]=0,t},fromMat4:function(t,a){var r=zt();R(r,a);var e=new n(3);return A(e,a),sn(t,r,e),t},copy:Mn,identity:function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t},set:function(t,n,a,r,e,u,o,i,h){return t[0]=n,t[1]=a,t[2]=r,t[3]=e,t[4]=u,t[5]=o,t[6]=i,t[7]=h,t},getReal:fn,getDual:function(t,n){return t[0]=n[4],t[1]=n[5],t[2]=n[6],t[3]=n[7],t},setReal:ln,setDual:function(t,n){return t[4]=n[0],t[5]=n[1],t[6]=n[2],t[7]=n[3],t},getTranslation:function(t,n){var a=n[4],r=n[5],e=n[6],u=n[7],o=-n[0],i=-n[1],h=-n[2],c=n[3];return t[0]=2*(a*c+u*o+r*h-e*i),t[1]=2*(r*c+u*i+e*o-a*h),t[2]=2*(e*c+u*h+a*i-r*o),t},translate:function(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3],i=.5*a[0],h=.5*a[1],c=.5*a[2],s=n[4],M=n[5],f=n[6],l=n[7];return t[0]=r,t[1]=e,t[2]=u,t[3]=o,t[4]=o*i+e*c-u*h+s,t[5]=o*h+u*i-r*c+M,t[6]=o*c+r*h-e*i+f,t[7]=-r*i-e*h-u*c+l,t},rotateX:function(t,n,a){var r=-n[0],e=-n[1],u=-n[2],o=n[3],i=n[4],h=n[5],c=n[6],s=n[7],M=i*o+s*r+h*u-c*e,f=h*o+s*e+c*r-i*u,l=c*o+s*u+i*e-h*r,v=s*o-i*r-h*e-c*u;return St(t,n,a),r=t[0],e=t[1],u=t[2],o=t[3],t[4]=M*o+v*r+f*u-l*e,t[5]=f*o+v*e+l*r-M*u,t[6]=l*o+v*u+M*e-f*r,t[7]=v*o-M*r-f*e-l*u,t},rotateY:function(t,n,a){var r=-n[0],e=-n[1],u=-n[2],o=n[3],i=n[4],h=n[5],c=n[6],s=n[7],M=i*o+s*r+h*u-c*e,f=h*o+s*e+c*r-i*u,l=c*o+s*u+i*e-h*r,v=s*o-i*r-h*e-c*u;return Et(t,n,a),r=t[0],e=t[1],u=t[2],o=t[3],t[4]=M*o+v*r+f*u-l*e,t[5]=f*o+v*e+l*r-M*u,t[6]=l*o+v*u+M*e-f*r,t[7]=v*o-M*r-f*e-l*u,t},rotateZ:function(t,n,a){var r=-n[0],e=-n[1],u=-n[2],o=n[3],i=n[4],h=n[5],c=n[6],s=n[7],M=i*o+s*r+h*u-c*e,f=h*o+s*e+c*r-i*u,l=c*o+s*u+i*e-h*r,v=s*o-i*r-h*e-c*u;return Ot(t,n,a),r=t[0],e=t[1],u=t[2],o=t[3],t[4]=M*o+v*r+f*u-l*e,t[5]=f*o+v*e+l*r-M*u,t[6]=l*o+v*u+M*e-f*r,t[7]=v*o-M*r-f*e-l*u,t},rotateByQuatAppend:function(t,n,a){var r=a[0],e=a[1],u=a[2],o=a[3],i=n[0],h=n[1],c=n[2],s=n[3];return t[0]=i*o+s*r+h*u-c*e,t[1]=h*o+s*e+c*r-i*u,t[2]=c*o+s*u+i*e-h*r,t[3]=s*o-i*r-h*e-c*u,i=n[4],h=n[5],c=n[6],s=n[7],t[4]=i*o+s*r+h*u-c*e,t[5]=h*o+s*e+c*r-i*u,t[6]=c*o+s*u+i*e-h*r,t[7]=s*o-i*r-h*e-c*u,t},rotateByQuatPrepend:function(t,n,a){var r=n[0],e=n[1],u=n[2],o=n[3],i=a[0],h=a[1],c=a[2],s=a[3];return t[0]=r*s+o*i+e*c-u*h,t[1]=e*s+o*h+u*i-r*c,t[2]=u*s+o*c+r*h-e*i,t[3]=o*s-r*i-e*h-u*c,i=a[4],h=a[5],c=a[6],s=a[7],t[4]=r*s+o*i+e*c-u*h,t[5]=e*s+o*h+u*i-r*c,t[6]=u*s+o*c+r*h-e*i,t[7]=o*s-r*i-e*h-u*c,t},rotateAroundAxis:function(t,n,a,r){if(Math.abs(r)<1e-6)return Mn(t,n);var e=Math.hypot(a[0],a[1],a[2]);r*=.5;var u=Math.sin(r),o=u*a[0]/e,i=u*a[1]/e,h=u*a[2]/e,c=Math.cos(r),s=n[0],M=n[1],f=n[2],l=n[3];t[0]=s*c+l*o+M*h-f*i,t[1]=M*c+l*i+f*o-s*h,t[2]=f*c+l*h+s*i-M*o,t[3]=l*c-s*o-M*i-f*h;var v=n[4],b=n[5],m=n[6],d=n[7];return t[4]=v*c+d*o+b*h-m*i,t[5]=b*c+d*i+m*o-v*h,t[6]=m*c+d*h+v*i-b*o,t[7]=d*c-v*o-b*i-m*h,t},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t[2]=n[2]+a[2],t[3]=n[3]+a[3],t[4]=n[4]+a[4],t[5]=n[5]+a[5],t[6]=n[6]+a[6],t[7]=n[7]+a[7],t},multiply:vn,mul:bn,scale:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t[2]=n[2]*a,t[3]=n[3]*a,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=n[7]*a,t},dot:mn,lerp:function(t,n,a,r){var e=1-r;return mn(n,a)<0&&(r=-r),t[0]=n[0]*e+a[0]*r,t[1]=n[1]*e+a[1]*r,t[2]=n[2]*e+a[2]*r,t[3]=n[3]*e+a[3]*r,t[4]=n[4]*e+a[4]*r,t[5]=n[5]*e+a[5]*r,t[6]=n[6]*e+a[6]*r,t[7]=n[7]*e+a[7]*r,t},invert:function(t,n){var a=xn(n);return t[0]=-n[0]/a,t[1]=-n[1]/a,t[2]=-n[2]/a,t[3]=n[3]/a,t[4]=-n[4]/a,t[5]=-n[5]/a,t[6]=-n[6]/a,t[7]=n[7]/a,t},conjugate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t[2]=-n[2],t[3]=n[3],t[4]=-n[4],t[5]=-n[5],t[6]=-n[6],t[7]=n[7],t},length:dn,len:pn,squaredLength:xn,sqrLen:yn,normalize:function(t,n){var a=xn(n);if(a>0){a=Math.sqrt(a);var r=n[0]/a,e=n[1]/a,u=n[2]/a,o=n[3]/a,i=n[4],h=n[5],c=n[6],s=n[7],M=r*i+e*h+u*c+o*s;t[0]=r,t[1]=e,t[2]=u,t[3]=o,t[4]=(i-r*M)/a,t[5]=(h-e*M)/a,t[6]=(c-u*M)/a,t[7]=(s-o*M)/a}return t},str:function(t){return"quat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+")"},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]&&t[2]===n[2]&&t[3]===n[3]&&t[4]===n[4]&&t[5]===n[5]&&t[6]===n[6]&&t[7]===n[7]},equals:function(t,n){var a=t[0],r=t[1],e=t[2],u=t[3],o=t[4],i=t[5],h=t[6],c=t[7],s=n[0],M=n[1],f=n[2],l=n[3],v=n[4],b=n[5],m=n[6],d=n[7];return Math.abs(a-s)<=1e-6*Math.max(1,Math.abs(a),Math.abs(s))&&Math.abs(r-M)<=1e-6*Math.max(1,Math.abs(r),Math.abs(M))&&Math.abs(e-f)<=1e-6*Math.max(1,Math.abs(e),Math.abs(f))&&Math.abs(u-l)<=1e-6*Math.max(1,Math.abs(u),Math.abs(l))&&Math.abs(o-v)<=1e-6*Math.max(1,Math.abs(o),Math.abs(v))&&Math.abs(i-b)<=1e-6*Math.max(1,Math.abs(i),Math.abs(b))&&Math.abs(h-m)<=1e-6*Math.max(1,Math.abs(h),Math.abs(m))&&Math.abs(c-d)<=1e-6*Math.max(1,Math.abs(c),Math.abs(d))}});function gn(){var t=new n(2);return n!=Float32Array&&(t[0]=0,t[1]=0),t}function _n(t,n,a){return t[0]=n[0]-a[0],t[1]=n[1]-a[1],t}function An(t,n,a){return t[0]=n[0]*a[0],t[1]=n[1]*a[1],t}function wn(t,n,a){return t[0]=n[0]/a[0],t[1]=n[1]/a[1],t}function Rn(t,n){var a=n[0]-t[0],r=n[1]-t[1];return Math.hypot(a,r)}function zn(t,n){var a=n[0]-t[0],r=n[1]-t[1];return a*a+r*r}function jn(t){var n=t[0],a=t[1];return Math.hypot(n,a)}function Pn(t){var n=t[0],a=t[1];return n*n+a*a}var Sn=jn,En=_n,On=An,Tn=wn,Dn=Rn,Fn=zn,In=Pn,Ln=function(){var t=gn();return function(n,a,r,e,u,o){var i,h;for(a||(a=2),r||(r=0),h=e?Math.min(e*a+r,n.length):n.length,i=r;i<h;i+=a)t[0]=n[i],t[1]=n[i+1],u(t,t,o),n[i]=t[0],n[i+1]=t[1];return n}}(),Vn=Object.freeze({__proto__:null,create:gn,clone:function(t){var a=new n(2);return a[0]=t[0],a[1]=t[1],a},fromValues:function(t,a){var r=new n(2);return r[0]=t,r[1]=a,r},copy:function(t,n){return t[0]=n[0],t[1]=n[1],t},set:function(t,n,a){return t[0]=n,t[1]=a,t},add:function(t,n,a){return t[0]=n[0]+a[0],t[1]=n[1]+a[1],t},subtract:_n,multiply:An,divide:wn,ceil:function(t,n){return t[0]=Math.ceil(n[0]),t[1]=Math.ceil(n[1]),t},floor:function(t,n){return t[0]=Math.floor(n[0]),t[1]=Math.floor(n[1]),t},min:function(t,n,a){return t[0]=Math.min(n[0],a[0]),t[1]=Math.min(n[1],a[1]),t},max:function(t,n,a){return t[0]=Math.max(n[0],a[0]),t[1]=Math.max(n[1],a[1]),t},round:function(t,n){return t[0]=Math.round(n[0]),t[1]=Math.round(n[1]),t},scale:function(t,n,a){return t[0]=n[0]*a,t[1]=n[1]*a,t},scaleAndAdd:function(t,n,a,r){return t[0]=n[0]+a[0]*r,t[1]=n[1]+a[1]*r,t},distance:Rn,squaredDistance:zn,length:jn,squaredLength:Pn,negate:function(t,n){return t[0]=-n[0],t[1]=-n[1],t},inverse:function(t,n){return t[0]=1/n[0],t[1]=1/n[1],t},normalize:function(t,n){var a=n[0],r=n[1],e=a*a+r*r;return e>0&&(e=1/Math.sqrt(e)),t[0]=n[0]*e,t[1]=n[1]*e,t},dot:function(t,n){return t[0]*n[0]+t[1]*n[1]},cross:function(t,n,a){var r=n[0]*a[1]-n[1]*a[0];return t[0]=t[1]=0,t[2]=r,t},lerp:function(t,n,a,r){var e=n[0],u=n[1];return t[0]=e+r*(a[0]-e),t[1]=u+r*(a[1]-u),t},random:function(t,n){n=n||1;var r=2*a()*Math.PI;return t[0]=Math.cos(r)*n,t[1]=Math.sin(r)*n,t},transformMat2:function(t,n,a){var r=n[0],e=n[1];return t[0]=a[0]*r+a[2]*e,t[1]=a[1]*r+a[3]*e,t},transformMat2d:function(t,n,a){var r=n[0],e=n[1];return t[0]=a[0]*r+a[2]*e+a[4],t[1]=a[1]*r+a[3]*e+a[5],t},transformMat3:function(t,n,a){var r=n[0],e=n[1];return t[0]=a[0]*r+a[3]*e+a[6],t[1]=a[1]*r+a[4]*e+a[7],t},transformMat4:function(t,n,a){var r=n[0],e=n[1];return t[0]=a[0]*r+a[4]*e+a[12],t[1]=a[1]*r+a[5]*e+a[13],t},rotate:function(t,n,a,r){var e=n[0]-a[0],u=n[1]-a[1],o=Math.sin(r),i=Math.cos(r);return t[0]=e*i-u*o+a[0],t[1]=e*o+u*i+a[1],t},angle:function(t,n){var a=t[0],r=t[1],e=n[0],u=n[1],o=Math.sqrt(a*a+r*r)*Math.sqrt(e*e+u*u),i=o&&(a*e+r*u)/o;return Math.acos(Math.min(Math.max(i,-1),1))},zero:function(t){return t[0]=0,t[1]=0,t},str:function(t){return"vec2("+t[0]+", "+t[1]+")"},exactEquals:function(t,n){return t[0]===n[0]&&t[1]===n[1]},equals:function(t,n){var a=t[0],r=t[1],e=n[0],u=n[1];return Math.abs(a-e)<=1e-6*Math.max(1,Math.abs(a),Math.abs(e))&&Math.abs(r-u)<=1e-6*Math.max(1,Math.abs(r),Math.abs(u))},len:Sn,sub:En,mul:On,div:Tn,dist:Dn,sqrDist:Fn,sqrLen:In,forEach:Ln});t.glMatrix=e,t.mat2=c,t.mat2d=v,t.mat3=y,t.mat4=S,t.quat=cn,t.quat2=qn,t.vec2=Vn,t.vec3=K,t.vec4=Rt,Object.defineProperty(t,"__esModule",{value:!0})}));

<<<<<<< HEAD
},{}]},{},[21]);
=======
},{}]},{},[30]);
>>>>>>> tmp
