const Object3D = require("../Interfaces/Object3D.class.js");
const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");
const Utils = require("../Utils.class.js");
const MirrorTexture = require("../Textures/MirrorTexture.class");
const ColorTexture = require("../Textures/ColorTexture.class");
const Translate = require("../Movements/Translate.class.js");
const Scale = require("../Movements/Scale.class.js");
const Rotate = require("../Movements/Rotate.class.js");

class Cube extends Object3D {

	constructor(){
		super();
        this.colors = [
            0., 0., 1., 1., //Face avant
            0., 0., 1., 1.,
            0., 0., 1., 1.,
            0., 0., 1., 1.,

            0., 1., 1., 1.,//Face gauche
            0., 1., 1., 1.,
            0., 1., 1., 1.,
            0., 1., 1., 1.,

            1., 1., 0., 1.,//Face haute
            1., 1., 0., 1.,
            1., 1., 0., 1.,
            1., 1., 0., 1.,

            0., 1., 0., 1.,//Face droite
            0., 1., 0., 1.,
            0., 1., 0., 1.,
            0., 1., 0., 1.,

            1., 1., 1., 1.,//Face dessous
            1., 1., 1., 1.,
            1., 1., 1., 1.,
            1., 1., 1., 1.,

            1., 0., 0., 1.,//Face derriere
            1., 0., 0., 1.,
            1., 0., 0., 1.,
            1., 0., 0., 1.
        ];

        //Position
        this.positions = [
            -0.5, -0.5, 0.5,//Face avant
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            0.5, -0.5, 0.5,

            -0.5, -0.5, -0.5,//Face gauche
            -0.5, 0.5, -0.5,
            -0.5, 0.5, 0.5,
            -0.5, -0.5, 0.5,

            -0.5, 0.5, -0.5,//Face haute
            0.5, 0.5, -0.5,
            0.5, 0.5, 0.5,
            -0.5, 0.5, 0.5,

            0.5, 0.5, -0.5,//Face droite
            0.5, -0.5, -0.5,
            0.5, -0.5, 0.5,
            0.5, 0.5, 0.5,

            0.5, -0.5, -0.5,//Face dessous
            -0.5, -0.5, -0.5,
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,

            0.5, 0.5, -0.5,//Face derriere
            -0.5, 0.5, -0.5,
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5
        ]; 

        //Scale
        this.size = 1;
        this.sizeScale = new Scale([this.size/2,this.size/2,this.size/2], 1, function(){});
        this.sizeScale.setPosition(0, 0, 0);
        this.addMovement("size", this.sizeScale);
        this.sizeScale.start();
        
		this.indexes = [
            0,  2,  1,      0,  3,  2,    // avant
            4,  6,  5,      4,  7,  6,    // gauche
            8,  10,  9,     8,  11, 10,   // haut
            12, 14, 13,     12, 15, 14,   // bas
            16, 18, 17,     16, 19, 18,   // dessous
            20, 22, 21,     20, 23, 22,   // derriere
	    ];
        this.textureCoordonnees = [
            0., 0.,
            0., 1.,
            1., 1.,
            1., 0.,

            0., 0.,
            0., 1.,
            1., 1.,
            1., 0.,

            0., 0.,
            0., 1.,
            1., 1.,
            1., 0.,

            0., 0.,
            0., 1.,
            1., 1.,
            1., 0.,

            0., 0.,
            0., 1.,
            1., 1.,
            1., 0.,

            0., 0.,
            0., 1.,
            1., 1.,
            1., 0.,

        ]
		this.bufferFunctions = {
			"position" : this._sendVertexPosition,
			"color" : this._sendVertexColor,
            "textureCoordonnees" : this._sendTextureCoordonnees,
		}
	}

	setSize(s){
		this.size = s;
        this.sizeScale.setScaleVec(s, s, s);
	}

