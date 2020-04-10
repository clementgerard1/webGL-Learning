const Object3D = require("../Interfaces/Object3D.class.js");
const glmatrix = require("../../../node_modules/gl-matrix/gl-matrix-min.js");

class Cube extends Object3D {

	constructor(){
		super();
		this.size = 1;
		this.centerPosition = [0, 0, 0];
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
        this.movements = [];
		this.indexes = [
	    0,  1,  2,      0,  2,  3,    // avant
	    4,  5,  6,      4,  6,  7,    // gauche
	    8,  9,  10,     8,  10, 11,   // haut
	    12, 13, 14,     12, 14, 15,   // bas
	    16, 17, 18,     16, 18, 19,   // dessous
	    20, 21, 22,     20, 22, 23,   // derriere
	  ];
		this.bufferFunctions = {
			"position" : this._sendVertexPosition,
			"color" : this._sendVertexColor,
		}
	}

    addMovement(name, movement){
        this.movements[name] = movement;
    }

    removeMovement(name){
        delete this.movements[name];
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

	setSize(s){
		this.size = s;
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

	renderAttribute(attribut, webGLProgram){
		this.bufferFunctions[attribut](webGLProgram, this);
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
        	that.centerPosition[0] - (that.size/2), that.centerPosition[1] - (that.size/2), that.centerPosition[2] + (that.size/2),//Face avant
        	that.centerPosition[0] - (that.size/2), that.centerPosition[1] + (that.size/2), that.centerPosition[2] + (that.size/2),
        	that.centerPosition[0] + (that.size/2), that.centerPosition[1] + (that.size/2), that.centerPosition[2] + (that.size/2),
        	that.centerPosition[0] + (that.size/2), that.centerPosition[1] - (that.size/2), that.centerPosition[2] + (that.size/2),

        	that.centerPosition[0] - (that.size/2), that.centerPosition[1] - (that.size/2), that.centerPosition[2] - (that.size/2),//Face gauche
        	that.centerPosition[0] - (that.size/2), that.centerPosition[1] + (that.size/2), that.centerPosition[2] - (that.size/2),
        	that.centerPosition[0] - (that.size/2), that.centerPosition[1] + (that.size/2), that.centerPosition[2] + (that.size/2),
        	that.centerPosition[0] - (that.size/2), that.centerPosition[1] - (that.size/2), that.centerPosition[2] + (that.size/2),

        	that.centerPosition[0] - (that.size/2), that.centerPosition[1] + (that.size/2), that.centerPosition[2] - (that.size/2),//Face haute
        	that.centerPosition[0] + (that.size/2), that.centerPosition[1] + (that.size/2), that.centerPosition[2] - (that.size/2),
        	that.centerPosition[0] + (that.size/2), that.centerPosition[1] + (that.size/2), that.centerPosition[2] + (that.size/2),
        	that.centerPosition[0] - (that.size/2), that.centerPosition[1] + (that.size/2), that.centerPosition[2] + (that.size/2),

        	that.centerPosition[0] + (that.size/2), that.centerPosition[1] + (that.size/2), that.centerPosition[2] - (that.size/2),//Face droite
        	that.centerPosition[0] + (that.size/2), that.centerPosition[1] - (that.size/2), that.centerPosition[2] - (that.size/2),
        	that.centerPosition[0] + (that.size/2), that.centerPosition[1] - (that.size/2), that.centerPosition[2] + (that.size/2),
        	that.centerPosition[0] + (that.size/2), that.centerPosition[1] + (that.size/2), that.centerPosition[2] + (that.size/2),

        	that.centerPosition[0] + (that.size/2), that.centerPosition[1] - (that.size/2), that.centerPosition[2] - (that.size/2),//Face dessous
        	that.centerPosition[0] - (that.size/2), that.centerPosition[1] - (that.size/2), that.centerPosition[2] - (that.size/2),
        	that.centerPosition[0] - (that.size/2), that.centerPosition[1] - (that.size/2), that.centerPosition[2] + (that.size/2),
        	that.centerPosition[0] + (that.size/2), that.centerPosition[1] - (that.size/2), that.centerPosition[2] + (that.size/2),

        	that.centerPosition[0] + (that.size/2), that.centerPosition[1] + (that.size/2), that.centerPosition[2] - (that.size/2),//Face derriere
        	that.centerPosition[0] - (that.size/2), that.centerPosition[1] + (that.size/2), that.centerPosition[2] - (that.size/2),
        	that.centerPosition[0] - (that.size/2), that.centerPosition[1] - (that.size/2), that.centerPosition[2] - (that.size/2),
        	that.centerPosition[0] + (that.size/2), that.centerPosition[1] - (that.size/2), that.centerPosition[2] - (that.size/2)
        ]; 

        webGLProgram.getContext().bufferData(webGLProgram.getContext().ARRAY_BUFFER, new Float32Array(positions), webGLProgram.getContext().STATIC_DRAW);
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

	render(webGLProgram, attributs, base){

        for(let i = 0 ; i < attributs.length ; i++){
            this.renderAttribute(attributs[i], webGLProgram);
        }

        //Local transformation
        //base = matrice héritéé d'un groupe d'objet
        let processedMatrix;
        if(base == null || typeof base == "undefined"){
            processedMatrix = glmatrix.mat4.create();
            for(let move in this.movements){
                this.movements[move].process(processedMatrix);
            }
            webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
        }else{
            processedMatrix = base;
            for(let move in this.movements){
                this.movements[move].process(processedMatrix);
            }
            webGLProgram.getContext().uniformMatrix4fv(webGLProgram.getShaderBuilder().getPointer("localTransformation"), false, processedMatrix);
        }

		//Index
		webGLProgram.getContext().bindBuffer(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, webGLProgram.getBuffer("index"));
  	    webGLProgram.getContext().bufferData(webGLProgram.getContext().ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indexes), webGLProgram.getContext().STATIC_DRAW);

		//Draw
        webGLProgram.getContext().drawElements(webGLProgram.getContext().TRIANGLES, this.indexes.length, webGLProgram.getContext().UNSIGNED_SHORT, 0);
	}

} 


module.exports = Cube;