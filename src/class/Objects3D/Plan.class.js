const Object3D = require("../Interfaces/Object3D.class.js");
const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");
const MirrorTexture = require("../Textures/MirrorTexture.class.js");
<<<<<<< HEAD

class Plan extends Object3D {

	constructor(){
		super();
		this.width = 1;
        this.height = 1;
		this.centerPosition = [0, 0, 0];
        this.movements = [];
        this.vecToProcess = [];
		this.indexes = [
	    0,  1,  2,      0,  2,  3,    // avant
	      ];
        this.textures = [];
=======
const ColorTexture = require("../Textures/ColorTexture.class");
const CanvasTexture = require("../Textures/CanvasTexture.class");
const FrameTexture = require("../Textures/FrameTexture.class");
const Scale = require("../Movements/Scale.class.js");
const Translate = require("../Movements/Translate.class.js");
const Rotate = require("../Movements/Rotate.class.js");

class Plan extends Object3D {

	constructor(material){
		super(material);

		this.indexes = [
	        0,  1,  2,      0,  2,  3,    // avant
	    ];
>>>>>>> tmp
        this.textureCoordonnees = [
            0., 0.,
            0., 1.,
            1., 1.,
            1., 0.,
<<<<<<< HEAD

        ]
		this.bufferFunctions = {
			"position" : this._sendVertexPosition,
            "textureCoordonnees" : this._sendTextureCoordonnees,
		}
	}

    addMovement(name, movement){
        this.movements[name] = movement;
    }

    removeMovement(name){
        delete this.movements[name];
    }

    addTexture(name, texture){
        this.textures[name] = texture;
    }

    removeTexture(name){
        delete this.textures[name];
    }



    getNbMovements(){
        return Object.keys(this.movements).length;
    }

    getMovements(){
        return this.movements;
    }

	setPosition(x, y, z){
		this.centerPosition = [x, y, z];
	}

    getPosition(){
        return this.centerPosition;
    }

	setSize(width, height){
		this.width = width;
        this.height = height;
=======
        ];
        this.positions = [
            -0.5, -0.5, 0,
            -0.5, 0.5, 0,
            0.5, 0.5, 0,
            0.5, -0.5, 0
        ]; 
		this.bufferFunctions = {
			"position" : this._sendVertexPosition,
            "textureCoordonnees" : this._sendTextureCoordonnees,
            "normal" : this._sendVertexNormals,
		}

        //Scale
        this.width = 1;
        this.height = 1;
        this.sizeScale = new Scale([this.width,this.height,1], 0, function(){});
        this.sizeScale.setPosition(0, 0, 0);
        this.addMovement("size", this.sizeScale);
        this.sizeScale.start();
        this.material.generateNormals(this);

	}

	setSize(width, height){
		this.width = width;
        this.height = height;
        this.sizeScale.setScaleVec(this.width, this.height, 1);
>>>>>>> tmp
	}

	renderAttribute(attribut, webGLProgram){
		this.bufferFunctions[attribut](webGLProgram, this);
	}

    _sendTextureCoordonnees(webGLProgram, that){
<<<<<<< HEAD
        const numTexture = 0;
        for(let text in that.textures){
            if(!(that.textures[text] instanceof MirrorTexture)){
                webGLProgram.getContext().activeTexture(webGLProgram.getContext().TEXTURE0);
                webGLProgram.getContext().bindTexture(webGLProgram.getContext().TEXTURE_2D, that.textures[text]);
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
=======

        //Render textures
        that.material.render(webGLProgram);

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
>>>>>>> tmp
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
<<<<<<< HEAD

        //Insérer les données
        const positions = [
        	that.centerPosition[0] - (that.width/2), that.centerPosition[1] - (that.height/2), that.centerPosition[2],
        	that.centerPosition[0] - (that.width/2), that.centerPosition[1] + (that.height/2), that.centerPosition[2],
        	that.centerPosition[0] + (that.width/2), that.centerPosition[1] + (that.height/2), that.centerPosition[2],
        	that.centerPosition[0] + (that.width/2), that.centerPosition[1] - (that.height/2), that.centerPosition[2],
        ]; 

        webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(positions), webGLProgram.getContext().STATIC_DRAW);
	}

	render(webGLProgram, attributs, base){

        let mirror = false;

        //Mirror PreSettings
        for(let text in this.textures){
            if(this.textures[text] instanceof MirrorTexture){
                this.textures[text].preDraw(this);
                mirror = true;
            }
        }


=======
        if(webGLProgram.getShaderBuilder().getMode() != "normal"){
           webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(that.positions), webGLProgram.getContext().STATIC_DRAW);
        }else{
            const positions = super.generateNormalPositions();
            webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(positions), webGLProgram.getContext().STATIC_DRAW);
        }
	}

