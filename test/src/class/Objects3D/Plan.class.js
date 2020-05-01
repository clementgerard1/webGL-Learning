const Object3D = require("../Interfaces/Object3D.class.js");
const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");
const MirrorTexture = require("../Textures/MirrorTexture.class.js");
const ColorTexture = require("../Textures/ColorTexture.class");
const Scale = require("../Movements/Scale.class.js");
const Translate = require("../Movements/Translate.class.js");
const Rotate = require("../Movements/Rotate.class.js");

class Plan extends Object3D {

	constructor(){
		super();

		this.indexes = [
	        0,  1,  2,      0,  2,  3,    // avant
	    ];
        this.textures = [];
        this.textureCoordonnees = [
            0., 0.,
            0., 1.,
            1., 1.,
            1., 0.,
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
        this.sizeScale = new Scale([this.width,this.height,1], 1, function(){});
        this.sizeScale.setPosition(0, 0, 0);
        this.addMovement("size", this.sizeScale);
        this.sizeScale.start();
        console.log("avant");
        this.normals = super.generateNormals();
        console.log("après");

	}

	setSize(width, height){
		this.width = width;
        this.height = height;
        this.sizeScale.setScaleVec(this.width, this.height, 1);
	}

	renderAttribute(attribut, webGLProgram){
		this.bufferFunctions[attribut](webGLProgram, this);
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
        webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(that.normals), webGLProgram.getContext().STATIC_DRAW);
    }

    drawMirroredScene(text, processedMatrix){
        //Mirror 
        this.textures[text].preDraw(this, processedMatrix);
    }

    draw(webGLProgram, attributs, processedMatrix){
        super.draw(webGLProgram);
        //Mirror
        for(let text in this.textures){
            if(this.textures[text] instanceof MirrorTexture){
                 this.drawMirroredScene(text, processedMatrix);  
            }
        }
       
        //Render attributs
        for(let i = 0 ; i < attributs.length ; i++){
            this.renderAttribute(attributs[i], webGLProgram);
        }

        
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
            webGLProgram.getContext().drawArrays(webGLProgram.getContext().LINES, 0, this.normals.length * 2);

        }else{
            webGLProgram.getContext().bufferData(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexes), webGLProgram.getContext().STATIC_DRAW);
            //Draw
            webGLProgram.getContext().drawElements(webGLProgram.getContext().TRIANGLES, this.indexes.length, webGLProgram.getContext().UNSIGNED_SHORT, 0);
        }



        webGLProgram.getContext().enable(webGLProgram.getContext().CULL_FACE);

        //Mirror PostSettings
        for(let text in this.textures){
            if(this.textures[text] instanceof MirrorTexture){
                this.textures[text].postDraw(this, processedMatrix);
            }
        }

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
        Object.assign(neww.textures, this.textures);
        Object.assign(neww.bufferFunctions, this.bufferFunctions);
        return neww;
    }

} 


module.exports = Plan;