class Light{

	constructor(ambient, diffuse, specular){
		this.needRebuild = false;
		if(typeof ambient == "undefined"){
			ambient = [1., 1., 1., 1.];
		}
		if(typeof diffuse == "undefined"){
			diffuse = ambient;
		}
		if(typeof specular == "undefined"){
			specular = [1., 1., 1., 1.];
		}
		this.ambiant = ambient;
		this.diffuse = diffuse;
		this.specular = specular;

		this.aPower = 0.1;
		this.dPower = 1;
		this.sPower = 1;
	}

	setPower(f){
		if(typeof f != "object"){
			this.aPower = f;
			this.dPower = f;
			this.sPower = f;
		}else{
			this.aPower = f[0];
			this.dPower = f[1];
			this.sPower = f[2];
		}
	}

	setRGB(r, g, b){
		this.ambient = [r, g, b];
		this.diffuse = [r, g, b];
		this.specular = [r, g, b];
	}
	getRGB(){
		return [this.ambient, this.diffuse, this.specular];
	}

	setAmbientRGB(r, g, b){
		this.ambient = [r, g, b];
	}

	setDiffuseRGB(r, g, b){
		this.diffuse = [r, g, b];
	}
	
	setSpecularRGB(r, g, b){
		this.specular = [r, g, b];
	}

	getPower(){
		return this.power;
	}

	needShaderRebuild(){
		return this.needRebuild;
	}

	render(){

	}

	getFragmentShaderPreCode(){
		
	}

	getFragmentShaderMainCode(){
		
	}

	getVertexShaderMainCode(){

	}

	getVertexShaderPreCode(){
		
	}

}

module.exports = Light;