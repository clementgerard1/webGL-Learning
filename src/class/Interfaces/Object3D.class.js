class Object3D{

	constructor(){
		this.transparency = false;
		this.mirrored = 0;
	}

	getTransparency(){
		return this.transparency;
	}

	setTransparency(value){
		this.transparency = value;
	}

	setPositions(){

	}

	setColors(){

	}

	setIndexes(){

	}

	setTexture(){

	}

	clone(neww){
		neww.mirrored = this.mirrored;
		neww.transparency = this.transparency;
	}

	incMirrorValue(){
		this.mirrored++;
	}

	getMirrorValue(){
		return this.mirrored;
	}

	render(){

	}

	draw(webGLProgram){
		console.log(this.transparency);
		if(this.transparency){
			webGLProgram.getContext().depthMask(false);
		}else{
			webGLProgram.getContext().depthMask(true);
		}
	}

}

module.exports = Object3D;