    setColors(devant, gauche, haut, droite, bas, derriere){
        this.colors = [];
        this.colors = this.colors.concat(devant).concat(devant).concat(devant).concat(devant);
        this.colors = this.colors.concat(gauche).concat(gauche).concat(gauche).concat(gauche);
        this.colors = this.colors.concat(haut).concat(haut).concat(haut).concat(haut);
        this.colors = this.colors.concat(droite).concat(droite).concat(droite).concat(droite);
        this.colors = this.colors.concat(bas).concat(bas).concat(bas).concat(bas);
        this.colors = this.colors.concat(derriere).concat(derriere).concat(derriere).concat(derriere);
    }

	renderAttribute(attribut, webGLProgram, func){
		this.bufferFunctions[attribut](webGLProgram, this, func);
	}

    _sendTextureCoordonnees(webGLProgram, that){
        const numTexture = 0;
        for(let text in that.textures){
            if(!(that.textures[text] instanceof MirrorTexture)){
                webGLProgram.getContext().activeTexture(webGLProgram.getContext().TEXTURE0);
                webGLProgram.getContext().bindTexture(webGLProgram.getContext().TEXTURE_2D, that.textures[text].getTexture());
                webGLProgram.getContext().uniform1i(webGLProgram.getShaderBuilder().getPointer("texture"), false, 0);


                webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ARRAY_BUFFER, webGLProgram.getBuffer("textureCoordonnees"));
                webGLProgram.getContext().vertexAttribPointer(
                    webGLProgram.getShaderBuilder().getPointer("textureCoordonnees"),
                    2,
                    webGLProgram.getContext().FLOAT,
                    false,
                    0,
                    0
                );

                //Insérer les données
                webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(that.textureCoordonnees), webGLProgram.getContext().STATIC_DRAW);
            }
        }

    }

	_sendVertexPosition(webGLProgram, that){

		//Initialisation
        webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ARRAY_BUFFER, webGLProgram.getBuffer("position"));
        webGLProgram.getContext().vertexAttribPointer(
            webGLProgram.getShaderBuilder().getPointer("position"),
            3,
            webGLProgram.getContext().FLOAT,
            false,
            0,
            0
        );


        webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(that.positions), webGLProgram.getContext().STATIC_DRAW);
	}

	_sendVertexColor(webGLProgram, that){
		//Initialisation
        webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ARRAY_BUFFER, webGLProgram.getBuffer("color"));
        webGLProgram.getContext().vertexAttribPointer(
            webGLProgram.getShaderBuilder().getPointer("color"),
            4,
            webGLProgram.getContext().FLOAT,
            false,
            0,
            0
        );
        //Insérer les données
        webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(that.colors), webGLProgram.getContext().STATIC_DRAW);
    }

    draw(webGLProgram, attributs, processedMatrix, orderTriangles){
        super.draw(webGLProgram);

        if(typeof orderTriangles != "undefined" && orderTriangles){
            this._orderPositionsByDistance(webGLProgram.getScene().getCamera().getPosition(), processedMatrix);
        }

        for(let i = 0 ; i < attributs.length ; i++){
            this.renderAttribute(attributs[i], webGLProgram);
        }

        webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);

        //Index
        webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, webGLProgram.getBuffer("index"));
        webGLProgram.getContext().bufferData(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexes), webGLProgram.getContext().STATIC_DRAW);

        //Draw
        webGLProgram.getContext().drawElements(webGLProgram.getContext().TRIANGLES, this.indexes.length, webGLProgram.getContext().UNSIGNED_SHORT, 0);
   
    }

    getDistance(x, y, z, transform){
        const vec1 = glmatrix.vec3.fromValues(x, y, z);
        let vec2 = glmatrix.vec3.create();
        glmatrix.vec3.transformMat4(vec2, vec2, transform);
        return glmatrix.vec3.distance(vec1, vec2);
    }

    clone(){
        const neww = new this.constructor();
        super.clone(neww);
        neww.size = this.size;
        neww.position = this.position.slice();
        neww.colors = this.colors.slice();
        Object.assign(neww.movements, this.movements);
        Object.assign(neww.textures, this.textures);
        neww.indexes = this.indexes.slice();
        neww.textureCoordonnees = this.textureCoordonnees.slice();
        Object.assign(neww.bufferFunctions, this.bufferFunctions);
        return neww;
    }

} 


module.exports = Cube;