const Object3D = require("../Interfaces/Object3D.class.js");
const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");
const MirrorTexture = require("../Textures/MirrorTexture.class.js");

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
        this.textureCoordonnees = [
            0., 0.,
            0., 1.,
            1., 1.,
            1., 0.,

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
	}

	renderAttribute(attribut, webGLProgram){
		this.bufferFunctions[attribut](webGLProgram, this);
	}

    _sendTextureCoordonnees(webGLProgram, that){
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


        for(let i = 0 ; i < attributs.length ; i++){
            this.renderAttribute(attributs[i], webGLProgram);
        }

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
    }

} 


module.exports = Plan;