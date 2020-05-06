class Movement{

	constructor(){
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

	setPowSpeed(pow){
		this.powSpeed = pow;
	}

	setRepeat(bool){
		this.repeat = bool
	}

	setRepeatMode(mode){
		this.reverse = mode != "normal";
	}

	start(){
		this.started = true;
	}

	stop(){
		this.started = false;
	}

	reset(){
		this.step = 0;
		this.finished = false;
	}

	getPourcent(){
		let temp = (this.step / this.nbFrame);
		if(temp < 0.5){
			temp = Math.pow(temp * 2, this.powSpeed) / 2;
		}else{
			temp = Math.pow((temp - 0.5) * 2 , 1 / this.powSpeed) / 2 + 0.5;
		}
		return temp;
	}

	endFrame(){
		if(this.started && !this.finished && this.step <= this.nbFrame){
			if(this.direction){
				this.step++;
			}else{
				this.step--;
			}
		}
		//MOVEMENT COMPLETED
		if(!this.finished && ((this.step == this.nbFrame && this.direction) || (this.step == 0 && !this.direction) )){

			if(!this.repeat){
				this.finished = true;
			}else{
				if(this.reverse){
					this.direction = !this.direction;
				}else{
					this.reset();
				}
			}
			if(this.callback != null){
				this.callback();
			}
		}
	}

}

module.exports = Movement;