    _sendVertexNormals(webGLProgram, that){
        //Initialisation
        webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ARRAY_BUFFER, webGLProgram.getBuffer("normal"));
        webGLProgram.getContext().vertexAttribPointer(
            webGLProgram.getShaderBuilder().getPointer("normal"),
            3,
            webGLProgram.getContext().FLOAT,
            false,
            0,
            0
        );
        webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(that.material.normals), webGLProgram.getContext().STATIC_DRAW);
    }

    draw(webGLProgram, attributs, processedMatrix){
        super.draw(webGLProgram);

        //Mirror
        this.material.preDraw(this, processedMatrix);
       
        //Render attributs
>>>>>>> tmp
        for(let i = 0 ; i < attributs.length ; i++){
            this.renderAttribute(attributs[i], webGLProgram);
        }

<<<<<<< HEAD
        //Local transformation
        //base = matrice héritéé d'un groupe d'objet
        let processedMatrix;
        let processedMatrixMirror;
        
        if(base == null || typeof base == "undefined"){
            processedMatrix = glmatrix.mat4.create();
            if(mirror){
                processedMatrixMirror = glmatrix.mat4.create();;
            }
            for(let move in this.movements){
                this.movements[move].process(processedMatrix);
                if(mirror){
                    this.movements[move].processMirror(processedMatrixMirror);
                }
            }
            webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
        }else{
            processedMatrix = base;
            for(let move in this.movements){
                this.movements[move].process(processedMatrix);
                if(mirror){
                    this.movements[move].processMirror(processedMatrixMirror);
                }
            }
            webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
        }


		//Index
		webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, webGLProgram.getBuffer("index"));
  	    webGLProgram.getContext().bufferData(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexes), webGLProgram.getContext().STATIC_DRAW);

		//Draw
        webGLProgram.getContext().drawElements(webGLProgram.getContext().TRIANGLES, this.indexes.length, webGLProgram.getContext().UNSIGNED_SHORT, 0);

        //Mirror PostSettings
        for(let text in this.textures){
            if(this.textures[text] instanceof MirrorTexture){
                this.textures[text].postDraw(this, processedMatrixMirror);
            }
        }
=======
        
        webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);

        //Index
        webGLProgram.getContext().disable(webGLProgram.getContext().CULL_FACE);


        webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, webGLProgram.getBuffer("index"));
        
        //Draw
        if(webGLProgram.getShaderBuilder().getMode() == "line"){
            const indexes = super.toLines(this.indexes);
            webGLProgram.getContext().bufferData(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, new Uint16Array(indexes), webGLProgram.getContext().STATIC_DRAW);
            //Draw
            webGLProgram.getContext().drawElements(webGLProgram.getContext().LINES, indexes.length, webGLProgram.getContext().UNSIGNED_SHORT, 0);
        }else if(webGLProgram.getShaderBuilder().getMode() == "normal"){

            webGLProgram.getContext().uniform4fv(webGLProgram.getShaderBuilder().getPointer("normalColor"), false, webGLProgram.getShaderBuilder().getNormalColor());
            webGLProgram.getContext().drawArrays(webGLProgram.getContext().LINES, 0, this.material.normals.length * 2);

        }else{
            webGLProgram.getContext().bufferData(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexes), webGLProgram.getContext().STATIC_DRAW);
            //Draw
            webGLProgram.getContext().drawElements(webGLProgram.getContext().TRIANGLES, this.indexes.length, webGLProgram.getContext().UNSIGNED_SHORT, 0);
        }



        webGLProgram.getContext().enable(webGLProgram.getContext().CULL_FACE);

        //Mirror PostSettings
        this.material.postDraw(this, processedMatrix);
    }

    clone(){
        const neww = new this.constructor();
        super.clone(neww);
        neww.width = this.width;
        neww.height = this.height;
        neww.position = this.position.slice();
        neww.indexes = this.indexes.slice();
        neww.textureCoordonnees = this.textureCoordonnees.slice();
        Object.assign(neww.movements, this.movements);
        Object.assign(neww.bufferFunctions, this.bufferFunctions);
        return neww;
    }

    getTextureDimensions(){
        return [this.width, this.height];
>>>>>>> tmp
    }

} 


module.exports = Plan;